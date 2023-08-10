import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { useState } from 'react';

import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";


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
            <View style={styles.menu}>
                <TouchableOpacity style={styles.button} onPress={handleMainClick} >
                    <Icon name="home" size={30} />
                    <Text style={styles.buttonText}>Anasayfa</Text>
                    <Icon name="arrow-right" size={23} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')} >
                    <Icon name="account" size={30} />
                    <Text style={styles.buttonText}>Profil</Text>
                    <Icon name="arrow-right" size={23} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleRequestClick} >
                    <Icon name="thumb-up" size={30} />
                    <Text style={styles.buttonText}>İzin talebi</Text>
                    <Icon name="arrow-right" size={23} />
                </TouchableOpacity>
                {
                    isAdmin &&
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OffDuty')}>
                        <Icon name="sunglasses" size={30} />
                        <Text style={styles.buttonText}>İzinlerim</Text>
                        <Icon name="arrow-right" size={23} />
                    </TouchableOpacity>
                }
                <TouchableOpacity style={styles.button} onPress={handleApprovalClick} >
                    <Icon name="progress-clock" size={30} />
                    <Text style={styles.buttonText}>Onay Bekleyen İşlemler</Text>
                    <Icon name="arrow-right" size={23} />
                </TouchableOpacity>
            </View>
        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
    },
    menu: {
        width: '100%',
        padding: 20,
    },
    header: {
        fontSize: 20,
        backgroundColor: '#f1f1f1',
        width: '100%',
        padding: 10,
        textAlign: "center",
        fontWeight: "bold",

    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: "center",
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: '#c4c4c4',
    },
    buttonText: {
        width: '80%',
        paddingLeft: 10,
    },
});


export default Menu
