import React, { useContext, useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { GardenContext } from '../../../context/GardenContext';

export default function SaudePlanta() {
  const navigation = useNavigation<any>();
  const garden = useContext(GardenContext) as any;
  const plantaSelecionada = garden?.plantaSelecionada ?? garden?.plantaAtual ?? null;
  const plantas = garden?.plantas ?? [];
  const planta = useMemo(() => plantaSelecionada ?? plantas?.[0] ?? null, [plantaSelecionada, plantas]);

  const nome = planta?.nome ?? 'Planta sem nome';
  const saude = planta?.saude ?? planta?.statusSaude ?? planta?.status ?? 'Estável';
  const umidade = planta?.umidade ?? planta?.nivelUmidade ?? 'Normal';
  const luz = planta?.luz ?? planta?.exposicaoLuz ?? 'Adequada';
  const pragas = planta?.pragas ?? planta?.alertaPragas ?? 'Sem alerta';

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Saúde da planta</Text>
        <Text style={styles.subtitulo}>Resumo simples para decidir a próxima ação.</Text>

        {planta ? (
          <>
            <View style={styles.cardDestaque}>
              <Text style={styles.nome}>{nome}</Text>
              <Text style={styles.status}>{saude}</Text>
            </View>

            <View style={styles.grade}>
              <ResumoItem rotulo="Umidade" valor={String(umidade)} />
              <ResumoItem rotulo="Luz" valor={String(luz)} />
              <ResumoItem rotulo="Pragas" valor={String(pragas)} />
              <ResumoItem rotulo="Regas" valor={planta?.frequenciaIrrigacao ? `${planta.frequenciaIrrigacao} dias` : '3 dias'} />
            </View>

            <View style={styles.card}>
              <Text style={styles.rotulo}>Dica rápida</Text>
              <Text style={styles.texto}>
                Observe folhas amareladas, solo seco e excesso de água. Ajustes pequenos já melhoram bastante o cultivo.
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.card}>
            <Text style={styles.texto}>Selecione uma planta para ver a saúde.</Text>
          </View>
        )}

        <Pressable style={styles.botaoSecundario} onPress={() => navigation.goBack()}>
          <Text style={styles.botaoTextoSecundario}>Voltar</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function ResumoItem({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <View style={styles.item}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <Text style={styles.valor}>{valor}</Text>
    </View>
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
  cardDestaque: {
    backgroundColor: '#0E1824',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#25C2A0',
    padding: 18,
    gap: 6,
  },
  nome: {
    color: '#F5FAFF',
    fontSize: 22,
    fontWeight: '700',
  },
  status: {
    color: '#34D399',
    fontSize: 16,
    fontWeight: '700',
  },
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  item: {
    width: '48%',
    backgroundColor: '#0E1824',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1F3347',
    padding: 14,
    gap: 6,
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
  valor: {
    color: '#F5FAFF',
    fontSize: 15,
    fontWeight: '600',
  },
  texto: {
    color: '#D7E3EC',
    fontSize: 15,
    lineHeight: 22,
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