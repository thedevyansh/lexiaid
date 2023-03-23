import json

from flask import Blueprint, abort, request, session, g, jsonify
from flask_cors import cross_origin
from flaskbackend.db import get_db_client

from .service_helpers.ttf import ttf

bp = Blueprint("service", __name__, url_prefix="/service")


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
