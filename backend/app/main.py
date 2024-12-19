from fastapi import FastAPI, HTTPException
from typing import List
from .models import Book
from .schemas import BookCreate, SummaryRequest
from .search import add_books, search_books, index, create_index

app = FastAPI(title="Book Summary Search Engine")

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",
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
    global index
    index = create_index()  # Ensure the index is ready
    print("MeiliSearch index is ready.")


# Optionally load initial data


@app.post("/books/", response_model=Book)
def create_book(book: BookCreate):
    # In a real application, you'd save the book to a database
    # Here, we'll assign a random ID and add to MeiliSearch
    import random

    book_id = random.randint(1, 1000000)
    new_book = Book(id=book_id, **book.dict())
    add_books([new_book])
    return new_book


@app.get("/search/", response_model=List[Book])
def search(query: str):
    results = search_books(query)
    return results


@app.post("/summarize/")
def summarize(request: SummaryRequest):
    # Fetch book details from MeiliSearch
    search_result = index.get_document(request.book_id)
    if not search_result:
        raise HTTPException(status_code=404, detail="Book not found")

    description = search_result.get("description", "")
    if not description:
        raise HTTPException(
            status_code=400, detail="No description available for this book"
        )

    summary = generate_summary(description, request.request_type)
    return {"summary": summary}
