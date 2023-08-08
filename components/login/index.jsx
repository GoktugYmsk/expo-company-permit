import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setManageName, setWorker } from '../configure';

function Login() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const workerInfo = useSelector((state) => state.workerInfoTotal.workerInfo);

    const dispatch = useDispatch()


    const handleClick = () => {
        if (username === 'Ahmet' && password === '1234') {
            dispatch(setWorker(username))
            navigation.navigate('Menu');
        }
        else if (username === 'Hakan' && password === '1234') {
            dispatch(setManageName(username))
            navigation.navigate('Menu');
        }
        else {
            console.log("Hatalı giriş!");
        }
    };

    const handleClickSignup = () => {
        navigation.navigate('SignUp')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Giriş Yap</Text>
            <TextInput
                style={styles.input}
                placeholder="Kullanıcı Adı"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Şifre"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleClick}>
                <Text style={styles.buttonText}>Giriş Yap</Text>
            </TouchableOpacity>
            <Text>Hesabınız mı yok mu</Text>
            <TouchableOpacity style={styles.button} onPress={handleClickSignup}>
                <Text style={styles.buttonText}>Kaydolun</Text>
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
