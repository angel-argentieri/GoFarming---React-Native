import { Dimensions, StyleSheet } from "react-native";
import { theme } from "../../global/themes";

export const style = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // Puxa o fundo preto do seu arquivo de temas para a tela toda
backgroundColor: theme.colors.dark, 
    },
    boxTop: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'transparent',
        paddingTop: 20,
    },
    boxMid: {
        width: "100%",
        paddingHorizontal: 40,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    boxBottom: {
        width: "100%",
        alignItems: 'center',
        paddingTop: 30,
        backgroundColor: 'transparent',
        paddingBottom: 20,
    },
    text: {
        fontWeight : 'bold',
        marginTop: 10,
color: theme.colors.secondary, // Branco
    },
    titleInput:{
        marginLeft: 5,
color: theme.colors.secondary, // Branco
        marginTop : 15,
        fontWeight: 'bold',
    },
    BoxInput: {
        width: '100%',
        height: 40,
        borderBottomWidth: 1,
borderBottomColor: theme.colors.lightGray,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        paddingLeft: 5,
color: theme.colors.secondary, // Branco
    },
    button: {
        width: 250,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
backgroundColor: theme.colors.primary, // O botão continua roxo!
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textButton: {
        fontSize: 16,
color: theme.colors.secondary, // Branco
        fontWeight: 'bold',
    },
});
