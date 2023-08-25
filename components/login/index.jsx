import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { TextInput, Button } from "@react-native-material/core";
import axios from 'axios';
import api from '../../intercepter';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIdControl } from '../configure';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState([])

    const dispatch = useDispatch()


    useEffect(() => {
        api.get('/users')
            .then((response) => {
                setUser(response.data);
                console.log('UsersArray', response)
                console.log('id:', response.data[0].id);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);



    // useEffect(() => {

    //     axios.get('https://time-off-tracker-api-4a95404d0134.herokuapp.com/users')
    //         .then((response) => {
    //             setUser(response.data);
    //             console.log('GÖKTUĞ', response)
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }, [email]);



    const navigation = useNavigation();

    const handleClick = async () => {
        try {
            const response = await axios.post('https://time-off-tracker-api-4a95404d0134.herokuapp.com/auth/login',
                {
                    userEmail: email,
                    userPassword: password,
                });
            if (response.data.token) {
                localStorage.setItem('userToken', response.data.token);
                if (localStorage.getItem('userToken')) {

                    const isUser = user.find(u => u.userEmail === email);

                    if (isUser) {
                        dispatch(setIdControl(isUser.id));

                        console.log('STATİK', isUser.id)
                        navigation.navigate('Home');
                    }
                }
            } else { alert('Hata Giriş yapılamadı. Kullanıcı adı veya şifre hatalı.'); }
        } catch (error) { alert('Hata Giriş yapılırken bir hata oluştu.'); }
    };



    // const getTokenFromStorage = async () => {
    //     try {
    //         const token = await AsyncStorage.getItem('userToken');
    //         return token;
    //     } catch (error) {
    //         return null;
    //     }
    // };


    // const checkToken = async () => {
    //     const token = await getTokenFromStorage();

    //     if (token) {
    //         navigation.navigate('Home');
    //     } else {
    //         navigation.navigate('Login');
    //     }
    // };



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