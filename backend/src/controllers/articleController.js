const { Article, User } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

// Lista publicações públicas (com filtro opcional por tipo: noticia_escolar, poema, etc.)
exports.listar = asyncHandler(async (req, res) => {
  const { tipo, busca } = req.query;
  const where = { status: 'publicado' };
  if (tipo) where.tipo = tipo;

  const artigos = await Article.findAll({
    where,
    include: [{ model: User, as: 'autor', attributes: ['id', 'nome', 'tipo', 'instituicao'] }],
    order: [['createdAt', 'DESC']],
  });

  const filtrados = busca
    ? artigos.filter((a) => a.titulo.toLowerCase().includes(busca.toLowerCase()))
    : artigos;

  res.json(filtrados);
});

exports.obterPorId = asyncHandler(async (req, res) => {
  const artigo = await Article.findByPk(req.params.id, {
    include: [{ model: User, as: 'autor', attributes: ['id', 'nome', 'tipo', 'instituicao'] }],
  });
  if (!artigo) return res.status(404).json({ erro: true, mensagem: 'Publicação não encontrada' });
  artigo.visualizacoes += 1;
  await artigo.save();
  res.json(artigo);
});

exports.criar = asyncHandler(async (req, res) => {
  const { titulo, resumo, conteudo, tipo, imagemCapaUrl } = req.body;
  if (!titulo || !resumo || !conteudo || !tipo) {
    return res.status(400).json({ erro: true, mensagem: 'Campos obrigatórios ausentes' });
  }
  const artigo = await Article.create({
    titulo,
    resumo,
    conteudo,
    tipo,
    imagemCapaUrl,
    autorId: req.usuario.id,
    // professores publicam direto; demais perfis entram em revisão (moderação leve)
    status: req.usuario.tipo === 'professor_moderador' ? 'publicado' : 'em_revisao',
  });
  res.status(201).json(artigo);
});

exports.meusArtigos = asyncHandler(async (req, res) => {
  const artigos = await Article.findAll({ where: { autorId: req.usuario.id }, order: [['createdAt', 'DESC']] });
  res.json(artigos);
});

// Moderação: só professor_moderador pode aprovar/recusar publicações
exports.moderar = asyncHandler(async (req, res) => {
  const { status } = req.body; // publicado | recusado
  const artigo = await Article.findByPk(req.params.id);
  if (!artigo) return res.status(404).json({ erro: true, mensagem: 'Publicação não encontrada' });
  artigo.status = status;
  await artigo.save();
  res.json(artigo);
});
