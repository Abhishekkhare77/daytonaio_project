from pydantic import BaseModel
from typing import Optional, List


class BookCreate(BaseModel):
    title: str
    author: str
    description: Optional[str] = None
    keywords: Optional[List[str]] = []
    pdf_uri: Optional[str] = None


class SummaryRequest(BaseModel):
    book_id: int
    request_type: str  # e.g., "summary", "themes", "characters", "plots"
