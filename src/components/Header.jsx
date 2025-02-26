import NavHeader from "./NavHeader.jsx"
import AuthLink from "./AuthLink.jsx"
import Logo from "./Logo.jsx";
import NavResposive from "./NavResponsive.jsx";

function Header() {

    return(
        <>
            <header className={"container max-w-7xl mx-auto px-4 pt-4 md:px-4 lg:px-0"}>
                    <NavResposive/>
                <div className={"hidden md:w-full md:flex md:items-center md:justify-between"}>
                    <Logo/>
                    <NavHeader/>
                    <AuthLink/>
                </div>
            </header>
        </>
    )
}

export default Header
