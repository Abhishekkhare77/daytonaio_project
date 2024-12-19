"use client";
import Link from "next/link";

const BookList = ({ books }) => {
  if (books.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book.id} className="book-item">
          <h3>{book.title}</h3>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>{book.description}</p>
          <Link href={`/book/${book.id}`}>
            <a className="view-summary">View Summary</a>
          </Link>
        </div>
      ))}
      <style jsx>{`
        .book-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          padding: 20px;
        }
        .book-item {
          border: 1px solid #eaeaea;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s ease;
        }
        .book-item:hover {
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        }
        .view-summary {
          display: inline-block;
          margin-top: 10px;
          color: #0070f3;
          text-decoration: none;
        }
        .view-summary:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default BookList;
