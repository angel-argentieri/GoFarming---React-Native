import {
  CareRecord,
  Plant,
  PlantDraft,
  PlantNotification,
  QuickAction,
  QuickReply,
} from '../types/garden';

function gerarId(prefixo: string) {
  return `${prefixo}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function formatarDataLocal() {
  return new Date().toLocaleDateString('pt-BR');
}

export const plantasIniciais: Plant[] = [
  {
    id: 'planta-01',
    nome: 'Costela-de-Adão',
    especie: 'Monstera deliciosa',
    local: 'Sala de estar',
    imagem:
      'https://images.unsplash.com/photo-1604762524882-90da37b3f5d6?auto=format&fit=crop&w=900&q=80',
    saude: 'healthy',
    umidade: 82,
    ultimaRega: 'há 2 dias',
    proximaRega: 'em 3 dias',
    observacao: 'Gosta de luz indireta e umidade estável.',
    necessitaRega: false,
    historico: [
      {
        id: 'historico-01',
        titulo: 'Rega realizada',
        descricao: 'Substrato hidratado sem encharcar.',
        data: 'Hoje',
        tipo: 'rega',
      },
      {
        id: 'historico-02',
        titulo: 'Inspeção das folhas',
        descricao: 'Sem manchas e com bom desenvolvimento.',
        data: 'Ontem',
        tipo: 'inspecao',
      },
    ],
  },
  {
    id: 'planta-02',
    nome: 'Lavanda',
    especie: 'Lavandula angustifolia',
    local: 'Varanda',
    imagem:
      'https://images.unsplash.com/photo-1599312479868-9c74a9d5b0fa?auto=format&fit=crop&w=900&q=80',
    saude: 'attention',
    umidade: 41,
    ultimaRega: 'há 5 dias',
    proximaRega: 'hoje',
    observacao: 'Prefere bastante sol e regas mais espaçadas.',
    necessitaRega: true,
    historico: [
      {
        id: 'historico-03',
        titulo: 'Rega pendente',
        descricao: 'A planta deve receber água ainda hoje.',
        data: 'Hoje',
        tipo: 'rega',
      },
      {
        id: 'historico-04',
        titulo: 'Observação de folhas',
        descricao: 'Folhas levemente secas nas pontas.',
        data: '2 dias atrás',
        tipo: 'inspecao',
      },
    ],
  },
  {
    id: 'planta-03',
    nome: 'Espada-de-São-Jorge',
    especie: 'Dracaena trifasciata',
    local: 'Hall de entrada',
    imagem:
      'https://images.unsplash.com/photo-1596547609652-9cf5d5e0a2ad?auto=format&fit=crop&w=900&q=80',
    saude: 'healthy',
    umidade: 67,
    ultimaRega: 'há 1 semana',
    proximaRega: 'em 4 dias',
    observacao: 'É resistente e pede pouca água.',
    necessitaRega: false,
    historico: [
      {
        id: 'historico-05',
        titulo: 'Adubação leve',
        descricao: 'Nutrientes reforçados para crescimento gradual.',
        data: '5 dias atrás',
        tipo: 'adubacao',
      },
    ],
  },
];

export const notificacoesIniciais: PlantNotification[] = [
  {
    id: 'notificacao-01',
    titulo: 'Hora da rega',
    descricao: 'Lavanda precisa de água hoje.',
    horario: '08:30',
    lida: false,
  },
  {
    id: 'notificacao-02',
    titulo: 'Saúde estável',
    descricao: 'Costela-de-Adão segue em bom estado.',
    horario: 'Ontem',
    lida: true,
  },
];

export const acoesRapidas: QuickAction[] = [
  {
    id: 'acao-01',
    titulo: 'Cadastro manual',
    descricao: 'Adicionar uma planta nova no jardim.',
    destino: 'PlantCadastro',
  },
  {
    id: 'acao-02',
    titulo: 'Lista de plantas',
    descricao: 'Ver todas as plantas cadastradas.',
    destino: 'Jardim',
  },
  {
    id: 'acao-03',
    titulo: 'Irrigação manual',
    descricao: 'Registrar uma rega sem abrir a ficha.',
    destino: 'Irrigacao',
  },
  {
    id: 'acao-04',
    titulo: 'Perguntar à IA',
    descricao: 'Receber dicas sobre cultivo e saúde.',
    destino: 'AssistenteIA',
  },
];

export const respostasIA: QuickReply[] = [
  {
    titulo: 'Como saber se a planta precisa de água?',
    resposta:
      'Toque no substrato e observe o peso do vaso. Se estiver seco e leve, é hora de regar.',
  },
  {
    titulo: 'Como melhorar a saúde da planta?',
    resposta:
      'Ajuste luz, rega e ventilação. Se a planta estiver fraca, comece pelo básico antes de mudar muita coisa.',
  },
  {
    titulo: 'Como manter o cultivo em dia?',
    resposta:
      'Use uma rotina simples: observar, regar quando necessário e registrar os cuidados principais.',
  },
];

export function criarPlanta(dados: PlantDraft): Plant {
  return {
    id: gerarId('planta'),
    nome: dados.nome.trim(),
    especie: dados.especie.trim(),
    local: dados.local.trim(),
    imagem:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80',
    saude: 'attention',
    umidade: 55,
    ultimaRega: 'Hoje',
    proximaRega: 'em 2 dias',
    observacao: dados.observacao.trim(),
    necessitaRega: false,
    historico: [
      {
        id: gerarId('historico'),
        titulo: 'Cadastro realizado',
        descricao: 'Planta adicionada manualmente ao jardim.',
        data: formatarDataLocal(),
        tipo: 'inspecao',
      },
    ],
  };
}

export function criarRegistroDeRega(): CareRecord {
  return {
    id: gerarId('historico'),
    titulo: 'Rega manual registrada',
    descricao: 'A planta recebeu água e o estado foi atualizado.',
    data: formatarDataLocal(),
    tipo: 'rega',
  };
}

export function criarNotificacaoDeRega(nomePlanta: string): PlantNotification {
  return {
    id: gerarId('notificacao'),
    titulo: 'Rega confirmada',
    descricao: `${nomePlanta} foi regada com sucesso.`,
    horario: 'Agora',
    lida: false,
  };
}
