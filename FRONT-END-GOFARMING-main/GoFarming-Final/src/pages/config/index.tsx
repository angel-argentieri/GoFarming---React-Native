import React, { useState } from 'react';
import { Alert, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import styles from './styles';

type Nav = { navigate: (screen: string) => void };

const ConfigPage = () => {
  const navigation = useNavigation<Nav>();
  const { sair } = useAuth();

  const [alertasRega, setAlertasRega] = useState(true);
  const [alertasSaude, setAlertasSaude] = useState(true);
  const [sincLocal, setSincLocal] = useState(false);

  function handleSair() {
    Alert.alert('Sair da conta', 'Deseja encerrar a sessão?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: sair },
    ]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Configurações</Text>
      </View>

      <Text style={styles.secaoTitulo}>NOTIFICAÇÕES</Text>
      <View style={styles.bloco}>
        <View style={styles.linhaSwitch}>
          <View style={styles.linhaIcone}>
            <MaterialCommunityIcons name="water-outline" size={18} color="#9ab0cf" />
          </View>
          <View style={styles.linhaTexto}>
            <Text style={styles.linhaTitulo}>Alertas de rega</Text>
            <Text style={styles.linhaSubtitulo}>Aviso quando a umidade estiver baixa</Text>
          </View>
          <Switch
            value={alertasRega}
            onValueChange={setAlertasRega}
            trackColor={{ false: '#1d2d47', true: '#4c1d95' }}
            thumbColor={alertasRega ? '#7c3aed' : '#4a6384'}
          />
        </View>
        <View style={[styles.linhaSwitch, styles.linhaUltima]}>
          <View style={styles.linhaIcone}>
            <Feather name="activity" size={18} color="#9ab0cf" />
          </View>
          <View style={styles.linhaTexto}>
            <Text style={styles.linhaTitulo}>Alertas de saúde</Text>
            <Text style={styles.linhaSubtitulo}>Aviso quando uma planta precisar de atenção</Text>
          </View>
          <Switch
            value={alertasSaude}
            onValueChange={setAlertasSaude}
            trackColor={{ false: '#1d2d47', true: '#4c1d95' }}
            thumbColor={alertasSaude ? '#7c3aed' : '#4a6384'}
          />
        </View>
      </View>

      <Text style={styles.secaoTitulo}>DADOS</Text>
      <View style={styles.bloco}>
        <View style={[styles.linhaSwitch, styles.linhaUltima]}>
          <View style={styles.linhaIcone}>
            <Feather name="refresh-cw" size={18} color="#9ab0cf" />
          </View>
          <View style={styles.linhaTexto}>
            <Text style={styles.linhaTitulo}>Sincronização local</Text>
            <Text style={styles.linhaSubtitulo}>Prepara os dados para integração futura com API</Text>
          </View>
          <Switch
            value={sincLocal}
            onValueChange={setSincLocal}
            trackColor={{ false: '#1d2d47', true: '#4c1d95' }}
            thumbColor={sincLocal ? '#7c3aed' : '#4a6384'}
          />
        </View>
      </View>

      <Text style={styles.secaoTitulo}>NAVEGAÇÃO</Text>
      <View style={styles.bloco}>
        <TouchableOpacity
          style={styles.linha}
          onPress={() => navigation.navigate('Jardim')}
          activeOpacity={0.7}
        >
          <View style={styles.linhaIcone}>
            <MaterialCommunityIcons name="sprout-outline" size={18} color="#9ab0cf" />
          </View>
          <Text style={styles.linhaTitulo}>Meu jardim</Text>
          <Feather name="chevron-right" size={16} color="#3a5070" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.linha, styles.linhaUltima]}
          onPress={() => navigation.navigate('Notificacoes')}
          activeOpacity={0.7}
        >
          <View style={styles.linhaIcone}>
            <Feather name="bell" size={18} color="#9ab0cf" />
          </View>
          <Text style={styles.linhaTitulo}>Notificações</Text>
          <Feather name="chevron-right" size={16} color="#3a5070" />
        </TouchableOpacity>
      </View>

      <Text style={styles.secaoTitulo}>SOBRE</Text>
      <View style={styles.bloco}>
        <View style={styles.linha}>
          <View style={styles.linhaIcone}>
            <Feather name="info" size={18} color="#9ab0cf" />
          </View>
          <Text style={styles.linhaTitulo}>Versão do app</Text>
          <Text style={styles.linhaValor}>1.0.0</Text>
        </View>
        <View style={[styles.linha, styles.linhaUltima]}>
          <View style={styles.linhaIcone}>
            <Feather name="code" size={18} color="#9ab0cf" />
          </View>
          <Text style={styles.linhaTitulo}>GoFarming</Text>
          <Text style={styles.linhaValor}>SENAI</Text>
        </View>
      </View>

      <Text style={styles.secaoTitulo}>CONTA</Text>
      <View style={styles.bloco}>
        <TouchableOpacity
          style={[styles.linha, styles.linhaUltima]}
          onPress={handleSair}
          activeOpacity={0.7}
        >
          <View style={styles.linhaIcone}>
            <Feather name="log-out" size={18} color="#ef4444" />
          </View>
          <Text style={[styles.linhaTitulo, styles.linhaPerigo]}>Sair da conta</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

export default ConfigPage;
