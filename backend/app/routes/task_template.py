from fastapi import APIRouter,HTTPException
from app.models.models import *
from app.config.private import *

taskTemplate = APIRouter()

@taskTemplate.post("/create-task-template/{user_id}")
async def create_task_template(user_id: str, template: CreateTaskTemplateSchema):

    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return {"message": "User not found"}
    if user['user_role'] != "admin":
        return {"message": "User not authorized to create task templates"}

    template_data = dict(template)
    template_data['template_created_by'] = user_id
    template_data['created_at'] = datetime.now()
    template_data['org_id'] = db.users.find_one({"_id": ObjectId(user_id)})['org_id']
    result_id = db.task_templates.insert_one(template_data).inserted_id
    return {"message": "Task template created successfully", "task_template_id": str(result_id)}

@taskTemplate.get("/get-all-task-template/{org_id}")
async def get_all_task_templates(org_id: str):
    templates = db.task_templates.find({"org_id": org_id})
    task_template_list = []
    for task_template in templates:
        task_template['_id'] = str(task_template['_id'])
        task_template_list.append(task_template)
    return task_template_list

@taskTemplate.get("/get-task-template/{task_template_id}")
async def get_task_template(task_template_id: str):
    task_template = db.task_templates.find_one({"_id": ObjectId(task_template_id)})
    if not task_template:
        raise HTTPException(status_code=404, detail="Task template not found")
    task_template['_id'] = str(task_template['_id'])
    return task_template

# @taskTemplate.put("/update-task-template/{task_template_id}/{user_id}")
# async def update_task_template(task_template_id: str, user_id: str, template: CreateTaskTemplateSchema):
#     user = db.users.find_one({"_id": ObjectId(user_id)})
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")
#     if user['user_role'] != "admin":
#         raise HTTPException(status_code=403, detail="User not authorized to update task templates")

#     task_template = db.task_templates.find_one({"_id": ObjectId(task_template_id)})
#     if not task_template:
#         raise HTTPException(status_code=404, detail="Task template not found")
    
#     if task_template['template_created_by'] != user_id:
#         raise HTTPException(status_code=403, detail="User not authorized to update this task template")
    
#     update_data = {k: v for k, v in template.dict().items() if v is not None}
#     db.task_templates.update_one({"_id": ObjectId(task_template_id)}, {"$set": update_data})
#     return {"message": "Task template updated successfully"}

@taskTemplate.delete("/delete-task-template/{task_template_id}/{user_id}")
async def delete_task_template(task_template_id: str, user_id: str):
    user = db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user['user_role'] != "admin":
        raise HTTPException(status_code=403, detail="User not authorized to delete task templates")

    task_template = db.task_templates.find_one({"_id": ObjectId(task_template_id)})
    if not task_template:
        raise HTTPException(status_code=404, detail="Task template not found")
    
    if task_template['template_created_by'] != user_id:
        raise HTTPException(status_code=403, detail="User not authorized to delete this task template")

    db.task_templates.delete_one({"_id": ObjectId(task_template_id)})
    return {"message": "Task template successfully deleted"}
