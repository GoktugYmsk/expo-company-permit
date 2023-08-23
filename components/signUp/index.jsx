import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { addDoc, collection } from "firebase/firestore";
import { db } from '../../firebase';

import { v4 as uuidv4 } from 'uuid';

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import app from "../../firebase"
import { TextInput, Button } from "@react-native-material/core";

import { setRegUser } from '../configure';
import { useEffect } from 'react';

function SignUp() {
    const [nameWorker, setNameWorker] = useState('')
    const [emailWorker, setEmailWorker] = useState('');
    const [passwordWorker, setPasswordWorker] = useState('');
    const [fireRegUser, setFireRegUSer] = useState([])

    const dispatch = useDispatch()
    const navigation = useNavigation()


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

                setFireRegUSer(regUserListData); // regUserList durumunu güncelleyin
            } catch (error) {
                console.error('Hatalı veri alınırken: ', error);
            }
        };

        fetchData();
    }, []);


    const handleSignUp = () => {
        if (nameWorker) {
            const emailControl = fireRegUser.find(worker => worker.email === emailWorker);

            if (!emailControl) {
                const newWorker = {
                    id: uuidv4(),
                    name: nameWorker,
                    email: emailWorker,
                    password: passwordWorker,
                    perDateTotal: 30,
                    startDate: new Date().toISOString().split('T')[0],

                };
                const workersSaved = collection(db, "regUser");
                addDoc(workersSaved, newWorker)
                    .then(() => {
                        console.log("Veri başarıyla Firestore'a eklendi.");
                    })
                    .catch((error) => {
                        console.error("Veri eklenirken hata oluştu: ", error);
                    });
                // dispatch(setRegUser([...regUser, newWorker]));
            }
            else {
                alert('Kullanıcı zaten kayıtlı ')
                navigation.navigate('Login');
            }


        }
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Kaydol</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, padding: 10, width: 240, }}>
                <Icon name="account" size={20} color="gray" />
                <TextInput
                    value={nameWorker}
                    onChangeText={setNameWorker}
                    keyboardType="name"
                    variant="outlined" label="Adınız" style={{ width: 200, flex: 1, marginLeft: 10 }}
                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, padding: 10, width: 240, }}>
                <Icon name="mail" size={20} color="gray" />
                <TextInput
                    value={emailWorker}
                    onChangeText={setEmailWorker}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    variant="outlined" label="E-posta" style={{ width: 200, flex: 1, marginLeft: 10 }}
                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, padding: 10, width: 240, }}>
                <Icon name="lock" size={20} color="gray" />
                <TextInput
                    secureTextEntry={true}
                    value={passwordWorker}
                    onChangeText={setPasswordWorker}
                    variant="outlined" label="Şifre" style={{ width: 200, flex: 1, marginLeft: 10 }}
                />
            </View>
            <TouchableOpacity >
                <Button onPress={handleSignUp} title="Kayıt Ol" uppercase={false} color="#8754ce" tintColor="white" />
            </TouchableOpacity>
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
    button: {
        padding: 10,
        zIndex: 2,
    },
});

export default SignUp;