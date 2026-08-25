const sequelize = require('../config/database');
const User = require('./User');
const Article = require('./Article');
const Campaign = require('./Campaign');
const Donation = require('./Donation');

// Associações
User.hasMany(Article, { foreignKey: 'autorId', as: 'artigos' });
Article.belongsTo(User, { foreignKey: 'autorId', as: 'autor' });

User.hasMany(Campaign, { foreignKey: 'autorId', as: 'campanhas' });
Campaign.belongsTo(User, { foreignKey: 'autorId', as: 'autor' });

Campaign.hasMany(Donation, { foreignKey: 'campaignId', as: 'doacoes' });
Donation.belongsTo(Campaign, { foreignKey: 'campaignId', as: 'campanha' });

User.hasMany(Donation, { foreignKey: 'apoiadorId', as: 'doacoes' });
Donation.belongsTo(User, { foreignKey: 'apoiadorId', as: 'apoiador' });

module.exports = { sequelize, User, Article, Campaign, Donation };
