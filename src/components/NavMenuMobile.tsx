import NavLinks from './NavLinks.tsx'
import UserMenuToggle from './UserMenuToggle.tsx'
import Button from './Button.tsx'
import UserMenu from './UserMenu.tsx'
import { User } from "firebase/auth";
import {useAuth} from "../assets/js/firebase.ts";
import {useNavigate} from "react-router-dom";

interface NavMenuProps {
    user: User | null
    isMenuOpen: boolean
    userMenuOpen: boolean
    toggleUserMenu: () => void
}

function NavMenuMobile({
                           isMenuOpen,
                           userMenuOpen,
                           toggleUserMenu,
                       }: NavMenuProps) {
    const navigate = useNavigate();
    const {user, handleLogout} = useAuth();
    return (
        <>
            <nav
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} md:hidden`}
            >
                <hr className="border border-slate-900" />

                <ul className="text-xl space-y-3 px-2 py-4">
                    <NavLinks
                        links={[
                            {label: "Home", href: "/", icon: "uil-home"},
                            {label: "Library", href: "/library", icon: "uil-book"},
                            {label: "About", href: "/about", icon: "uil-question-circle"},
                        ]}
                    />
                </ul>

                <hr className="border border-slate-900" />

                <div className="flex items-center text-center gap-6 py-4">
                    {user ? (
                        <>
                            <div className="mx-auto text-lg">
                                <UserMenuToggle
                                    toggleUserMenu={toggleUserMenu}
                                    mockedUserName={user?.displayName || "Usuário"}
                                    userMenuOpen={userMenuOpen}
                                />
                            </div>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>
                <UserMenu
                    user={user}
                    userMenuOpen={userMenuOpen}
                    onLogout={handleLogout}
                />
            </nav>
        </>
    )
}

export default NavMenuMobile