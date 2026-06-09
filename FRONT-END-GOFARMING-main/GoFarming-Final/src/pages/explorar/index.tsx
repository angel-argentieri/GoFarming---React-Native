import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { verificarSaude, ResultadoSaude } from '../../services/cropHealthService';
import estilos from './styles';

// ─── Tipos ───────────────────────────────────
type Fase = 'camera' | 'analisando' | 'resultado';

// ─── Helpers ─────────────────────────────────
function corDoStatus(status: ResultadoSaude['status']): string {
  if (status === 'healthy') return '#32d583';
  if (status === 'attention') return '#fdb022';
  return '#FF4C4C';
}

function textoDoStatus(status: ResultadoSaude['status']): string {
  if (status === 'healthy') return 'Saudável';
  if (status === 'attention') return 'Atenção';
  return 'Crítico';
}

// ─── Componente ───────────────────────────────
export default function Explorar() {
  const cameraRef = useRef<CameraView>(null);
  const [permissao, pedirPermissao] = useCameraPermissions();
  const [fase, setFase] = useState<Fase>('camera');
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [resultado, setResultado] = useState<ResultadoSaude | null>(null);
  const [modalVisivel, setModalVisivel] = useState(false);

  async function capturarEAnalisar() {
    if (!cameraRef.current || fase !== 'camera') return;

    try {
      setFase('analisando');

      const foto = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.75,
        skipProcessing: true,
      });

      if (!foto?.base64) {
        throw new Error('Não foi possível obter a imagem.');
      }

      setFotoUri(foto.uri);

      const saude = await verificarSaude(foto.base64);

      setResultado(saude);
      setFase('resultado');
      setModalVisivel(true);
    } catch (erro) {
      const mensagem = erro instanceof Error ? erro.message : 'Erro desconhecido.';
      setFase('camera');
      Alert.alert('Não foi possível analisar', mensagem);
    }
  }

  function fecharModal() {
    setModalVisivel(false);
    setFase('camera');
    setFotoUri(null);
    setResultado(null);
  }

  // ── Permissão negada ──
  if (!permissao) return <View style={estilos.container} />;

  if (!permissao.granted) {
    return (
      <View style={estilos.container}>
        <View style={estilos.caixaPermissao}>
          <Ionicons name="camera-outline" size={60} color="#B8A8FF" />
          <Text style={estilos.tituloPremissao}>Câmera necessária</Text>
          <Text style={estilos.textoPremissao}>
            Para analisar a saúde da planta, o app precisa de acesso à câmera.
          </Text>
          <TouchableOpacity style={estilos.botaoPermissao} onPress={pedirPermissao}>
            <Text style={estilos.botaoPermissaoTexto}>Permitir câmera</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ── Tela principal ──
  return (
    <View style={estilos.container}>

      {/* Câmera */}
      <CameraView ref={cameraRef} style={estilos.camera} facing="back" />

      {/* Instrução */}
      {fase === 'camera' && (
        <View style={estilos.instrucao}>
          <Text style={estilos.instrucaoTexto}>Aponte para uma planta</Text>
          <Text style={estilos.instrucaoSub}>e toque no botão para analisar a saúde</Text>
        </View>
      )}

      {/* Loader */}
      {fase === 'analisando' && (
        <View style={estilos.loaderBox}>
          <ActivityIndicator size="large" color="#B8A8FF" />
          <Text style={estilos.loaderTexto}>Analisando saúde da planta…</Text>
        </View>
      )}

      {/* Botão de captura */}
      {fase === 'camera' && (
        <View style={estilos.botaoCapturaContainer}>
          <TouchableOpacity style={estilos.botaoCaptura} onPress={capturarEAnalisar}>
            <View style={estilos.botaoCapturaInner} />
          </TouchableOpacity>
        </View>
      )}

      {/* Modal de resultado */}
      <Modal
        visible={modalVisivel}
        animationType="slide"
        transparent
        onRequestClose={fecharModal}
      >
        <View style={estilos.modalFundo}>
          <View style={estilos.modal}>

            {/* Foto + status */}
            <View style={estilos.modalTopo}>
              {fotoUri && (
                <Image source={{ uri: fotoUri }} style={estilos.foto} />
              )}
              <View style={estilos.modalInfoTopo}>
                <Text style={estilos.modalTitulo}>Resultado da análise</Text>
                {resultado && (
                  <View style={[estilos.badge, { borderColor: corDoStatus(resultado.status) }]}>
                    <MaterialCommunityIcons
                      name="heart-pulse"
                      size={14}
                      color={corDoStatus(resultado.status)}
                    />
                    <Text style={[estilos.badgeTexto, { color: corDoStatus(resultado.status) }]}>
                      {textoDoStatus(resultado.status)}
                    </Text>
                    <Text style={[estilos.badgeTexto, { color: corDoStatus(resultado.status) }]}>
                      {resultado && `· ${Math.round(resultado.confianca * 100)}% saudável`}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* Problemas detectados */}
            <ScrollView
              style={estilos.scrollProblemas}
              showsVerticalScrollIndicator={false}
            >
              {resultado?.problemas.length === 0 && (
                <View style={estilos.semProblemas}>
                  <Ionicons name="checkmark-circle" size={36} color="#32d583" />
                  <Text style={estilos.semProblemasTexto}>
                    Nenhum problema detectado. Planta aparentemente saudável!
                  </Text>
                </View>
              )}

              {resultado?.problemas.map((problema) => (
                <View key={problema.nome} style={estilos.cardProblema}>
                  <View style={estilos.cardProblemaHeader}>
                    <Text style={estilos.problemaNome}>{problema.nome}</Text>
                    <Text style={estilos.problemaConfianca}>
                      {Math.round(problema.confianca * 100)}%
                    </Text>
                  </View>
                  <Text style={estilos.problemaDescricao}>{problema.descricao}</Text>
                  <Text style={estilos.problemaTipo}>
                    {problema.tipo === 'disease' && 'Doença'}
                    {problema.tipo === 'pest' && 'Praga'}
                    {problema.tipo === 'abiotic' && 'Fator ambiental'}
                    {problema.tipo === 'other' && 'Outro'}
                  </Text>
                </View>
              ))}
            </ScrollView>

            {/* Botão fechar */}
            <TouchableOpacity style={estilos.botaoFechar} onPress={fecharModal}>
              <Text style={estilos.botaoFecharTexto}>Fechar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </View>
  );
}