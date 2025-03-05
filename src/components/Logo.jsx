import logoIMG from '../assets/images/logo.png'

function Logo(){
    return (
        <>
            <a className={"flex items-center gap-[10px] text-[larger]"}>
                <img className="w-[40px] h-[40px]" src={logoIMG} alt="Logo"/>
                <span>MyBookHub</span>
            </a>
        </>
    )
}

export default Logo
