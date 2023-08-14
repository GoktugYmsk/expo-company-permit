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
<<<<<<< HEAD
=======
    const workerPerReq = useSelector((state) => state.workerInfoTotal.workerPerReq);
    const isWorkerPermit = useSelector((state) => state.isWorker.isWorkerPermit);
    console.log('WORKERPERREQ', workerPerReq)
>>>>>>> Göktuğ

    const handleMainClick = () => {
        if (manager) {
            navigation.navigate('Home')
        }
        else {
            alert('Profile sayfasından yönetici Seçimi yapınız')
            // setTimeout(() => {
            //     navigation.navigate('Profile')
            // }, 3000);
        }
    }

    const handleRequestClick = () => {
        if (manager) {
            navigation.navigate('PerRequest')
        }
        else {
            alert('Profile sayfasından yönetici Seçimi yapınız')
            // setTimeout(() => {
            //     navigation.navigate('Profile')
            // }, 3000);
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
            alert('Profile sayfasından yönetici Seçimi yapınız')
            // setTimeout(() => {
            //     navigation.navigate('Profile')
            // }, 3000);
        }
    }

<<<<<<< HEAD
=======
    const handleProfileClick = () => {
        if (worker && workerPerReq) {
            const savedUser = workerPerReq.filter((item) => item.name === worker);
            // console.log('savedUser', savedUser);

            // Eğer savedUser boş değilse (eşleşme varsa), true döndür
            const isUserSaved = savedUser.length > 0;
            // console.log('isUserSaved', isUserSaved);

            dispatch(setIsWorkerPermit(isUserSaved));
        }
        else {
            dispatch(setIsWorkerPermit(false));
        }
        navigation.navigate('Profile');
    }


>>>>>>> Göktuğ
    const isAdmin = manageName !== '';

    return (
        <View style={styles.container}  >
            <View style={styles.header}>
                <Text style={styles.headerText}>Pinsoft İzinlerim</Text>
            </View>

            <View style={styles.menu}>
                <TouchableOpacity style={styles.button} onPress={handleMainClick} >
                    <Icon name="home" size={30} color="#8754ce" />
                    <Text style={styles.buttonText}>Anasayfa</Text>
                    <Icon name="arrow-right" size={23} color="#6d6e70" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleProfileClick} >
                    <Icon name="account" size={30} color="#8754ce" />
                    <Text style={styles.buttonText}>Profil</Text>
                    <Icon name="arrow-right" size={23} color="#6d6e70" />
                </TouchableOpacity>

                {!manageName &&
                    <TouchableOpacity style={styles.button} onPress={handleRequestClick} >
                        <Icon name="thumb-up" size={30} color="#8754ce" />
                        <Text style={styles.buttonText}>İzin talebi</Text>
                        <Icon name="arrow-right" size={23} color="#6d6e70" />
                    </TouchableOpacity>
                }

                {
                    isAdmin &&
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OffDuty')}>
                        <Icon name="sunglasses" size={30} color="#8754ce" />
                        <Text style={styles.buttonText}>İzinlilerim</Text>
                        <Icon name="arrow-right" size={23} color="#6d6e70" />
                    </TouchableOpacity>
                }
                <TouchableOpacity style={styles.button} onPress={handleApprovalClick} >
                    <Icon name="progress-clock" size={30} color="#8754ce" />
                    <Text style={styles.buttonText}>Onay Bekleyen İşlemler</Text>
                    <Icon name="arrow-right" size={23} color="#6d6e70" />
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
        padding: 10,
    },
    menu: {
        width: '100%',
        padding: 20,
        paddingRight: 10,
        paddingLeft: 10,
    },
    header: {
        backgroundColor: '#8754ce',
        width: '100%',
        padding: 10,
        borderRadius: 4,
    },
    headerText: {
        fontSize: 20,
        width: '100%',
        textAlign: "center",
        fontWeight: "bold",
        color: 'white',
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
