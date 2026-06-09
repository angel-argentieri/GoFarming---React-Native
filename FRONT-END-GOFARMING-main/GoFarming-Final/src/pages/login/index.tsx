
import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, Animated, Keyboard, Alert } from "react-native";
import { style } from "./styles";
import Logo from "../../assets/Logo.png";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../global/themes";
import { supabase } from "../../services/supabase";

export default function Login({ onAbrirCadastro }: { onAbrirCadastro: () => void }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [enviando, setEnviando] = useState(false);

    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 80 }));
    const [opacity] = useState(new Animated.Value(0));
    const [logo] = useState(new Animated.ValueXY({ x: 350, y: 200 }));

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", keyboardDidShow);
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", keyboardDidHide);

        Animated.parallel([
            Animated.spring(offset.y, {
                toValue: 0,
                speed: 4,
                bounciness: 20,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    function keyboardDidShow() {
        Animated.parallel([
            Animated.timing(logo.x, { toValue: 180, duration: 100, useNativeDriver: false }),
            Animated.timing(logo.y, { toValue: 100, duration: 100, useNativeDriver: false }),
        ]).start();
    }

    function keyboardDidHide() {
        Animated.parallel([
            Animated.timing(logo.x, { toValue: 350, duration: 100, useNativeDriver: false }),
            Animated.timing(logo.y, { toValue: 200, duration: 100, useNativeDriver: false }),
        ]).start();
    }

    async function handleLogin() {
        if (enviando) return;

        if (email === "" || senha === "") {
            Alert.alert("Atenção", "Preencha todos os campos!");
            return;
        }

        try {
            setEnviando(true);
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password: senha,
            });

            if (error) {
                console.log("Erro Supabase login:", error);
                Alert.alert("Erro ao entrar", error.message);
                return;
            }

            Alert.alert("Sucesso", "Login realizado com sucesso!");
        } catch (erro) {
            const mensagem = erro instanceof Error ? erro.message : "Erro desconhecido";
            console.log("Falha Supabase login (catch):", erro);
            Alert.alert("Erro ao entrar", mensagem);
        } finally {
            setEnviando(false);
        }
    }

    return (
        <View style={style.container}>
            
            {/* Bloco de cima: Logo e texto de boas vindas */}
            <View style={style.boxTop}>
                {/* Usamos Animated.Image no lugar de Image normal pra ela poder mudar de tamanho */}
                <Animated.Image 
                   source={Logo} 
                   style={{ width: logo.x, height: logo.y }} 
                   resizeMode="contain"
                />
                <Text style={style.text}>Seja bem vindo novamente!</Text>
            </View>
            
            {/* Bloco do meio: Os campos de digitar. Usamos Animated.View para ele ter o efeito de surgir */}
            <Animated.View style={[
                style.boxMid, 
                { opacity: opacity, transform: [{ translateY: offset.y }] } // Aplica os números de animação aqui
            ]}>
                 <Text style={style.titleInput}>Endereço de Email</Text> 
                 
                 {/* Caixa do Email (Input + Ícone) */}
                 <View style={style.BoxInput}>
                     <TextInput 
                        style={style.input}           
                        placeholder="exemplo@email.com" 
                        placeholderTextColor="#d7d8d7"    
                        keyboardType="email-address" 
                        autoCapitalize="none" 
                        value={email} 
                        onChangeText={setEmail}          
                     />  
<MaterialIcons name="email" size={20} color={theme.colors.lightGray} />
                 </View>
                 
                 <Text style={style.titleInput}>SENHA</Text> 
                 
                 {/* Caixa da Senha (Input + Ícone do Olhinho) */}
                 <View style={style.BoxInput}>
                     <TextInput 
                        style={style.input} 
                        placeholder="********"
                        placeholderTextColor="#d7d8d7"
                        secureTextEntry={showPassword} 
                        value={senha}
                        onChangeText={setSenha}
                     />
                     {/* O ícone do olhinho é um botão, ao clicar ele inverte o estado (de true pra false e vice-versa) */}
                     <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
<MaterialIcons name={showPassword ? "visibility-off" : "visibility"} size={20} color={theme.colors.lightGray} />
                     </TouchableOpacity>
                 </View>
            </Animated.View>
            
            {/* Bloco de baixo: O botão de entrar (Também com a animação de surgir) */}
            <Animated.View style={[
                style.boxBottom,
                { opacity: opacity, transform: [{ translateY: offset.y }] }
            ]}>
                <TouchableOpacity style={style.button} onPress={handleLogin}>
                    <Text style={style.textButton}>ENTRAR</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onAbrirCadastro} style={{ marginTop: 18 }}>
                    <Text style={{ color: theme.colors.primary, fontSize: 14 }}>
                        Não tem conta? <Text style={{ color: theme.colors.secondary }}>Criar conta</Text>
                    </Text>
                </TouchableOpacity>
            </Animated.View>

        </View>
    );
}
