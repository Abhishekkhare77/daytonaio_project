import pymongo, secrets
from passlib.hash import bcrypt_sha256

mongo_uri = pymongo.MongoClient(
    "mongodb+srv://abhishekkhare583:abhishekkhare@cluster0.g9qspzo.mongodb.net/"
)

db = mongo_uri.teamOrg

def hash_password(password, salt: str | None = None):
    hashed_password = bcrypt_sha256.using(salt=salt).hash(password)
    return hashed_password


def generate_salt():
    salt = secrets.token_hex()
    salt = salt[:22]
    return salt


def verify_pass(hashed_pass, given_pass, salt: str | None = None):
    verified = bcrypt_sha256.using(salt=salt).verify(given_pass, hashed_pass)
    return verified