import React, { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';

import styles from './styles';
import { useGarden } from '../../context/GardenContext';

type ItemGenerico = Record<string, any>;

const pegarTexto = (...valores: unknown[]) => {
  for (const valor of valores) {
    if (typeof valor === 'string' && valor.trim().length > 0) {
      return valor;
    }
  }

  return '';
};

const formatarData = (...valores: unknown[]) => {
  for (const valor of valores) {
    if (!valor) {
      continue;
    }

    const data = typeof valor === 'string' || typeof valor === 'number' ? new Date(valor) : null;

    if (data && !Number.isNaN(data.getTime())) {
      return data.toLocaleString('pt-BR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  }

  return 'Agora há pouco';
};

const AlertasPage = () => {
  const garden = useGarden() as {
    notificacoes?: ItemGenerico[];
  };

  const notificacoes = Array.isArray(garden.notificacoes) ? garden.notificacoes : [];

  const dados = useMemo(() => {
    const irrigacao = notificacoes.filter((item) => {
      const tipo = pegarTexto(item.tipo, item.category, item.categoria).toLowerCase();
      const texto = pegarTexto(item.titulo, item.mensagem, item.message).toLowerCase();
      return tipo.includes('rega') || tipo.includes('irrig') || texto.includes('rega') || texto.includes('água') || texto.includes('umidade');
    });

    const saude = notificacoes.filter((item) => {
      const tipo = pegarTexto(item.tipo, item.category, item.categoria).toLowerCase();
      const texto = pegarTexto(item.titulo, item.mensagem, item.message).toLowerCase();
      return tipo.includes('saude') || tipo.includes('saúde') || texto.includes('saúde') || texto.includes('doença') || texto.includes('praga');
    });

    return { irrigacao, saude };
  }, [notificacoes]);

  const renderNotificacao = (item: ItemGenerico) => {
    const titulo = pegarTexto(item.titulo, item.title, item.mensagem, item.message) || 'Aviso';
    const mensagem = pegarTexto(item.mensagem, item.message, item.descricao, item.description) || 'Nenhum detalhe disponível.';
    const data = formatarData(item.data, item.createdAt, item.timestamp);
    const lida = Boolean(item.lida ?? item.read);

    return (
      <View key={pegarTexto(item.id, item._id, titulo)} style={styles.card}>
        <View style={styles.cardTopo}>
          <Text style={styles.cardTitulo}>{titulo}</Text>
          <View style={[styles.status, lida ? styles.statusLida : styles.statusNova]}>
            <Text style={styles.statusTexto}>{lida ? 'Lida' : 'Nova'}</Text>
          </View>
        </View>
        <Text style={styles.cardMensagem}>{mensagem}</Text>
        <Text style={styles.cardData}>{data}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Notificações</Text>
        <Text style={styles.subtitulo}>
          Avisos de rega, saúde e manutenção das plantas em um só lugar.
        </Text>
      </View>

      <View style={styles.resumo}>
        <View style={styles.resumoCard}>
          <Text style={styles.resumoValor}>{notificacoes.length}</Text>
          <Text style={styles.resumoTexto}>total</Text>
        </View>
        <View style={styles.resumoCard}>
          <Text style={styles.resumoValor}>{dados.irrigacao.length}</Text>
          <Text style={styles.resumoTexto}>rega</Text>
        </View>
        <View style={styles.resumoCard}>
          <Text style={styles.resumoValor}>{dados.saude.length}</Text>
          <Text style={styles.resumoTexto}>saúde</Text>
        </View>
      </View>

      <View style={styles.bloco}>
        <Text style={styles.blocoTitulo}>Alertas de rega</Text>
        {dados.irrigacao.length > 0 ? (
          dados.irrigacao.map(renderNotificacao)
        ) : (
          <View style={styles.estadoVazio}>
            <Text style={styles.estadoVazioTitulo}>Sem alertas de rega</Text>
            <Text style={styles.estadoVazioTexto}>Quando alguma planta precisar de água, o aviso aparece aqui.</Text>
          </View>
        )}
      </View>

      <View style={styles.bloco}>
        <Text style={styles.blocoTitulo}>Alertas de saúde</Text>
        {dados.saude.length > 0 ? (
          dados.saude.map(renderNotificacao)
        ) : (
          <View style={styles.estadoVazio}>
            <Text style={styles.estadoVazioTitulo}>Sem alertas de saúde</Text>
            <Text style={styles.estadoVazioTexto}>Sinais de atenção, pragas e mudanças na planta serão listados aqui.</Text>
          </View>
        )}
      </View>

      <View style={styles.bloco}>
        <Text style={styles.blocoTitulo}>Todas as notificações</Text>
        {notificacoes.length > 0 ? (
          notificacoes.map(renderNotificacao)
        ) : (
          <View style={styles.estadoVazio}>
            <Text style={styles.estadoVazioTitulo}>Nenhuma notificação encontrada</Text>
            <Text style={styles.estadoVazioTexto}>Seu histórico de avisos vai aparecer assim que o jardim gerar alertas.</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default AlertasPage;