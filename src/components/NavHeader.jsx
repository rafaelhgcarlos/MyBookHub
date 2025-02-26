function NavHeader() {
    return (
        <>
            <div className={"text-[20px] list-none text-white md:bg-[#26415E] md:pb-[5px] md:pt-[5px] md:pl-[25px] lg:pl-[80px] md:pr-[25px] lg:pr-[80px] md:rounded-[10px]"}>
                <ul className={"md:flex md:gap-[40px]"}>
                    <li><a href={""}><i className={"uil uil-home flex gap-[5px] items-center mt-[10px] md:m-0 hover:text-[#03122F] transition duration-500"}>Home</i></a></li>
                    <li><a href={""}><i className={"uil uil-book flex gap-[5px] items-center mt-[10px] md:m-0 hover:text-[#03122F] transition duration-500"}>Library</i></a></li>
                    <li><a href={""}><i className={"uil uil-question-circle flex gap-[5px] items-center mt-[10px] md:m-0 hover:text-[#03122F] transition duration-500"}>About</i></a></li>
                </ul>
            </div>
        </>
    )
}

export default NavHeader
