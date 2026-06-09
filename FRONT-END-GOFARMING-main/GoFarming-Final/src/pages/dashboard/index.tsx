import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import Logo from '../../assets/Logo.png';
import { useNavigation } from '@react-navigation/native';
import {
  IconeCamera,
  IconePlanta,
  IconeAlertas,
  IconeExplorar,
} from '../../components/Icones';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 60) / 2;
const COR_NEON = '#B8A8FF';

const Dashboard = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={estilos.container}>
      <StatusBar barStyle="light-content" />

      {/* Cabeçalho */}
      <View style={estilos.cabecalho}>
        <Image source={Logo} style={estilos.logo} resizeMode="contain" />
      </View>

      {/* Grid de ações */}
      <View style={estilos.grid}>
        <View style={estilos.linha}>
          <TouchableOpacity
            style={estilos.card}
            onPress={() => navigation.navigate('Scan')}
          >
            <IconeCamera width={60} height={60} />
            <Text style={estilos.cardTexto}>Escanear Planta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={estilos.card}
            onPress={() => navigation.navigate('Jardim')}
          >
            <IconePlanta width={60} height={60} />
            <Text style={estilos.cardTexto}>Jardim Virtual</Text>
          </TouchableOpacity>
        </View>

        <View style={estilos.linha}>
          <TouchableOpacity
            style={estilos.card}
            onPress={() => navigation.navigate('Notificacoes')}
          >
            <IconeAlertas width={60} height={60} />
            <Text style={estilos.cardTexto}>Ver Alertas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={estilos.card}
            onPress={() => navigation.navigate('Explorar')}
          >
            <IconeExplorar width={60} height={60} />
            <Text style={estilos.cardTexto}>Explorar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  cabecalho: {
    marginTop: 50,
    alignItems: 'center',
    marginBottom: 5,
  },
  logo: {
    width: 250,
    height: 235,
  },
  grid: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: '#000000',
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: COR_NEON,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COR_NEON,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
  cardTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14,
  },
});

export default Dashboard;