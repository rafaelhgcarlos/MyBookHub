import {useEffect, useState} from "react"
import logoIMG from '../assets/images/logo.png'
import NavMenu from "./NavMenu.tsx";
import Button from "./Button.tsx";
import UserMenu from "./UserMenu.tsx";
import UserMenuToggle from "./UserMenuToggle.tsx";
import NavMenuMobile from "./NavMenuMobile.tsx";

interface NavMenuProps {
    user: boolean;
}

export default function Header({user}: NavMenuProps) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const [mockUser, setMockUser] = useState(false)

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

    function toggleMockedUser() {
        setMockUser(!mockUser)
    }

    function handleResize() {
        if (window.innerWidth > 768) {
            setIsMenuOpen(false)
        }
    }

    function handleLogout() {
        setMockUser(false);
        setUserMenuOpen(false);
        console.log("User logged out");
        // Debugging
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
                        <NavMenu/>
                    </div>
                    <div className="hidden md:flex items-center justify-end gap-4">
                        {user ? (
                            <div>
                                <UserMenuToggle
                                    toggleUserMenu={toggleUserMenu}
                                    mockedUserName={'Rafael Gonzaga'}
                                    userMenuOpen={userMenuOpen}
                                />

                                <UserMenu
                                    userMenuOpen={userMenuOpen}
                                    onLogout={handleLogout}
                                />
                            </div>
                        ) : (
                            <>
                                <Button
                                    style={'secondary'}
                                    label={'Sign in'}
                                    onClick={toggleMockedUser}
                                />
                                <Button
                                    style={'primary'}
                                    label={'Sign up'}
                                    onClick={toggleMockedUser}
                                />
                            </>
                        )}
                    </div>
                </div>
                <NavMenuMobile
                    user={mockUser}
                    toggleUserMenu={toggleUserMenu}
                    isMenuOpen={isMenuOpen}
                    userMenuOpen={userMenuOpen}
                    toggleMockedUser={toggleMockedUser}
                />
            </div>
        </header>
    )
}
