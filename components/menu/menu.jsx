import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { useState } from 'react';

import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

function Menu() {
    const [adminHakan, setAdminHakan] = useState(false);

    const manageName = useSelector((state) => state.management.manageName);

    const navigation = useNavigation();


    useEffect(() => {
        if (manageName === 'Hakan') {
            setAdminHakan(true);
        }
    }, [manageName]);

    return (
        <View style={styles.container}  >
            <Text style={styles.header}>
                Pinsoft İzinlerim
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')} >
                <Text style={styles.buttonText}>Anasayfa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')} >
                <Text style={styles.buttonText}>Profil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PerRequest')} >
                <Text style={styles.buttonText}>İzin talebi</Text>
            </TouchableOpacity>
            {
                adminHakan &&
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OffDuty')} >
                    <Text style={styles.buttonText}>İzinlilerim</Text>
                </TouchableOpacity>
            }
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Approval')} >
                <Text style={styles.buttonText}>Onay Bekleyen İşlemler</Text>
            </TouchableOpacity>
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