import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import axios from "axios";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { TextInput, Button } from "@react-native-material/core";

function SignUp() {
    const [nameWorker, setNameWorker] = useState("");
    const [lastNameWorker, setLastNameWorker] = useState("");
    const [emailWorker, setEmailWorker] = useState("");
    const [passwordWorker, setPasswordWorker] = useState("");
    const [error, setError] = useState({ firstName: null, lastName: null, email: null, password: null })

    const navigation = useNavigation();


    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };

    const validations = [nameWorker !== '', lastNameWorker !== '', isValidEmail(emailWorker), passwordRegex.test(passwordWorker)]
    const validator = validations.every(condition => condition === true)

    const handleSignUp = async () => {
        setError({ firstName: null, lastName: null, email: null, password: null });

        if (!nameWorker) {
            setError((prev) => ({ ...prev, firstName: "Name is a required field" }));
        }
        if (!lastNameWorker) {
            setError((prev) => ({ ...prev, lastName: "Lastname is a required field" }));
        }
        if (!isValidEmail(emailWorker)) {
            setError((prev) => ({ ...prev, email: "Invalid email" }));
        }
        if (!passwordRegex.test(passwordWorker)) {
            setError((prev) => ({
                ...prev,
                password: "Password must contain a number and at least one special character (!@#$%^&*).",
            }));
        }
        if (validator) {
            try {
                const response = await axios.post(
                    "https://time-off-tracker-api-4a95404d0134.herokuapp.com/auth/register",
                    {
                        userName: nameWorker,
                        userLastName: lastNameWorker,
                        userEmail: emailWorker,
                        userPassword: passwordWorker,
                    }
                );

                if (response.status === 200) {
                    navigation.navigate("Login");
                } else {
                }
            } catch (error) { }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Kaydol</Text>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                    padding: 10,
                    width: 240,
                }}
            >
                <Icon name="account" size={20} color="gray" />
                <TextInput
                    value={nameWorker}
                    onChangeText={setNameWorker}
                    keyboardType="name"
                    variant="outlined"
                    label="Adınız"
                    style={{ width: 200, flex: 1, marginLeft: 10 }}
                />
            </View>
            {error.firstName && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error.firstName}</Text>
                </View>)}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                    padding: 10,
                    width: 240,
                }}
            >
                <Icon name="account" size={20} color="gray" />
                <TextInput
                    value={lastNameWorker}
                    onChangeText={setLastNameWorker}
                    keyboardType="name"
                    variant="outlined"
                    label="Soyadınız"
                    style={{ width: 200, flex: 1, marginLeft: 10 }}
                />
            </View>
            {error.lastName && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error.lastName}</Text>
                </View>)}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                    padding: 10,
                    width: 240,
                }}
            >
                <Icon name="mail" size={20} color="gray" />
                <TextInput
                    value={emailWorker}
                    onChangeText={setEmailWorker}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    variant="outlined"
                    label="E-posta"
                    style={{ width: 200, flex: 1, marginLeft: 10 }}
                />
            </View>
            {error.email && (<View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error.email}</Text>
            </View>)}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                    padding: 10,
                    width: 240,
                }}
            >
                <Icon name="lock" size={20} color="gray" />
                <TextInput
                    secureTextEntry={true}
                    value={passwordWorker}
                    onChangeText={setPasswordWorker}
                    variant="outlined"
                    label="Şifre"
                    style={{ width: 200, flex: 1, marginLeft: 10 }}
                />
            </View>
            {error.password && (<View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error.password}</Text>
            </View>)}
            <TouchableOpacity>
                <Button
                    onPress={handleSignUp}
                    title="Kayıt Ol"
                    uppercase={false}
                    color="#8754ce"
                    tintColor="white"
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
    },
    button: {
        padding: 10,
        zIndex: 2,
    },
    errorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 230,
        borderRadius: 4,
        marginBottom: 10,
        backgroundColor: '#FF7377'
    },
    errorText: {
        textAlign: 'center',
        paddingHorizontal: 0,
        paddingVertical: 6,
        color: 'white',
        fontWeight: 'bold'
    }
});

export default SignUp;
