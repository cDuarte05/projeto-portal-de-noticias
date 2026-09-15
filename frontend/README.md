# Frontend — Portal de Divulgação Científica

Interface em React (Vite), com identidade visual de "caderno de campo":
papel, selos de categoria e um termômetro de arrecadação para as campanhas.

## Rodando localmente

```bash
cd frontend
npm install
npm run dev   # http://localhost:5173 (a API precisa estar rodando em :4000)
```

## Estrutura

- `src/pages` — telas: Home (feed), detalhe de publicação, envio de publicação,
  vitrine de crowdfunding, detalhe de campanha, login e cadastro.
- `src/components` — Navbar, Footer, cartões de publicação/campanha e a barra
  de arrecadação.
- `src/styles/tokens.css` — paleta de cores e tipografia do projeto.
- `src/context/AuthContext.jsx` — sessão do usuário (token JWT em localStorage).

## Publicando em produção (AWS)

Gerar o build estático (`npm run build`) e publicar a pasta `dist/` em um
bucket **Amazon S3** com **Amazon CloudFront** na frente (CDN + HTTPS gratuito
via ACM). Veja o documento da proposta para o desenho completo da arquitetura.
