const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Campaign = sequelize.define('Campaign', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  titulo: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.TEXT, allowNull: false },
  areaCientifica: { type: DataTypes.STRING, allowNull: true }, // ex: biologia, robótica, sustentabilidade
  metaFinanceira: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  valorArrecadado: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  imagemCapaUrl: { type: DataTypes.STRING, allowNull: true },
  prazoFinal: { type: DataTypes.DATE, allowNull: true },
  status: {
    type: DataTypes.ENUM('em_analise', 'ativa', 'financiada', 'encerrada'),
    defaultValue: 'em_analise',
  },
}, {
  tableName: 'campaigns',
  timestamps: true,
});

module.exports = Campaign;
