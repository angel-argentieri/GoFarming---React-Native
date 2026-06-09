export type PlantHealth = 'healthy' | 'attention' | 'warning';

export type CareRecordKind = 'rega' | 'adubacao' | 'poda' | 'inspecao';

export type CareRecord = {
  id: string;
  titulo: string;
  descricao: string;
  data: string;
  tipo: CareRecordKind;
};

export type PlantNotification = {
  id: string;
  titulo: string;
  descricao: string;
  horario: string;
  lida: boolean;
};

export type Plant = {
  id: string;
  nome: string;
  especie: string;
  local: string;
  imagem: string;
  saude: PlantHealth;
  umidade: number;
  ultimaRega: string;
  proximaRega: string;
  observacao: string;
  necessitaRega: boolean;
  historico: CareRecord[];
};

export type PlantDraft = {
  nome: string;
  especie: string;
  local: string;
  observacao: string;
};

export type QuickAction = {
  id: string;
  titulo: string;
  descricao: string;
  destino: string;
};

export type QuickReply = {
  titulo: string;
  resposta: string;
};

export type ThemeMode = 'dark';
