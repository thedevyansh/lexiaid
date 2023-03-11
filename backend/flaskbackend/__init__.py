import os

from flask import Flask
from flask_cors import CORS


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

    app.config.from_mapping(
        SECRET_KEY="dev",  # for production, generate secret key using OS cryptographic random generator.
        DATABASE_HOST="localhost",
        DATABASE_PORT=27017,
    )

    if test_config is None:
        app.config.from_pyfile("config.py", silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route("/ping")
    def ping():
        return "Ping successful: LexiAid Flask Server"

    from . import db
    db.init_app(app)

    from . import auth
    app.register_blueprint(auth.bp)

    return app
