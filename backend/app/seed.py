import json
import asyncio
from typing import List
from .models import Book
from .search import add_books, index
from .utils import generate_creative_summary_via_gemini


async def load_sample_data():
    with open("sample_books.json", "r") as f:
        books_data = json.load(f)

    books: List[Book] = []
    for idx, book_data in enumerate(books_data, start=1):
        # Generate summary via Gemini API
        summary_data = generate_creative_summary_via_gemini(
            book_data.get("pdf_uri", ""), book_data.get("title", "")
        )

        book = Book(
            id=idx,
            title=book_data.get("title", ""),
            author=book_data.get("author", ""),
            description=book_data.get("description", ""),
            keywords=book_data.get("keywords", []),
            pdf_uri=book_data.get("pdf_uri", ""),
            creative_summary=summary_data.get("creative_summary", ""),
            concepts_learned=summary_data.get("concepts_learned", []),
        )
        books.append(book)
        print(f"Processed book {idx}: {book.title}")

    # Add books to MeiliSearch
    add_books(books)
    print("All books have been indexed in MeiliSearch.")


if __name__ == "__main__":
    asyncio.run(load_sample_data())
