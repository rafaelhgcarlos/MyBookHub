function BookCard({
                      book,
                      setEditBookId,
                      setTitle,
                      setDescription,
                      setIsEditModalOpen,
                      setBookToDelete,
                      setIsConfirmDeleteOpen
                  }) {
    return (
        <div className="bg-blue-950/95 rounded-2xl shadow-lg p-4">
            <h2 className="text-xl font-semibold h-auto truncate">{book.title}</h2>
            <p className="text-gray-500 mt-2 h-auto truncate">{book.description}</p>
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => {
                        setEditBookId(book.id);
                        setTitle(book.title);
                        setDescription(book.description);
                        setIsEditModalOpen(true);
                    }}
                    className="bg-blue-600 text-white p-1.5 rounded-md"
                >
                    Editar
                </button>
                <button
                    onClick={() => {
                        setBookToDelete(book.id);
                        setIsConfirmDeleteOpen(true);
                    }}
                    className="bg-red-500 text-white p-1.5 rounded-md"
                >
                    Excluir
                </button>
            </div>
        </div>
    );
}

export default BookCard;
