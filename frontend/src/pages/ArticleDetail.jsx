import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/client';

export default function ArticleDetail() {
  const { id } = useParams();
  const [artigo, setArtigo] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api.get(`/artigos/${id}`).then((r) => setArtigo(r.data)).catch(() => setErro('Publicação não encontrada.'));
  }, [id]);

  if (erro) return <div className="container" style={{ padding: '2.5rem 1.5rem' }}><p className="erro-msg">{erro}</p></div>;
  if (!artigo) return <div className="container" style={{ padding: '2.5rem 1.5rem' }}><p className="rotulo-mono">Carregando...</p></div>;

  return (
    <article className="container" style={{ padding: '2.5rem 1.5rem', maxWidth: 760 }}>
      <Link to="/" className="rotulo-mono">← voltar às publicações</Link>
      <span className={`selo selo-${artigo.tipo}`} style={{ display: 'block', width: 'fit-content', margin: '1rem 0' }}>{artigo.tipo}</span>
      <h1>{artigo.titulo}</h1>
      <p className="rotulo-mono">
        {artigo.autor?.nome} {artigo.autor?.instituicao ? `· ${artigo.autor.instituicao}` : ''} · {artigo.visualizacoes} visualizações
      </p>
      <p style={{ fontSize: '1.05rem', fontStyle: 'italic', color: 'var(--cor-tinta-suave)', borderLeft: '3px solid var(--cor-ambar)', paddingLeft: '1rem' }}>
        {artigo.resumo}
      </p>
      <div style={{ whiteSpace: 'pre-wrap', fontSize: '1.05rem', lineHeight: 1.7 }}>{artigo.conteudo}</div>
    </article>
  );
}
