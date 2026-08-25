# Ponto de Partida — Portal de Divulgação Científica

Projeto acadêmico: portal de notícias democrático e de código aberto para
divulgação científica, com espaço de crowdfunding/vitrine para projetos
científicos de estudantes.

## Estrutura do repositório

```
backend/     API REST em Node.js + Express + Sequelize (SQLite local / PostgreSQL em produção)
frontend/    Interface em React + Vite
```

## Rodando o projeto completo localmente

```bash
# Terminal 1 — API
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev      # http://localhost:4000

# Terminal 2 — Interface
cd frontend
npm install
npm run dev      # http://localhost:5173
```

Contas de exemplo criadas pelo `npm run seed`:
- Professora moderadora: `marina.alves@escola.edu.br` / `senha123`
- Estudante: `lucas.ferreira@escola.edu.br` / `senha123`

## Documento da proposta

O documento `Proposta_Projeto_Portal_Divulgacao_Cientifica.docx` (entregue junto
com este código) detalha: nome do projeto, resumo executivo e objetivos,
arquitetura em nuvem completa (AWS), estrutura da plataforma e sugestões de
melhoria — cobrindo a formalização acadêmica exigida pela disciplina.
