import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

function Login() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Giriş Yap</Text>
            <TextInput
                style={styles.input}
                placeholder="Kullanıcı Adı"
            />
            <TextInput
                style={styles.input}
                placeholder="Şifre"
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Giriş Yap</Text>
            </TouchableOpacity>
            <Text>Hesabınız mı yok mu</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>kaydolun</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default Login;
