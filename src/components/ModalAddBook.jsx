function ModalAddBook({isOpen, setIsOpen, title, setTitle, description, setDescription, handleAddBook, error}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-blue-950/98 flex justify-center items-center">
            <div className="bg-blue-50/15 p-6 rounded-xl shadow-lg max-w-lg w-full">
                <h2 className="text-xl font-bold mb-4">Adicione um livro</h2>

                {error && <p className="text-red-500 mb-2">{error}</p>}

                <input
                    type="text"
                    placeholder="Titulo"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 rounded-md w-full mb-2"
                />
                <textarea
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 rounded-md w-full mb-2"
                />
                <div className="flex justify-between">
                    <button
                        onClick={handleAddBook}
                        className="cursor-pointer bg-green-500 text-white p-2 rounded-md"
                    >
                        Adicionar
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="cursor-pointer bg-red-500 text-white p-2 rounded-md"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalAddBook;
