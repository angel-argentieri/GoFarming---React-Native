import React, { useState, useEffect } from "react"; 
import { Text, View, TextInput, TouchableOpacity, Animated, Keyboard, Alert } from "react-native";
import { style } from "./styles"; 
import Logo from "../../assets/Logo.png"; 
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'; 
import { theme } from "../../global/themes";
import { supabase } from "../../services/supabase";

export default function Cadastro({ onVoltarParaLogin }: { onVoltarParaLogin: () => void }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState(''); 
    const [senha, setSenha] = useState(''); 
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [showPassword, setShowPassword] = useState(true); 
    const [aceitouTermos, setAceitouTermos] = useState(false); 
    const [cadastrando, setCadastrando] = useState(false);
    const [mensagemStatus, setMensagemStatus] = useState<string>('');

    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 80 }));
    const [opacity] = useState(new Animated.Value(0));               
    const [logo] = useState(new Animated.ValueXY({ x: 250, y: 120 })); 

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

        Animated.parallel([
            Animated.spring(offset.y, { 
                toValue: 0,
                speed: 4,
                bounciness: 20,
                useNativeDriver: true
            }),
            Animated.timing(opacity, {  
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            })
        ]).start();

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    function keyboardDidShow() {
        Animated.parallel([
            Animated.timing(logo.x, { toValue: 150, duration: 100, useNativeDriver: false }),
            Animated.timing(logo.y, { toValue: 70, duration: 100, useNativeDriver: false })
        ]).start();
    }

    function keyboardDidHide() {
        Animated.parallel([
            Animated.timing(logo.x, { toValue: 250, duration: 100, useNativeDriver: false }), 
            Animated.timing(logo.y, { toValue: 120, duration: 100, useNativeDriver: false })  
        ]).start();
    }

    async function handleCadastro() {
        if (cadastrando) return;

        if(nome === '' || email === '' || senha === '' || confirmarSenha === ''){
            Alert.alert("Atenção", "Preencha todos os campos!");
            return;
        }

        if (senha !== confirmarSenha) {
            Alert.alert("Atenção", "As senhas não coincidem!");
            return;
        }

        if (!aceitouTermos) {
            Alert.alert("Atenção", "Você precisa aceitar os Termos de Uso!");
            return;
        }

        try {
            setCadastrando(true);
            setMensagemStatus("A tentar criar conta no Supabase...");

            const { error } = await supabase.auth.signUp({
                email,
                password: senha,
                options: {
                    data: { nome },
                },
            });

            if (error) {
                console.log("Erro Supabase cadastro:", error);
                setMensagemStatus(error.message || "Erro ao cadastrar.");
                Alert.alert("Erro no cadastro", error.message);
                
                let mensagemAmigavel = error.message;
                if (error.message.includes("rate limit exceeded")) {
                    mensagemAmigavel = "Muitas tentativas seguidas. Por favor, aguarde alguns minutos antes de tentar novamente.";
                }

                setMensagemStatus(mensagemAmigavel);
                Alert.alert("Erro no cadastro", mensagemAmigavel);
                return;
            }

            const textoOk =
                "Cadastro criado. Verifique seu e-mail para confirmar (se estiver ativado no Supabase).";
            setMensagemStatus(textoOk);
            Alert.alert("Cadastro criado", textoOk);
        } catch (erro) {
            const mensagem = erro instanceof Error ? erro.message : "Erro desconhecido";
            console.log("Falha Supabase cadastro (catch):", erro);
            setMensagemStatus(mensagem);
            Alert.alert("Erro no cadastro", mensagem);
        } finally {
            setCadastrando(false);
        }
    }

    return (
        <View style={style.container}>
            
            {/* Bloco de cima: Logo e Título */}
            <View style={style.boxTop}>
                <Animated.Image 
                   source={Logo} 
                   style={{ width: logo.x, height: logo.y, marginBottom: 10 }} 
                   resizeMode="contain"
                />
                <Text style={[style.text, { fontSize: 24, fontWeight: 'bold' }]}>Criar Conta</Text>

                {!!mensagemStatus && (
                    <Text style={{ color: theme.colors.secondary, marginTop: 10, textAlign: 'center' }}>
                        {mensagemStatus}
                    </Text>
                )}
            </View>
            
            {/* Bloco do meio: Inputs */}
            <Animated.View style={[
                style.boxMid, 
                { opacity: opacity, transform: [{ translateY: offset.y }], marginTop: 20 } 
            ]}>
                 {/* Nome */}
                 <View style={[style.BoxInput, { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }]}>
                     <MaterialIcons name="person-outline" size={22} color={theme.colors.lightGray} />
                     <TextInput 
                        style={[style.input, { flex: 1, marginLeft: 10 }]}          
                        placeholder="Nome Completo" 
                        placeholderTextColor="#d7d8d7"    
                        value={nome} 
                        onChangeText={setNome}          
                     />  
                 </View>

                 {/* Email */}
                 <View style={[style.BoxInput, { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, marginTop: 15 }]}>
                     <MaterialIcons name="mail-outline" size={22} color={theme.colors.lightGray} />
                     <TextInput 
                        style={[style.input, { flex: 1, marginLeft: 10 }]}          
                        placeholder="Seu e-mail" 
                        placeholderTextColor="#d7d8d7"    
                        keyboardType="email-address" 
                        autoCapitalize="none" 
                        value={email} 
                        onChangeText={setEmail}          
                     />  
                 </View>
                 
                 {/* Senha */}
                 <View style={[style.BoxInput, { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, marginTop: 15 }]}>
                     <MaterialIcons name="lock-outline" size={22} color={theme.colors.lightGray} />
                     <TextInput 
                        style={[style.input, { flex: 1, marginLeft: 10 }]} 
                        placeholder="Sua senha"
                        placeholderTextColor="#d7d8d7"
                        secureTextEntry={showPassword} 
                        value={senha}
                        onChangeText={setSenha}
                     />
                     <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                         <MaterialIcons name={showPassword ? "visibility-off" : "visibility"} size={22} color={theme.colors.lightGray} />
                     </TouchableOpacity>
                 </View>

                 {/* Confirmar Senha */}
                 <View style={[style.BoxInput, { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, marginTop: 15 }]}>
                     <MaterialIcons name="lock-outline" size={22} color={theme.colors.lightGray} />
                     <TextInput 
                        style={[style.input, { flex: 1, marginLeft: 10 }]} 
                        placeholder="Confirmar Senha"
                        placeholderTextColor="#d7d8d7"
                        secureTextEntry={showPassword} 
                        value={confirmarSenha}
                        onChangeText={setConfirmarSenha}
                     />
                 </View>

                 {/* Checkbox Termos */}
                 <TouchableOpacity 
                    style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, marginLeft: 5 }} 
                    onPress={() => setAceitouTermos(!aceitouTermos)}
                 >
                     <MaterialIcons 
                        name={aceitouTermos ? "check-box" : "check-box-outline-blank"} 
                        size={24} 
                        color={theme.colors.primary} 
                     />
                     <Text style={{ color: theme.colors.lightGray, marginLeft: 10, fontSize: 12 }}>
                        Aceito os <Text style={{ color: theme.colors.primary, textDecorationLine: 'underline' }}>Termos de Uso</Text> e <Text style={{ color: theme.colors.primary, textDecorationLine: 'underline' }}>Política de Privacidade</Text>
                     </Text>
                 </TouchableOpacity>
            </Animated.View>
            
            {/* Bloco de baixo: Botões */}
            <Animated.View style={[
                style.boxBottom,
                { opacity: opacity, transform: [{ translateY: offset.y }], marginTop: 20, alignItems: 'center' }
            ]}>
                {/* Botão Principal */}
                <TouchableOpacity style={[style.button, { width: '100%' }]} onPress={handleCadastro}>
                    <Text style={style.textButton}>Cadastrar</Text>
                </TouchableOpacity>

                <Text style={{ color: theme.colors.lightGray, marginTop: 20, marginBottom: 15, fontSize: 12 }}>
                    Ou cadastre-se com:
                </Text>

                {/* Botão Google */}
                <TouchableOpacity style={[
                    style.button, 
                    { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.colors.lightGray, flexDirection: 'row', justifyContent: 'center', width: '100%' }
                ]}>
                    <FontAwesome name="google" size={18} color="#EA4335" style={{ marginRight: 10 }} />
                    <Text style={[style.textButton, { color: theme.colors.lightGray, fontWeight: 'normal' }]}>Cadastrar com Google</Text>
                </TouchableOpacity>

                {/* Link de Voltar */}
                <TouchableOpacity style={{ marginTop: 25 }} onPress={onVoltarParaLogin}>
                    <Text style={{ color: theme.colors.primary, fontSize: 14 }}>
                        <Text style={{ color: theme.colors.lightGray }}>Já tem uma conta? </Text>
                        Entrar
                    </Text>
                </TouchableOpacity>
            </Animated.View>

        </View>
    );
}
