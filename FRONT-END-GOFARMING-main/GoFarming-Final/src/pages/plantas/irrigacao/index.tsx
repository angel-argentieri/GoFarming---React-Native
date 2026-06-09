import React, { useContext, useMemo } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { GardenContext } from '../../../context/GardenContext';

export default function IrrigacaoPlanta() {
  const navigation = useNavigation<any>();
  const garden = useContext(GardenContext) as any;
  const plantaSelecionada = garden?.plantaSelecionada ?? garden?.plantaAtual ?? null;
  const plantas = garden?.plantas ?? [];
  const planta = useMemo(() => plantaSelecionada ?? plantas?.[0] ?? null, [plantaSelecionada, plantas]);

  const registrar =
    garden?.registrarIrrigacao ??
    garden?.registrarRega ??
    garden?.adicionarIrrigacao ??
    garden?.regarPlanta;

  const registrarRega = () => {
    if (!planta) {
      Alert.alert('Sem planta', 'Selecione uma planta antes de registrar a rega.');
      return;
    }

    if (typeof registrar !== 'function') {
      Alert.alert('Atenção', 'Não foi possível localizar a ação de rega.');
      return;
    }

    registrar(planta?.id ?? planta, {
      data: new Date().toISOString(),
      origem: 'manual',
    });

    Alert.alert('Rega registrada', 'A água foi registrada com sucesso.');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Irrigação</Text>
        <Text style={styles.subtitulo}>Registro manual de rega para manter o controle simples.</Text>

        <View style={styles.card}>
          <Text style={styles.rotulo}>Planta atual</Text>
          <Text style={styles.nome}>{planta?.nome ?? 'Nenhuma planta selecionada'}</Text>
          <Text style={styles.textoFraco}>
            {planta?.especie ?? 'Sem espécie'} • {planta?.local ?? 'Sem local'}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.rotulo}>Ação rápida</Text>
          <Text style={styles.texto}>
            Toque no botão abaixo para registrar a rega manual e atualizar o histórico da planta.
          </Text>
        </View>

        <Pressable style={styles.botao} onPress={registrarRega}>
          <Text style={styles.botaoTexto}>Registrar rega</Text>
        </Pressable>

        <Pressable style={styles.botaoSecundario} onPress={() => navigation.goBack()}>
          <Text style={styles.botaoTextoSecundario}>Voltar</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#081018',
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
  },
  card: {
    backgroundColor: '#0E1824',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#1F3347',
    padding: 16,
    gap: 8,
  },
  rotulo: {
    color: '#87A0B5',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  nome: {
    color: '#F5FAFF',
    fontSize: 20,
    fontWeight: '700',
  },
  textoFraco: {
    color: '#96A8B7',
    fontSize: 14,
  },
  texto: {
    color: '#D7E3EC',
    fontSize: 15,
    lineHeight: 22,
  },
  botao: {
    backgroundColor: '#34D399',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#04110B',
    fontWeight: '700',
    fontSize: 15,
  },
  botaoSecundario: {
    backgroundColor: '#122131',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#24425D',
    paddingVertical: 14,
    alignItems: 'center',
  },
  botaoTextoSecundario: {
    color: '#D6E4F0',
    fontWeight: '700',
    fontSize: 15,
  },
});