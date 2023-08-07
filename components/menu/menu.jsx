import { useNavigation } from '@react-navigation/native';
import React from 'react'

import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

function Menu() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}  >
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')} >
                <Text style={styles.buttonText}>Anasayfa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>Profil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>İzin talebi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>İzinlerim</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>Onay Bekleyen İşlemler</Text>
            </TouchableOpacity>
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
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