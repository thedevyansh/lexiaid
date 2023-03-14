import re
import json

from flask import (
    Blueprint,
    abort,
    request,
    session
)
from bson.objectid import ObjectId
from flask_cors import cross_origin
from flaskbackend.db import get_db_client

from .service_helpers.ttf import ttf

bp = Blueprint("service", __name__, url_prefix="/service")


#text to figure generation service
@bp.route("/new_ttf", methods=["POST"])
@cross_origin(supports_credentials=True)
def new_ttf():
    userId=session.get("userId", None)
    if userId is None:
        abort(401,"You need to login")

    form_data = json.loads(request.data)
    ip_text = form_data["input_text"]

    op_data=ttf.process(ip_text) #TO-DO: When deployed, upload images (returned as base64 to CDN here itself)
    print(op_data)
    if op_data["error"]["code"] !=200 :
        return abort(op_data["error"]["code"],op_data["error"]["message"])

    client = get_db_client()
    services=client["services"]
    ttf_collection=services["ttf_collection"]
    ttf_id=ttf_collection.insert_one({
        "ip_text": ip_text,
        "sentences":op_data["sentences"],
        "images":op_data["images"],
        "user_id":userId
    }).inserted_id

    return op_data, 200