from fastapi import APIRouter,HTTPException
from app.models.models import *
from app.config.private import *
from bson import ObjectId
import requests


task = APIRouter()

@task.get("/user-tasks/{user_id}")
async def get_user_tasks(user_id: str):
    user_data = db.users.find_one({"_id": ObjectId(user_id)})
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")
    
    task_ids = [ObjectId(task_id) for task_id in user_data.get('tasks_pending', [])]
    tasks = db.tasks.find({"_id": {"$in": task_ids}})
    
    task_list = []
    for task in tasks:
        task['_id'] = str(task['_id'])
        task_list.append(task)
    
    return {"message": "User tasks fetched successfully", "tasks": task_list}


@task.get("/get-task/{task_id}/{user_id}")
async def get_task(task_id: str, user_id: str):
    user_data = db.users.find_one({"_id": ObjectId(user_id)})
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")
    

    if user_data['user_role'] != "admin":
        db.assignments.update_one(
            {"user_id": user_id, "task_id": task_id},
            {"$inc": {"times_viewed": 1}}
        )

    task = db.tasks.find_one({"_id": ObjectId(task_id)})
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task['_id'] = str(task['_id'])
    return task


@task.post("/create-task/{user_id}")
async def create_task(user_id: str, task: CreateTaskSchema):
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return {"message": "User not found"}
    if user['user_role'] != "admin":
        return {"message": "User not authorized to create tasks"}
    

    # assigned_to_list = [
    #     {
    #         "user_id": assigned.user_id,
    #         "times_viewed": assigned.times_viewed,
    #         "isCompleted": assigned.isCompleted,
    #         "task_completed_time": assigned.task_completed_time,
    #         "task_feedback": assigned.task_feedback
    #     } for assigned in task.assigned_to
    # ]


    task_data = dict(task)
    task_data['created_at'] = datetime.now()
    task_data['created_by'] = user_id
    # task_data['assigned_to'] = assigned_to_list
    result_id = db.tasks.insert_one(task_data).inserted_id

    # Update each assigned user's profile
    # for assigned in task.assigned_to:
    #     db.users.update_one(
    #         {"_id": assigned.user_id},
    #         {"$push": {"tasks_pending": str(result_id)}}
    #     )

    return {"message": "Task created successfully", "task_id": str(result_id)}


@task.get("/get-admin-created-task/{user_id}")
async def get_admin_created_tasks(user_id: str):
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return {"message": "User not found"}
    if user['user_role'] != "admin":
        return {"message": "User not authorized to view tasks"}

    tasks = db.tasks.find({"created_by": user_id})
    task_list = []
    for task in tasks:
        task['_id'] = str(task['_id'])
        task_list.append(task)
    
    return {"message": "Admin created tasks fetched successfully", "tasks": task_list}


@task.post("/assign-task/{task_id}")
async def assign_task(task_id: str, assigned_to: list[AssignedToSchema]):
    existing_task = db.tasks.find_one({"_id": ObjectId(task_id)})
    if not existing_task:
        raise HTTPException(status_code=404, detail="Task not found")

    for assigned in assigned_to:
        assigned_user = db.users.find_one({"_id": ObjectId(assigned.user_id)})
        if not assigned_user:
            raise HTTPException(status_code=404, detail=f"Assigned user with id {assigned.user_id} not found")

        assigned_user_data = {
            "user_id": assigned.user_id,
            "task_id": task_id,
            "times_viewed": 0,
            "isCompleted": False,
            "task_completed_time": 0,
            "task_feedback": ""
        }

        db.users.update_one(
            {"_id": ObjectId(assigned.user_id)},
            {"$push": {"tasks_pending": task_id}}
        )
        db.assignments.insert_one(assigned_user_data)

        if existing_task.get('send_notification'):
            notification_data = {
                "title": f"New Task Assigned: {existing_task['task_title']}",
                "message": existing_task['task_description'],
                "user_id": assigned.user_id,
                "task_id": task_id
            }
            db.notifications.insert_one(dict(notification_data))

    return {"message": "Task assigned successfully"}


