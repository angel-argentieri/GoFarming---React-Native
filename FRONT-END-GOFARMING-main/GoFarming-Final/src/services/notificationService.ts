/**
 * notificationService.ts
 *
 * Coloque este arquivo em: src/services/notificationService.ts
 *
 * Dependências necessárias — instale com:
 *   npx expo install expo-notifications expo-task-manager expo-background-fetch
 *
 * Depois adicione os plugins no app.json (veja comentário no final do arquivo).
 */

import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { Plant } from '../types/garden';

// ─────────────────────────────────────────────
// CONSTANTES
// ─────────────────────────────────────────────

/** Nome da task registrada no TaskManager. Deve ser única no app. */
const BACKGROUND_TASK_NAME = 'gofarming-checar-plantas';

/** Chave usada para persistir as plantas no AsyncStorage dentro da background task. */
const STORAGE_KEY_PLANTAS = '@gofarming:plantas';

// ─────────────────────────────────────────────
// CONFIGURAÇÃO DO HANDLER GLOBAL
// Deve ser chamado antes de qualquer await, no topo do módulo.
// ─────────────────────────────────────────────

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    // iOS 17+: permite que a notificação apareça mesmo com o app em foreground
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// ─────────────────────────────────────────────
// TIPOS INTERNOS
// ─────────────────────────────────────────────

/** Dia da semana no padrão do Expo (1 = domingo … 7 = sábado). */
export type DiaDaSemana = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/** Retorno de agendarNotificacaoRega com o ID gerado pelo Expo. */
export type AgendamentoRega = {
  plantaId: string;
  notificationId: string;
};

// ─────────────────────────────────────────────
// 1. PEDIR PERMISSÃO
// ─────────────────────────────────────────────

/**
 * Solicita permissão de notificação ao usuário.
 * Deve ser chamada no boot do app (ex.: dentro do AuthProvider ou App.tsx).
 *
 * @returns `true` se a permissão foi concedida, `false` caso contrário.
 *
 * @example
 * // App.tsx
 * useEffect(() => {
 *   pedirPermissaoNotificacao();
 * }, []);
 */
export async function pedirPermissaoNotificacao(): Promise<boolean> {
  // No Android 13+ é obrigatório pedir POST_NOTIFICATIONS em runtime.
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('gofarming-rega', {
      name: 'Lembretes de rega',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#B8A8FF',
      sound: 'default',
    });

    await Notifications.setNotificationChannelAsync('gofarming-alerta', {
      name: 'Alertas de saúde',
      importance: Notifications.AndroidImportance.DEFAULT,
      lightColor: '#FF4C4C',
      sound: 'default',
    });
  }

  const { status: statusAtual } = await Notifications.getPermissionsAsync();

  if (statusAtual === 'granted') {
    return true;
  }

  const { status: novoStatus } = await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: false,
      allowSound: true,
    },
  });

  return novoStatus === 'granted';
}

// ─────────────────────────────────────────────
// 2. AGENDAR NOTIFICAÇÃO DE REGA (SEMANAL)
// ─────────────────────────────────────────────

/**
 * Agenda uma notificação semanal de rega para uma planta.
 * Cada dia da semana recebe um agendamento independente.
 *
 * @param plantaId   - ID da planta (usado para rastreamento).
 * @param nome       - Nome da planta exibido na notificação.
 * @param horario    - Horário no formato "HH:MM" (ex.: "08:30").
 * @param diasDaSemana - Array de dias (1=Dom, 2=Seg, …, 7=Sáb).
 *
 * @returns Array com os IDs de agendamento criados pelo Expo (um por dia).
 *
 * @example
 * const ids = await agendarNotificacaoRega(
 *   'planta-01',
 *   'Lavanda',
 *   '08:30',
 *   [2, 4, 6], // segunda, quarta e sexta
 * );
 */
