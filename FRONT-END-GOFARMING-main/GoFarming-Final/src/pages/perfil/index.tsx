import React from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useGarden } from '../../context/GardenContext';
import styles from './styles';

type Nav = { navigate: (screen: string) => void };

const PerfilPage = () => {
  const navigation = useNavigation<Nav>();
  const { sessao, sair } = useAuth();
  const { plantas, notificacoes } = useGarden();

  const usuario = sessao?.user;
  const nomeCompleto = usuario?.user_metadata?.full_name || usuario?.user_metadata?.name || '';
  const nome = nomeCompleto || usuario?.email?.split('@')[0] || 'Usuário';
  const email = usuario?.email || '';
  const inicial = nome.charAt(0).toUpperCase();

  const naoLidas = notificacoes.filter(n => !n.lida).length;
  const saudaveis = plantas.filter(p => p.saude === 'healthy').length;

  const menuPrincipal = [
    { icone: 'edit-2', label: 'Editar perfil', onPress: () => Alert.alert('Perfil', 'Edição de perfil em breve.') },
    { icone: 'box', label: 'Meu jardim', onPress: () => navigation.navigate('Jardim') },
    { icone: 'bell', label: 'Notificações', onPress: () => navigation.navigate('Notificacoes') },
    { icone: 'clock', label: 'Histórico de cuidados', onPress: () => navigation.navigate('HistoricoCuidados') },
    { icone: 'cpu', label: 'Assistente IA', onPress: () => navigation.navigate('AssistenteIA') },
  ];

  function handleSair() {
    Alert.alert('Sair da conta', 'Deseja encerrar a sessão?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: sair },
    ]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      <View style={styles.cabecalho}>
        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>{inicial}</Text>
        </View>
        <Text style={styles.nome}>{nome}</Text>
        {email !== '' && <Text style={styles.email}>{email}</Text>}
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValor}>{plantas.length}</Text>
          <Text style={styles.statLabel}>plantas</Text>
        </View>
        <View style={styles.statDivisor} />
        <View style={styles.statItem}>
          <Text style={styles.statValor}>{naoLidas}</Text>
          <Text style={styles.statLabel}>alertas</Text>
        </View>
        <View style={styles.statDivisor} />
        <View style={styles.statItem}>
          <Text style={styles.statValor}>{saudaveis}</Text>
          <Text style={styles.statLabel}>saudáveis</Text>
        </View>
      </View>

      <Text style={styles.secaoTitulo}>JARDIM</Text>
      <View style={styles.bloco}>
        {menuPrincipal.map((item, index) => (
          <TouchableOpacity
            key={item.label}
            style={[styles.linha, index === menuPrincipal.length - 1 && styles.linhaUltima]}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.linhaIcone}>
              <Feather name={item.icone as any} size={17} color="#9ab0cf" />
            </View>
            <Text style={styles.linhaTitulo}>{item.label}</Text>
            <Feather name="chevron-right" size={16} color="#3a5070" />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.secaoTitulo}>PREFERÊNCIAS</Text>
      <View style={styles.bloco}>
        <TouchableOpacity
          style={[styles.linha, styles.linhaUltima]}
          onPress={() => navigation.navigate('Config' as never)}
          activeOpacity={0.7}
        >
          <View style={styles.linhaIcone}>
            <Feather name="settings" size={17} color="#9ab0cf" />
          </View>
          <Text style={styles.linhaTitulo}>Configurações</Text>
          <Feather name="chevron-right" size={16} color="#3a5070" />
        </TouchableOpacity>
      </View>

      <Text style={styles.secaoTitulo}>CONTA</Text>
      <View style={styles.bloco}>
        <TouchableOpacity
          style={[styles.linha, styles.linhaUltima]}
          onPress={handleSair}
          activeOpacity={0.7}
        >
          <View style={styles.linhaIcone}>
            <Feather name="log-out" size={17} color="#ef4444" />
          </View>
          <Text style={[styles.linhaTitulo, styles.linhaPerigo]}>Sair da conta</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

export default PerfilPage;
