/**
 * plantIdService.ts
 *
 * Coloque em: src/services/plantIdService.ts
 *
 * Não precisa instalar nenhuma dependência nova — usa fetch nativo do React Native.
 *
 * IMPORTANTE: substitua PLANT_ID_API_KEY pela sua chave real.
 * Obtenha em: https://web.plant.id/plant-id-api/
 *
 * Endpoints usados:
 *  - Identificação : POST https://api.plant.id/v3/identification
 *  - Conversa (chat): POST https://api.plant.id/v3/identification/{access_token}/conversation
 */

// ─────────────────────────────────────────────
// CONFIGURAÇÃO
// ─────────────────────────────────────────────

const PLANT_ID_API_KEY = ''; // 🔑 troque pela sua chave
const BASE_URL = 'https://api.plant.id/v3';

// ─────────────────────────────────────────────
// TIPOS PÚBLICOS
// ─────────────────────────────────────────────

/** Resultado simplificado devolvido por identificarPlanta(). */
export type ResultadoIdentificacao = {
  /** Nome comum em português (ex.: "Costela-de-Adão"). */
  nome: string;
  /** Nome científico (ex.: "Monstera deliciosa"). */
  especie: string;
  /** Confiança da identificação de 0 a 1 (ex.: 0.94 = 94%). */
  confianca: number;
  /**
   * Token de acesso retornado pela API.
   * Guarde-o para abrir conversas sobre esta identificação via chatPlanta().
   */
  accessToken: string;
  /** URL da imagem processada devolvida pela Plant.id (pode ser undefined). */
  imagemUrl?: string;
};

/** Uma mensagem do histórico de conversa. */
export type MensagemChat = {
  /** Quem enviou: 'user' (usuário) ou 'assistant' (Plant.id IA). */
  autor: 'user' | 'assistant';
  texto: string;
};

// ─────────────────────────────────────────────
// TIPOS INTERNOS — espelho parcial da API Plant.id v3
// ─────────────────────────────────────────────

type PlantIdSuggestion = {
  name: string;
  probability: number;
  details?: {
    common_names?: string[] | null;
    url?: string;
  };
};

type PlantIdIdentificationResponse = {
  access_token: string;
  result?: {
    classification?: {
      suggestions?: PlantIdSuggestion[];
    };
    is_plant?: {
      probability: number;
      binary: boolean;
    };
  };
  input?: {
    images?: string[];
  };
  status?: string;
};

type PlantIdConversationResponse = {
  message?: {
    content?: string;
  };
  // A API pode retornar a resposta diretamente no campo `answer`
  answer?: string;
};

// ─────────────────────────────────────────────
// HELPERS INTERNOS
// ─────────────────────────────────────────────

/**
 * Remove o prefixo data URI caso a string venha no formato
 * "data:image/jpeg;base64,<dados>" — a Plant.id aceita só os dados puros.
 */
function limparBase64(base64: string): string {
  const separador = base64.indexOf(',');
  return separador !== -1 ? base64.slice(separador + 1) : base64;
}

/** Extrai o melhor nome comum disponível de uma suggestion. */
function resolverNomeComum(suggestion: PlantIdSuggestion): string {
  const nomes = suggestion.details?.common_names;
  if (Array.isArray(nomes) && nomes.length > 0) {
    return nomes[0];
  }
  // Fallback: usa o nome científico formatado
  return suggestion.name;
}

// ─────────────────────────────────────────────
// 1. IDENTIFICAR PLANTA
// ─────────────────────────────────────────────

/**
 * Envia uma imagem em base64 para a Plant.id e retorna a identificação.
 *
 * @param base64Image - Imagem em base64 (com ou sem prefixo data URI).
 * @returns Objeto com nome, espécie, confiança e accessToken.
 * @throws Error com mensagem legível em caso de falha na rede ou na API.
 *
 * @example
 * const resultado = await identificarPlanta(base64DaFoto);
 * console.log(resultado.nome);       // "Costela-de-Adão"
 * console.log(resultado.especie);    // "Monstera deliciosa"
 * console.log(resultado.confianca);  // 0.94
 */
