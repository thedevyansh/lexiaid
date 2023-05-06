import json, os
from flask import Blueprint, abort, request, session, g, jsonify
from flask_cors import cross_origin
from flaskbackend.db import get_db_client
from werkzeug.utils import secure_filename

from google.api_core.client_options import ClientOptions
from google.cloud import documentai_v1 as documentai

from .service_helpers.ttf import ttf

bp = Blueprint("service", __name__, url_prefix="/service")

ALLOWED_EXTENSIONS = {"pdf"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def read_pdf_through_ocr(file, mime_type):
    # Check if there is a better way to store credentials
    credential_path = "/Users/devyansh/google_application_credentials/lexiaid-service-account-file.json"
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = credential_path

    PROJECT_ID = "lexiaid"
    LOCATION = "us"
    PROCESSOR_ID = "31a32a527e21c853"

    docai_client = documentai.DocumentProcessorServiceClient(
        client_options=ClientOptions(
            api_endpoint=f"{LOCATION}-documentai.googleapis.com"
        )
    )

    RESOURCE_NAME = docai_client.processor_path(PROJECT_ID, LOCATION, PROCESSOR_ID)

    # Process document using Document AI
    content = file.read()
    raw_document = documentai.RawDocument(content=content, mime_type=mime_type)
    request = documentai.ProcessRequest(name=RESOURCE_NAME, raw_document=raw_document)
    result = docai_client.process_document(request=request)

    return result.document


@bp.route("/get_ttf", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_ttf():
    username = session.get("username", None)
    if username is None:
        g.user = None
        abort(401, "Unauthorized")

    client = get_db_client()
    lexiaid_db = client["lexiaid_db"]
    users_collection = lexiaid_db["users_collection"]
    user = users_collection.find_one({"username": username})

    ttf_collection = lexiaid_db["ttf_collection"]
    cursor = ttf_collection.find({"user_id": user["_id"]})

    user_prompts_and_responses = []
    for document in cursor:
        del document["_id"]
        del document["user_id"]
        user_prompts_and_responses.append(document)

    return jsonify(user_prompts_and_responses), 200


# text to figure generation service
@bp.route("/generate_ttf", methods=["POST"])
@cross_origin(supports_credentials=True)
def new_ttf():
    username = session.get("username", None)
    if username is None:
        g.user = None
        abort(401, "Unauthorized")

    client = get_db_client()
    lexiaid_db = client["lexiaid_db"]
    users_collection = lexiaid_db["users_collection"]
    user = users_collection.find_one({"username": username})

    form_data = json.loads(request.data)
    ip_text = form_data["user_prompt"]

    op_data = ttf.process(
        ip_text
    )  # TO-DO: When deployed, upload images (returned as base64 to CDN here itself)

    if op_data["error"]["code"] != 200:
        return abort(op_data["error"]["code"], op_data["error"]["message"])

    ttf_collection = lexiaid_db["ttf_collection"]
    ttf_collection.insert_one(
        {
            "ip_text": ip_text,
            "sentences": op_data["sentences"],
            "images": op_data["images"],
            "user_id": user["_id"],
        }
    )

    return op_data, 200


@bp.route("/generate_ttf_from_pdf", methods=["POST"])
@cross_origin(supports_credentials=True)
def upload_file():
    username = session.get("username", None)
    if username is None:
        g.user = None
        abort(401, "Unauthorized")

    if "file" not in request.files:
        return {"error": "No file provided"}

    file = request.files["file"]

    if file.filename == "":
        return {"error": "No file selected"}

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        document_object = read_pdf_through_ocr(file, "application/pdf")
        ip_text = document_object.text

        client = get_db_client()
        lexiaid_db = client["lexiaid_db"]
        users_collection = lexiaid_db["users_collection"]
        user = users_collection.find_one({"username": username})

        op_data = ttf.process(
            ip_text
        )  # TO-DO: When deployed, upload images (returned as base64 to CDN here itself)

        if op_data["error"]["code"] != 200:
            return abort(op_data["error"]["code"], op_data["error"]["message"])

        ttf_collection = lexiaid_db["ttf_collection"]
        ttf_collection.insert_one(
            {
                "ip_text": filename,
                "sentences": op_data["sentences"],
                "images": op_data["images"],
                "user_id": user["_id"],
            }
        )

        return op_data, 200

    else:
        return {"error": "File not allowed"}
