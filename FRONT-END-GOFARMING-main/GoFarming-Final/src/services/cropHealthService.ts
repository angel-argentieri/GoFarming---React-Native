/**
 * cropHealthService.ts
 *
 * Coloque em: src/services/cropHealthService.ts
 *
 * Não precisa instalar nenhuma dependência nova — usa fetch nativo do React Native.
 *
 * IMPORTANTE: substitua KINDWISE_API_KEY pela sua chave real.
 * Obtenha em: https://crop.kindwise.com/
 *
 * Endpoint usado:
 *  - Saúde: POST https://crop.kindwise.com/api/v1/health_assessment
 */

import { PlantHealth } from '../types/garden';

// ─────────────────────────────────────────────
// CONFIGURAÇÃO
// ─────────────────────────────────────────────

const KINDWISE_API_KEY = 'SUA_CHAVE_AQUI'; // 🔑 troque pela sua chave
const BASE_URL = 'https://crop.kindwise.com/api/v1';

// ─────────────────────────────────────────────
// TIPOS PÚBLICOS
// ─────────────────────────────────────────────

/** Um problema detectado na planta (doença, praga, deficiência). */
export type ProblemaDetectado = {
  /** Nome do problema em português quando disponível, senão em inglês. */
  nome: string;
  /** Descrição curta do problema. */
  descricao: string;
  /** Nível de confiança de 0 a 1. */
  confianca: number;
  /**
   * Classificação interna do tipo de problema.
   * 'disease' | 'pest' | 'abiotic' | 'other'
   */
  tipo: 'disease' | 'pest' | 'abiotic' | 'other';
};

/**
 * Resultado devolvido por verificarSaude().
 * O campo `status` é compatível com o tipo PlantHealth do projeto
 * para poder ser salvo diretamente em Plant.saude.
 */
export type ResultadoSaude = {
  /**
   * Status geral da planta mapeado para o padrão do projeto:
   *  - 'healthy'   → sem problemas detectados (probabilidade ≥ 0.7)
   *  - 'attention' → problema(s) leve(s) ou confiança moderada
   *  - 'warning'   → problema(s) grave(s) ou alta probabilidade de doença
   */
  status: PlantHealth;
  /** Lista de problemas identificados, ordenados por confiança decrescente. */
  problemas: ProblemaDetectado[];
  /**
   * Confiança geral de que a planta está saudável (0 a 1).
   * Devolvido diretamente pelo campo is_healthy.probability da API.
   */
  confianca: number;
};

// ─────────────────────────────────────────────
// TIPOS INTERNOS — espelho parcial da API Kindwise v1
// ─────────────────────────────────────────────

type KindwiseDisease = {
  name: string;
  probability: number;
  details?: {
    common_names?: string[] | null;
    description?: string | null;
    classification?: string[] | null;
  };
};

type KindwiseHealthResponse = {
  access_token?: string;
  result?: {
    is_healthy?: {
      probability: number;
      binary: boolean;
    };
    disease?: {
      suggestions?: KindwiseDisease[];
    };
  };
  status?: string;
};

// ─────────────────────────────────────────────
// HELPERS INTERNOS
// ─────────────────────────────────────────────

/** Remove prefixo data URI se presente. */
function limparBase64(base64: string): string {
  const sep = base64.indexOf(',');
  return sep !== -1 ? base64.slice(sep + 1) : base64;
}

/**
 * Infere o tipo de problema a partir da classificação taxonômica
 * que a Kindwise devolve no campo details.classification[].
 */
function inferirTipo(doenca: KindwiseDisease): ProblemaDetectado['tipo'] {
  const classificacoes = doenca.details?.classification ?? [];
  const tudo = classificacoes.join(' ').toLowerCase();

  if (tudo.includes('insect') || tudo.includes('mite') || tudo.includes('pest')) {
    return 'pest';
  }
  if (
    tudo.includes('abiotic') ||
    tudo.includes('deficiency') ||
    tudo.includes('stress')
  ) {
    return 'abiotic';
  }
  if (
    tudo.includes('fungi') ||
    tudo.includes('bacteria') ||
    tudo.includes('virus') ||
    tudo.includes('pathogen')
  ) {
    return 'disease';
  }
  return 'other';
}

