import { Link } from 'react-router-dom';

function AuthLink() {
    return (
        <>
            <div className={"flex flex-col gap-[20px] md:flex-row md:gap-[10px]"}>
                <Link to="/login" className={"text-center cursor-pointer p-[10px] border-none rounded-[10px] text-[1em] hover:bg-[#b6b6b6] hover:text-black transition duration-500 md:w-[90px] md:hover:bg-[#26415E] md:hover:text-white"}>Login</Link>
                <Link to="/register" className={"text-center cursor-pointer p-[10px] border-none rounded-[10px] text-[1em] hover:bg-[#b6b6b6] hover:text-black transition duration-500 md:w-[90px] md:hover:bg-[#26415E] md:hover:text-white"}>Register</Link>
            </div>
        </>
    );
}

export default AuthLink;
