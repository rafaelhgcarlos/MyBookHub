import NavLinks from "./NavLinks";

export default function NavMenu() {
    return (
        <>
            <nav
                className={"md:text-xl lg:text-2xl list-none md:rounded-[10px]"}>
                <ul className={"md:flex flex-row md:gap-7"}>
                    <NavLinks links={[
                        {label: "Home", href: "/", icon: "uil-home"},
                        {label: "Library", href: "/library", icon: "uil-book"},
                        {label: "About", href: "/about", icon: "uil-question-circle"},
                    ]}>
                    </NavLinks>
                </ul>
            </nav>
        </>
    )
}
