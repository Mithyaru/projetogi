const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT || 4000

const app = express()
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}))
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/projetogi')

const UsuarioSchema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true },
  senha: { type: String, required: true }
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

app.get('/', (req, res) => {
  res.send('API funcionando!')
})

app.post('/registrar', async (req, res) => {
  const { usuario, senha } = req.body

  try {
    const existingUser = await Usuario.findOne({ usuario });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const novoUsuario = new Usuario({ usuario, senha });
    await novoUsuario.save();

    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }

})

app.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const existingUser = await Usuario.findOne({ usuario });
    if (!existingUser) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    if (existingUser.senha !== senha) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    res.status(200).json({ message: 'Login bem-sucedido!', id: existingUser._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
});


app.get('/getUsuario', async (req, res) => {
  const { id } = req.query;

  if (!id) return res.status(400).json({ message: 'ID do usuário não fornecido' });

  try {
    const existingUser = await Usuario.findById(id);

    if (!existingUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({
      _id: existingUser._id,
      usuario: existingUser.usuario
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar usuário' });
  }
})

app.put('/atualizarUsuario', async (req, res) => {
  const { id, usuario } = req.body;

  if (!id || !usuario) return res.status(400).json({ message: 'ID ou nome não fornecido' });

  try {
    await Usuario.findByIdAndUpdate(id, { usuario });
    res.json({ message: 'Nome atualizado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }

});

app.delete('/deletarUsuario', async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: 'ID do usuário não fornecido' });

  try {
    await Usuario.findByIdAndDelete(id);
    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao deletar usuário' });
  }
})

app.listen(port, () => console.log('server is running on ' + port))


