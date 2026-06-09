import React, { useContext, useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { GardenContext } from '../../../context/GardenContext';

export default function DetalhePlanta() {
  const navigation = useNavigation<any>();
  const garden = useContext(GardenContext) as any;
  const plantaSelecionada = garden?.plantaSelecionada ?? garden?.plantaAtual ?? null;
  const plantas = garden?.plantas ?? [];
  const planta = useMemo(() => plantaSelecionada ?? plantas?.[0] ?? null, [plantaSelecionada, plantas]);

  const nome = planta?.nome ?? 'Planta';
  const especie = planta?.especie ?? 'Sem espécie informada';
  const local = planta?.local ?? 'Sem local definido';
  const status = planta?.status ?? planta?.saude ?? 'Saudável';
  const ultimaIrrigacao = planta?.ultimaIrrigacao ?? planta?.ultimaRega ?? 'Não registrada';
  const proximaIrrigacao = planta?.proximaIrrigacao ?? planta?.proximaRega ?? 'Sem previsão';

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topo}>
          <Text style={styles.titulo}>Detalhe da planta</Text>
          <Text style={styles.subtitulo}>Visão rápida para acompanhar o cultivo.</Text>
        </View>

        {planta ? (
          <>
            <View style={styles.cardDestaque}>
              <Text style={styles.nome}>{nome}</Text>
              <Text style={styles.texto}>{especie}</Text>
              <Text style={styles.textoFraco}>Local: {local}</Text>
            </View>

            <View style={styles.card}>
              <TextoItem rotulo="Saúde" valor={status} destaque />
              <TextoItem rotulo="Última irrigação" valor={String(ultimaIrrigacao)} />
              <TextoItem rotulo="Próxima irrigação" valor={String(proximaIrrigacao)} />
              <TextoItem rotulo="Observação" valor={planta?.observacao ?? 'Sem observações'} />
            </View>
          </>
        ) : (
          <View style={styles.card}>
            <Text style={styles.texto}>Nenhuma planta selecionada no momento.</Text>
          </View>
        )}

        <View style={styles.acoes}>
          <Pressable style={styles.botaoSecundario} onPress={() => navigation.goBack()}>
            <Text style={styles.botaoTextoSecundario}>Voltar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function TextoItem({ rotulo, valor, destaque = false }: { rotulo: string; valor: string; destaque?: boolean }) {
  return (
    <View style={styles.item}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <Text style={[styles.valor, destaque && styles.valorDestaque]}>{valor}</Text>
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
  topo: {
    gap: 8,
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
    borderColor: '#25C2A0',
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    gap: 6,
  },
  nome: {
    color: '#F5FAFF',
    fontSize: 22,
    fontWeight: '700',
  },
  texto: {
    color: '#D7E3EC',
    fontSize: 15,
    lineHeight: 22,
  },
  textoFraco: {
    color: '#97A8B8',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#0E1824',
    borderColor: '#1F3347',
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    gap: 12,
  },
  item: {
    gap: 4,
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
  valorDestaque: {
    color: '#34D399',
  },
  acoes: {
    flexDirection: 'row',
    gap: 12,
  },
  botaoSecundario: {
    flex: 1,
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