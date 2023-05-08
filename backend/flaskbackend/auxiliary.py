import json
from flask import Blueprint, abort, request, session, g, jsonify
from flask_cors import cross_origin
from flaskbackend.db import get_db_client


bp = Blueprint("auxiliary", __name__, url_prefix="/auxiliary")


@bp.route("/get_notes", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_notes():
    username = session.get("username", None)
    if username is None:
        g.user = None
        abort(401, "Unauthorized")

    client = get_db_client()
    lexiaid_db = client["lexiaid_db"]
    users_collection = lexiaid_db["users_collection"]
    user = users_collection.find_one({"username": username})

    user_notes_collection = lexiaid_db["user_notes_collection"]
    cursor = user_notes_collection.find({"user_id": user["_id"]})

    user_notes = []
    for document in cursor:
        del document["_id"]
        del document["user_id"]
        user_notes.insert(0, document)

    return jsonify(user_notes), 200


@bp.route("/save_note", methods=["POST"])
@cross_origin(supports_credentials=True)
def save_note():
    username = session.get("username", None)
    if username is None:
        g.user = None
        abort(401, "Unauthorized")

    client = get_db_client()
    lexiaid_db = client["lexiaid_db"]
    users_collection = lexiaid_db["users_collection"]
    user = users_collection.find_one({"username": username})

    form_data = json.loads(request.data)
    note_name = form_data["note_name"]
    note_content = form_data["note_content"]

    user_notes_collection = lexiaid_db["user_notes_collection"]

    user_notes_collection.insert_one(
        {
            "note_name": note_name,
            "note_content": note_content,
            "user_id": user["_id"],
        }
    )

    return "Successfully saved note.", 200
