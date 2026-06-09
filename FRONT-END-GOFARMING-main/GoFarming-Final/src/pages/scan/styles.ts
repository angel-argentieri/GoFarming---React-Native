// src/pages/scan/styles.ts

import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

// ─────────────────────────────────────────────
// CORES EXPORTADAS
// (mesmo padrão dos outros pages do projeto)
// ─────────────────────────────────────────────

export const COR_NEON           = '#B8A8FF';
export const COR_PRETO_ABSOLUTO = '#000000';
export const COR_BRANCO         = '#FFFFFF';
export const COR_CINZA_CLARO    = '#AAA';
export const COR_VERDE          = '#32d583';
export const COR_ALERTA         = '#FF4C4C';

// ─────────────────────────────────────────────
// CONSTANTES DE LAYOUT
// ─────────────────────────────────────────────

export const FRAME_SIZE  = width * 0.72;
export const CANTO_SIZE  = 22;
export const CANTO_BORDA = 3;

// ─────────────────────────────────────────────
// ESTILOS
// ─────────────────────────────────────────────

export default StyleSheet.create({

  // ── Base ──────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: COR_PRETO_ABSOLUTO,
  },

  // ── Overlay (máscara escura ao redor do frame) ──
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
  },
  overlayBanda: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  overlayMeio: {
    flexDirection: 'row',
    height: FRAME_SIZE,
  },
  overlayLateral: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },

  // ── Frame do scanner ──────────────────────
  frame: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Cantos decorativos — base compartilhada
  canto: {
    position: 'absolute',
    width: CANTO_SIZE,
    height: CANTO_SIZE,
    borderColor: COR_NEON,
  },
  cantoTL: {
    top: 0,
    left: 0,
    borderTopWidth: CANTO_BORDA,
    borderLeftWidth: CANTO_BORDA,
    borderTopLeftRadius: 6,
  },
  cantoTR: {
    top: 0,
    right: 0,
    borderTopWidth: CANTO_BORDA,
    borderRightWidth: CANTO_BORDA,
    borderTopRightRadius: 6,
  },
  cantoBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: CANTO_BORDA,
    borderLeftWidth: CANTO_BORDA,
    borderBottomLeftRadius: 6,
  },
  cantoBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: CANTO_BORDA,
    borderRightWidth: CANTO_BORDA,
    borderBottomRightRadius: 6,
  },

  // ── Laser animado ─────────────────────────
  laser: {
    position: 'absolute',
    width: FRAME_SIZE - 24,
    height: 2,
    backgroundColor: COR_NEON,
    shadowColor: COR_NEON,
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },

  // ── Spinner (fase analisando) ─────────────
  spinnerBox: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 999,
    padding: 20,
  },

  // ── Texto de status ───────────────────────
  statusBox: {
    position: 'absolute',
    bottom: height * 0.22,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  statusTexto: {
    color: COR_BRANCO,
    fontSize: 18,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  statusSub: {
    color: COR_CINZA_CLARO,
    fontSize: 13,
    marginTop: 6,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  // ── Botão de captura ─────────────────────
  capturaWrapper: {
    position: 'absolute',
    bottom: height * 0.06,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  btnCaptura: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 3,
    borderColor: COR_NEON,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COR_NEON,
    shadowOpacity: 0.8,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  btnCapturaInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COR_NEON,
  },

  // ── Card de resultado ────────────────────
  resultadoCard: {
    position: 'absolute',
    bottom: height * 0.06,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(10,10,10,0.92)',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(184,168,255,0.35)',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  thumb: {
    width: 66,
    height: 66,
    borderRadius: 14,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  resultadoInfo: {
    flex: 1,
    gap: 3,
  },
  resultadoNome: {
    color: COR_BRANCO,
    fontSize: 17,
    fontWeight: '800',
  },
  resultadoEspecie: {
    color: COR_CINZA_CLARO,
    fontSize: 12,
    fontStyle: 'italic',
  },
  resultadoBadges: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderWidth: 1,
    borderColor: COR_NEON,
    borderRadius: 999,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  badgeTexto: {
    color: COR_NEON,
    fontSize: 11,
    fontWeight: '700',
  },
  problemaTexto: {
    color: COR_ALERTA,
    fontSize: 11,
    marginTop: 2,
  },
  resultadoAcoes: {
    gap: 8,
    alignItems: 'center',
  },
  btnAdicionar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COR_NEON,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDescartar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Tela de permissão negada ──────────────
  permissaoBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 16,
  },
  permissaoTitulo: {
    color: COR_BRANCO,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  permissaoTexto: {
    color: COR_CINZA_CLARO,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },
  btnPermissao: {
    marginTop: 8,
    backgroundColor: COR_NEON,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
  },
  btnPermissaoTexto: {
    color: COR_PRETO_ABSOLUTO,
    fontWeight: '800',
    fontSize: 15,
  },

  // ── Bottom Sheet ──────────────────────────
  sheetBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  sheetWrapper: {
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#0a0a0a',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1,
    borderColor: 'rgba(184,168,255,0.25)',
    maxHeight: height * 0.88,
    paddingTop: 12,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#333',
    marginBottom: 16,
  },
  sheetScroll: {
    paddingHorizontal: 22,
    paddingBottom: 36,
    gap: 16,
  },
  sheetTitulo: {
    color: COR_BRANCO,
    fontSize: 22,
    fontWeight: '800',
  },
  sheetSub: {
    color: COR_CINZA_CLARO,
    fontSize: 13,
    marginTop: 2,
  },
  sheetGrupo: {
    gap: 8,
  },
  sheetLabel: {
    color: COR_NEON,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  sheetInput: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: 'rgba(184,168,255,0.25)',
    borderRadius: 12,
    color: COR_BRANCO,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  sheetTextArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },

  // ── Horário de rega ───────────────────────
  horarioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horarioInput: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 2,
  },
  horarioHint: {
    color: COR_CINZA_CLARO,
    fontSize: 11,
    marginLeft: 10,
  },

  // ── Dias da semana ────────────────────────
  diasRow: {
    flexDirection: 'row',
    gap: 8,
  },
  diaPill: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  diaPillAtivo: {
    backgroundColor: COR_NEON,
    borderColor: COR_NEON,
  },
  diaPillTexto: {
    color: COR_CINZA_CLARO,
    fontSize: 12,
    fontWeight: '700',
  },
  diaPillTextoAtivo: {
    color: COR_PRETO_ABSOLUTO,
  },
  diasHint: {
    color: '#555',
    fontSize: 10,
    marginTop: 4,
  },

  // ── Resumo de saúde (no sheet) ────────────
  saudeResumo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#0e1010',
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    gap: 10,
  },
  saudeTitulo: {
    fontSize: 13,
    fontWeight: '700',
  },
  saudeProblema: {
    color: COR_CINZA_CLARO,
    fontSize: 12,
    marginTop: 3,
  },

  // ── Botões do sheet ───────────────────────
  sheetBotoes: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  btnCancelar: {
    flex: 1,
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  btnCancelarTexto: {
    color: COR_CINZA_CLARO,
    fontWeight: '700',
    fontSize: 15,
  },
  btnSalvar: {
    flex: 2,
    backgroundColor: COR_NEON,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  btnSalvarTexto: {
    color: COR_PRETO_ABSOLUTO,
    fontWeight: '800',
    fontSize: 15,
  },
});