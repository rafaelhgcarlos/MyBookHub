import imgHero from '../assets/images/img-hero.svg'

function Hero() {
    return (
        <>

            <section className={"w-[100%] flex justify-center items-center flex-col min-h-[100vh]"}>
                <div className={"flex max-w-[1280px] justify-between items-center gap-[20px]"}>
                    <div className={"flex flex-col justify-start m-0"}>
                        <div className={"italic text-[44px] text-center text-blue-500 sm: m-0 max-w-[644px]"}>
                            <h1 className={"mb-[40px]"}>Organize sua Leitura com Facilidade</h1>
                        </div>
                        <div className={"mt-[80px] text-center text-[1.5vh] text-blue-300 sm:ml-[5px] sm:text-[18px]"}>
                            <p className={"mb-[120px] max-w-[644px]"}>Crie, gerencie e acompanhe o progresso dos seus
                                livros com nosso backlog personalizado.
                                Perfeito para leitores ávidos que querem manter suas leituras organizadas e nunca
                                mais&nbsp;perder o
                                fio
                                da
                                história. Simples, intuitivo&nbsp;e&nbsp;feito&nbsp;para&nbsp;você.</p>
                            <button
                                className={"pt-[10px] pr-[15px] pb-[10px] pl-[20px] rounded-[10px] bg-blue-600 text-white text-[18px] text-center hover:bg-[#0b83fa] transition duration-500"}>Get
                                Started<i className="uil uil-arrow-circle-right ml-[5px] text-[18px]"></i>
                            </button>
                        </div>
                    </div>
                    <div className={"hidden md:w-[50%] lg:block"}>
                        <img className={"w-[100%]"} alt={"Img Hero"} src={imgHero}/>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero