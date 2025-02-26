function ButtonResponsive({onClick}) {
    return (
        <>
            <div>
                <button id="menu" onClick={onClick}>
                    <i className="uil uil-bars cursor-pointer text-[40px]"></i>
                </button>
            </div>
        </>
    )
}

export default ButtonResponsive
