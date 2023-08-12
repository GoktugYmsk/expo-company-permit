import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { TextInput, Button, IconButton } from "@react-native-material/core";
import { useDispatch, useSelector } from 'react-redux';
import { setEndDay, setManageName, setManager, setReason, setStartDay, setWorker, setWorkerInfo, setWorkerPerReq, setIdControl } from '../configure';

function Login() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')

    const regUser = useSelector((state) => state.saveRegUser.regUser)

    console.log('regUser', regUser)

    const dispatch = useDispatch()


    const validManagement = [
        { name: 'Bora', email: 'bora@example.com', password: '123456' },
        { name: 'Gökhan', email: 'gokhan@example.com', password: '123456' },
        { name: 'Aydın', email: 'aydin@example.com', password: '123456' },
        { name: 'Hakan', email: 'hakan@example.com', password: '123456' }
    ];

    const handleClick = () => {
        const isValidWorker = regUser.find(worker => worker.name === username);
        console.log('isValidWorker', isValidWorker)
        const isValidManagement = validManagement.find(manager => manager.name === username);

        if (isValidWorker) {
            const matchedUser = regUser.find(worker => worker.name === username && worker.email === email);

            if (matchedUser && matchedUser.password === password) {
                dispatch(setWorker(username));
                dispatch(setManageName(''));
                dispatch(setManager(''));
                dispatch(setIdControl(isValidWorker.id))
                setEmail('')
                setPassword('')
                setUsername('')
                navigation.navigate('Menu');
            }
            else {
                alert("Kullanıcı adı veya şifre hatalı!");
            }

        } else if (isValidManagement && isValidManagement.password === password) {
            dispatch(setManageName(username));
            navigation.navigate('Menu');
        } else {
            alert("Çalışan bulunamadı");
        }
    };

    const handleClickSignup = () => {
        navigation.navigate('SignUp')
    }

    // useEffect(() => {
    //     dispatch(setReason(''))
    //     dispatch(setStartDay(''))
    //     dispatch(setEndDay(''))
    //     dispatch(setManager(''))
    //     dispatch(setManageName(''))
    //     dispatch(setWorker(''))
    //     dispatch(setWorkerInfo(''))
    //     dispatch(setWorkerPerReq(''))
    // }, [])

    return (
        <View style={styles.container} >
            <Text style={styles.title}>Giriş Yap</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, padding: 0, width: 240, }}>
                <Icon name="account" size={25} color="gray" />
                <TextInput
                    value={username}
                    onChangeText={setUsername}
                    variant="outlined" label="Kullanıcı Adı" style={{ width: 200, flex: 1, marginLeft: 5 }}
                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, padding: 0, width: 240, }}>
                <Icon name="lock" size={25} color="gray" />
                <TextInput
                    value={email}
                    autoCapitalize="none"
                    onChangeText={setEmail}
                    variant="outlined" label="email" style={{ width: 200, flex: 1, marginLeft: 5 }}
                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, padding: 0, width: 240, }}>
                <Icon name="lock" size={25} color="gray" />
                <TextInput
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    variant="outlined" label="Şifre" style={{ width: 200, flex: 1, marginLeft: 5 }}
                />
            </View>
            <TouchableOpacity  >
                <Button title="Giriş Yap" onPress={handleClick} uppercase={false} color="#8754ce" tintColor="white" />
            </TouchableOpacity>

            <Text style={styles.titleDown}>Hesabınız mı yok mu ?</Text>

            <TouchableOpacity  >
                <Button title="Kayıt Ol" variant="outlined" onPress={handleClickSignup} uppercase={false} color="#8754ce" tintColor="white" />
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
    buttonTextDownDiv: {
        backgroundColor: "white",
        padding: 10,
        borderWidth: 1,
        borderColor: "#8754ce",
        borderRadius: 5,
    },
    buttonTextDown: {
        color: "#8754ce",
    },
});

export default Login;
