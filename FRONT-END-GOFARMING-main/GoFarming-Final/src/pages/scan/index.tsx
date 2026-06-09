// src/pages/scan/index.tsx
//
// Dependências já instaladas no projeto:
//   expo-camera  ✓  (já está no package.json)
//
// Serviços que este arquivo importa (coloque-os em src/services/):
//   plantIdService.ts      → identificarPlanta()
//   cropHealthService.ts   → verificarSaude()
//   notificationService.ts → agendarNotificacaoRega(), DiaDaSemana

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { useGarden } from '../../context/GardenContext';
import { identificarPlanta, ResultadoIdentificacao } from '../../services/plantIdService';
import { verificarSaude, ResultadoSaude } from '../../services/cropHealthService';
import { agendarNotificacaoRega, DiaDaSemana } from '../../services/notificationService';
import styles, {
  COR_NEON,
  COR_PRETO_ABSOLUTO,
  COR_CINZA_CLARO,
  COR_VERDE,
  COR_ALERTA,
  FRAME_SIZE,
} from './styles';

// ─────────────────────────────────────────────
// TIPOS INTERNOS
// ─────────────────────────────────────────────

type FaseScanner =
  | 'idle'       // câmera ativa, aguardando captura
  | 'analisando' // chamadas em paralelo para as APIs
  | 'resultado'; // exibe card de resultado

type DiaConfig = {
  label: string;
  valor: DiaDaSemana;
};

// ─────────────────────────────────────────────
// DADOS ESTÁTICOS
// ─────────────────────────────────────────────

