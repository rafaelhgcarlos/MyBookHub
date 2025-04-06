import {Link, useNavigate} from "react-router-dom";
import {authRegister} from "../assets/js/firebase.js";
import {useState} from "react";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState("");

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!displayName || !email || !password || !confirmPassword) {
            setError("Todos os campos são obrigatórios.");
            return;
        }

        if (password !== confirmPassword) {
            setError("As senhas não coincidem!");
            return;
        }

        if (password.length < 6) {
            setError("A senha deve ter no mínimo 6 caracteres.");
            return;
        }

        if (!emailRegex.test(email)) {
            setError("Por favor, insira um email válido.");
            return;
        }

        authRegister(email, password, displayName)
            .then(() => {
                navigate("/");
            }).catch((error) => {
            if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                setError("Email já cadastrado.");
            } else {
                setError(error.message);
            }
        });
    };

    return (
        <>
            <div className={"min-h-screen mt-10 container max-w-96 mx-auto px-5"}>
                <div className={"flex items-center w-full"}>
                    <Link to={"/"} className={""}>← Início</Link>
                </div>
                <div className={"w-[100%] flex flex-col items-center mt-40 "}>
                    <h1 className={"w-[100%] text-2xl font-bold italic"}>MyBookHub</h1>
                    <h3 className={"w-[100%] mt-1 "}>Registre sua conta</h3>
                </div>
                <form onSubmit={handleSubmit}
                      className={"w-full flex flex-col gap-5 justify-center items-center mt-20 "}>
                    <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} required placeholder={"Nome de usuário"}
                           className={"w-full bg-blue-200/10 px-2 py-2 rounded-[5px]"}/>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} required placeholder={"Email"}
                           type={"email"} className={"w-full bg-blue-200/10 px-2 py-2 rounded-[5px]"}/>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} required placeholder={"Senha"}
                           type={"password"} className={"w-full bg-blue-200/10 px-2 py-2 rounded-[5px]"}/>
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                           placeholder={"Confirme a sua senha"} type={"password"}
                           className={"w-full bg-blue-200/10 px-2 py-2 rounded-[5px]"}/>
                    {error && <p className="text-red-500 mt-5">{error}</p>}
                    <button type={"submit"}
                            className={"w-full mt-10 bg-blue-700 px-2 py-2 rounded-[5px] text-white cursor-pointer"}>Registrar
                    </button>
                </form>
            </div>
        </>
    );
}

export default Register;
