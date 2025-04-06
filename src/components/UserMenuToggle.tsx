import angleDown from '../assets/images/angle-down.png'

interface UserMenuToggleProps {
    toggleUserMenu: () => void
    mockedUserName: string
    userMenuOpen: boolean
}

function UserMenuToggle({
                            toggleUserMenu,
                            mockedUserName,
                            userMenuOpen,
                        }: UserMenuToggleProps) {
    return (
        <>
            <button
                onClick={toggleUserMenu}
                className="cursor-pointer flex items-center gap-2"
            >
                <span className="sr-only">Open user menu</span>
                {mockedUserName}{' '}
                <img
                    src={angleDown}
                    alt="User menu arrow button"
                    className={`size-4 text-white transition-transform transform duration-300 ${userMenuOpen ? 'rotate-180' : 'rotate-0'}`}
                />
            </button>
        </>
    )
}

export default UserMenuToggle
