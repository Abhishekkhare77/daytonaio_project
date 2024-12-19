from pydantic import BaseModel
from typing import Optional, List


class Book(BaseModel):
    id: int
    title: str
    author: str
    description: Optional[str] = None
    keywords: Optional[List[str]] = []
    pdf_uri: Optional[str] = None
    creative_summary: Optional[str] = None
    concepts_learned: Optional[List[str]] = []
