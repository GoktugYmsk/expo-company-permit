import { useNavigation } from '@react-navigation/native';
import React from 'react'

import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";


function Menu() {


    const reason = useSelector((state) => state.userReason.reason)


    const navigation = useNavigation();

    return (
        <View style={styles.container}  >
            <Text style={styles.header}>
                Pinsoft İzinlerim
            </Text>
            <View style={styles.menu}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')} >
                    <Icon name="home" size={30} />
                    <Text style={styles.buttonText}>Anasayfa</Text>
                    <Icon name="arrow-right" size={23} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')} >
                    <Icon name="account" size={30} />
                    <Text style={styles.buttonText}>Profil</Text>
                    <Icon name="arrow-right" size={23} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PerRequest')} >
                    <Icon name="thumb-up" size={30} />
                    <Text style={styles.buttonText}>İzin talebi</Text>
                    <Icon name="arrow-right" size={23} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} >
                    <Icon name="sunglasses" size={30} />
                    <Text style={styles.buttonText}>İzinlerim</Text>
                    <Icon name="arrow-right" size={23} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Approval')} >
                    <Icon name="progress-clock" size={30} />
                    <Text style={styles.buttonText}>Onay Bekleyen İşlemler</Text>
                    <Icon name="arrow-right" size={23} />
                </TouchableOpacity>
                <Text>{reason}</Text>
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
        alignItems:"center",
        paddingLeft: 10,
        borderWidth: 1,
        borderColor:'#c4c4c4',
    },
    buttonText: {
        width: '80%',
        paddingLeft: 10,
    },
});


export default Menu