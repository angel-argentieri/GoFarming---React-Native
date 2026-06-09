import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../global/themes'; 

const { width } = Dimensions.get('window');
const tam = (width - 60) / 2; 

export const estilos = StyleSheet.create({
  botao: {
    width: tam,
    height: tam,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: theme.colors.primary, 
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
  icone: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  texto: {
    color: theme.colors.secondary, 
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});