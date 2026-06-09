// src/pages/cadastro/styles.ts
import { StyleSheet } from "react-native";
import { theme } from "../../global/themes"; // Alterado para theme

export const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // Alterado de black para dark, que é a cor definida no seu objeto
        backgroundColor: theme.colors.dark, 
        paddingHorizontal: 25,
    },
    boxTop: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50, 
    },
    text: {
        color: theme.colors.secondary, 
        fontSize: 18,
    },
    boxMid: {
        width: '100%',
    },
    BoxInput: {
        width: '100%',
        height: 55,
        backgroundColor: 'rgba(30, 30, 40, 0.6)', 
        borderRadius: 30, 
        borderWidth: 1,
        borderColor: 'rgba(119, 0, 255, 0.4)', 
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 5,
    },
    input: {
        flex: 1,
        height: '100%',
        color: theme.colors.secondary, 
        fontSize: 15,
    },
    boxBottom: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        width: '100%',
        height: 55,
        backgroundColor: theme.colors.primary, 
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: theme.colors.primary,
        shadowOpacity: 0.6,
        shadowRadius: 10,
        elevation: 8, 
    },
    textButton: {
        color: theme.colors.secondary,
        fontSize: 16,
        fontWeight: 'bold',
    }
});