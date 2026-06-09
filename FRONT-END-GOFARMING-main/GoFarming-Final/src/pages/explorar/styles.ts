import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');

export default StyleSheet.create({

  // ── Base ──────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },

  // ── Permissão ─────────────────────────────
  caixaPermissao: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 16,
  },
  tituloPremissao: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  textoPremissao: {
    color: '#AAA',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },
  botaoPermissao: {
    marginTop: 8,
    backgroundColor: '#B8A8FF',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
  },
  botaoPermissaoTexto: {
    color: '#000',
    fontWeight: '800',
    fontSize: 15,
  },

  // ── Instrução ─────────────────────────────
  instrucao: {
    position: 'absolute',
    bottom: height * 0.22,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  instrucaoTexto: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  instrucaoSub: {
    color: '#CCC',
    fontSize: 13,
    marginTop: 6,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  // ── Loader ────────────────────────────────
  loaderBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  loaderTexto: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // ── Botão de captura ──────────────────────
  botaoCapturaContainer: {
    position: 'absolute',
    bottom: height * 0.06,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  botaoCaptura: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 3,
    borderColor: '#B8A8FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#B8A8FF',
    shadowOpacity: 0.8,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  botaoCapturaInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#B8A8FF',
  },

  // ── Modal ─────────────────────────────────
  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#0a0a0a',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1,
    borderColor: 'rgba(184,168,255,0.25)',
    maxHeight: height * 0.8,
    padding: 22,
    gap: 16,
  },
  modalTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  foto: {
    width: 72,
    height: 72,
    borderRadius: 14,
    backgroundColor: '#111',
  },
  modalInfoTopo: {
    flex: 1,
    gap: 8,
  },
  modalTitulo: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  badgeTexto: {
    fontSize: 13,
    fontWeight: '700',
  },

  // ── Lista de problemas ────────────────────
  scrollProblemas: {
    maxHeight: height * 0.38,
  },
  semProblemas: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 12,
  },
  semProblemasTexto: {
    color: '#CCC',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },
  cardProblema: {
    backgroundColor: '#111',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#222',
    padding: 14,
    marginBottom: 10,
    gap: 6,
  },
  cardProblemaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  problemaNome: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
  },
  problemaConfianca: {
    color: '#B8A8FF',
    fontSize: 13,
    fontWeight: '700',
  },
  problemaDescricao: {
    color: '#AAA',
    fontSize: 13,
    lineHeight: 19,
  },
  problemaTipo: {
    color: '#555',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  // ── Botão fechar ──────────────────────────
  botaoFechar: {
    backgroundColor: '#B8A8FF',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  botaoFecharTexto: {
    color: '#000',
    fontWeight: '800',
    fontSize: 15,
  },
});