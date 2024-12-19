from fastapi import APIRouter, HTTPException
from app.models.models import *
from app.config.private import *
from fastapi.responses import JSONResponse
from datetime import datetime
from bson import ObjectId
import smtplib
from email.message import EmailMessage
import uuid

user = APIRouter()

EMAIL_ADDRESS = 'ghostabhi323@gmail.com'
EMAIL_PASSWORD = 'bkre alar pzqp zfnr'

def send_email(subject, body, to):
    msg = EmailMessage()
    msg.set_content(body)
    msg['Subject'] = subject
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = to

    with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
        smtp.starttls()
        smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        smtp.send_message(msg)


@user.post("/register") 
async def register_user(user: RegisterUserSchema):
     
    if db.users.find_one({"email": user.email}):
        return JSONResponse(
            status_code=400,
            content={"message": "Email already registered."}
        )
    pass_salt = generate_salt()
    hashed_password = hash_password(user.password, pass_salt)

    user_dict = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
        "mobile": user.mobile,
        "created_at": datetime.now(),
        "last_login": None,
        "user_role":"member",
        "points_earned": 0,
        "fcm_token": None,
        "notifications": [],
        "org_id": "",
        "tasks_pending": [],
        "tasks_completed": [],
        "task_templates_created": [],
    }

    new_id = db.users.insert_one(user_dict).inserted_id

    # org = db.organizations.find_one({"_id": str(user.org_id)})
    # if not org:
    #     raise HTTPException(status_code=404, detail="Organization not found")

    # # Update the team_members field
    # db.organizations.update_one(
    #     {"_id": ObjectId(user.org_id)},
    #     {"$push": {"team_members": str(new_id)}}
    # )

    return JSONResponse(
        content={"message": "User registered successfully", "id": str(new_id)}
    )

@user.post("/login")
async def login_user(login: LoginUserSchema):
    user = db.users.find_one({"email": login.email})
    if not user:
        raise HTTPException(status_code=400, detail="User not found")
    if not verify_pass(user["password"], login.password):
        raise HTTPException(status_code=400, detail="Invalid password")
    db.users.update_one({"_id": user["_id"]}, {"$set": {"last_login": datetime.now()}})
    return JSONResponse(
        content={"message": "Login successful", "id": str(user["_id"]),"email": user["email"],"user_role": user["user_role"],"org_id": user["org_id"]},
    )


@user.get("/my-profile/{user_id}")
async def get_user_profile(user_id: str):
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return JSONResponse(
        content={"data": {
            "_id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "mobile": user["mobile"],
            "user_role": user["user_role"],
            "points_earned": user["points_earned"],
            "created_at": str(user["created_at"]),
            "last_login": str(user["last_login"]),
            "fcm_token": user["fcm_token"],
            "notifications": user["notifications"],
            "org_id": user["org_id"],
            "tasks_pending": user["tasks_pending"],
            "tasks_completed": user["tasks_completed"],
            "task_templates_created": user["task_templates_created"]
        }}
    )

@user.put("/update-profile/{user_id}")
async def update_user_profile(user_id: str, user: UpdateProfileSchema):
    existed_user = db.users.find_one({"_id": ObjectId(user_id)})
    if not existed_user:
        raise HTTPException(status_code=404, detail="User not found")
    db.users.update_one({"_id": ObjectId(user_id)}, {"$set": dict(user)})
    return JSONResponse(
        content={"message": "User profile updated successfully"}
    )


@user.get("/get-all-users/{org_id}")
async def get_all_users(org_id: str):
    users = db.users.find({"org_id": org_id})
    user_list = []
    for user in users:
        user_list.append({
            "_id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "mobile": user["mobile"],
            "user_role": user["user_role"],
            "points_earned": user["points_earned"],
            "created_at": str(user["created_at"]),
            "last_login": str(user["last_login"]),
            "fcm_token": user["fcm_token"],
            "notifications": user["notifications"],
            "org_id": user["org_id"],
            "tasks_pending": user["tasks_pending"],
            "tasks_completed": user["tasks_completed"],
            "task_templates_created": user["task_templates_created"]
        })
    return JSONResponse(
        content={"data": user_list}
    )

def generate_token():
    return str(uuid.uuid4())

@user.post("/forgot-password")
def forgot_password(email_verification: EmailVerification):

    user = db.users.find_one({"email": email_verification.email})

    if not user:
        raise HTTPException(status_code=400, detail="User not found")
    
    generated_token = generate_token()
    db.users.update_one({"email": email_verification.email}, {"$set": {"reset_token": generated_token}})

    send_email("Password Reset", f"here is your reset token : {generated_token}", email_verification.email)

    return {"message": "Password reset email sent successfully"}


@user.post("/reset-password/{reset_token}")
def reset_password(reset_token: str, new_password: PasswordReset):

    user = db.users.find_one({"reset_token": reset_token})
    if not user:
        raise HTTPException(status_code=400, detail="User not found")
    
    pass_salt = generate_salt()
    hashed_password = hash_password(new_password.password, pass_salt)

    db.users.update_one({"_id": ObjectId(user.get("_id"))}, {"$set": {"password": hashed_password}})
    db.users.update_one({"_id": ObjectId(user.get("_id"))}, {"$unset": {"reset_token": ""}})

    return {"message": "Password reset successfully"}

