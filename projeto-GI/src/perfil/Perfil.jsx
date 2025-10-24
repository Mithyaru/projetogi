import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Perfil.css"

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [erro, setErro] = useState(null);
  const [novoNome, setNovoNome] = useState('');
  const navigate = useNavigate();
  const usuarioId = localStorage.getItem('usuarioId');

  useEffect(() => {
    if (!usuarioId) {
        navigate('/login');
        return;
      }
  
      fetch(`http://localhost:4000/getUsuario?id=${usuarioId}`)
        .then(async res => {
          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || 'Erro ao carregar usuário');
          }
          return res.json();
        })
        .then(data => {
          setUsuario(data);
          setNovoNome(data.usuario); // inicializa campo de edição
        })
        .catch(err => setErro(err.message));
  
  }, [navigate, usuarioId]);

  const handleAtualizar = async () => {
    try {
      const res = await fetch('http://localhost:4000/atualizarUsuario', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: usuarioId, usuario: novoNome })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao atualizar');

      setUsuario(prev => ({ ...prev, usuario: novoNome }));
      alert('Nome atualizado com sucesso!');
    } catch (err) {
      setErro(err.message);
    }
  };

  const handleDeletar = async () => {
    if (!window.confirm('Tem certeza que quer deletar sua conta?')) return;

    try {
      const res = await fetch('http://localhost:4000/deletarUsuario', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: usuarioId })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao deletar usuário');

      alert('Usuário deletado com sucesso!');
      localStorage.removeItem('usuarioId'); // remove id ao deletar
      navigate('/cadastro'); // redireciona para cadastro
    } catch (err) {
      setErro(err.message);
    }
  };

  if (erro) return <p style={{ color: 'red' }}>{erro}</p>;
  if (!usuario) return <p>Carregando...</p>;

  return (
    <div className='containerPerfil'>
      <h2 className='titlePerfil'>Perfil do Usuário</h2>
      <div className='dadosPerfil'>
        <p><strong>Nome:</strong> {usuario.usuario}</p>
        <strong>Editar nome de usuário</strong>
          <input 
            type="text" 
            value={novoNome} 
            onChange={(e) => setNovoNome(e.target.value)} 
          />
          <button onClick={handleAtualizar}>Atualizar</button>
        <button style={{ marginTop: '20px', color: 'red' }} onClick={handleDeletar}>
          Deletar Usuário
        </button>
      </div>
    </div>
  );
}

export default Perfil;
