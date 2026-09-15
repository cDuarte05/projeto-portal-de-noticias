const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Article = sequelize.define('Article', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  titulo: { type: DataTypes.STRING, allowNull: false },
  resumo: { type: DataTypes.STRING(300), allowNull: false },
  conteudo: { type: DataTypes.TEXT, allowNull: false },
  tipo: {
    // categorias livres de publicação, conforme a proposta do projeto
    type: DataTypes.ENUM('noticia_escolar', 'noticia_global', 'artigo_cientifico', 'texto', 'poema', 'projeto'),
    allowNull: false,
  },
  imagemCapaUrl: { type: DataTypes.STRING, allowNull: true }, // aponta para objeto no S3/CloudFront em produção
  status: {
    // fluxo editorial simples: rascunho -> em_revisao -> publicado (moderação leve por professores)
    type: DataTypes.ENUM('rascunho', 'em_revisao', 'publicado', 'recusado'),
    defaultValue: 'em_revisao',
  },
  visualizacoes: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  tableName: 'articles',
  timestamps: true,
});

module.exports = Article;
