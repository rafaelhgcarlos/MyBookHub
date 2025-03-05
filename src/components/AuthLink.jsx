import {Link} from 'react-router-dom';
import {useEffect, useState} from "react";
import {auth, logout} from "../assets/js/firebase.js";
import {onAuthStateChanged} from "firebase/auth";

function AuthLink() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        logout()
            .then(() => {
                console.log("Usuario deslogado");
                setUser(null)
            })
            .catch((error) => {
                console.log("Erro ao deslogar:", error);
            })
    }

    return (
        <>
            <div className={"flex flex-col gap-[20px] md:flex-row md:gap-[10px]"}>
                {user ? (
                    <button onClick={handleLogout}
                            className={"text-center cursor-pointer p-[10px] border-none rounded-[10px] text-[1em] text-white hover:bg-red-500 transition duration-500 md:w-[90px]"}>
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login"
                              className={"text-center cursor-pointer p-[10px] border-none rounded-[10px] text-[1em] hover:bg-[#b6b6b6] hover:text-black transition duration-500 md:w-[90px] md:hover:bg-[#26415E] md:hover:text-white"}>Login</Link>
                        <Link to="/register"
                              className={"text-center cursor-pointer p-[10px] border-none rounded-[10px] text-[1em] hover:bg-[#b6b6b6] hover:text-black transition duration-500 md:w-[90px] md:hover:bg-[#26415E] md:hover:text-white"}>Register</Link>
                    </>
                )}
            </div>
        </>
    );
}

export default AuthLink;
