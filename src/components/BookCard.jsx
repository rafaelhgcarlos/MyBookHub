function BookCard({
                      book,
                      setEditBookId,
                      setTitle,
                      setDescription,
                      setIsEditModalOpen,
                      setBookToDelete,
                      setIsConfirmDeleteOpen,
                      isDimmed, // Recebe o estado de hover
                      onMouseEnter, // Callback para quando o mouse entra
                      onMouseLeave // Callback para quando o mouse sai
                  }) {
    return (
        <div
            className={`bg-blue-950/95 rounded-2xl shadow-lg p-4 mb-5 transition duration-500 
            ${isDimmed ? 'opacity-10' : 'opacity-100'} hover:scale-105`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
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
                    className="cursor-pointer bg-blue-600 text-white p-1.5 rounded-md"
                >
                    Editar
                </button>
                <button
                    onClick={() => {
                        setBookToDelete(book.id);
                        setIsConfirmDeleteOpen(true);
                    }}
                    className="cursor-pointer bg-red-500 text-white p-1.5 rounded-md"
                >
                    Excluir
                </button>
            </div>
        </div>
    );
}

export default BookCard;