export async function identificarPlanta(
  base64Image: string,
): Promise<ResultadoIdentificacao> {
  const imagemLimpa = limparBase64(base64Image);

  const body = {
    images: [`data:image/jpeg;base64,${imagemLimpa}`],
    // Solicita detalhes extras: nomes comuns para montar o nome amigável
    details: ['common_names', 'url'],
    // Idioma preferencial para os nomes comuns
    language: 'pt',
  };

  let response: Response;

  try {
    response = await fetch(`${BASE_URL}/identification`, {
      method: 'POST',
      headers: {
        'Api-Key': PLANT_ID_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch (erroRede) {
    throw new Error(
      '[plantIdService] Falha de rede ao identificar planta. Verifique a conexão.',
    );
  }

  if (!response.ok) {
    const texto = await response.text().catch(() => '');
    throw new Error(
      `[plantIdService] Erro ${response.status} na identificação: ${texto}`,
    );
  }

  const dados: PlantIdIdentificationResponse = await response.json();

  const sugestoes = dados.result?.classification?.suggestions ?? [];

  if (sugestoes.length === 0) {
    throw new Error(
      '[plantIdService] Nenhuma planta foi identificada na imagem.',
    );
  }

  // A API já retorna ordenado por probabilidade — pega a primeira
  const melhor = sugestoes[0];

  return {
    nome: resolverNomeComum(melhor),
    especie: melhor.name,
    confianca: melhor.probability,
    accessToken: dados.access_token,
    imagemUrl: dados.input?.images?.[0],
  };
}

// ─────────────────────────────────────────────
// 2. CHAT SOBRE A PLANTA
// ─────────────────────────────────────────────

/**
 * Envia uma mensagem para o chat da Plant.id vinculado a uma identificação.
 * A IA responde dúvidas sobre a planta identificada (cuidados, rega, doenças, etc.).
 *
 * @param accessToken - Token devolvido por identificarPlanta().
 * @param mensagem    - Pergunta do usuário (ex.: "Como regar essa planta?").
 * @param historico   - Mensagens anteriores da conversa para manter contexto.
 * @returns Texto da resposta da IA.
 * @throws Error com mensagem legível em caso de falha.
 *
 * @example
 * const resposta = await chatPlanta(
 *   resultado.accessToken,
 *   'Quantas vezes por semana devo regar?',
 *   [],
 * );
 * console.log(resposta); // "A Monstera deliciosa prefere regas a cada 7-10 dias..."
 */
export async function chatPlanta(
  accessToken: string,
  mensagem: string,
  historico: MensagemChat[] = [],
): Promise<string> {
  // A Plant.id espera o histórico no formato messages[] com role + content
  const messages = historico.map((m) => ({
    role: m.autor === 'user' ? 'user' : 'assistant',
    content: m.texto,
  }));

  // Adiciona a mensagem atual ao final
  messages.push({ role: 'user', content: mensagem });

  const body = { messages };

  let response: Response;

  try {
    response = await fetch(
      `${BASE_URL}/identification/${accessToken}/conversation`,
      {
        method: 'POST',
        headers: {
          'Api-Key': PLANT_ID_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
  } catch (erroRede) {
    throw new Error(
      '[plantIdService] Falha de rede ao enviar mensagem. Verifique a conexão.',
    );
  }

  if (!response.ok) {
    const texto = await response.text().catch(() => '');
    throw new Error(
      `[plantIdService] Erro ${response.status} no chat: ${texto}`,
    );
  }

  const dados: PlantIdConversationResponse = await response.json();

  // A API pode retornar em message.content ou diretamente em answer
  const resposta =
    dados.message?.content ??
    dados.answer ??
    '';

  if (!resposta.trim()) {
    throw new Error('[plantIdService] A IA retornou uma resposta vazia.');
  }

  return resposta;
}