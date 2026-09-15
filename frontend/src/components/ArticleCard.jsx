import { Link } from 'react-router-dom';

const ROTULOS = {
  noticia_escolar: 'Notícia escolar',
  noticia_global: 'Notícia global',
  artigo_cientifico: 'Artigo científico',
  texto: 'Texto',
  poema: 'Poema',
  projeto: 'Projeto',
};

export default function ArticleCard({ artigo }) {
  return (
    <Link to={`/publicacoes/${artigo.id}`} className="cartao" style={{ display: 'block', padding: '1.25rem', color: 'var(--cor-tinta)' }}>
      <span className={`selo selo-${artigo.tipo}`}>{ROTULOS[artigo.tipo] || artigo.tipo}</span>
      <h3 style={{ marginTop: '0.6rem' }}>{artigo.titulo}</h3>
      <p style={{ color: 'var(--cor-tinta-suave)', fontSize: '0.92rem' }}>{artigo.resumo}</p>
      <p className="rotulo-mono">
        {artigo.autor?.nome} {artigo.autor?.instituicao ? `· ${artigo.autor.instituicao}` : ''}
      </p>
    </Link>
  );
}
