from fastapi import APIRouter
from app.models.models import *
from app.config.private import *
import smtplib
from email.message import EmailMessage
from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from bson import ObjectId
from pydantic import BaseModel, EmailStr
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import secrets
from datetime import datetime

invite = APIRouter()


def send_invitation_email(to_email: str, invitation_token: str):
    from_email = "ghostabhi323@gmail.com"
    subject = "You're invited!"
    body =f"""
    <html>
    <body>
        <h2>Welcome!</h2>
        <p>We're excited to invite you to join our platform. To get started, please use the invitation code below:</p>
        <p><strong>{invitation_token}</strong></p>
        <p>To accept the invitation and complete your registration, follow these steps:</p>
        <ol>
            <li>Click on the link below or copy and paste it into your browser.</li>
            <li>Enter your invitation code when prompted.</li>
            <li>Fill in the required details to complete your registration.</li>
        </ol>
        <p><a href="https://chromewebstore.google.com/">Accept Invitation</a></p>
        <p>We look forward to having you on board!</p>
        <p>Best regards,</p>
        <p>TeamOrg</p>
    </body>
    </html>
    """

    msg = MIMEMultipart()
    msg["From"] = from_email
    msg["To"] = to_email
    msg["Subject"] = subject

    msg.attach(MIMEText(body, "html"))

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(from_email, "bkre alar pzqp zfnr")
        text = msg.as_string()
        server.sendmail(from_email, to_email, text)
        server.quit()
    except Exception as e:
        print(f"Failed to send email: {e}")


@invite.post("/invite-user/{user_id}")
async def invite_user(invitation: InvitationModel,user_id: str):
    if db.users.find_one({"email": invitation.email}):
        return JSONResponse(
            status_code=400,
            content={"message": "User is already a member of the organization."}
        )
    
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    invite_token = secrets.token_urlsafe(16)  # Generate a secure token
    
    invitation_dict = {
        "name": invitation.name,
        "email": invitation.email,
        "status": "pending",
        "invited_by": user_id,
        "org_id": user["org_id"],
        "invite_token": invite_token,
        "accepted_token_on": None,
        "invited_at": datetime.now()
    }

    

    invitation_id = db.invitations.insert_one(invitation_dict).inserted_id

    send_invitation_email(invitation.email, invite_token)

    return JSONResponse(
        content={"message": "Invitation sent successfully", "invitation_id": str(invitation_id)}
    )


@invite.post("/accept-invitation/{invite_token}")
async def accept_invitation(invite_token: str, accept_invitation: AcceptInvitationModel):
    invitation = db.invitations.find_one({"invite_token": invite_token})

    if not invitation:
        raise HTTPException(status_code=404, detail="Invitation not found")
    if invitation["status"] != "pending":
        raise HTTPException(status_code=400, detail="Invitation is not valid")

    # Check if the user already exists
    if db.users.find_one({"email": invitation["email"]}):
        raise HTTPException(status_code=400, detail="User with this email already exists")

    # Create the user document
    user_dict = {
        "name": invitation["name"],
        "email": invitation["email"],
        "mobile": accept_invitation.mobile,
        "password": hash_password(accept_invitation.password),
        "created_at": datetime.now(),
        "last_login": None,
        "user_role": "member",
        "points_earned": 0,
        "fcm_token": None,
        "notifications": [],
        "org_id": invitation["org_id"],
        "tasks_pending": [],
        "tasks_completed": [],
        "task_templates_created": [],
    }

    # Insert the new user into the database
    new_user_id = db.users.insert_one(user_dict).inserted_id

    db.organizations.update_one(
        {"_id": ObjectId(invitation["org_id"])},
        {"$push": {"team_members": str(new_user_id)}}
    )

    db.invitations.update_one(
        {"invite_token": invite_token},
        {"$set": {"status": "accepted", "accepted_token_on": datetime.now()}}
    )

    return JSONResponse(
        content={"message": "Invitation accepted successfully"}
    )
