import re
import json

from flask import (
    Blueprint,
    g,
    request,
    session,
    current_app,
    url_for,
    jsonify,
    render_template_string,
)
from werkzeug.security import check_password_hash, generate_password_hash
from flask_cors import cross_origin
from flaskbackend.db import get_db_client

bp = Blueprint("auth", __name__, url_prefix="/auth")


@bp.route("/", methods=["GET"])
@cross_origin(supports_credentials=True)
def auth():
    username = session.get("username", None)

    if username is None:
        g.user = None
        return "Unauthorized", 401
    else:
        client = get_db_client()
        lexiaid_db = client["lexiaid_db"]
        users_collection = lexiaid_db["users_collection"]
        user = users_collection.find_one({"username": username})

        if user:
            g.user = user
            del user["_id"]
            del user["password"]

            return jsonify(user), 200

        g.user = None
        return "Unauthorized", 401


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
    lexiaid_db = client["lexiaid_db"]
    users_collection = lexiaid_db["users_collection"]
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

    session["username"] = str(username)
    return "Successfully logged in!", 200


@bp.route("/login", methods=["POST"])
@cross_origin(supports_credentials=True)
def login():
    form_data = json.loads(request.data)
    username = form_data["username"]
    password = form_data["password"]

    client = get_db_client()
    lexiaid_db = client["lexiaid_db"]
    users_collection = lexiaid_db["users_collection"]
    user = users_collection.find_one({"username": username})

    error = None

    if user is None:
        error = "Incorrect username."
    elif not check_password_hash(user["password"], password):
        error = "Incorrect password."

    if error is None:
        session.clear()
        session["username"] = str(user["username"])
        return "Successfully logged in!", 200

    return error, 401


@bp.route("/logout", methods=["POST"])
@cross_origin(supports_credentials=True)
def logout():
    session.clear()
    return jsonify({"message": "Logged out successfully"}), 200


@bp.route("/google", methods=["GET"])
@cross_origin(supports_credentials=True)
def google_login():
    GOOGLE_CLIENT_ID = current_app.config["GOOGLE_CLIENT_ID"]
    GOOGLE_CLIENT_SECRET = current_app.config["GOOGLE_CLIENT_SECRET"]

    CONF_URL = "https://accounts.google.com/.well-known/openid-configuration"
    oauth = current_app.oauth
    oauth.register(
        name="google",
        client_id=GOOGLE_CLIENT_ID,
        client_secret=GOOGLE_CLIENT_SECRET,
        server_metadata_url=CONF_URL,
        client_kwargs={"scope": "openid email profile"},
    )

    redirect_uri = url_for("auth.google_login_callback", _external=True)
    return oauth.google.authorize_redirect(redirect_uri)


@bp.route("/google/callback", methods=["GET"])
@cross_origin(supports_credentials=True)
def google_login_callback():
    oauth = current_app.oauth
    token = oauth.google.authorize_access_token()

    user = token["userinfo"]

    googleName = user["name"]
    username = user["given_name"] + user["email"]
    password = user["nonce"]
    pfp = user["picture"]

    client = get_db_client()
    lexiaid_db = client["lexiaid_db"]
    users_collection = lexiaid_db["users_collection"]
    user = users_collection.find_one({"username": username})

    if not user:
        users_collection.insert_one(
            {
                "username": username,
                "password": generate_password_hash(password),
                "profilePicture": pfp,
                "googleName": googleName,
            }
        )

    session["username"] = str(username)
    return render_template_string(
        """
        <script>
            window.location.href = "http://localhost:3000";
        </script>
    """
    )
