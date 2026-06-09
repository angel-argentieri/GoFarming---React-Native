import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  StatusBar, 
  SafeAreaView,
  Image,
  Dimensions,
  Modal,
  TextInput,
  Alert
} from 'react-native';
import Logo from '../../assets/Logo.png';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { 
  IconeCamera, 
  IconePlanta, 
  IconeAlertas, 
  IconeExplorar 
} from '../../components/Icones';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 60) / 2;
const COR_NEON = "#B8A8FF"; // Roxo neon do projeto

const Dashboard = () => {
  const navigation = useNavigation<any>();
  const [modalVisivel, setModalVisivel] = useState(false);
  const [nomePlanta, setNomePlanta] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [diasRega, setDiasRega] = useState('');

  const handleSalvarPlanta = () => {
    if (!nomePlanta || !localizacao) {
      Alert.alert("Erro", "Preencha o nome e o local!");
      return;
    }
    Alert.alert("Sucesso", `${nomePlanta} cadastrada!`);
    setModalVisivel(false);
    setNomePlanta('');
    setLocalizacao('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* 2. Cabeçalho (Header) */}
      <View style={styles.header}>
        <Image 
          source={Logo} 
          style={styles.logo} 
          resizeMode="contain" 
        />
      </View>

      {/* 3. Grid Central */}
      <View style={styles.gridSection}>
        <View style={styles.gridRow}>
          <TouchableOpacity 
            style={styles.menuCard} 
            onPress={() => navigation.navigate('Scan')}
          >
            <IconeCamera width={60} height={60} />
            <Text style={styles.cardLabel}>Escanear Planta</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuCard}
            onPress={() => navigation.navigate('Jardim')}
          >
            <IconePlanta width={60} height={60} />
            <Text style={styles.cardLabel}>Jardim Virtual</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gridRow}>
          <TouchableOpacity 
            style={styles.menuCard}
            onPress={() => navigation.navigate('Notificacoes')}
          >
            <IconeAlertas width={60} height={60} />
            <Text style={styles.cardLabel}>Ver Alertas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuCard}
            onPress={() => navigation.navigate('Explorar')}
          >
            <IconeExplorar width={60} height={60} />
            <Text style={styles.cardLabel}>Explorar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 4. Rodapé e Barra de Navegação */}
      <View style={styles.footerContainer}>
        <View style={styles.neonDivider} />
        
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabButton}>
            <Ionicons name="leaf-outline" size={24} color="#FFF" />
            <Text style={styles.tabLabel}>Jardim</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.tabButton}>
            <Ionicons name="notifications-outline" size={24} color="#FFF" />
            <Text style={styles.tabLabel}>Alertas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabButton}>
            <Ionicons name="compass-outline" size={24} color="#FFF" />
            <Text style={styles.tabLabel}>Explorar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabButton}>
            <Ionicons name="settings-outline" size={24} color="#FFF" />
            <Text style={styles.tabLabel}>Config</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabButton}>
            <Ionicons name="person-outline" size={24} color="#FFF" />
            <Text style={styles.tabLabel}>Login</Text>
          </TouchableOpacity>
        </View>
        
        {/* MODAL DE ADIÇÃO (DASHBOARD) */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisivel}
          onRequestClose={() => setModalVisivel(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Adicionar ao Jardim</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome</Text>
                <TextInput 
                  style={styles.input} 
                  placeholderTextColor="#666"
                  value={nomePlanta}
                  onChangeText={setNomePlanta}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Onde fica?</Text>
                <TextInput 
                  style={styles.input} 
                  placeholderTextColor="#666"
                  value={localizacao}
                  onChangeText={setLocalizacao}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Frequência de Rega</Text>
                <TextInput 
                  style={styles.input} 
                  placeholderTextColor="#666"
                  value={diasRega}
                  onChangeText={setDiasRega}
                />
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity style={[styles.btnModal, styles.btnSalvar]} onPress={handleSalvarPlanta}>
                  <Text style={{fontWeight:'bold'}}>Salvar Planta</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisivel(false)}>
                  <Text style={{color:'#FFF', marginTop: 15, textAlign:'center'}}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Destaque flutuante (Leaf fill icon) */}
        <View style={styles.floatingWrapper}>
          <View style={styles.glowBeam} />
          <TouchableOpacity 
            style={styles.floatingHighlight}
            onPress={() => setModalVisivel(true)}
          >
            <Ionicons name="leaf" size={26} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    marginTop: 50,
    alignItems: 'center',
    marginBottom: 5,

  },
  logo: {
    width: 250,
    height: 235,
  },
  brandWrapper: {
    marginTop: 5,
  },
  brandName: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    textShadowColor: 'rgba(184, 168, 255, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  gridSection: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  menuCard: {
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
  cardLabel: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14,
  },
  footerContainer: {
    width: '100%',
    paddingBottom: 15,
  },
  footerBrandName: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 8,
    opacity: 0.8,
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
  tabButton: {
    alignItems: 'center',
  },
  tabLabel: {
    color: '#888',
    fontSize: 10,
    marginTop: 4,
  },
  floatingWrapper: {
    position: 'absolute',
    right: 25,
    bottom: 50,
    alignItems: 'center',
  },
  floatingHighlight: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: COR_NEON,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  glowBeam: {
    position: 'absolute',
    bottom: -15,
    width: 70,
    height: 30,
    backgroundColor: COR_NEON,
    opacity: 0.4,
    borderRadius: 50,
    transform: [{ scaleX: 1.8 }],
    shadowColor: COR_NEON,
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  // Estilos rápidos do Modal para o Dashboard
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#111',
    padding: 25,
    borderRadius: 25,
    borderColor: COR_NEON,
    borderWidth: 1,
  },
  modalTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  inputGroup: { marginBottom: 15 },
  label: { color: COR_NEON, fontSize: 12, marginBottom: 5 },
  input: {
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 10,
    color: '#FFF',
    borderWidth: 0.5,
    borderColor: '#333'
  },
  modalButtons: { marginTop: 10 },
  btnModal: { padding: 15, borderRadius: 10, alignItems: 'center' },
  btnSalvar: { backgroundColor: COR_NEON }
});

export default Dashboard;