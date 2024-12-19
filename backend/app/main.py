from fastapi import FastAPI, HTTPException
from typing import List
from .models import Book
from .schemas import BookCreate, SummaryRequest
from .search import add_books, search_books, get_book_by_id, index
from .utils import generate_creative_summary_via_gemini
from fastapi.middleware.cors import CORSMiddleware
import asyncio

app = FastAPI(title="Book Summary Search Engine")

# CORS Configuration
origins = [
    "http://localhost:3000",  # Frontend URL
    # Add your frontend's production URL here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Initialize MeiliSearch index on startup
@app.on_event("startup")
def startup_event():
    pass  # Index is already initialized in search.py


@app.post("/books/", response_model=Book)
async def create_book(book: BookCreate):
    # Assign a new ID
    current_doc_ids = [doc["id"] for doc in index.get_documents()]
    new_id = max(current_doc_ids, default=0) + 1

    # Generate summary asynchronously
    loop = asyncio.get_event_loop()
    summary_data = await loop.run_in_executor(
        None, generate_creative_summary_via_gemini, book.pdf_uri or "", book.title
    )

    new_book = Book(
        id=new_id,
        title=book.title,
        author=book.author,
        description=book.description,
        keywords=book.keywords,
        pdf_uri=book.pdf_uri,
        creative_summary=summary_data.get("creative_summary", ""),
        concepts_learned=summary_data.get("concepts_learned", []),
    )
    add_books([new_book])
    return new_book


@app.get("/search/", response_model=List[Book])
def search(query: str):
    results = search_books(query)
    return results


@app.post("/summarize/")
async def summarize(request: SummaryRequest):
    # Fetch book details from MeiliSearch
    book = get_book_by_id(request.book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    pdf_uri = book.get("pdf_uri", "")
    title = book.get("title", "")
    if not pdf_uri:
        raise HTTPException(
            status_code=400, detail="No PDF URI available for this book"
        )

    # Generate summary based on request_type
    if request_type := request.request_type.lower():
        if request_type not in ["summary", "themes", "characters", "plots"]:
            raise HTTPException(status_code=400, detail="Invalid request type")
    else:
        request_type = "summary"

    summary_data = generate_creative_summary_via_gemini(pdf_uri, title)

    # Update the book in MeiliSearch with the new summary if needed
    # For this example, we'll return the summary without updating the index

    return {
        "creative_summary": summary_data.get("creative_summary", ""),
        "concepts_learned": summary_data.get("concepts_learned", []),
    }
