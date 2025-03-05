function Pagination({currentPage, totalPages, changePage}) {
    return (
        <div className="mt-4 flex justify-center items-center space-x-4">
            <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-md ${currentPage === 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white'}`}
            >
                Anterior
            </button>

            <span className="text-lg font-semibold">
                Página {currentPage} de {totalPages}
            </span>

            <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md ${currentPage === totalPages
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white'}`}
            >
                Próxima
            </button>
        </div>
    );
}

export default Pagination;
