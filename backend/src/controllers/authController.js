const jwt = require('jsonwebtoken');
const { User } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

function gerarToken(usuario) {
  return jwt.sign(
    { id: usuario.id, tipo: usuario.tipo, nome: usuario.nome },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

exports.registrar = asyncHandler(async (req, res) => {
  const { nome, email, senha, tipo, instituicao } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: true, mensagem: 'Nome, email e senha são obrigatórios' });
  }
  const existente = await User.findOne({ where: { email } });
  if (existente) {
    return res.status(409).json({ erro: true, mensagem: 'Já existe uma conta com este email' });
  }
  const usuario = await User.create({
    nome,
    email,
    senhaHash: User.hashSenha(senha),
    tipo: tipo || 'estudante',
    instituicao,
  });
  const token = gerarToken(usuario);
  res.status(201).json({
    token,
    usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, tipo: usuario.tipo },
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await User.findOne({ where: { email } });
  if (!usuario || !usuario.verificarSenha(senha)) {
    return res.status(401).json({ erro: true, mensagem: 'Email ou senha inválidos' });
  }
  const token = gerarToken(usuario);
  res.json({
    token,
    usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, tipo: usuario.tipo },
  });
});

exports.perfil = asyncHandler(async (req, res) => {
  const usuario = await User.findByPk(req.usuario.id, {
    attributes: { exclude: ['senhaHash'] },
  });
  res.json(usuario);
});