const DIAS: DiaConfig[] = [
  { label: 'D', valor: 1 },
  { label: 'S', valor: 2 },
  { label: 'T', valor: 3 },
  { label: 'Q', valor: 4 },
  { label: 'Q', valor: 5 },
  { label: 'S', valor: 6 },
  { label: 'S', valor: 7 },
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function corStatus(status: ResultadoSaude['status']): string {
  if (status === 'healthy')   return COR_VERDE;
  if (status === 'attention') return '#fdb022';
  return COR_ALERTA;
}

function labelStatus(status: ResultadoSaude['status']): string {
  if (status === 'healthy')   return 'Saudável';
  if (status === 'attention') return 'Atenção';
  return 'Crítico';
}

// ─────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────

export default function ScanIA() {
  const { adicionarPlanta } = useGarden();
  const [permissao, pedirPermissao] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  // Estado do fluxo
  const [fase, setFase]           = useState<FaseScanner>('idle');
  const [fotoUri, setFotoUri]     = useState<string | null>(null);
  const [identificacao, setIdent] = useState<ResultadoIdentificacao | null>(null);
  const [saude, setSaude]         = useState<ResultadoSaude | null>(null);

  // Bottom sheet "Adicionar ao jardim"
  const [sheetVisivel, setSheetVisivel] = useState(false);
  const [nomeEdit, setNomeEdit]         = useState('');
  const [especieEdit, setEspecieEdit]   = useState('');
  const [localEdit, setLocalEdit]       = useState('');
  const [obsEdit, setObsEdit]           = useState('');
  const [horarioRega, setHorarioRega]   = useState('08:00');
  const [diasSelecionados, setDias]     = useState<DiaDaSemana[]>([2, 4, 6]);
  const [salvando, setSalvando]         = useState(false);

  // Animação da linha laser
  const laserAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (fase === 'idle') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(laserAnim, { toValue: 1, duration: 1800, useNativeDriver: true }),
          Animated.timing(laserAnim, { toValue: 0, duration: 1800, useNativeDriver: true }),
        ]),
      ).start();
    } else {
      laserAnim.stopAnimation();
    }
  }, [fase]);

  const laserTranslate = laserAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-FRAME_SIZE / 2 + 8, FRAME_SIZE / 2 - 8],
  });

  // ── Captura e análise ──────────────────────

  const capturar = useCallback(async () => {
    if (!cameraRef.current || fase !== 'idle') return;

    try {
      setFase('analisando');

      const foto = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.75,
        skipProcessing: true,
      });

      if (!foto?.base64) throw new Error('Não foi possível obter os dados da imagem.');

      setFotoUri(foto.uri);

      const [resultIdent, resultSaude] = await Promise.all([
        identificarPlanta(foto.base64),
        verificarSaude(foto.base64),
      ]);

      setIdent(resultIdent);
      setSaude(resultSaude);
      setFase('resultado');

      // Pré-preenche o bottom sheet
      setNomeEdit(resultIdent.nome);
      setEspecieEdit(resultIdent.especie);
      setObsEdit('');
      setLocalEdit('');
    } catch (erro) {
      const msg = erro instanceof Error ? erro.message : 'Erro desconhecido.';
      setFase('idle');
      Alert.alert('Não foi possível analisar', msg);
    }
  }, [fase]);

  // ── Toggle dia da semana ───────────────────

  const toggleDia = useCallback((dia: DiaDaSemana) => {
    setDias((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia],
    );
  }, []);

  // ── Salvar no jardim + agendar notificação ─

  const salvarNoJardim = useCallback(async () => {
    if (!nomeEdit.trim()) {
      Alert.alert('Campo obrigatório', 'Informe o nome da planta.');
      return;
    }
    if (diasSelecionados.length === 0) {
      Alert.alert('Selecione os dias', 'Escolha ao menos um dia de rega.');
      return;
    }

    try {
      setSalvando(true);

      adicionarPlanta({
        nome: nomeEdit.trim(),
        especie: especieEdit.trim(),
        local: localEdit.trim(),
        observacao: obsEdit.trim(),
      });

      await agendarNotificacaoRega(
        `planta-${Date.now()}`,
        nomeEdit.trim(),
        horarioRega,
        diasSelecionados,
      );

      setSheetVisivel(false);
      setFase('idle');
      setFotoUri(null);
      setIdent(null);
      setSaude(null);

      Alert.alert(
        '🌱 Adicionada!',
        `${nomeEdit.trim()} foi salva no seu jardim e as notificações foram agendadas.`,
      );
    } catch (erro) {
      const msg = erro instanceof Error ? erro.message : 'Erro ao salvar.';
      Alert.alert('Erro', msg);
    } finally {
      setSalvando(false);
    }
  }, [nomeEdit, especieEdit, localEdit, obsEdit, horarioRega, diasSelecionados, adicionarPlanta]);

  // ── Permissão ──────────────────────────────

  if (!permissao) return <View style={styles.container} />;

  if (!permissao.granted) {
    return (
      <View style={styles.container}>
        <View style={styles.permissaoBox}>
          <Ionicons name="camera-outline" size={64} color={COR_NEON} />
          <Text style={styles.permissaoTitulo}>Câmera necessária</Text>
          <Text style={styles.permissaoTexto}>
            Para identificar plantas, o GoFarming precisa de acesso à câmera.
          </Text>
          <TouchableOpacity style={styles.btnPermissao} onPress={pedirPermissao}>
            <Text style={styles.btnPermissaoTexto}>Conceder acesso</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ─────────────────────────────────────────────
  // RENDER PRINCIPAL
  // ─────────────────────────────────────────────

  return (
    <View style={styles.container}>

      {/* ── Câmera real ── */}
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing="back"
        animateShutter={false}
      />

      {/* ── Overlay (máscara ao redor do frame) ── */}
      <View style={styles.overlay} pointerEvents="none">
        <View style={styles.overlayBanda} />

        <View style={styles.overlayMeio}>
          <View style={styles.overlayLateral} />

          {/* Frame do scanner */}
          <View style={styles.frame}>
            <View style={[styles.canto, styles.cantoTL]} />
            <View style={[styles.canto, styles.cantoTR]} />
            <View style={[styles.canto, styles.cantoBL]} />
            <View style={[styles.canto, styles.cantoBR]} />

            {/* Laser — só em idle */}
            {fase === 'idle' && (
              <Animated.View
                style={[styles.laser, { transform: [{ translateY: laserTranslate }] }]}
              />
            )}

            {/* Spinner — durante análise */}
            {fase === 'analisando' && (
              <View style={styles.spinnerBox}>
                <ActivityIndicator size="large" color={COR_NEON} />
              </View>
            )}
          </View>

          <View style={styles.overlayLateral} />
        </View>

        <View style={styles.overlayBanda} />
      </View>

      {/* ── Texto de status ── */}
      {fase !== 'resultado' && (
        <View style={styles.statusBox} pointerEvents="none">
          <Text style={styles.statusTexto}>
            {fase === 'analisando' ? 'Analisando com IA…' : 'Aponte para uma planta'}
          </Text>
          {fase === 'idle' && (
            <Text style={styles.statusSub}>Centralize a planta no quadro e toque no botão</Text>
          )}
        </View>
      )}

      {/* ── Botão de captura ── */}
      {fase === 'idle' && (
        <View style={styles.capturaWrapper}>
          <TouchableOpacity style={styles.btnCaptura} onPress={capturar} activeOpacity={0.8}>
            <View style={styles.btnCapturaInner} />
          </TouchableOpacity>
        </View>
      )}

      {/* ── Card de resultado ── */}
      {fase === 'resultado' && identificacao && saude && (
        <View style={styles.resultadoCard}>
          {fotoUri ? (
            <Image source={{ uri: fotoUri }} style={styles.thumb} />
          ) : (
            <View style={[styles.thumb, { backgroundColor: '#111' }]}>
              <Ionicons name="leaf" size={28} color={COR_NEON} />
            </View>
          )}

          <View style={styles.resultadoInfo}>
            <Text style={styles.resultadoNome} numberOfLines={1}>
              {identificacao.nome}
            </Text>
            <Text style={styles.resultadoEspecie} numberOfLines={1}>
              {identificacao.especie}
            </Text>

            <View style={styles.resultadoBadges}>
              <View style={styles.badge}>
                <Ionicons name="search" size={11} color={COR_NEON} />
                <Text style={styles.badgeTexto}>
                  {Math.round(identificacao.confianca * 100)}%
                </Text>
              </View>
              <View style={[styles.badge, { borderColor: corStatus(saude.status) }]}>
                <MaterialCommunityIcons name="heart-pulse" size={11} color={corStatus(saude.status)} />
                <Text style={[styles.badgeTexto, { color: corStatus(saude.status) }]}>
                  {labelStatus(saude.status)}
                </Text>
              </View>
            </View>

            {saude.problemas.length > 0 && (
              <Text style={styles.problemaTexto} numberOfLines={1}>
                ⚠ {saude.problemas[0].nome}
                {saude.problemas.length > 1 && ` +${saude.problemas.length - 1}`}
              </Text>
            )}
          </View>

          <View style={styles.resultadoAcoes}>
            <TouchableOpacity
              style={styles.btnAdicionar}
              onPress={() => setSheetVisivel(true)}
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={20} color={COR_PRETO_ABSOLUTO} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnDescartar}
              onPress={() => { setFase('idle'); setFotoUri(null); }}
              activeOpacity={0.8}
            >
              <Ionicons name="close" size={18} color={COR_CINZA_CLARO} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* ── Bottom Sheet: Adicionar ao jardim ── */}
      <Modal
        visible={sheetVisivel}
        animationType="slide"
        transparent
        onRequestClose={() => setSheetVisivel(false)}
      >
        <Pressable style={styles.sheetBackdrop} onPress={() => setSheetVisivel(false)} />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.sheetWrapper}
        >
          <View style={styles.sheet}>
            <View style={styles.sheetHandle} />

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.sheetScroll}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.sheetTitulo}>Adicionar ao jardim</Text>
              <Text style={styles.sheetSub}>Confirme os dados identificados pela IA</Text>

              {/* Campos */}
              <View style={styles.sheetGrupo}>
                <Text style={styles.sheetLabel}>NOME DA PLANTA</Text>
                <TextInput
                  style={styles.sheetInput}
                  value={nomeEdit}
                  onChangeText={setNomeEdit}
                  placeholderTextColor={COR_CINZA_CLARO}
                  placeholder="Ex.: Costela-de-Adão"
                />
              </View>

              <View style={styles.sheetGrupo}>
                <Text style={styles.sheetLabel}>ESPÉCIE</Text>
                <TextInput
                  style={styles.sheetInput}
                  value={especieEdit}
                  onChangeText={setEspecieEdit}
                  placeholderTextColor={COR_CINZA_CLARO}
                  placeholder="Ex.: Monstera deliciosa"
                />
              </View>

              <View style={styles.sheetGrupo}>
                <Text style={styles.sheetLabel}>LOCAL</Text>
                <TextInput
                  style={styles.sheetInput}
                  value={localEdit}
                  onChangeText={setLocalEdit}
                  placeholderTextColor={COR_CINZA_CLARO}
                  placeholder="Ex.: Varanda, Sala…"
                />
              </View>

              <View style={styles.sheetGrupo}>
                <Text style={styles.sheetLabel}>OBSERVAÇÃO</Text>
                <TextInput
                  style={[styles.sheetInput, styles.sheetTextArea]}
                  value={obsEdit}
                  onChangeText={setObsEdit}
                  placeholderTextColor={COR_CINZA_CLARO}
                  placeholder="Dicas de cuidado, luz preferida…"
                  multiline
                />
              </View>

              {/* Horário de rega */}
              <View style={styles.sheetGrupo}>
                <Text style={styles.sheetLabel}>HORÁRIO DA NOTIFICAÇÃO DE REGA</Text>
                <View style={styles.horarioRow}>
                  <Ionicons name="time-outline" size={18} color={COR_NEON} style={{ marginRight: 8 }} />
                  <TextInput
                    style={[styles.sheetInput, styles.horarioInput]}
                    value={horarioRega}
                    onChangeText={setHorarioRega}
                    placeholderTextColor={COR_CINZA_CLARO}
                    placeholder="08:00"
                    keyboardType="numbers-and-punctuation"
                    maxLength={5}
                  />
                  <Text style={styles.horarioHint}>formato HH:MM</Text>
                </View>
              </View>

              {/* Dias da semana */}
              <View style={styles.sheetGrupo}>
                <Text style={styles.sheetLabel}>DIAS DE REGA</Text>
                <View style={styles.diasRow}>
                  {DIAS.map((d, idx) => {
                    const ativo = diasSelecionados.includes(d.valor);
                    return (
                      <TouchableOpacity
                        key={`${d.valor}-${idx}`}
                        style={[styles.diaPill, ativo && styles.diaPillAtivo]}
                        onPress={() => toggleDia(d.valor)}
                        activeOpacity={0.7}
                      >
                        <Text style={[styles.diaPillTexto, ativo && styles.diaPillTextoAtivo]}>
                          {d.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <Text style={styles.diasHint}>
                  D=Dom · S=Seg · T=Ter · Q=Qua · Q=Qui · S=Sex · S=Sáb
                </Text>
              </View>

              {/* Diagnóstico de saúde */}
              {saude && (
                <View style={[styles.saudeResumo, { borderColor: corStatus(saude.status) }]}>
                  <MaterialCommunityIcons name="heart-pulse" size={16} color={corStatus(saude.status)} />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={[styles.saudeTitulo, { color: corStatus(saude.status) }]}>
                      Saúde: {labelStatus(saude.status)} ({Math.round(saude.confianca * 100)}% saudável)
                    </Text>
                    {saude.problemas.slice(0, 2).map((p) => (
                      <Text key={p.nome} style={styles.saudeProblema}>
                        • {p.nome} ({Math.round(p.confianca * 100)}%)
                      </Text>
                    ))}
                  </View>
                </View>
              )}

              {/* Botões */}
              <View style={styles.sheetBotoes}>
                <TouchableOpacity
                  style={styles.btnCancelar}
                  onPress={() => setSheetVisivel(false)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.btnCancelarTexto}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.btnSalvar, salvando && { opacity: 0.6 }]}
                  onPress={salvarNoJardim}
                  disabled={salvando}
                  activeOpacity={0.8}
                >
                  {salvando
                    ? <ActivityIndicator size="small" color={COR_PRETO_ABSOLUTO} />
                    : <Text style={styles.btnSalvarTexto}>Salvar no jardim</Text>
                  }
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}