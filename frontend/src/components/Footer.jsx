export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--cor-borda)', marginTop: '4rem', padding: '2.5rem 0', color: 'var(--cor-tinta-suave)' }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <strong style={{ fontFamily: 'var(--fonte-display)', color: 'var(--cor-tinta)' }}>Ponto de Partida</strong>
          <p style={{ maxWidth: 360, fontSize: '0.9rem' }}>
            Portal aberto e comunitário de divulgação científica: um espaço para
            estudantes, jovens jornalistas e a comunidade publicarem e financiarem
            ideias.
          </p>
        </div>
        <p className="rotulo-mono">Projeto acadêmico — código aberto</p>
      </div>
    </footer>
  );
}
