import {Link, useNavigate} from "react-router-dom";
import {SetStateAction, useState} from "react";
import {login} from "../assets/js/firebase.ts"

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Email e senha são obrigatórios.");
            return;
        }

        login(email, password)
            .then(() => {
                navigate("/");
            })
            .catch((error: { code: string; message: SetStateAction<string>; }) => {
                if (error.code === 'auth/wrong-password') {
                    setError("Senha incorreta. Tente novamente.");  // Atualiza o estado com a mensagem
                } else if (error.code === 'auth/user-not-found') {
                    setError("Usuário não encontrado.");
                } else if (error.code === 'auth/invalid-credential') {
                    setError("Credenciais inválidas. Verifique o email e a senha.");
                } else if (error.code === 'auth/too-many-requests') {
                    setError("Muitas tentativas falhas. Por favor, tente novamente mais tarde.");
                } else {
                    setError(error.message);
                }
            });
    }

    return (
        <>
            <div className={"min-h-screen mt-10 container max-w-96 mx-auto px-5"}>
                <div className={"flex items-center w-full"}>
                    <Link to={"/"} className={""}>← Início</Link>
                </div>
                <div className={"w-[100%] flex flex-col items-center mt-40 "}>
                    <h1 className={"w-[100%] text-2xl font-bold italic"}>MyBookHub</h1>
                    <h3 className={"w-[100%] mt-1 "}>Entre em sua conta</h3>
                </div>
                <form onSubmit={handleSubmit}
                      className={"w-full flex flex-col gap-5 justify-center items-center mt-15 "}>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} required placeholder={"Email"}
                           type={"email"} className={"w-full bg-blue-200/10 px-2 py-2 rounded-[5px]"}/>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} required placeholder={"Senha"}
                           type={"password"} className={"w-full bg-blue-200/10 px-2 py-2 rounded-[5px]"}/>
                    <Link to="/newPassword" className={"text-start w-full text-blue-800"}>Esqueci minha senha</Link>
                    {error && <p className="text-red-500 mt-5 text-[13px] text-center">{error}</p>}
                    <button type={"submit"}
                            className={"w-full mt-10 bg-blue-700 px-2 py-2 rounded-[5px] text-white cursor-pointer"}>Logar
                    </button>
                    <span className={"flex"}>Não tem uma conta?<Link to="/register" className={"ml-1 text-blue-800"}>Registro</Link> </span>
                </form>
            </div>
        </>

    );
}

export default Login;
