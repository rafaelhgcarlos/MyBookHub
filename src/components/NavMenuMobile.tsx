import NavLinks from './NavLinks.tsx'
import UserMenuToggle from './UserMenuToggle.tsx'
import Button from './Button.tsx'
import UserMenu from './UserMenu.tsx'

interface NavMenuProps {
    user: boolean
    isMenuOpen: boolean
    userMenuOpen: boolean
    toggleUserMenu: () => void
    toggleMockedUser: () => void
}

function NavMenuMobile({
                           user,
                           isMenuOpen,
                           userMenuOpen,
                           toggleUserMenu,
                           toggleMockedUser,
                       }: NavMenuProps) {
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
                        <div className="mx-auto text-lg">
                            <UserMenuToggle
                                toggleUserMenu={toggleUserMenu}
                                mockedUserName={'Rafael Gonzaga'}
                                userMenuOpen={userMenuOpen}
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
                <UserMenu
                    userMenuOpen={userMenuOpen}
                    onLogout={toggleMockedUser}
                />
            </nav>
        </>
    )
}

export default NavMenuMobile