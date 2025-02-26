import Logo from "./Logo.jsx";
import ButtonResponsive from "./ButtonResponsive.jsx";
import AuthLink from "./AuthLink.jsx";
import NavHeader from "./NavHeader.jsx";
import {useState, useRef, useEffect} from "react";

function NavResposive() {

    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef(null);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }

    // Fechar o menu se o usuário clicar fora da navegação
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target) && !event.target.closest('.menu-responsive')) {
                setIsOpen(false);
            }
        };

        // Adicionar o evento de clique
        document.addEventListener("click", handleClickOutside);

        // Limpar o evento quando o componente for desmontado
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);


    return (
        <>
            <div className={"menu-responsive"}>
                <Logo/>
                <ButtonResponsive onClick={toggleNavbar}/>
            </div>
            <div className={`nav-responsive ${isOpen ? 'open' : ''}`} ref={navRef}>
                <AuthLink />
                <hr className={"mt-[10px] border-[0.1rem] border-solid border-[#182f46]"}/>
                <NavHeader />
            </div>
        </>
    )
}

export default NavResposive
