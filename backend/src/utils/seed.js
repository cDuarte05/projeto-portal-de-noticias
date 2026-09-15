/**
 * Script de dados de exemplo — popula o banco local para facilitar
 * a demonstração do projeto (ex: em sala de aula ou banca avaliadora).
 * Executar com: npm run seed
 */
require('dotenv').config();
const { sequelize, User, Article, Campaign } = require('../models');

async function seed() {
  await sequelize.sync({ force: true });

  const professor = await User.create({
    nome: 'Profa. Marina Alves',
    email: 'marina.alves@escola.edu.br',
    senhaHash: User.hashSenha('senha123'),
    tipo: 'professor_moderador',
    instituicao: 'Escola Estadual Jardim das Flores',
  });

  const aluno = await User.create({
    nome: 'Lucas Ferreira',
    email: 'lucas.ferreira@escola.edu.br',
    senhaHash: User.hashSenha('senha123'),
    tipo: 'estudante',
    instituicao: 'Escola Estadual Jardim das Flores',
  });

  await Article.create({
    titulo: 'Alunos do 3º ano constroem estação meteorológica com Arduino',
    resumo: 'Projeto de feira de ciências mede temperatura e umidade em tempo real.',
    conteudo: 'Texto completo da matéria sobre o projeto de feira de ciências...',
    tipo: 'noticia_escolar',
    status: 'publicado',
    autorId: aluno.id,
  });

  await Campaign.create({
    titulo: 'Kit de sensores para monitorar qualidade da água do rio local',
    descricao: 'Arrecadação para comprar sensores de pH e turbidez para o projeto de monitoramento ambiental da turma.',
    areaCientifica: 'meio ambiente',
    metaFinanceira: 800.0,
    valorArrecadado: 150.0,
    status: 'ativa',
    autorId: aluno.id,
  });

  console.log('Dados de exemplo criados com sucesso.');
  console.log('Login professor: marina.alves@escola.edu.br / senha123');
  console.log('Login estudante: lucas.ferreira@escola.edu.br / senha123');
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
