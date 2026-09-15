import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';

export default function SubmitArticle() {
  const [form, setForm] = useState({ titulo: '', resumo: '', conteudo: '', tipo: 'noticia_escolar', imagemCapaUrl: '' });
  const [erro, setErro] = useState('');
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();

  function atualizar(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  async function enviar(e) {
    e.preventDefault();
    setErro('');
    setEnviando(true);
    try {
      const { data } = await api.post('/artigos', form);
      navigate(`/publicacoes/${data.id}`);
    } catch (err) {
      setErro(err.response?.data?.mensagem || 'Não foi possível publicar. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem', maxWidth: 640 }}>
      <p className="rotulo-mono">Nova publicação</p>
      <h1>Compartilhe com a comunidade</h1>
      <p style={{ color: 'var(--cor-tinta-suave)' }}>
        Notícias entram em revisão antes de ficarem públicas. Professores moderadores
        publicam diretamente.
      </p>
      <form onSubmit={enviar}>
        <label htmlFor="tipo">Tipo de publicação</label>
        <select id="tipo" value={form.tipo} onChange={(e) => atualizar('tipo', e.target.value)}>
          <option value="noticia_escolar">Notícia escolar</option>
          <option value="noticia_global">Notícia global</option>
          <option value="artigo_cientifico">Artigo científico</option>
          <option value="texto">Texto</option>
          <option value="poema">Poema</option>
          <option value="projeto">Projeto</option>
        </select>

        <label htmlFor="titulo">Título</label>
        <input id="titulo" required value={form.titulo} onChange={(e) => atualizar('titulo', e.target.value)} />

        <label htmlFor="resumo">Resumo (até 300 caracteres)</label>
        <input id="resumo" required maxLength={300} value={form.resumo} onChange={(e) => atualizar('resumo', e.target.value)} />

        <label htmlFor="conteudo">Conteúdo completo</label>
        <textarea id="conteudo" required rows={10} value={form.conteudo} onChange={(e) => atualizar('conteudo', e.target.value)} />

        <label htmlFor="imagem">URL da imagem de capa (opcional)</label>
        <input id="imagem" value={form.imagemCapaUrl} onChange={(e) => atualizar('imagemCapaUrl', e.target.value)} />

        {erro && <p className="erro-msg">{erro}</p>}
        <button type="submit" className="botao-primario" style={{ marginTop: '1.5rem' }} disabled={enviando}>
          {enviando ? 'Enviando...' : 'Enviar para revisão'}
        </button>
      </form>
    </div>
  );
}
