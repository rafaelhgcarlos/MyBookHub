import {useEffect, useState} from "react"
import logoIMG from '../assets/images/logo.png'
import NavMenu from "./NavMenu.tsx";
import Button from "./Button/Button.tsx";
import UserMenu from "./UserMenu.tsx";
import UserMenuToggle from "./UserMenuToggle.tsx";
import NavMenuMobile from "./NavMenuMobile.tsx";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../assets/js/firebase.ts";

export default function Header() {

    const {user, handleLogout} = useAuth();
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    function handleScroll() {
        setIsScrolled(window.scrollY > 50)
    }

    function toggleUserMenu() {
        setUserMenuOpen(!userMenuOpen)
        console.log('userMenuOpen:', !userMenuOpen) // Debugging
    }

    function handleResize() {
        if (window.innerWidth > 768) {
            setIsMenuOpen(false)
        }
    }


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleResize)
        };
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-10 transition-all duration-300 ${isMenuOpen || isScrolled ? 'rounded-b-xl shadow-sm shadow-slate-800 bg-slate-950' : null}`}
        >
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-4 gap-12">
                    <a href="/"
                       className={`flex gap-4 logo-font text-2xl lg:text-3xl font-black italic items-center ${isMenuOpen || isScrolled ? '' : ''}`}>
                        <img className={"hidden lg:block"} src={logoIMG} alt={'logo'}/> MyBookHub
                    </a>
                    <div className="flex items-center md:hidden">
                        <button
                            type="button"
                            onClick={toggleMenu}
                            className="flex text-4xl cursor-pointer transition-all hover:text-blue-500"
                        >
                            {isMenuOpen ? (
                                <i className="uil uil-times"></i>
                            ) : (
                                <i className="uil uil-bars"></i>
                            )}
                        </button>
                    </div>
                    <div className="hidden md:flex">
                        <NavMenu user={user}/>
                    </div>
                    <div className="hidden md:flex items-center justify-end text-xl">
                        {user ? (
                            <div>
                                <UserMenuToggle
                                    toggleUserMenu={toggleUserMenu}
                                    mockedUserName={user?.displayName || "Usuário"}
                                    userMenuOpen={userMenuOpen}
                                />

                                <UserMenu
                                    user={user}
                                    userMenuOpen={userMenuOpen}
                                    onLogout={handleLogout}
                                />
                            </div>
                        ) : (
                            <div className={'flex items-center justify-end gap-4 sm:text-sm lg:text-lg'}>
                                <Button
                                    style={'secondary'}
                                    label={'Sign in'}
                                    onClick={() => navigate("/login")}
                                />
                                <Button
                                    style={'primary'}
                                    label={'Sign up'}
                                    onClick={() => navigate("/register")}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <NavMenuMobile
                    user={user}
                    toggleUserMenu={toggleUserMenu}
                    isMenuOpen={isMenuOpen}
                    userMenuOpen={userMenuOpen}
                />
            </div>
        </header>
    )
}
