import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { TextInput, Button } from "@react-native-material/core";

function SignUp() {
    const [nameWorker, setNameWorker] = useState('')
    const [lastNameWorker, setLastNameWorker] = useState('')
    const [emailWorker, setEmailWorker] = useState('');
    const [passwordWorker, setPasswordWorker] = useState('');

    const navigation = useNavigation()

    const handleSignUp = async () => {
        try {
            const response = await axios.post('http://localhost:8080/auth/register', {
                firstName: nameWorker,
                lastName: lastNameWorker,
                email: emailWorker,
                password: passwordWorker,
                status: true,
            });
            console.log('Response:', response.data);
        } catch (error) {
            console.error("Error while signing up:", error);
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
                <Icon name="account" size={20} color="gray" />
                <TextInput
                    value={lastNameWorker}
                    onChangeText={setLastNameWorker}
                    keyboardType="name"
                    variant="outlined" label="Soyadınız" style={{ width: 200, flex: 1, marginLeft: 10 }}
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
