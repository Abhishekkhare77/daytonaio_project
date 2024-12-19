import meilisearch
from .models import Book
from typing import List

MEILI_HOST = "http://localhost:7700"
MEILI_API_KEY = "toLlX17uYy22fqasweyrnPLd6idsqhly2Qq3Yq4zx4M"

client = meilisearch.Client(MEILI_HOST, MEILI_API_KEY)
INDEX_NAME = "books"


def create_index():
    try:
        index = client.create_index(INDEX_NAME, {"primaryKey": "id"})
    except meilisearch.errors.MeiliSearchApiError:
        index = client.get_index(INDEX_NAME)
    return index


index = create_index()


def add_books(books: List[Book]):
    documents = [book.dict() for book in books]
    index.add_documents(documents)


def search_books(query: str, limit: int = 20):
    search_result = index.search(
        query,
        {
            "limit": limit,
            "attributesToRetrieve": ["id", "title", "author", "description"],
        },
    )
    return search_result["hits"]


def get_book_by_id(book_id: int):
    try:
        document = index.get_document(book_id)
        return document
    except meilisearch.errors.MeiliSearchError:
        return None
