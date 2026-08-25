import { createContext, useContext, useState } from 'react';
import api from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const salvo = localStorage.getItem('usuario');
    return salvo ? JSON.parse(salvo) : null;
  });

  async function login(email, senha) {
    const { data } = await api.post('/auth/login', { email, senha });
    localStorage.setItem('token', data.token);
    localStorage.setItem('usuario', JSON.stringify(data.usuario));
    setUsuario(data.usuario);
  }

  async function registrar(payload) {
    const { data } = await api.post('/auth/registrar', payload);
    localStorage.setItem('token', data.token);
    localStorage.setItem('usuario', JSON.stringify(data.usuario));
    setUsuario(data.usuario);
  }

  function sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, login, registrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
