import React, { useState } from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomTabBar from '../components/CustomTabBar';

// Tab screens
import Painel from '../pages/dashboard';
import Scan from '../pages/scan';
import Config from '../pages/config';
import Perfil from '../pages/perfil';
import MeuJardim from '../pages/jardim';

// Auth screens
import Login from '../pages/login';
import Cadastro from '../pages/cadastro';
import { useAuth } from '../context/AuthContext';

// Extra screens
import AlertasPage from '../pages/alertas';
import AssistentePlantas from '../pages/assistente';
import CadastroPlanta from '../pages/plantas/cadastro';
import DetalhePlanta from '../pages/plantas/detalhe';
import HistoricoCuidados from '../pages/plantas/historico';
import IrrigacaoPlanta from '../pages/plantas/irrigacao';
import SaudePlanta from '../pages/plantas/saude';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabRoutes() {
  return (
    <Tab.Navigator
      tabBar={(props: any) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen name="Home" component={Painel} />
      <Tab.Screen name="Jardim" component={MeuJardim} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Scan" component={Scan} options={{ tabBarButton: () => null }} />
      <Tab.Screen name="Config" component={Config} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabRoutes} />
      <Stack.Screen name="Notificacoes" component={AlertasPage} />
      <Stack.Screen name="AssistenteIA" component={AssistentePlantas} />
      <Stack.Screen name="PlantCadastro" component={CadastroPlanta} />
      <Stack.Screen name="PlantaDetalhe" component={DetalhePlanta} />
      <Stack.Screen name="HistoricoCuidados" component={HistoricoCuidados} />
      <Stack.Screen name="Irrigacao" component={IrrigacaoPlanta} />
      <Stack.Screen name="SaudePlanta" component={SaudePlanta} />
    </Stack.Navigator>
  );
}

export default function Routes() {
  const { sessao, carregando } = useAuth();
  const [modoAutenticacao, definirModoAutenticacao] = useState<'login' | 'cadastro'>('login');

  if (carregando) {
    return <View style={{ flex: 1, backgroundColor: 'black' }} />;
  }

  if (!sessao) {
    if (modoAutenticacao === 'cadastro') {
      return <Cadastro onVoltarParaLogin={() => definirModoAutenticacao('login')} />;
    }
    return <Login onAbrirCadastro={() => definirModoAutenticacao('cadastro')} />;
  }

  return <AppStack />;
}
