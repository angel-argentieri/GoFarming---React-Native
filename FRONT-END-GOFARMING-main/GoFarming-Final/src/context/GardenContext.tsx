import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  acoesRapidas,
  criarNotificacaoDeRega,
  criarPlanta,
  criarRegistroDeRega,
  notificacoesIniciais,
  plantasIniciais,
  respostasIA,
} from '../services/gardenService';
import {
  Plant,
  PlantDraft,
  PlantNotification,
  QuickAction,
  QuickReply,
} from '../types/garden';

type GardenContextValue = {
  plantas: Plant[];
  notificacoes: PlantNotification[];
  acoesRapidas: QuickAction[];
  respostasIA: QuickReply[];
  selecionarPlanta: (plantaId: string) => void;
  plantaSelecionada: Plant | null;
  adicionarPlanta: (dados: PlantDraft) => void;
  registrarRegaManual: (plantaId: string) => void;
  marcarNotificacaoComoLida: (notificacaoId: string) => void;
};

export const GardenContext = createContext<GardenContextValue>({} as GardenContextValue);

export function GardenProvider({ children }: { children: React.ReactNode }) {
  const [plantas, definirPlantas] = useState<Plant[]>(plantasIniciais);
  const [notificacoes, definirNotificacoes] = useState<PlantNotification[]>(notificacoesIniciais);
  const [plantaSelecionada, definirPlantaSelecionada] = useState<Plant | null>(plantasIniciais[0] ?? null);

  function selecionarPlanta(plantaId: string) {
    const plantaEncontrada = plantas.find((planta) => planta.id === plantaId) ?? null;
    definirPlantaSelecionada(plantaEncontrada);
  }

  function adicionarPlanta(dados: PlantDraft) {
    const novaPlanta = criarPlanta(dados);

    definirPlantas((anteriores) => [novaPlanta, ...anteriores]);
    definirPlantaSelecionada(novaPlanta);
    definirNotificacoes((anteriores) => [criarNotificacaoDeRega(novaPlanta.nome), ...anteriores]);
  }

  function registrarRegaManual(plantaId: string) {
    definirPlantas((anteriores) =>
      anteriores.map((planta) => {
        if (planta.id !== plantaId) {
          return planta;
        }

        const novoHistorico = [criarRegistroDeRega(), ...planta.historico];

        return {
          ...planta,
          saude: 'healthy',
          umidade: Math.min(planta.umidade + 12, 100),
          ultimaRega: 'Agora',
          proximaRega: 'em 3 dias',
          observacao: planta.observacao,
          necessitaRega: false,
          historico: novoHistorico,
        };
      })
    );

    const plantaAtualizada = plantas.find((planta) => planta.id === plantaId) ?? null;

    if (plantaAtualizada) {
      definirNotificacoes((anteriores) => [
        criarNotificacaoDeRega(plantaAtualizada.nome),
        ...anteriores,
      ]);
    }

    if (plantaSelecionada?.id === plantaId) {
      definirPlantaSelecionada((anterior) => {
        if (!anterior) {
          return anterior;
        }

        return {
          ...anterior,
          saude: 'healthy',
          umidade: Math.min(anterior.umidade + 12, 100),
          ultimaRega: 'Agora',
          proximaRega: 'em 3 dias',
          necessitaRega: false,
          historico: [criarRegistroDeRega(), ...anterior.historico],
        };
      });
    }
  }

  function marcarNotificacaoComoLida(notificacaoId: string) {
    definirNotificacoes((anteriores) =>
      anteriores.map((notificacao) =>
        notificacao.id === notificacaoId ? { ...notificacao, lida: true } : notificacao
      )
    );
  }

  const valor = useMemo(
    () => ({
      plantas,
      notificacoes,
      acoesRapidas,
      respostasIA,
      selecionarPlanta,
      plantaSelecionada,
      adicionarPlanta,
      registrarRegaManual,
      marcarNotificacaoComoLida,
    }),
    [plantas, notificacoes, plantaSelecionada]
  );

  return <GardenContext.Provider value={valor}>{children}</GardenContext.Provider>;
}

export function useGarden() {
  return useContext(GardenContext);
}
