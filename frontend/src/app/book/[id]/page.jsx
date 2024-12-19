"use client";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';

const BookDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [book, setBook] = useState(null);
    const [summary, setSummary] = useState("");
    const [requestType, setRequestType] = useState("summary");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (id) {
            // Fetch book details
            axios.get(`http://localhost:8000/search/?query=id:${id}`)
                .then(res => {
                    if (res.data.length > 0) {
                        setBook(res.data[0]);
                    } else {
                        setError("Book not found.");
                    }
                })
                .catch(err => {
                    console.error(err);
                    setError("Error fetching book details.");
                });
        }
    }, [id]);

    const handleGenerate = () => {
        if (!book) return;
        setLoading(true);
        setError("");
        axios.post('http://localhost:8000/summarize/', {
            book_id: book.id,
            request_type: requestType
        })
            .then(res => {
                setSummary(res.data.creative_summary);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Error generating summary.");
                setLoading(false);
            });
    }

    if (error) return <p>{error}</p>;

    if (!book) return <p>Loading...</p>;

    return (
        <div className="container">
            <h1>{book.title}</h1>
            <p><strong>Author:</strong> {book.author}</p>
            <p>{book.description}</p>

            <div className="summary-section">
                <h2>Generate:</h2>
                <select value={requestType} onChange={(e) => setRequestType(e.target.value)}>
                    <option value="summary">Summary</option>
                    <option value="themes">Themes</option>
                    <option value="characters">Characters</option>
                    <option value="plots">Plots</option>
                </select>
                <button onClick={handleGenerate} disabled={loading}>
                    {loading ? "Generating..." : "Generate"}
                </button>
            </div>

            {summary && (
                <div className="summary-content">
                    <h2>{requestType.charAt(0).toUpperCase() + requestType.slice(1)}</h2>
                    <p>{summary}</p>
                </div>
            )}

            <style jsx>{`
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .summary-section {
                    margin-top: 30px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                select {
                    padding: 8px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
                button {
                    padding: 8px 16px;
                    border: none;
                    background-color: #0070f3;
                    color: white;
                    cursor: pointer;
                    border-radius: 4px;
                }
                button:disabled {
                    background-color: #999;
                    cursor: not-allowed;
                }
                .summary-content {
                    margin-top: 20px;
                    padding: 20px;
                    border: 1px solid #eaeaea;
                    border-radius: 10px;
                    background-color: #f9f9f9;
                }
            `}</style>
        </div>
    );
}

export default BookDetail;
