from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from bson import ObjectId
from datetime import datetime

class PushNotification(BaseModel):
    title: str
    message: str

# Schemas for request and response bodies
class RegisterUserSchema(BaseModel):
    name: str
    email: EmailStr
    password: str
    mobile: Optional[str]
    # invite_token: Optional[str]
    # org_id: Optional[str]

class LoginUserSchema(BaseModel):
    email: EmailStr
    password: str

class UpdateProfileSchema(BaseModel):
    name: Optional[str]
    email: Optional[EmailStr]
    mobile: Optional[str]

class AssignedToSchema(BaseModel):
    user_id: str
    # times_viewed: int
    # isCompleted: bool = False
    # task_completed_time:Optional[str] = None
    # task_feedback: Optional[str] = None

class CreateTaskSchema(BaseModel):
    task_title: str
    task_description: str
    task_content: str
    task_rewards: int
    task_platform: str
    deadline: datetime
    task_duration: int
    priority: str
    url_link: str
    # assigned_to: List[AssignedToSchema]
    send_notification: bool
    # isTemplate : bool = False

class UpdateTaskSchema(BaseModel):
    task_title: Optional[str] = None
    task_description: Optional[str] = None
    task_content: Optional[str] = None
    task_rewards: Optional[int] = None
    task_platform: Optional[str] = None
    deadline: Optional[datetime] = None
    task_duration: Optional[int] = None
    priority: Optional[str] = None
    url_link: Optional[str] = None
    # assigned_to: Optional[List[AssignedToSchema]] = None
    send_notification: Optional[bool] = None
    isTemplate : Optional[bool] = None

class DoneTaskSchema(BaseModel):
    task_feedback : Optional[str] = None

    
# Pydantic models
class UserModel(BaseModel):
    name: str
    email: EmailStr
    password: str
    mobile: Optional[str]
    user_role: str
    points_earned: Optional[int] = 0
    created_at: datetime
    last_login: Optional[datetime]
    fcm_token: Optional[str]
    notifications: List[str]
    org_id: Optional[str]
    tasks_pending: List[str]
    tasks_completed: List[str]
    task_templates_created: Optional[List[str]]

class OrganizationModel(BaseModel):
    org_name: str
    org_website: str
    org_country: str
    org_logo: Optional[str]
    # team_members: List[str]

class InvitationModel(BaseModel):
    name : str
    email: EmailStr
    # status: str = "pending"
    # invited_by: str = None
    # org_id: str = None
    # invite_token: str = None
    # accepted_token_on: Optional[datetime] = None
    # invited_at: Optional[datetime] = datetime.now()

class EmailVerification(BaseModel):
    email: EmailStr

class PasswordReset(BaseModel):
    password : str



class AcceptInvitationModel(BaseModel):
    mobile: str
    password: str

class TaskTemplateModel(BaseModel):
    template_task_title: str
    template_task_description: str
    template_task_content: str
    template_task_platform: str
    template_created_by: str
    template_task_platform_logo: Optional[str]
    template_task_duration: int
    org_id: str

class CreateTaskTemplateSchema(BaseModel):
    template_title: str
    template_description: str
    template_platform: str
    template_task_content: str
    template_task_duration: int
    template_task_platform_logo: Optional[str]
    task_template_rewards: int
    task_template_deadline: datetime
    task_template_priority: str
    task_template_url_link: str
    send_notification: bool


class NotificationModel(BaseModel):
    notification_title: str
    notification_sent_time: datetime
    is_notification_read: bool
    notification_read_time: Optional[datetime]
    user_id: str

class TaskModel(BaseModel):
    task_title: str
    task_description: str
    task_content: str
    task_rewards: int
    task_platform: str
    created_at: datetime
    task_duration: int
    deadline: datetime
    priority: str
    url_link: str
    assigned_to: List[dict]
    send_notification: bool
