<<<<<<< HEAD
const app = require('./app');
const { sequelize } = require('./models');
=======
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const donationRoutes = require('./routes/donationRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors()); // em produção, restringir ao domínio do CloudFront/frontend
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

// Limite de requisições — protege contra abuso na API pública
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));

app.get('/api/saude', (req, res) => res.json({ status: 'ok', servico: 'portal-cientifico-api' }));

app.use('/api/auth', authRoutes);
app.use('/api/artigos', articleRoutes);
app.use('/api/campanhas', campaignRoutes);
app.use('/api/doacoes', donationRoutes);

app.use(errorHandler);
>>>>>>> origin/master

const PORT = process.env.PORT || 4000;

async function iniciar() {
  await sequelize.sync(); // em produção real, preferir migrations (sequelize-cli) em vez de sync()
  app.listen(PORT, () => {
<<<<<<< HEAD
    console.log(`API do IFConnect rodando na porta ${PORT}`);
=======
    console.log(`API do Portal Científico rodando na porta ${PORT}`);
>>>>>>> origin/master
  });
}

iniciar();
