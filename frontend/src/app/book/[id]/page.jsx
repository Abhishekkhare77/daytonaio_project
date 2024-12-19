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

    useEffect(() => {
        if (id) {
            // Fetch book details
            axios.get(`http://localhost:8000/search/?query=id:${id}`)
                .then(res => {
                    if (res.data.length > 0) {
                        setBook(res.data[0]);
                    }
                })
                .catch(err => console.error(err));
        }
    }, [id]);

    const handleGenerate = () => {
        if (!book) return;
        setLoading(true);
        axios.post('http://localhost:8000/summarize/', {
            book_id: book.id,
            request_type: requestType
        })
            .then(res => {
                setSummary(res.data.summary);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }

    if (!book) return <p>Loading...</p>;

    return (
        <div>
            <h1>{book.title}</h1>
            <p><strong>Author:</strong> {book.author}</p>
            <p>{book.description}</p>

            <div>
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
                <div>
                    <h2>{requestType.charAt(0).toUpperCase() + requestType.slice(1)}</h2>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
}

export default BookDetail;
