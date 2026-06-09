import React from 'react';
import Svg, { G, Circle, Path, Rect } from 'react-native-svg';

const COR_NEON = "#B8A8FF";

// ==========================================
// 1. ÍCONE: EXPLORAR (Coração com Pulso / Saúde)
// ==========================================
export const IconeExplorar = ({ width = 80, height = 80 }) => (
  <Svg viewBox="0 0 100 100" width={width} height={height}>
    {/* Camada de Brilho */}
    <G fill="none" stroke={COR_NEON} strokeWidth="7" opacity="0.25" strokeLinecap="round" strokeLinejoin="round">
      {/* Contorno do Coração */}
      <Path d="M 50 85 C 50 85 15 55 15 30 C 15 15 35 10 50 25 C 65 10 85 15 85 30 C 85 55 50 85 50 85 Z" />
      {/* Linha de Pulso (Batimento) */}
      <Path d="M 20 52 H 35 L 42 35 L 50 72 L 58 30 L 64 52 H 80" />
    </G>
    {/* Camada Principal */}
    <G fill="none" stroke={COR_NEON} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Contorno do Coração */}
      <Path d="M 50 85 C 50 85 15 55 15 30 C 15 15 35 10 50 25 C 65 10 85 15 85 30 C 85 55 50 85 50 85 Z" />
      {/* Linha de Pulso (Batimento) */}
      <Path d="M 20 52 H 35 L 42 35 L 50 72 L 58 30 L 64 52 H 80" />
    </G>
  </Svg>
);
// ==========================================
// 2. ÍCONE: ALERTAS (Sino com Exclamação)
// ==========================================
export const IconeAlertas = ({ width = 80, height = 80 }) => (
  <Svg viewBox="0 0 100 100" width={width} height={height}>
    {/* Camada de Brilho */}
    <G fill="none" stroke={COR_NEON} strokeWidth="7" opacity="0.25" strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="70" cy="35" r="13" />
      <Path d="M 70 28 V 37" />
      <Circle cx="70" cy="42" r="1.25" fill={COR_NEON} />
      <Path d="M 50 15 C 38 15 28 25 28 45 V 65 H 72 V 50" />
      <Path d="M 72 38 C 72 32 68 24 60 19" />
      <Path d="M 20 70 H 80 Q 83 70 83 73 Q 83 76 80 76 H 20 Q 17 76 17 73 Q 17 70 20 70 Z" />
      <Path d="M 43 76 A 7 7 0 0 0 57 76" />
      <Circle cx="50" cy="11" r="3" />
    </G>
    {/* Camada Principal */}
    <G fill="none" stroke={COR_NEON} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="70" cy="35" r="13" />
      <Path d="M 70 28 V 37" />
      <Circle cx="70" cy="42" r="1.25" fill={COR_NEON} />
      <Path d="M 50 15 C 38 15 28 25 28 45 V 65 H 72 V 50" />
      <Path d="M 72 38 C 72 32 68 24 60 19" />
      <Path d="M 20 70 H 80 Q 83 70 83 73 Q 83 76 80 76 H 20 Q 17 76 17 73 Q 17 70 20 70 Z" />
      <Path d="M 43 76 A 7 7 0 0 0 57 76" />
      <Circle cx="50" cy="11" r="3" />
    </G>
  </Svg>
);

// ==========================================
// 3. ÍCONE: CÂMERA (Fotos/Registros)
// ==========================================
export const IconeCamera = ({ width = 80, height = 80 }) => (
  <Svg viewBox="0 0 100 100" width={width} height={height}>
    {/* Camada de Brilho */}
    <G fill="none" stroke={COR_NEON} strokeWidth="7" opacity="0.25" strokeLinecap="round" strokeLinejoin="round">
      <Rect x="15" y="30" width="70" height="50" rx="10" />
      <Circle cx="50" cy="55" r="14" />
      <Path d="M 35 30 L 40 20 H 60 L 65 30" />
      <Circle cx="75" cy="42" r="3" />
    </G>
    {/* Camada Principal */}
    <G fill="none" stroke={COR_NEON} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <Rect x="15" y="30" width="70" height="50" rx="10" />
      <Circle cx="50" cy="55" r="14" />
      <Path d="M 35 30 L 40 20 H 60 L 65 30" />
      <Circle cx="75" cy="42" r="3" />
    </G>
  </Svg>
);

// ==========================================
// 4. ÍCONE: PLANTA (Cultivo/Broto)
// ==========================================
export const IconePlanta = ({ width = 80, height = 80 }) => (
  <Svg viewBox="0 0 100 100" width={width} height={height}>
    {/* Camada de Brilho */}
    <G fill="none" stroke={COR_NEON} strokeWidth="7" opacity="0.25" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 50 85 V 55" />
      <Path d="M 50 55 C 35 55 25 40 25 25 C 40 25 50 40 50 55 Z" />
      <Path d="M 50 65 C 65 65 75 50 75 35 C 60 35 50 50 50 65 Z" />
      <Path d="M 50 55 C 40 35 50 15 50 15 C 60 35 50 55 50 55 Z" />
    </G>
    {/* Camada Principal */}
    <G fill="none" stroke={COR_NEON} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M 50 85 V 55" />
      <Path d="M 50 55 C 35 55 25 40 25 25 C 40 25 50 40 50 55 Z" />
      <Path d="M 50 65 C 65 65 75 50 75 35 C 60 35 50 50 50 65 Z" />
      <Path d="M 50 55 C 40 35 50 15 50 15 C 60 35 50 55 50 55 Z" />
    </G>
  </Svg>
);