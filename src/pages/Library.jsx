import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useState, useEffect } from "react";
import { db, useAuth } from "../assets/js/firebase.js";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import ModalAddBook from "../components/ModalAddBook.jsx";
import ModalEditBook from "../components/ModalEditBook.jsx";
import ModalConfirmDelete from "../components/ModalConfirmDelete.jsx";
import BookCard from "../components/BookCard.jsx";
import Pagination from "../components/Pagination.jsx";

function Library() {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editBookId, setEditBookId] = useState(null);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const booksPerPage = 12;

    const user = useAuth();

    const fetchBooks = async () => {
        if (user) {
            setLoading(true);
            const booksCollection = collection(db, "users", user.uid, "books");
            const booksSnapshot = await getDocs(booksCollection);
            const booksList = booksSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setBooks(booksList);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchBooks();
        } else {
            setLoading(false);
        }
    }, [user]);

    const handleAddBook = async () => {
        if (!title || !description) {
            setError('Tanto o título quanto a descrição são obrigatórios!');
            return;
        }

        try {
            if (user) {
                const docRef = await addDoc(collection(db, "users", user.uid, "books"), {
                    title,
                    description
                });

                setBooks([...books, { id: docRef.id, title, description }]);
                setTitle('');
                setDescription('');
                setIsModalOpen(false);
                setError('');
            }
        } catch (e) {
            console.error("Erro ao adicionar livro: ", e);
        }
    };

    const handleDeleteBook = async (bookId) => {
        try {
            await deleteDoc(doc(db, "users", user.uid, "books", bookId));
            setBooks(books.filter(book => book.id !== bookId));
            setIsConfirmDeleteOpen(false);
        } catch (e) {
            console.error("Erro ao excluir livro: ", e);
        }
    };

    const handleEditBook = async () => {
        if (!title || !description) {
            setError('Tanto o título quanto a descrição são obrigatórios!');
            return;
        }

        try {
            const bookRef = doc(db, "users", user.uid, "books", editBookId);
            await updateDoc(bookRef, {
                title,
                description
            });

            setBooks(books.map(book => book.id === editBookId ? { ...book, title, description } : book));
            setTitle('');
            setDescription('');
            setIsEditModalOpen(false);
            setEditBookId(null);
            setError('');
        } catch (e) {
            console.error("Erro ao editar livro: ", e);
        }
    };

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(books.length / booksPerPage);

    const currentBooks = books.slice(
        (currentPage - 1) * booksPerPage,
        currentPage * booksPerPage
    );

    return (
        <>
            <Header />
            <div className="min-h-screen container max-w-7xl mx-auto p-4 lg:p-0 mt-30">
                <h1 className="text-2xl font-bold mb-10 text-center">Biblioteca de livros</h1>
                {user ? (
                    <>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-500 text-white p-2 rounded-md"
                        >
                            Adicione um livro
                        </button>
                    </>
                ) : (
                    <p className="text-lg text-red-500 mt-4 text-center">
                        Por favor, faça <Link to={"/login"} className={"text-blue-500"}>Login</Link> para adicionar livros.
                    </p>
                )}

                {/* Modais */}
                <ModalAddBook
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    handleAddBook={handleAddBook}
                    error={error}
                />

                <ModalEditBook
                    isOpen={isEditModalOpen}
                    setIsOpen={setIsEditModalOpen}
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    handleEditBook={handleEditBook}
                    error={error}
                />

                <ModalConfirmDelete
                    isOpen={isConfirmDeleteOpen}
                    setIsOpen={setIsConfirmDeleteOpen}
                    handleDeleteBook={handleDeleteBook}
                    bookToDelete={bookToDelete}
                />

                {/* Exibir livros */}
                <div className="container max-w-7xl mx-auto grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-20">
                    {loading ? (
                        <div>Carregando livros...</div>
                    ) : (
                        currentBooks.map((book) => (
                            <BookCard
                                key={book.id}
                                book={book}
                                setEditBookId={setEditBookId}
                                setTitle={setTitle}
                                setDescription={setDescription}
                                setIsEditModalOpen={setIsEditModalOpen}
                                setBookToDelete={setBookToDelete}
                                setIsConfirmDeleteOpen={setIsConfirmDeleteOpen}
                            />
                        ))
                    )}
                </div>

                {/* Paginação */}
                {books.length > booksPerPage && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        changePage={changePage}
                    />
                )}
            </div>
            <Footer />
        </>
    );
}

export default Library;
