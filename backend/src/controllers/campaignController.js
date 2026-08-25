const { Campaign, User, Donation } = require('../models');
const asyncHandler = require('../utils/asyncHandler');

exports.listar = asyncHandler(async (req, res) => {
  const { areaCientifica } = req.query;
  const where = { status: 'ativa' };
  if (areaCientifica) where.areaCientifica = areaCientifica;

  const campanhas = await Campaign.findAll({
    where,
    include: [{ model: User, as: 'autor', attributes: ['id', 'nome', 'instituicao'] }],
    order: [['createdAt', 'DESC']],
  });
  res.json(campanhas);
});

exports.obterPorId = asyncHandler(async (req, res) => {
  const campanha = await Campaign.findByPk(req.params.id, {
    include: [
      { model: User, as: 'autor', attributes: ['id', 'nome', 'instituicao'] },
      { model: Donation, as: 'doacoes', include: [{ model: User, as: 'apoiador', attributes: ['nome'] }] },
    ],
  });
  if (!campanha) return res.status(404).json({ erro: true, mensagem: 'Campanha não encontrada' });
  res.json(campanha);
});

exports.criar = asyncHandler(async (req, res) => {
  const { titulo, descricao, areaCientifica, metaFinanceira, imagemCapaUrl, prazoFinal } = req.body;
  if (!titulo || !descricao || !metaFinanceira) {
    return res.status(400).json({ erro: true, mensagem: 'Campos obrigatórios ausentes' });
  }
  const campanha = await Campaign.create({
    titulo,
    descricao,
    areaCientifica,
    metaFinanceira,
    imagemCapaUrl,
    prazoFinal,
    autorId: req.usuario.id,
    status: 'em_analise', // entra em análise antes de ficar visível na vitrine
  });
  res.status(201).json(campanha);
});

exports.minhasCampanhas = asyncHandler(async (req, res) => {
  const campanhas = await Campaign.findAll({ where: { autorId: req.usuario.id }, order: [['createdAt', 'DESC']] });
  res.json(campanhas);
});

exports.moderar = asyncHandler(async (req, res) => {
  const { status } = req.body; // ativa | encerrada
  const campanha = await Campaign.findByPk(req.params.id);
  if (!campanha) return res.status(404).json({ erro: true, mensagem: 'Campanha não encontrada' });
  campanha.status = status;
  await campanha.save();
  res.json(campanha);
});
