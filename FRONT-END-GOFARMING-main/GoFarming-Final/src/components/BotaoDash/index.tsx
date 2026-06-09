import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { estilos } from './styles'; // Suas estilizações

// Dizendo que agora ele recebe um componente (icone) e não mais uma imagem
interface BotaoDashProps {
  titulo: string;
  icone: React.ReactNode; 
  onPress: () => void;
}

export function BotaoDash({ titulo, icone, onPress }: BotaoDashProps) {
  return (
    <TouchableOpacity style={estilos.botao} onPress={onPress}>
      
      {/* Renderiza o ícone SVG aqui no meio */}
      {icone}
      
      <Text style={estilos.texto}>{titulo}</Text>
    </TouchableOpacity>
  );
}