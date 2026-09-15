import { useEffect, useState } from 'react';
import api from '../api/client';
import CampaignCard from '../components/CampaignCard';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Crowdfunding() {
  const [campanhas, setCampanhas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const { usuario } = useAuth();

  useEffect(() => {
    api.get('/campanhas').then((r) => setCampanhas(r.data)).finally(() => setCarregando(false));
  }, []);

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p className="rotulo-mono">Vitrine científica</p>
          <h1>Projetos buscando apoio da comunidade</h1>
          <p style={{ maxWidth: 620, color: 'var(--cor-tinta-suave)' }}>
            Divulgação gratuita e transparente para projetos científicos de estudantes
            em busca de financiamento — de kits de robótica a estações meteorológicas.
          </p>
        </div>
        {usuario && <Link to="/vitrine/nova" className="botao botao-primario">Cadastrar projeto</Link>}
      </div>

      {carregando ? (
        <p className="rotulo-mono" style={{ marginTop: '2rem' }}>Carregando campanhas...</p>
      ) : campanhas.length === 0 ? (
        <p style={{ marginTop: '2rem' }}>Nenhuma campanha ativa no momento.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', marginTop: '2rem' }}>
          {campanhas.map((c) => <CampaignCard key={c.id} campanha={c} />)}
        </div>
      )}
    </div>
  );
}
