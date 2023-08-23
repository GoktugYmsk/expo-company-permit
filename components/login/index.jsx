import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { TextInput, Button } from "@react-native-material/core";

import { useDispatch, useSelector } from 'react-redux';
import { setManageName, setManager, setWorker, setIdControl, setReason, setStartDay, setEndDay, setWorkerInfo, setWorkerPerReq, setRegUser } from '../configure';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [regUserList, setRegUserList] = useState([]);

    const workerPerReq = useSelector((state) => state.workerInfoTotal.workerPerReq) || [];

    useEffect(() => {
        console.log('DENEME', workerPerReq)
    }, [])

    const navigation = useNavigation();

    const validManagement = [
        { name: 'Bora', email: 'bora@example.com', password: '123456' },
        { name: 'Hakan', email: 'hakan@example.com', password: '123456' },
        { name: 'Aydın', email: 'Aydın', password: '1' },
        { name: 'Gökhan', email: 'Gökhan', password: '1' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const regUserCollection = collection(db, 'regUser');
                const snapshot = await getDocs(regUserCollection);
                const regUserListData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log('ANKARA', regUserListData);

                setRegUserList(regUserListData);
                dispatch(setRegUser(regUserListData))
            } catch (error) {
                console.error('Hatalı veri alınırken: ', error);
            }
        };

        fetchData();
    }, [email]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const regUserCollection = collection(db, 'workerPerReq');
                const snapshot = await getDocs(regUserCollection);
                const regUserListData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log('ANKARA', regUserListData);
                dispatch(setWorkerPerReq(regUserListData))
            } catch (error) {
                console.error('Hatalı veri alınırken: ', error);
            }
        };
        fetchData();
    }, []);


    const handleClick = () => {
        const isValidWorker = regUserList.find(worker => worker.name === username);
        const isValidManagement = validManagement.find(manager => manager.name === username);

        if (isValidWorker) {
            const matchedUser = regUserList.find(worker => worker.name === username && worker.email === email);

            if (matchedUser && matchedUser.password === password) {
                dispatch(setWorker(username));
                dispatch(setManageName(''));
                dispatch(setManager(''));
                dispatch(setIdControl(isValidWorker.id))
                setEmail('')
                setPassword('')
                setUsername('')
                const isWeb = Platform.OS === 'web' ? 'Profile' : 'Menu'
                navigation.navigate(isWeb);
            }
            else {
                alert("Giriş Bilgileri Hatalı");
            }

        } else if (isValidManagement && isValidManagement.password === password) {
            dispatch(setManageName(username));
            setEmail('')
            setPassword('')
            setUsername('')
            const isWeb = Platform.OS === 'web' ? 'Profile' : 'Menu'
            navigation.navigate(isWeb);
        } else {
            alert("Çalışan bulunamadı");
        }
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