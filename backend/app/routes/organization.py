from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from app.models.models import *
from app.config.private import *


organization = APIRouter()

@organization.post("/create-organization/{user_id}")
async def register_organization(organization: OrganizationModel, user_id: str):

    if not db.users.find_one({"_id": ObjectId(user_id)}):
        return JSONResponse(
            status_code=404,
            content={"message": "User not found."}
        )

    if db.organizations.find_one({"name": organization.org_name,"created_by": user_id}):
        return JSONResponse(
            status_code=400,
            content={"message": "Organization already exists."}
        )
    org_dict = {
        "org_name": organization.org_name,
        "org_website": organization.org_website,
        "org_country": organization.org_country,
        "created_by": user_id,
        "org_logo": organization.org_logo,
        "team_members": [user_id],
    }
    new_id = db.organizations.insert_one(org_dict).inserted_id
    db.users.update_one({"_id": ObjectId(user_id)}, {"$set": {"user_role": "admin","org_id": str(new_id)}})

    return JSONResponse(
        content={"message": "Organization registered successfully", "id": str(new_id)}
    )
    
# Read an organization by ID
@organization.get("/get-organization/{organization_id}")
async def get_organization(organization_id: str):
    organization = db.organizations.find_one({"_id": ObjectId(organization_id)})
    if not organization:
        raise HTTPException(status_code=404, detail="Organization not found")
    organization["_id"] = str(organization["_id"])
    return organization

@organization.get("/get-all-organizations")
async def get_all_organizations():
    organizations = db.organizations.find()
    orgs_list = []
    for org in organizations:
        org["_id"] = str(org["_id"])
        orgs_list.append(org)
    return JSONResponse(content=orgs_list)

# Update an organization by ID
@organization.put("/update-organization/{organization_id}/{user_id}")
async def update_organization(organization_id: str, user_id: str, organization: OrganizationModel):
    existing_organization = db.organizations.find_one({"_id": ObjectId(organization_id)})
    if not existing_organization:
        raise HTTPException(status_code=404, detail="Organization not found")
    if existing_organization["created_by"] != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this organization")

    org_dict = {k: v for k, v in organization.dict().items() if v is not None}
    if not org_dict:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    db.organizations.update_one({"_id": ObjectId(organization_id)}, {"$set": org_dict})
    return JSONResponse(
        content={"message": "Organization updated successfully"}
    )

# Delete an organization by ID
@organization.delete("/delete-organization/{organization_id}/{user_id}")
async def delete_organization(organization_id: str, user_id: str):
    existing_organization = db.organizations.find_one({"_id": ObjectId(organization_id)})
    if not existing_organization:
        raise HTTPException(status_code=404, detail="Organization not found")
    if existing_organization["created_by"] != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this organization")
    
    db.organizations.delete_one({"_id": ObjectId(organization_id)})
    return JSONResponse(
        content={"message": "Organization deleted successfully"}
    )

@organization.patch("/appoint-user-as-admin/{user_id}")
async def appoint_user_as_admin(user_id:str):
    user = db.users.find_one({"_id":ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=400,detail="User not found")

    user_role = user["user_role"]
    if user_role == "admin":
        return JSONResponse(
            status_code=400,
            content={"message": "User is already an admin"}
        )
    
    db.users.update_one({"_id": ObjectId(user_id)}, {"$set": {"user_role": "admin"}})
    return JSONResponse(
        content={"message": "User appointed as admin successfully"}
    )
    
    