from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from app.config.private import *
from app.models.models import *
import requests

push_notifications = APIRouter()


@push_notifications.get("/notifications/{user_id}")
async def send_push_notification(user_id: str):
    notificaitons = db.notifications.find({"user_id": user_id})
    if not notificaitons:
        raise HTTPException(status_code=404, detail="No notifications found")
    notificaitons_list = []
    for notificaiton in notificaitons:
        notificaiton["_id"] = str(notificaiton["_id"])
        notificaitons_list.append(notificaiton)
    
    return  notificaitons_list


# @push_notifications.delete("/notifications/clear/{user_id}")
# async def clear_viewed_notifications(user_id: str, notification_ids: List[str]):
#     for notification_id in notification_ids:
#         db.notifications.delete_one({"_id": ObjectId(notification_id)})
#     return {"message": "Viewed notifications cleared"}
