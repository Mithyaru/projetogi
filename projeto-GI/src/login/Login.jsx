import { useState } from "react"
import "./Login.css"
import { useNavigate } from "react-router-dom"


function Login() {

    const [usuario, setUsuario] = useState("")
    const [senha, setSenha] = useState("")
    const [mensagem,setMensagem] = useState("")
    const navigate = useNavigate()

    const aoEnviar = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, senha }),
          });
    
          const data = await response.json();
          console.log(data.message)
          setMensagem(data.message)
    
          if (response.ok) {
            console.log("Login bem-sucedido!");
            navigate("/timer"); // 👈 redireciona para o Timer
          } else {
            setErro(data.message || "Falha no login");
          }
        } catch (err) {
          console.error("Erro ao fazer login:", err);
          setErro("Erro de conexão com o servidor");
        }
      };
    


    return (
        <>
            <div className='containerLogin'>
                <h2 className='titleLogin'>Login</h2>
                <form onSubmit={aoEnviar} className='formLogin'>
                    <input
                        type="text"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        placeholder="Usuario"
                        className='loginInput'
                    />
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Senha"
                        className='loginInput'
                    />
                    <button type="submit" className='buttonLogin'>
                        enviar
                    </button>
                </form>
                {mensagem && <p>{mensagem}</p>}
            </div>
        </>
    )
}

export default Login