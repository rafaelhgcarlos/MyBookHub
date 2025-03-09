function ModalConfirmDelete({isOpen, setIsOpen, handleDeleteBook, bookToDelete}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-blue-950/98 flex justify-center items-center">
            <div className="bg-blue-50/15 p-6 rounded-xl shadow-lg max-w-lg w-full">
                <h2 className="text-xl font-bold mb-4">Confirmação de Exclusão</h2>
                <p className="mb-4">Tem certeza de que deseja excluir este livro?</p>
                <div className="flex justify-between">
                    <button
                        onClick={() => handleDeleteBook(bookToDelete)}
                        className="cursor-pointer bg-red-500 text-white p-2 rounded-md"
                    >
                        Excluir
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="cursor-pointer bg-gray-500 text-white p-2 rounded-md"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirmDelete;
