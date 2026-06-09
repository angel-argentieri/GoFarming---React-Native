import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';

type ContextoAuth = {
  sessao: Session | null;
  carregando: boolean;
  sair: () => Promise<void>;
};

const ContextoAuthReact = createContext<ContextoAuth>({} as ContextoAuth);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [sessao, definirSessao] = useState<Session | null>(null);
  const [carregando, definirCarregando] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      definirSessao(data.session);
      definirCarregando(false);
    });

    const { data: inscricao } = supabase.auth.onAuthStateChange((_evento, sessaoAtual) => {
      definirSessao(sessaoAtual);
    });

    return () => {
      inscricao.subscription.unsubscribe();
    };
  }, []);

  async function sair() {
    await supabase.auth.signOut();
  }

  return (
    <ContextoAuthReact.Provider value={{ sessao, carregando, sair }}>
      {children}
    </ContextoAuthReact.Provider>
  );
}

export const useAuth = () => useContext(ContextoAuthReact);
