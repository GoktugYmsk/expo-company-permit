import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,  TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setManageName, setWorker } from '../configure';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { TextInput, Button , IconButton} from "@react-native-material/core";

function Login() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()

    const handleClick = () => {
        if (username === 'Pinsoft' && password === '1234') {
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
        <View style={styles.container} >
            <Text style={styles.title}>Giriş Yap</Text>
            
            <View style={{ flexDirection: 'row', alignItems: 'center',marginBottom: 20, padding: 0 , width: 240,}}>
                <Icon name="account" size={25} color="gray" />
                <TextInput
                    value={username}
                    onChangeText={setUsername}
                    variant="outlined" label="Kullanıcı Adı" style={{ width: 200, flex: 1, marginLeft: 5 }}
                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center',marginBottom: 20, padding: 0 , width: 240,}}>
                <Icon name="lock" size={25} color="gray" />
                <TextInput
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    variant="outlined" label="Şifre" style={{ width: 200, flex: 1, marginLeft: 5}}
                />
            </View>
            <TouchableOpacity  >
                <Button title="Giriş Yap" onPress={handleClick} uppercase={false} color="#ff6131" tintColor="white"/>
            </TouchableOpacity>

            <Text style={styles.titleDown}>Hesabınız mı yok mu ?</Text>

            <TouchableOpacity  >
                <Button title="Kayıt Ol" variant="outlined" onPress={handleClickSignup} uppercase={false} color="#ff6131" tintColor="white"/>
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
        marginBottom: 10,
    },
    titleDown: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10,
    },
    buttonTextDownDiv: {
        backgroundColor: "white",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ff6131",
        borderRadius: 5,
    },
    buttonTextDown: {
        color: "#ff6131",
    },
});

export default Login;