export async function agendarNotificacaoRega(
  plantaId: string,
  nome: string,
  horario: string,
  diasDaSemana: DiaDaSemana[],
): Promise<AgendamentoRega[]> {
  const permissaoConcedida = await pedirPermissaoNotificacao();

  if (!permissaoConcedida) {
    console.warn('[notificationService] Permissão negada — notificações não agendadas.');
    return [];
  }

  const [horaStr, minutoStr] = horario.split(':');
  const hora = parseInt(horaStr, 10);
  const minuto = parseInt(minutoStr, 10);

  if (isNaN(hora) || isNaN(minuto)) {
    throw new Error(
      `[notificationService] Horário inválido: "${horario}". Use o formato "HH:MM".`,
    );
  }

  const agendamentos: AgendamentoRega[] = [];

  for (const dia of diasDaSemana) {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: '💧 Hora de regar!',
        body: `${nome} precisa de água hoje. Não esqueça!`,
        data: { plantaId, tipo: 'rega' },
        // Android: usa o canal criado em pedirPermissaoNotificacao
        ...(Platform.OS === 'android' && { channelId: 'gofarming-rega' }),
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
        weekday: dia,  // 1 = domingo, 2 = segunda … 7 = sábado
        hour: hora,
        minute: minuto,
      },
    });

    agendamentos.push({ plantaId, notificationId });
  }

  return agendamentos;
}

// ─────────────────────────────────────────────
// 3. CANCELAR NOTIFICAÇÃO
// ─────────────────────────────────────────────

/**
 * Cancela um agendamento específico pelo ID retornado pelo Expo.
 *
 * @param notificationId - ID retornado por `agendarNotificacaoRega`.
 *
 * @example
 * await cancelarNotificacao('abc-123');
 */
export async function cancelarNotificacao(notificationId: string): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}

/**
 * Cancela TODOS os agendamentos de uma planta de uma vez.
 * Útil quando o usuário remove a planta ou altera a frequência.
 *
 * @param ids - Array de AgendamentoRega retornado por `agendarNotificacaoRega`.
 *
 * @example
 * await cancelarNotificacoesDaPlanta(agendamentosLavanda);
 */
export async function cancelarNotificacoesDaPlanta(
  ids: AgendamentoRega[],
): Promise<void> {
  await Promise.all(ids.map((a) => cancelarNotificacao(a.notificationId)));
}

/**
 * Cancela absolutamente todas as notificações agendadas no app.
 * Use com cuidado — normalmente só no logout.
 */
export async function cancelarTodasNotificacoes(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

// ─────────────────────────────────────────────
// 4. NOTIFICAÇÃO IMEDIATA (UTILITÁRIO)
// ─────────────────────────────────────────────

/**
 * Dispara uma notificação imediata — sem agendamento.
 * Usado pela background task quando detecta uma planta atrasada.
 */
async function dispararAlertaImediato(nome: string, mensagem: string): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `🌿 ${nome}`,
      body: mensagem,
      ...(Platform.OS === 'android' && { channelId: 'gofarming-alerta' }),
    },
    trigger: null, // disparo imediato
  });
}

// ─────────────────────────────────────────────
// 5. BACKGROUND FETCH — DEFINIÇÃO DA TASK
// ─────────────────────────────────────────────

/**
 * A task é definida FORA de qualquer componente, no escopo do módulo.
 * O TaskManager exige que o define seja executado antes do mount do app.
 *
 * O que ela faz:
 *  - Lê as plantas salvas no AsyncStorage.
 *  - Para cada planta com `necessitaRega === true`, dispara um alerta imediato.
 *  - Retorna BackgroundFetch.BackgroundFetchResult.NewData se algo foi encontrado.
 */
TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY_PLANTAS);

    if (!raw) {
      return BackgroundFetch.BackgroundFetchResult.NoData;
    }

    const plantas: Plant[] = JSON.parse(raw);

    const plantasAtrasadas = plantas.filter((p) => p.necessitaRega);

    if (plantasAtrasadas.length === 0) {
      return BackgroundFetch.BackgroundFetchResult.NoData;
    }

    // Dispara uma notificação por planta atrasada
    await Promise.all(
      plantasAtrasadas.map((p) =>
        dispararAlertaImediato(
          p.nome,
          `${p.nome} está com rega atrasada. Última rega: ${p.ultimaRega}.`,
        ),
      ),
    );

    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (erro) {
    console.error('[notificationService] Erro na background task:', erro);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

// ─────────────────────────────────────────────
// 6. BACKGROUND FETCH — REGISTRO DA TASK
// ─────────────────────────────────────────────

/**
 * Registra a background task para checar plantas com rega atrasada.
 * Deve ser chamada uma única vez no boot do app (ex.: App.tsx ou AuthProvider).
 *
 * O iOS executa com frequência mínima de ~15 min determinada pelo sistema.
 * O Android respeita melhor o intervalo definido em `minimumInterval`.
 *
 * @example
 * // App.tsx
 * useEffect(() => {
 *   configurarBackgroundFetch();
 * }, []);
 */
export async function configurarBackgroundFetch(): Promise<void> {
  // Evita registrar duas vezes
  const jaRegistrada = await TaskManager.isTaskRegisteredAsync(BACKGROUND_TASK_NAME);

  if (jaRegistrada) {
    return;
  }

  try {
    await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
      minimumInterval: 60 * 15,   // a cada 15 minutos (mínimo iOS)
      stopOnTerminate: false,     // mantém ativa mesmo após fechar o app (Android)
      startOnBoot: true,          // reinicia automaticamente após reboot do dispositivo
    });

    console.log('[notificationService] Background fetch registrado com sucesso.');
  } catch (erro) {
    // Em simuladores e web o BackgroundFetch não é suportado — ignora silenciosamente
    console.warn('[notificationService] Background fetch não disponível neste ambiente:', erro);
  }
}

/**
 * Persiste a lista de plantas no AsyncStorage para que a background task
 * consiga lê-la mesmo com o app fechado.
 *
 * Chame esta função sempre que o estado `plantas` do GardenContext mudar.
 *
 * @example
 * // GardenContext.tsx
 * useEffect(() => {
 *   sincronizarPlantasParaBackground(plantas);
 * }, [plantas]);
 */
export async function sincronizarPlantasParaBackground(plantas: Plant[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY_PLANTAS, JSON.stringify(plantas));
  } catch (erro) {
    console.error('[notificationService] Falha ao sincronizar plantas:', erro);
  }
}

// ─────────────────────────────────────────────
// INSTRUÇÕES DE CONFIGURAÇÃO
// ─────────────────────────────────────────────
//
// 1. INSTALAR DEPENDÊNCIAS:
//
//    npx expo install expo-notifications expo-task-manager expo-background-fetch
//
//
// 2. ATUALIZAR app.json — adicione dentro de "plugins" e "android":
//
//    "plugins": [
//      "expo-router",
//      [
//        "expo-notifications",
//        {
//          "icon": "./assets/images/icon.png",
//          "color": "#B8A8FF",
//          "sounds": []
//        }
//      ]
//    ],
//    "android": {
//      ...campos existentes...,
//      "permissions": [
//        "RECEIVE_BOOT_COMPLETED",
//        "SCHEDULE_EXACT_ALARM",
//        "USE_EXACT_ALARM",
//        "POST_NOTIFICATIONS"
//      ]
//    }
//
//
// 3. CHAMAR NO BOOT (App.tsx):
//
//    import {
//      pedirPermissaoNotificacao,
//      configurarBackgroundFetch,
//    } from './src/services/notificationService';
//
//    export default function App() {
//      useEffect(() => {
//        pedirPermissaoNotificacao();
//        configurarBackgroundFetch();
//      }, []);
//      ...
//    }
//
//
// 4. SINCRONIZAR PLANTAS (GardenContext.tsx):
//
//    import { sincronizarPlantasParaBackground } from '../services/notificationService';
//
//    // dentro do GardenProvider, após definir `plantas`:
//    useEffect(() => {
//      sincronizarPlantasParaBackground(plantas);
//    }, [plantas]);
//
//
// 5. AGENDAR REGA (exemplo de uso na tela de cadastro):
//
//    import {
//      agendarNotificacaoRega,
//      cancelarNotificacoesDaPlanta,
//    } from '../services/notificationService';
//
//    const ids = await agendarNotificacaoRega(
//      planta.id,
//      planta.nome,
//      '08:00',
//      [2, 4, 6], // segunda, quarta e sexta
//    );
//    // Guarde `ids` no estado ou AsyncStorage para poder cancelar depois.