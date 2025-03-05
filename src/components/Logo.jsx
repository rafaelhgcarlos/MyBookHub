import logo from '../assets/images/logo.png'

function Logo(){
    return (
        <>
            <a className={"flex items-center gap-[10px] text-[larger]"} href={logo}>
                <img className="w-[40px] h-[40px]" src="/src/assets/images/logo.png" alt="Logo"/>
                <span>MyBookHub</span>
            </a>
        </>
    )
}

export default Logo
