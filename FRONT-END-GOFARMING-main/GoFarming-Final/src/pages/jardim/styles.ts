import { StyleSheet } from 'react-native';

// Cores e constantes para manter o padrão do projeto
export const COR_NEON = "#B8A8FF"; // Roxo neon
export const COR_ALERTA = "#FF4C4C"; // Vermelho para alertas
export const COR_SAUDAVEL = "#32d583"; // Verde para saudável
export const COR_CINZA_CLARO = "#AAA"; // Cinza claro para subtítulos/textos secundários
export const COR_BRANCO = "#FFFFFF"; // Branco
export const COR_PRETO_ABSOLUTO = "#000000"; // Preto absoluto

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COR_PRETO_ABSOLUTO,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  miniLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  logoText: {
    color: COR_BRANCO,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: COR_BRANCO,
    fontSize: 28,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: COR_PRETO_ABSOLUTO,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COR_NEON,
    shadowColor: COR_NEON,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  addButtonText: {
    color: COR_NEON,
    fontWeight: 'bold',
    fontSize: 14,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Espaço para a TabBar
    gap: 20, // Gap padrão entre os cards
  },
  card: {
    backgroundColor: COR_PRETO_ABSOLUTO,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(184, 168, 255, 0.3)', // Borda sutil para o glow
    shadowColor: COR_NEON,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  cardInternal: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 12,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COR_BRANCO, // Fundo branco para o avatar
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // Garante que a imagem fique dentro do círculo
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  plantName: {
    color: COR_BRANCO,
    fontSize: 16,
    fontWeight: 'bold',
  },
  plantSub: {
    color: COR_CINZA_CLARO,
    fontSize: 12,
    marginVertical: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  healthText: {
    color: COR_CINZA_CLARO,
    fontSize: 11,
    marginTop: 4,
  },
  actionContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
    minHeight: 80, // Garante que o container de ações tenha altura mínima
  },
  iconActions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  iconBtn: {
    alignItems: 'center',
  },
  iconLabel: {
    color: COR_NEON,
    fontSize: 8,
    marginTop: 2,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COR_NEON,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  helpButtonText: {
    color: COR_BRANCO,
    fontSize: 10,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: COR_PRETO_ABSOLUTO,
    paddingTop: 10,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(184, 168, 255, 0.2)', // Linha neon sutil
  },
  footerBrand: {
    color: COR_BRANCO,
    textAlign: 'center',
    fontSize: 10,
    marginBottom: 10,
    opacity: 0.6,
  },
  neonDivider: {
    height: 1,
    backgroundColor: COR_NEON,
    width: '100%',
    marginBottom: 15,
    shadowColor: COR_NEON,
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 10,
    color: COR_CINZA_CLARO,
    marginTop: 4,
  },
  floatingWrapper: {
    position: 'absolute',
    right: 20,
    bottom: 50, // Ajustado para ficar acima da tab bar
    alignItems: 'center',
  },
  floatingButton: {
    backgroundColor: COR_PRETO_ABSOLUTO,
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: COR_NEON,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COR_NEON,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 10,
    zIndex: 5, // Garante que o botão flutuante fique acima de outros elementos
  },
  glowBeam: {
    position: 'absolute',
    bottom: -15, // Posição do feixe de luz abaixo do botão
    width: 70,
    height: 30,
    backgroundColor: COR_NEON,
    opacity: 0.4,
    borderRadius: 50,
    transform: [{ scaleX: 1.8 }],
    shadowColor: COR_NEON,
    shadowRadius: 20,
    shadowOpacity: 1,
    zIndex: 4, // Abaixo do botão flutuante
  },
  // --- Estilos do Modal ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#121212',
    borderRadius: 30,
    padding: 25,
    borderWidth: 1.5,
    borderColor: COR_NEON,
    shadowColor: COR_NEON,
    shadowRadius: 20,
    shadowOpacity: 0.5,
  },
  modalTitle: {
    color: COR_BRANCO,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    color: COR_NEON,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: 'rgba(184, 168, 255, 0.3)',
    borderRadius: 12,
    padding: 12,
    color: COR_BRANCO,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  btnModal: {
    flex: 0.48,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnSalvar: {
    backgroundColor: COR_NEON,
  },
  btnTexto: {
    fontWeight: 'bold',
    fontSize: 16,
  }
});