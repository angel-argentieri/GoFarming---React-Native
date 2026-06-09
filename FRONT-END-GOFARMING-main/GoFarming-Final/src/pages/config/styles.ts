import { StyleSheet } from 'react-native';

const cores = {
  fundo: '#09111f',
  superficie: '#101a2d',
  borda: '#1d2d47',
  texto: '#ecf3ff',
  textoSecundario: '#9ab0cf',
  destaque: '#7c3aed',
  perigo: '#ef4444',
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  content: {
    paddingBottom: 48,
  },

  // Cabeçalho
  cabecalho: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 20,
  },
  titulo: {
    color: cores.texto,
    fontSize: 28,
    fontWeight: '800',
  },

  // Seção
  secaoTitulo: {
    color: '#4a6384',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 6,
    marginTop: 8,
    paddingHorizontal: 20,
  },

  // Bloco
  bloco: {
    backgroundColor: cores.superficie,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: cores.borda,
    marginBottom: 24,
  },

  // Linha com chevron
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
    gap: 14,
  },

  // Linha com Switch
  linhaSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
    gap: 14,
  },

  linhaUltima: {
    borderBottomWidth: 0,
  },
  linhaIcone: {
    width: 28,
    alignItems: 'center',
  },
  linhaTexto: {
    flex: 1,
  },
  linhaTitulo: {
    flex: 1,
    color: cores.texto,
    fontSize: 15,
  },
  linhaSubtitulo: {
    color: cores.textoSecundario,
    fontSize: 12,
    marginTop: 2,
    lineHeight: 17,
  },
  linhaValor: {
    color: cores.textoSecundario,
    fontSize: 14,
  },
  linhaPerigo: {
    color: cores.perigo,
  },
});
