import { useState } from "react"
import { Link } from "react-router-dom";
import "./Cadastro.css"


function Cadastro() {

    const [usuario, setUsuario] = useState("")
    const [senha, setSenha] = useState("")
    const [mensagem, setMensagem] = useState("")

    const aoEnviar = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch("http://localhost:4000/registrar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario, senha }),
            });

            const data = await response.json();
            console.log(data.message)
            setMensagem(data.message);

            if (response.ok) {
                setUsuario("");
                setSenha("");
            }
        } catch (error) {
            setMensagem("Erro ao conectar com o servidor");
        }
    }


    return (
        <>
            <div className='containerRegister'>
                <h2 className='titleRegister'>Registrar</h2>
                <form onSubmit={aoEnviar} className='formRegister'>
                    <input
                        type="text"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        placeholder="Username"
                        className='inputRegister'
                    />
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Password"
                        className='inputRegister'
                    />
                    <button type="submit" className='buttonRegister'>Registrar</button>
                </form>
                {mensagem && <p>{mensagem}</p>}

                <p className="redirectText">
                    Já tem uma conta? <Link to="/login">Faça login</Link>
                </p>
            </div>
        </>
    )
}

export default Cadastro