/**
 * Mapeia a probabilidade de saúde e os problemas encontrados
 * para o enum PlantHealth usado no projeto.
 *
 * Regras:
 *  - saudável (≥ 0.70 de is_healthy) → 'healthy'
 *  - atenção  (0.35–0.69)            → 'attention'
 *  - alerta   (< 0.35)               → 'warning'
 */
function mapearStatus(
  probSaudavel: number,
  problemas: ProblemaDetectado[],
): PlantHealth {
  // Se há algum problema grave detectado com alta confiança, sobe para warning
  const temProblemaGrave = problemas.some((p) => p.confianca >= 0.75);

  if (temProblemaGrave) return 'warning';
  if (probSaudavel >= 0.7) return 'healthy';
  if (probSaudavel >= 0.35) return 'attention';
  return 'warning';
}

// ─────────────────────────────────────────────
// verificarSaude
// ─────────────────────────────────────────────

/**
 * Envia uma imagem em base64 para a Kindwise e retorna o diagnóstico de saúde.
 *
 * @param base64Image - Foto da planta em base64 (com ou sem prefixo data URI).
 * @returns `ResultadoSaude` com status, lista de problemas e confiança geral.
 * @throws Error com mensagem legível em caso de falha de rede ou da API.
 *
 * @example
 * const saude = await verificarSaude(base64DaFoto);
 *
 * console.log(saude.status);     // 'healthy' | 'attention' | 'warning'
 * console.log(saude.confianca);  // 0.91
 * console.log(saude.problemas);  // [{ nome: 'Oídio', confianca: 0.82, tipo: 'disease', ... }]
 *
 * // Salvar direto no contexto do jardim:
 * atualizarSaudePlanta(plantaId, saude.status);
 */
export async function verificarSaude(
  base64Image: string,
): Promise<ResultadoSaude> {
  const imagemLimpa = limparBase64(base64Image);

  const body = {
    images: [`data:image/jpeg;base64,${imagemLimpa}`],
    // Solicita nomes comuns e descrição para montar os cards de problema
    details: ['common_names', 'description', 'classification'],
    language: 'pt',
  };

  let response: Response;

  try {
    response = await fetch(`${BASE_URL}/health_assessment`, {
      method: 'POST',
      headers: {
        'Api-Key': KINDWISE_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch (erroRede) {
    throw new Error(
      '[cropHealthService] Falha de rede ao verificar saúde. Verifique a conexão.',
    );
  }

  if (!response.ok) {
    const texto = await response.text().catch(() => '');
    throw new Error(
      `[cropHealthService] Erro ${response.status} na verificação de saúde: ${texto}`,
    );
  }

  const dados: KindwiseHealthResponse = await response.json();

  // Probabilidade de estar saudável (0–1); padrão conservador se ausente
  const probSaudavel = dados.result?.is_healthy?.probability ?? 0.5;

  // Mapeia sugestões de doenças para ProblemaDetectado[]
  const sugestoes = dados.result?.disease?.suggestions ?? [];

  const problemas: ProblemaDetectado[] = sugestoes
    .map((d): ProblemaDetectado => {
      const nomeComum = d.details?.common_names?.[0];
      return {
        nome: nomeComum ?? d.name,
        descricao: d.details?.description ?? 'Sem descrição disponível.',
        confianca: d.probability,
        tipo: inferirTipo(d),
      };
    })
    // Ordena por confiança decrescente
    .sort((a, b) => b.confianca - a.confianca);

  const status = mapearStatus(probSaudavel, problemas);

  return {
    status,
    problemas,
    confianca: probSaudavel,
  };
}