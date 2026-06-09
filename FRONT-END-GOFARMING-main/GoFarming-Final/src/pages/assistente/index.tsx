import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const respostasProntas = {
  cultivo:
    'Mantenha regas leves e observe o solo antes de repetir. Luz indireta costuma ser mais segura para a maioria das plantas domésticas.',
  saude:
    'Folhas amareladas podem indicar excesso de água; folhas secas podem mostrar falta de água ou muita exposição ao sol.',
  nutricao:
    'Adube de forma moderada e em ciclos. Excesso de adubo pode queimar as raízes e atrapalhar o crescimento.',
  pragas:
    'Verifique o verso das folhas e o caule com frequência. Um controle simples no início evita problemas maiores.',
};

const perguntas = [
  { id: 'cultivo', titulo: 'Cultivo', texto: respostasProntas.cultivo },
  { id: 'saude', titulo: 'Saúde', texto: respostasProntas.saude },
  { id: 'nutricao', titulo: 'Nutrição', texto: respostasProntas.nutricao },
  { id: 'pragas', titulo: 'Pragas', texto: respostasProntas.pragas },
] as const;

export default function AssistentePlantas() {
  const [selecionado, setSelecionado] = useState<(typeof perguntas)[number]['id']>('cultivo');

  const resposta = useMemo(
    () => perguntas.find((item) => item.id === selecionado)?.texto ?? respostasProntas.cultivo,
    [selecionado],
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Assistente</Text>
        <Text style={styles.subtitulo}>Respostas rápidas para cultivo e saúde, com espaço para IA futura.</Text>

        <View style={styles.card}>
          <Text style={styles.rotulo}>Perguntas prontas</Text>
          <View style={styles.lista}>
            {perguntas.map((item) => (
              <Pressable
                key={item.id}
                style={[styles.pill, selecionado === item.id && styles.pillAtivo]}
                onPress={() => setSelecionado(item.id)}
              >
                <Text style={[styles.pillTexto, selecionado === item.id && styles.pillTextoAtivo]}>
                  {item.titulo}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.cardResposta}>
          <Text style={styles.rotulo}>Resposta</Text>
          <Text style={styles.resposta}>{resposta}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.rotulo}>Próximo passo</Text>
          <Text style={styles.texto}>
            Aqui entra a IA no futuro. Por enquanto, a tela já entrega ajuda simples e objetiva para o cultivo diário.
          </Text>
        </View>
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
  cardResposta: {
    backgroundColor: '#0E1824',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#25C2A0',
    padding: 16,
    gap: 8,
  },
  rotulo: {
    color: '#87A0B5',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  lista: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  pill: {
    backgroundColor: '#08111A',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#19324A',
  },
  pillAtivo: {
    backgroundColor: '#34D399',
    borderColor: '#34D399',
  },
  pillTexto: {
    color: '#D6E4F0',
    fontWeight: '600',
    fontSize: 13,
  },
  pillTextoAtivo: {
    color: '#04110B',
  },
  resposta: {
    color: '#F5FAFF',
    fontSize: 15,
    lineHeight: 22,
  },
  texto: {
    color: '#D7E3EC',
    fontSize: 15,
    lineHeight: 22,
  },
});