@task.patch("/update-task/{task_id}/{user_id}")
async def update_task(task_id: str, user_id: str, task: UpdateTaskSchema):
    existing_task = db.tasks.find_one({"_id": ObjectId(task_id)})
    if not existing_task:
        raise HTTPException(status_code=404, detail="Task not found")

    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user['user_role'] != "admin":
        raise HTTPException(status_code=403, detail="User not authorized to update tasks")

    updated_data = task.dict(exclude_unset=True)

    db.tasks.update_one({"_id": ObjectId(task_id)}, {"$set": updated_data})

    return {"message": "Task updated successfully"}


@task.delete("/delete-task/{task_id}/{user_id}")
async def delete_task(task_id: str, user_id: str):
    existing_task = db.tasks.find_one({"_id": ObjectId(task_id)})
    if not existing_task:
        raise HTTPException(status_code=404, detail="Task not found")

    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user['user_role'] != "admin":
        raise HTTPException(status_code=403, detail="User not authorized to delete tasks")

    db.tasks.delete_one({"_id": ObjectId(task_id)})

    # Remove task from users' pending tasks list
    db.users.update_many({}, {"$pull": {"tasks_pending": str(task_id)}})

    return {"message": "Task deleted successfully"}


from datetime import datetime

@task.put("/done-task/{user_id}/{task_id}")
async def mark_task_done(user_id: str, task_id: str, task: DoneTaskSchema):
    # Find the task
    existing_task = db.tasks.find_one({"_id": ObjectId(task_id)})
    if not existing_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.assignments.update_one(
        {"user_id": user_id, "task_id": task_id},
        {"$set": {"isCompleted": True, "task_completed_time": datetime.now(),"task_feedback": task.task_feedback}}
    )

    task_points  = existing_task['task_rewards']

    # Update user's points
    db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$inc": {"points_earned": task_points}}
    )

    db.notifications.delete_one({"user_id": user_id, "task_id": task_id})

    # Remove task from user's pending tasks list and add to completed tasks list

    db.users.update_one(
        {"_id": ObjectId(user_id)},
        {
            "$pull": {"tasks_pending": str(task_id)},
            "$push": {"tasks_completed": str(task_id)}
        }
    )

    return {"message": "Marked task as done"}


@task.get("/get-feedbacks/{task_id}")
async def get_task_feedbacks(task_id: str):
    task = db.tasks.find_one({"_id": ObjectId(task_id)})
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    feedbacks = db.assignments.find({"task_id": task_id, "isCompleted": True})
    feedback_list = []
    for feedback in feedbacks:
        user = db.users.find_one({"_id": ObjectId(feedback['user_id'])})
        new_feedback = {
            "user_name": user['name'],
            "user_email": user['email'],
            "task_feedback": feedback['task_feedback']
        }
        feedback_list.append(new_feedback)
    
    return {"message": "Task feedbacks fetched successfully", "feedbacks": feedback_list}


@task.get("/get-all-assigned-users/{task_id}")
async def get_all_assigned_users(task_id: str):
    task = db.tasks.find_one({"_id": ObjectId(task_id)})
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    assigned_users = db.assignments.find({"task_id": task_id})
    assigned_user_list = []
    for assigned in assigned_users:
        user_details = db.users.find_one({"_id": ObjectId(assigned['user_id'])})
        user_details = {
            "user_name": user_details['name'],
            "times_viewed": assigned['times_viewed'],
            "isCompleted": assigned['isCompleted'],
            "task_completed_time": assigned['task_completed_time'],
            "user_email": user_details['email'],
        }
        assigned_user_list.append(user_details)
    
    return {"message": "Assigned users fetched successfully", "users": assigned_user_list}





