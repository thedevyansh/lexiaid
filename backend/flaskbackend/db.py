import sqlite3

import click
from flask import current_app, g
from pymongo import MongoClient


def get_db_client():
    if "db_client" not in g:
        g.db_client = MongoClient(
            current_app.config["DATABASE_HOST"], current_app.config["DATABASE_PORT"]
        )

    return g.db_client


def close_db_client(e=None):
    db_client = g.pop("db_client", None)

    if db_client is not None:
        db_client.close()

def init_app(app):
    app.teardown_appcontext(close_db_client)
