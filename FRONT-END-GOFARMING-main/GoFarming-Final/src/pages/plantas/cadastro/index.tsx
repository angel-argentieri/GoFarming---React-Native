import React, { useContext, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { GardenContext } from '../../../context/GardenContext';

export default function CadastroPlanta() {
  const navigation = useNavigation<any>();
  const garden = useContext(GardenContext) as any;
  const adicionarPlanta = garden?.adicionarPlanta ?? garden?.addPlant ?? garden?.criarPlanta;

  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [local, setLocal] = useState('');
  const [observacao, setObservacao] = useState('');
  const [frequenciaIrrigacao, setFrequenciaIrrigacao] = useState('3');

  const limparCampos = () => {
    setNome('');
    setEspecie('');
    setLocal('');
    setObservacao('');
    setFrequenciaIrrigacao('3');
  };

  const salvar = () => {
    if (!nome.trim()) {
      Alert.alert('Campo obrigatório', 'Informe o nome da planta.');
      return;
    }

    if (typeof adicionarPlanta !== 'function') {
      Alert.alert('Atenção', 'Não foi possível localizar a ação para adicionar planta.');
      return;
    }

    adicionarPlanta({
      nome: nome.trim(),
      especie: especie.trim(),
      local: local.trim(),
      observacao: observacao.trim(),
      frequenciaIrrigacao: Number(frequenciaIrrigacao) || 3,
      criadaEm: new Date().toISOString(),
    });

    limparCampos();
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.titulo}>Cadastrar planta</Text>
          <Text style={styles.subtitulo}>Preencha o básico para começar a acompanhar o cultivo.</Text>

          <View style={styles.card}>
            <Text style={styles.label}>Nome *</Text>
            <TextInput
              value={nome}
              onChangeText={setNome}
              placeholder="Ex.: Manjericão"
              placeholderTextColor="#667085"
              style={styles.input}
            />

            <Text style={styles.label}>Espécie</Text>
            <TextInput
              value={especie}
              onChangeText={setEspecie}
              placeholder="Ex.: Erva aromática"
              placeholderTextColor="#667085"
              style={styles.input}
            />

            <Text style={styles.label}>Local</Text>
            <TextInput
              value={local}
              onChangeText={setLocal}
              placeholder="Ex.: Varanda"
              placeholderTextColor="#667085"
              style={styles.input}
            />

            <Text style={styles.label}>Frequência de irrigação (dias)</Text>
            <TextInput
              value={frequenciaIrrigacao}
              onChangeText={setFrequenciaIrrigacao}
              placeholder="3"
              keyboardType="numeric"
              placeholderTextColor="#667085"
              style={styles.input}
            />

            <Text style={styles.label}>Observação</Text>
            <TextInput
              value={observacao}
              onChangeText={setObservacao}
              placeholder="Ex.: gosta de sol parcial"
              placeholderTextColor="#667085"
              style={[styles.input, styles.textArea]}
              multiline
            />
          </View>

          <View style={styles.actions}>
            <Pressable style={[styles.botao, styles.botaoSecundario]} onPress={() => navigation.goBack()}>
              <Text style={styles.botaoTextoSecundario}>Cancelar</Text>
            </Pressable>

            <Pressable style={styles.botao} onPress={salvar}>
              <Text style={styles.botaoTexto}>Salvar planta</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#081018',
  },
  flex: {
    flex: 1,
  },
  container: {
    padding: 20,
    gap: 16,
  },
  titulo: {
    color: '#F5FAFF',
    fontSize: 28,
    fontWeight: '700',
  },
  subtitulo: {
    color: '#A9B8C8',
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#0E1824',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#1F3347',
    padding: 16,
    gap: 12,
  },
  label: {
    color: '#B7C7D8',
    fontSize: 13,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#08111A',
    borderColor: '#19324A',
    borderWidth: 1,
    borderRadius: 12,
    color: '#F5FAFF',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  textArea: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  botao: {
    flex: 1,
    backgroundColor: '#34D399',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  botaoSecundario: {
    backgroundColor: '#122131',
    borderWidth: 1,
    borderColor: '#24425D',
  },
  botaoTexto: {
    color: '#04110B',
    fontWeight: '700',
    fontSize: 15,
  },
  botaoTextoSecundario: {
    color: '#D6E4F0',
    fontWeight: '700',
    fontSize: 15,
  },
});