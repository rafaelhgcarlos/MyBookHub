import NavLinks from './NavLinks.tsx'
import Button from "./Button.tsx";
import { User } from "firebase/auth";


interface UserMenuProps {
    user: User | null;
    userMenuOpen: boolean
    onLogout: () => void
}

export default function UserMenu({ user, userMenuOpen, onLogout}: UserMenuProps) {
    if (!user) return null;

    return (
        <div
            className={`transition-all duration-300 ${userMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 hidden'} md:absolute md:bg-slate-900 md:border md:border-slate-800 md:rounded-xl md:shadow-md md:shadow-slate-800 lg:mt-2 lg:px-2`}
        >
            <ul className="text-xl space-y-3 px-2 py-4 sm:text-lg">
                <NavLinks
                    links={[
                        {
                            label: 'My Profile',
                            href: '/profile',
                            icon: 'uil-user'},
                        {
                            label: 'My Backlog',
                            href: '/backlog',
                            icon: 'uil-clipboard-notes',
                        },
                        {
                            label: 'My Requests',
                            href: '/requests',
                            icon: 'uil-postcard'
                        },
                    ]}
                />
                {onLogout && (
                        <div className={"mt-10 flex items-center justify-center"}>
                            <Button style="secondary" label="Logout" onClick={onLogout} />
                        </div>
                    )

                }
            </ul>
        </div>
    )
}
