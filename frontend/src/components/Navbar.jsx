"use client";
import Link from "next/link";
import React from "react";

const Navbar = () => {
    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-white text-lg font-bold">
                    <Link href="/">📚 Book Manager</Link>
                </div>

                {/* Navigation Links */}
                <div className="flex space-x-4">
                    <Link
                        href="/book"
                        className="text-white hover:text-gray-200 transition duration-200"
                    >
                        Add Book
                    </Link>
                    <Link
                        href="/"
                        className="text-white hover:text-gray-200 transition duration-200"
                    >
                        Search Book
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
