import { useNavigation } from '@react-navigation/native';
import React from 'react'

import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

function Menu() {


    const reason = useSelector((state) => state.userReason.reason)


    const navigation = useNavigation();

    return (
        <View style={styles.container}  >
            <Text style={styles.header}>
                Pinsoft İzinlerim
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')} >
                <Text style={styles.buttonText}>Anasayfa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>Profil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PerRequest')} >
                <Text style={styles.buttonText}>İzin talebi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>İzinlerim</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>Onay Bekleyen İşlemler</Text>
            </TouchableOpacity>
            <Text>{reason}</Text>
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
        padding: 20
    },
    header: {
        fontSize: 20
    },
    button: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: '100%',
    },
});


export default Menu