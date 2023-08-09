import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { useState } from 'react';

import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

function Menu() {
    const navigation = useNavigation();

    const manageName = useSelector((state) => state.management.manageName);
    const manager = useSelector((state) => state.management.manager)
    const worker = useSelector((state) => state.workerInfoTotal.worker);

    const handleMainClick = () => {
        if (manager) {
            navigation.navigate('Home')
        }
        else {
            alert('Yönetici Seçimi yapınız')
            setTimeout(() => {
                navigation.navigate('Profile')
            }, 3000);
        }
    }

    const handleRequestClick = () => {
        if (manager) {
            navigation.navigate('PerRequest')
        }
        else {
            alert('Yönetici Seçimi yapınız')
            setTimeout(() => {
                navigation.navigate('Profile')
            }, 3000);
        }
    }


    const handleApprovalClick = () => {
        if (manageName && worker) {
            navigation.navigate('Approval')
        }
        else if (!manageName && worker && manager) {
            navigation.navigate('MyRequest')
        }
        else if (!manageName && worker && !manager) {
            alert('Yönetici Seçimi yapınız')
            setTimeout(() => {
                navigation.navigate('Profile')
            }, 3000);
        }
    }

    const isAdmin = manageName !== '';

    return (
        <View style={styles.container}  >
            <Text style={styles.header}>
                Pinsoft İzinlerim
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleMainClick} >
                <Text style={styles.buttonText}>Anasayfa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')} >
                <Text style={styles.buttonText}>Profil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleRequestClick} >
                <Text style={styles.buttonText}>İzin talebi</Text>
            </TouchableOpacity>
            {
                isAdmin &&
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OffDuty')} >
                    <Text style={styles.buttonText}>İzinlilerim</Text>
                </TouchableOpacity>
            }
            <TouchableOpacity style={styles.button} onPress={handleApprovalClick} >
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
