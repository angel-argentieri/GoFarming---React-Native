import React, { createContext, useContext, useState } from 'react';

type ContextoTema = {
  escuro: boolean;
  alternarTema: () => void;
};

const ContextoTemaReact = createContext<ContextoTema>({
  escuro: true,
  alternarTema: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [escuro, definirEscuro] = useState(true);

  function alternarTema() {
    definirEscuro(anterior => !anterior);
  }

  return (
    <ContextoTemaReact.Provider value={{ escuro, alternarTema }}>
      {children}
    </ContextoTemaReact.Provider>
  );
}

export const useTheme = () => useContext(ContextoTemaReact);
