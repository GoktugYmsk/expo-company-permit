import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { TextInput, Button } from "@react-native-material/core";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        checkToken();
    }, []);


    const handleClick = async () => {
        try {
            const response = await axios.post('http://localhost:8080/auth/login', {
                email,
                password,
            });
            if (response.data.token) {
                await AsyncStorage.setItem('userToken', response.data.token);
                navigation.navigate('Home');
            } else {
                alert('Hata', 'Giriş yapılamadı. Kullanıcı adı veya şifre hatalı.');
            }
        } catch (error) {
            console.error('Giriş hatası:', error);
            alert('Hata', 'Giriş yapılırken bir hata oluştu.');
        }
    };

    const getTokenFromStorage = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            return token;
        } catch (error) {
            console.error('Token alınamadı:', error);
            return null;
        }
    };

    const checkToken = async () => {
        const token = await getTokenFromStorage();

        if (token) {
            navigation.navigate('Home');
        }
    };


    const handleClickSignup = () => {
        navigation.navigate('SignUp');
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Giriş Yap</Text>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 20,
                    padding: 0,
                    width: 240,
                }}
            >
                <Icon name="account" size={25} color="gray" />
                <TextInput
                    value={username}
                    onChangeText={setUsername}
                    variant="outlined"
                    label="Kullanıcı Adı"
                    style={{ width: 200, flex: 1, marginLeft: 5 }}
                />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 20,
                    padding: 0,
                    width: 240,
                }}
            >
                <Icon name="mail" size={25} color="gray" />
                <TextInput
                    value={email}
                    autoCapitalize="none"
                    onChangeText={setEmail}
                    variant="outlined"
                    label="E-Mail"
                    style={{ width: 200, flex: 1, marginLeft: 5 }}
                />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 20,
                    padding: 0,
                    width: 240,
                }}
            >
                <Icon name="lock" size={25} color="gray" />
                <TextInput
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    variant="outlined"
                    label="Şifre"
                    style={{ width: 200, flex: 1, marginLeft: 5 }}
                />
            </View>
            <TouchableOpacity>
                <Button
                    title="Giriş Yap"
                    onPress={handleClick}
                    uppercase={false}
                    color="#8754ce"
                    tintColor="white"
                />
            </TouchableOpacity>
            <Text style={styles.titleDown}>Hesabınız mı yok mu ?</Text>
            <TouchableOpacity>
                <Button
                    title="Kayıt Ol"
                    variant="outlined"
                    onPress={handleClickSignup}
                    uppercase={false}
                    color="#8754ce"
                    tintColor="white"
                />
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
        marginBottom: 25,
    },
    titleDown: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10,
    },
});

export default Login;
