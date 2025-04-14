import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import Header from "../components/Header.tsx";
import Button from "../components/Button/Button.tsx";

interface Book {
    id: string;
    volumeInfo: {
        title: string;
        authors?: string[];
        imageLinks?: {
            thumbnail?: string;
        };
    };
}

export default function BookSearch() {
    const [query, setQuery] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [books, setBooks] = useState<Book[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [hasMorePages, setHasMorePages] = useState(true);
    const [starRatings, setStarRatings] = useState<{ [id: string]: number }>({});

    const booksPerPage = 20;

    useEffect(() => {
        const INITIAL_QUERY = "A";
        setSearchTerm(INITIAL_QUERY);
        searchBooks(0, INITIAL_QUERY).then();
    }, []);

    const handleSearch = () => {
        setCurrentPage(0);
        searchBooks(0).then();
        setSearchTerm(query);
    };

    const searchBooks = async (page = 0, customQuery?: string) => {
        const term = customQuery ?? searchTerm;
        if (!term) return;

        const startIndex = page * booksPerPage;
        const apiKey = import.meta.env.VITE_BOOKS_API_KEY;
        const url = `https://www.googleapis.com/books/v1/volumes?q=${term}&maxResults=${booksPerPage}&startIndex=${startIndex}&orderBy=relevance&key=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setBooks(data.items || []);
            const ratings: { [id: string]: number } = {};
            (data.items || []).forEach((item: Book) => {
                ratings[item.id] = Math.floor(Math.random() * 3) + 3;
            });
            setStarRatings(ratings);
            setHasMorePages(data.items && data.items.length === booksPerPage);
        } catch (error) {
            console.error("Error when searching for books:", error);
        }
    };

    return (
        <>
            <Header/>
            <div className="px-6 max-w-7xl mx-auto mt-40 pb-20 text-white">
                <h2 className="text-2xl font-semibold mb-6 text-center">🔍 Search for books on MyBookHub</h2>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-10">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                        placeholder="Ex: Harry Potter, Stephen King, romance..."
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        className="w-full sm:w-96 p-3 bg-[#0d1b39] text-white placeholder-gray-400 border border-blue-500/30 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <Button style="primary" label="Pesquisar" onClick={() => handleSearch()}/>
                </div>

                {books.length > 0 && (
                    <>
                        <h3 className="text-2xl font-semibold mb-6 text-center text-white">📚 Search results</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {books.map((book, index) => (
                                <motion.div
                                    key={book.id}
                                    initial={{opacity: 0, y: 20, scale: 0.95}}
                                    animate={{opacity: 1, y: 0, scale: 1}}
                                    transition={{duration: 0.5, delay: index * 0.05, ease: "easeOut"}}
                                    className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-lg cursor-pointer hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 text-center"
                                >
                                    <a href={"/library/books/" + book.id}>
                                        {book.volumeInfo.imageLinks?.thumbnail && (
                                            <img
                                                src={book.volumeInfo.imageLinks.thumbnail}
                                                alt="Capa do livro"
                                                className="mx-auto mb-4 rounded-xl shadow-md"
                                            />
                                        )}
                                        <h3 className="text-lg font-semibold text-blue-200">{book.volumeInfo.title}</h3>
                                        <p className="text-sm text-gray-300">
                                            {book.volumeInfo.authors?.join(", ") || "Author unknown"}
                                        </p>
                                        <p className="mt-2 text-yellow-400 text-sm">
                                            {"★".repeat(starRatings[book.id] || 4)}{"☆".repeat(5 - (starRatings[book.id] || 4))}
                                        </p>
                                    </a>
                                </motion.div>
                            ))}
                        </div>

                        {books.length > 0 && (
                            <div className="flex justify-between mt-8">
                                <Button
                                    style="secondary"
                                    label="Previous"
                                    state={currentPage === 0 ? "disabled" : "enabled"}
                                    onClick={() => {
                                        const prev = Math.max(0, currentPage - 1);
                                        setCurrentPage(prev);
                                        searchBooks(prev).then();
                                    }}
                                />
                                <Button
                                    style="primary"
                                    label="Next"
                                    state={!hasMorePages ? "disabled": "enabled"}
                                    onClick={() => {
                                        const next = currentPage + 1;
                                        setCurrentPage(next);
                                        searchBooks(next).then();
                                    }}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}
