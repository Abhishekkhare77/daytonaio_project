"use client";
import React, { useState } from "react";
import axios from "axios";

const Page = () => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        description: "",
        keywords: "",
        pdf_uri: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        const payload = {
            title: formData.title,
            author: formData.author,
            description: formData.description,
            keywords: formData.keywords.split(","), // Convert comma-separated string to array
            pdf_uri: formData.pdf_uri,
        };

        try {
            const response = await axios.post("http://localhost:8000/books/", payload);
            setMessage("Book added successfully!");
            setFormData({
                title: "",
                author: "",
                description: "",
                keywords: "",
                pdf_uri: "",
            });
        } catch (error) {
            setMessage(
                error.response?.data?.detail || "Error adding book. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-5">
            <h2 className="text-center font-bold text-2xl mb-5">Add a New Book</h2>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter book title"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Author
                    </label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter author name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter book description"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Keywords (comma-separated)
                    </label>
                    <input
                        type="text"
                        name="keywords"
                        value={formData.keywords}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="e.g., Fiction, Drama, Mystery"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        PDF URI
                    </label>
                    <input
                        type="url"
                        name="pdf_uri"
                        value={formData.pdf_uri}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter PDF link"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-2 px-4 text-white font-bold rounded focus:outline-none focus:shadow-outline ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
                        }`}
                >
                    {isLoading ? "Submitting..." : "Add Book"}
                </button>
            </form>
            {message && (
                <p
                    className={`text-center mt-4 font-semibold ${message.includes("success")
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                >
                    {message}
                </p>
            )}
        </div>
    );
};

export default Page;