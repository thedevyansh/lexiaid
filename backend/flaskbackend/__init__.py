import os

from flask import Flask
from flask_cors import CORS, cross_origin
from authlib.integrations.flask_client import OAuth


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    CORS(app, supports_credentials=True)
    oauth = OAuth(app)

    app.config.from_mapping(
        SECRET_KEY="dev",  # for production, generate secret key using OS cryptographic random generator.
        DATABASE_HOST="localhost",
        DATABASE_PORT=27017,
        MAX_CONTENT_LENGTH=16 * 1000 * 1000
    )

    app.oauth = oauth

    if test_config is None:
        app.config.from_pyfile("config.py", silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route("/")
    @cross_origin(supports_credentials=True)
    def ping():
        return "Ping from LexiAid Flask Server."

    from . import db
    db.init_app(app)

    from . import auth
    app.register_blueprint(auth.bp)

    from . import service
    app.register_blueprint(service.bp)

    return app
