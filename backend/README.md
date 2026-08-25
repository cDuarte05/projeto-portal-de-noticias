# Backend — Portal de Divulgação Científica

API REST em Node.js/Express que sustenta o portal: publicações (notícias, textos,
poemas, projetos), campanhas de crowdfunding/vitrine e apoios/doações.

## Rodando localmente

```bash
cd backend
npm install
cp .env.example .env
npm run seed   # cria banco SQLite local com dados de exemplo
npm run dev    # inicia em http://localhost:4000
```

## Principais rotas

| Método | Rota | Descrição | Autenticação |
|---|---|---|---|
| POST | /api/auth/registrar | Cria conta | — |
| POST | /api/auth/login | Login, retorna JWT | — |
| GET | /api/artigos | Lista publicações públicas (filtros `?tipo=` e `?busca=`) | — |
| GET | /api/artigos/:id | Detalhe de uma publicação | — |
| POST | /api/artigos | Cria publicação (entra em revisão) | sim |
| PATCH | /api/artigos/:id/moderar | Aprova/recusa publicação | professor |
| GET | /api/campanhas | Lista campanhas ativas na vitrine | — |
| POST | /api/campanhas | Cria campanha (entra em análise) | sim |
| POST | /api/doacoes/:campaignId | Registra apoio a uma campanha | sim |

## Migrando para produção na AWS

1. Trocar `DB_DIALECT=postgres` no `.env` e apontar para uma instância **Amazon RDS (PostgreSQL)**.
2. Subir a API em **AWS App Runner** ou **Elastic Beanstalk** (mais simples) ou em **ECS Fargate** (mais controle), atrás de um **Application Load Balancer**.
3. Trocar o campo `imagemCapaUrl` para apontar para objetos armazenados no **Amazon S3**, servidos via **CloudFront**.
4. Usar **AWS Secrets Manager** para `JWT_SECRET` e credenciais do banco em vez do `.env`.

Veja o documento da proposta do projeto para a arquitetura completa.
