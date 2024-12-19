"use client";
import Link from "next/link";

const BookList = ({ books }) => {
  return (
    <div>
      {books.map((book) => (
        <div key={book.id} className="book-item">
          <h3>{book.title}</h3>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>{book.description}</p>
          <Link href={`/book/${book.id}`}>
            <a>View Summary</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BookList;
