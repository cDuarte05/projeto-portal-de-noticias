import { useEffect, useState } from 'react';
import api from '../api/client';
import ArticleCard from '../components/ArticleCard';

const TIPOS = [
  { valor: '', rotulo: 'Tudo' },
  { valor: 'noticia_escolar', rotulo: 'Notícias escolares' },
  { valor: 'noticia_global', rotulo: 'Notícias globais' },
  { valor: 'artigo_cientifico', rotulo: 'Artigos científicos' },
  { valor: 'texto', rotulo: 'Textos' },
  { valor: 'poema', rotulo: 'Poemas' },
  { valor: 'projeto', rotulo: 'Projetos' },
];

export default function Home() {
  const [artigos, setArtigos] = useState([]);
  const [tipo, setTipo] = useState('');
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    setCarregando(true);
    api.get('/artigos', { params: { tipo: tipo || undefined, busca: busca || undefined } })
      .then((r) => setArtigos(r.data))
      .finally(() => setCarregando(false));
  }, [tipo, busca]);

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      <section style={{ marginBottom: '2.5rem' }}>
        <p className="rotulo-mono">Divulgação científica comunitária</p>
        <h1>O que a nossa comunidade está descobrindo, escrevendo e construindo.</h1>
        <p style={{ maxWidth: 640, color: 'var(--cor-tinta-suave)' }}>
          Um mural aberto para notícias escolares e globais, artigos científicos,
          textos e poemas — publicado por estudantes, jovens jornalistas e a
          comunidade. Sem curadoria fechada, sem paywall.
        </p>
      </section>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.5rem' }}>
        <input
          placeholder="Buscar por título..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{ maxWidth: 280 }}
        />
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {TIPOS.map((t) => (
            <button
              key={t.valor}
              onClick={() => setTipo(t.valor)}
              className={tipo === t.valor ? 'botao-primario' : 'botao-secundario'}
              style={{ fontSize: '0.82rem', padding: '0.4em 0.9em' }}
            >
              {t.rotulo}
            </button>
          ))}
        </div>
      </div>

      {carregando ? (
        <p className="rotulo-mono">Carregando publicações...</p>
      ) : artigos.length === 0 ? (
        <p>Nenhuma publicação encontrada. Que tal ser a primeira pessoa a publicar?</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {artigos.map((a) => <ArticleCard key={a.id} artigo={a} />)}
        </div>
      )}
    </div>
  );
}
