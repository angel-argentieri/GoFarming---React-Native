import React, { useContext, useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { GardenContext } from '../../../context/GardenContext';

export default function HistoricoCuidados() {
  const navigation = useNavigation<any>();
  const garden = useContext(GardenContext) as any;
  const plantaSelecionada = garden?.plantaSelecionada ?? garden?.plantaAtual ?? null;
  const plantas = garden?.plantas ?? [];
  const planta = useMemo(() => plantaSelecionada ?? plantas?.[0] ?? null, [plantaSelecionada, plantas]);

  const eventos =
    planta?.historicoCuidados ??
    planta?.historico ??
    planta?.registros ??
    planta?.cuidados ??
    [];

  const listaEventos = Array.isArray(eventos) ? eventos : [];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Histórico de cuidados</Text>
        <Text style={styles.subtitulo}>Registro leve das ações feitas na planta.</Text>

        {planta ? (
          <View style={styles.card}>
            <Text style={styles.nome}>{planta?.nome ?? 'Planta'}</Text>
            <Text style={styles.textoFraco}>{planta?.especie ?? 'Sem espécie informada'}</Text>

            <View style={styles.lista}>
              {listaEventos.length > 0 ? (
                listaEventos.map((item: any, index: number) => {
                  const texto = typeof item === 'string' ? item : item?.descricao ?? item?.titulo ?? 'Evento';
                  const data = item?.data ?? item?.createdAt ?? item?.quando ?? '';
                  return (
                    <View key={`${texto}-${index}`} style={styles.evento}>
                      <Text style={styles.eventoTitulo}>{texto}</Text>
                      {!!data && <Text style={styles.eventoData}>{String(data)}</Text>}
                    </View>
                  );
                })
              ) : (
                <View style={styles.vazio}>
                  <Text style={styles.texto}>Sem registros ainda. A planta aparecerá aqui quando houver ações.</Text>
                </View>
              )}
            </View>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.texto}>Nenhuma planta selecionada.</Text>
          </View>
        )}

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
    gap: 12,
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
  lista: {
    gap: 10,
  },
  evento: {
    backgroundColor: '#08111A',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#183047',
    padding: 14,
    gap: 4,
  },
  eventoTitulo: {
    color: '#F5FAFF',
    fontSize: 15,
    fontWeight: '600',
  },
  eventoData: {
    color: '#34D399',
    fontSize: 12,
  },
  vazio: {
    paddingVertical: 10,
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