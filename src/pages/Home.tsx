import Header from "../components/Header.tsx";
import {DotLottieReact} from '@lottiefiles/dotlottie-react';
import Button from "../components/Button/Button.tsx";
import {useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    return (
        <>
            <Header/>
            <div className="flex flex-col items-center px-6 pt-16 pb-32 lg:px-8 text-white">

                <div className="animate__animated animate__fadeInDown flex justify-center lg:h-100 mt-15 mb-5">
                    <DotLottieReact
                        src="https://lottie.host/11b0c6e9-6a4a-4910-b3d9-324b2714c118/sJJnoLI6wF.lottie"
                        loop
                        autoplay
                    />
                </div>

                <div className="mx-auto max-w-4xl text-center animate__animated animate__fadeInUp">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                        Welcome to <span className="text-blue-400">MyBookHub</span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-300">
                        Organize, discover and track your reading with a simple and intelligent experience. Your
                        personal book hub, your way.
                    </p>
                    <div className="mt-10 flex items-center flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            style={'primary'}
                            label={'Get started'}
                            onClick={() => navigate("/login")}

                        />
                        <a
                            href="#"
                            className="text-sm font-semibold text-blue-400 hover:underline underline-offset-4"
                        >
                            Read more →
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
