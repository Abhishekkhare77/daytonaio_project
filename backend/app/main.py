from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import user,task,task_template,invite,organization,push_notifications

app = FastAPI(
    title="TeamOrg",
    description="TeamOrg API",
    version="0.1.0",
    docs_url="/",
    redoc_url=None
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(user.user,tags=["User"])
app.include_router(task.task,tags=["Task"])
app.include_router(task_template.taskTemplate,tags=["Task Template"])
app.include_router(invite.invite,tags=["Invite"])
app.include_router(organization.organization,tags=["Organization"])
app.include_router(push_notifications.push_notifications,tags=["Notifications"])

@app.get("/")
def read_root():
    return {"TeamOrg": "Backend"}
