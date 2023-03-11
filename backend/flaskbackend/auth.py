import re
import json

from flask import Blueprint, g, request, session, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from bson.objectid import ObjectId
from flask_cors import cross_origin

from flaskbackend.db import get_db_client

bp = Blueprint("auth", __name__, url_prefix="/auth")


@bp.route("/", methods=["GET"])
@cross_origin(supports_credentials=True)
def auth():
    userId = session.get("userId", None)

    if userId is None:
        g.user = None
        return "Unauthorized", 401
    else:
        client = get_db_client()
        users = client["users"]
        users_collection = users["users_collection"]
        user = users_collection.find_one({"_id": ObjectId(userId)})

        g.user = user

        del user["_id"]
        del user["password"]

        return jsonify(user), 200


@bp.route("/register", methods=["POST"])
@cross_origin(supports_credentials=True)
def register():
    form_data = json.loads(request.data)
    username = form_data["username"]
    password = form_data["password"]

    if len(username) < 3 or len(username) > 16:
        return "Please input an optimal length username.", 400

    if len(password) < 6 or len(password) > 64:
        return "Please input an optimal length password.", 400

    if not re.match(r"^\w+$", username):
        return "Please input an alphanumeric username.", 400

    client = get_db_client()
    users = client["users"]
    users_collection = users["users_collection"]
    user = users_collection.find_one({"username": username})

    if user:
        return "Sorry, the username is already taken.", 401

    users_collection.insert_one(
        {
            "username": username,
            "password": generate_password_hash(password),
            "profilePicture": f"https://avatars.dicebear.com/api/human/{username}.svg?width=64&height=64",
        }
    )

    user = users_collection.find_one({"username": username})
    session["userId"] = str(user["_id"])

    return "Successfully logged in!", 200


@bp.route("/login", methods=["POST"])
@cross_origin(supports_credentials=True)
def login():
    form_data = json.loads(request.data)
    username = form_data["username"]
    password = form_data["password"]

    client = get_db_client()
    users = client["users"]
    users_collection = users["users_collection"]
    user = users_collection.find_one({"username": username})

    error = None

    if user is None:
        error = "Incorrect username."
    elif not check_password_hash(user["password"], password):
        error = "Incorrect password."

    if error is None:
        session.clear()
        session["userId"] = str(user["_id"])
        return "Successfully logged in!", 200

    return error, 401


@bp.route("/logout", methods=["POST"])
@cross_origin(supports_credentials=True)
def logout():
    session.clear()
    return jsonify({"message": "Logged out successfully"}), 200
