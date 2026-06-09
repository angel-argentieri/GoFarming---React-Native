import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Image,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles, {
  COR_NEON,
  COR_ALERTA,
  COR_SAUDAVEL,
  COR_CINZA_CLARO,
  COR_BRANCO,
  COR_PRETO_ABSOLUTO
} from './styles';

const MeuJardim = () => {
  const navigation = useNavigation<any>();
  
  // Estados para o Modal e Formulário
  const [modalVisivel, setModalVisivel] = useState(false);
  const [nomePlanta, setNomePlanta] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [diasRega, setDiasRega] = useState('');

  // Dados fictícios para simular a lista de plantas
  const plantas = [
    {
      id: '1',
      nome: 'Samambaia Renda Portuguesa',
      local: 'Vaso varanda',
      saude: 'Saudável',
      saudePercentual: 95,
      regaStatus: 'Rega pendente (2 dias)',
      regaAlerta: true,
      imagem: 'https://via.placeholder.com/60/FFFFFF/000000?text=S', // Placeholder para imagem
    },
    {
      id: '2',
      nome: 'Jiboia Prateada',
      local: 'Vaso sala',
      saude: 'Excelente',
      saudePercentual: 100,
      regaStatus: 'Rega em dia',
      regaAlerta: false,
      imagem: 'https://via.placeholder.com/60/FFFFFF/000000?text=J', // Placeholder para imagem
    },
    {
      id: '3',
      nome: 'Costela de Adão',
      local: 'Jardim de inverno',
      saude: 'Atenção',
      saudePercentual: 60,
      regaStatus: 'Rega pendente (hoje)',
      regaAlerta: true,
      imagem: 'https://via.placeholder.com/60/FFFFFF/000000?text=C', // Placeholder para imagem
    },
    {
      id: '4',
      nome: 'Suculenta Echeveria',
      local: 'Janela da cozinha',
      saude: 'Saudável',
      saudePercentual: 88,
      regaStatus: 'Rega em 5 dias',
      regaAlerta: false,
      imagem: 'https://via.placeholder.com/60/FFFFFF/000000?text=E', // Placeholder para imagem
    },
  ];

  const handleSalvarPlanta = () => {
    if (!nomePlanta || !localizacao) {
      Alert.alert("Erro", "Por favor, preencha o nome e a localização!");
      return;
    }
    Alert.alert("Sucesso", `${nomePlanta} foi adicionada ao seu jardim!`);
    setModalVisivel(false);
    setNomePlanta('');
    setLocalizacao('');
    setDiasRega('');
  };

  const getCorSaude = (percentual: number) => {
    if (percentual >= 75) {
      return COR_SAUDAVEL;
    }
    if (percentual >= 45) {
      return "#fdb022"; // Laranja/Amarelo para atenção
    }
    return COR_ALERTA; // Vermelho para crítica
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COR_PRETO_ABSOLUTO} />

      {/* 1. Header (Topo) */}
      <View style={styles.header}>
        <View style={styles.miniLogo}>
          <Ionicons name="leaf" size={16} color={COR_NEON} />
          <Text style={styles.logoText}>GoFarming</Text>
        </View>

        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Meu Jardim</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Lista de Cards (Conteúdo Principal) */}
      <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
        {plantas.map((planta) => (
          <View key={planta.id} style={styles.card}>
            <View style={styles.cardInternal}>
              {/* Coluna Esquerda: Imagem */}
              <View style={styles.avatarContainer}>
                {planta.imagem ? (
                  <Image source={{ uri: planta.imagem }} style={styles.avatarImage} />
                ) : (
                  <Ionicons name="leaf" size={30} color={COR_PRETO_ABSOLUTO} />
                )}
              </View>

              {/* Coluna do Meio: Infos */}
              <View style={styles.infoContainer}>
                <Text style={styles.plantName}>{planta.nome}</Text>
                <Text style={styles.plantSub}>{planta.local} / {planta.saude}</Text>

                <View style={styles.statusRow}>
                  <Ionicons
                    name={planta.regaAlerta ? "alert-circle" : "water"}
                    size={16}
                    color={planta.regaAlerta ? COR_ALERTA : COR_NEON}
                  />
                  <Text style={[
                    styles.statusText,
                    { color: planta.regaAlerta ? COR_ALERTA : COR_NEON }
                  ]}>
                    {planta.regaStatus}
                  </Text>
                </View>

                <Text style={styles.healthText}>Saúde: {planta.saude} ({planta.saudePercentual}%)</Text>
              </View>

              {/* Coluna Direita: Ações */}
              <View style={styles.actionContainer}>
                <View style={styles.iconActions}>
                  <TouchableOpacity style={styles.iconBtn}>
                    <MaterialCommunityIcons name="watering-can-outline" size={22} color={COR_NEON} />
                    <Text style={styles.iconLabel}>Regar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconBtn}>
                    <Ionicons name="information-circle-outline" size={22} color={COR_NEON} />
                    <Text style={styles.iconLabel}>Info</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.helpButton}>
                  <Ionicons name="leaf" size={14} color={COR_SAUDAVEL} style={{ marginRight: 4 }} />
                  <Text style={styles.helpButtonText}>Tirar Dúvidas</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* MODAL DE ADIÇÃO */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nova Planta</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nome da Planta</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Ex: Samambaia Renda" 
                placeholderTextColor="#666"
                value={nomePlanta}
                onChangeText={setNomePlanta}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Onde ela fica?</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Ex: Varanda / Quarto" 
                placeholderTextColor="#666"
                value={localizacao}
                onChangeText={setLocalizacao}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Dias de Rega</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Ex: Seg, Qua, Sex" 
                placeholderTextColor="#666"
                value={diasRega}
                onChangeText={setDiasRega}
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.btnModal} onPress={() => setModalVisivel(false)}>
                <Text style={{color: '#FFF'}}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnModal, styles.btnSalvar]} onPress={handleSalvarPlanta}>
                <Text style={styles.btnTexto}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 3. Bottom Navigation Bar */}
      <View style={styles.footer}>
        <Text style={styles.footerBrand}>GoFarming</Text>
        <View style={styles.neonDivider} />

        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="leaf" size={24} color={COR_BRANCO} />
            <Text style={[styles.tabLabel, { color: COR_BRANCO }]}>Jardim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="notifications-outline" size={24} color={COR_CINZA_CLARO} />
            <Text style={styles.tabLabel}>Alertas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="compass-outline" size={24} color={COR_CINZA_CLARO} />
            <Text style={styles.tabLabel}>Explorar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="settings-outline" size={24} color={COR_CINZA_CLARO} />
            <Text style={styles.tabLabel}>Config</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="cube-outline" size={24} color={COR_CINZA_CLARO} />
            <Text style={styles.tabLabel}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Floating Button / Destaque */}
        <View style={styles.floatingWrapper}>
          <View style={styles.glowBeam} />
          <TouchableOpacity 
            style={styles.floatingButton}
            onPress={() => setModalVisivel(true)}
          >
            <Ionicons name="leaf" size={26} color={COR_BRANCO} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MeuJardim;