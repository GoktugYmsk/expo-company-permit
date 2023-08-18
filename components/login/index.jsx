import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { TextInput, Button } from "@react-native-material/core";
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const handleClick = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8080/auth/login',
                { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            console.log('DENEME', response)


            const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHJpbmciLCJ1c2VySWQiOiI5NjU3YzU1Ny0zZWNiLTQzODQtYTY4YS0wYTYyOTI3ZjgyOWEiLCJyb2xlIjoiRU1QTE9ZRUUiLCJpYXQiOjE2OTIzNDE1MzIsImV4cCI6MTY5MjM3MDMzMn0.sgm5AlMgb2RXYlPDbfjhwG78OAd9ch0DQHY0ltv4h_k';

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            navigation.navigate('Menu');

            console.log('Token alındı:', token);
        } catch (error) {
            console.error('Giriş hatası:', error);
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
