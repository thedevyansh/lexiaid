import json
from flask import Blueprint, abort, request, session, g, jsonify
from flask_cors import cross_origin
from flaskbackend.db import get_db_client


bp = Blueprint("phonics", __name__, url_prefix="/phonics")

@bp.route("/get_chapters", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_chapters():
    username = session.get("username", None)
    if username is None:
        g.user = None
        abort(401, "Unauthorized")

    client = get_db_client()
    lexiaid_db = client["lexiaid_db"]
    users_collection = lexiaid_db["users_collection"]
    user = users_collection.find_one({"username": username})

    phonics_progress_collection = lexiaid_db["phonics_progress"]
    current_chapter = phonics_progress_collection.find({"user_id": user["_id"]})[0]["chapter_id"]
    current_module = phonics_progress_collection.find({"user_id": user["_id"]})[0]["curr_learning_module"]
    chapter_progress = phonics_progress_collection.find({"user_id": user["_id"]})[0]["chapter_progress"]

    phonics_content_db = client["phonics_content"]
    chapters_collection = phonics_content_db["chapters"].find().sort("c_id")

    chapters = []
    for document in chapters_collection:
        del document["_id"]
        chapters.append(document)

    response_obj={
        "all_chapters":chapters, 
        "current_chapter":current_chapter,
        "chapter_progress":chapter_progress,
        "current_module":current_module
    }
    return jsonify(response_obj), 200


@bp.route("/get_module", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_module():
    username = session.get("username", None)
    if username is None:
        g.user = None
        abort(401, "Unauthorized")
    chapter_id = int(request.args.get("chapter"))
    module_id = int(request.args.get("module")) 
    module_type=request.args.get("type")
    if module_type=="assessment":
        module_type="assessment_modules"
    else:
        module_type="learning_modules"

    client = get_db_client()
    phonics_content_db = client["phonics_content"]
    curr_module = phonics_content_db[module_type].find_one({"c_id":chapter_id,"idx":module_id})
    del curr_module["_id"]
    return curr_module, 200


@bp.route("/get_assessment_modules", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_assessment_modules():
    module_id = int(request.args.get("module"))
    username = session.get("username", None)
    if username is None:
        g.user = None
        abort(401, "Unauthorized")

    client = get_db_client()
    lexiaid_db = client["lexiaid_db"]
    users_collection = lexiaid_db["users_collection"]
    user = users_collection.find_one({"username": username})

    phonics_progress_collection = lexiaid_db["phonics_progress"]
    user_progress=phonics_progress_collection.find({"user_id": user["_id"]})[0]
    box_modules=user_progress["box_1"].copy()
    if module_id%3==0:
        box_modules.extend(user_progress["box_2"])
    box_modules.insert(0,module_id)
     
    return jsonify(box_modules), 200