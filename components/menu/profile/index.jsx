import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setManager } from '../../configure';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';
import {
    Provider,
    Button,
    Dialog,
    DialogHeader,
    DialogContent,
    DialogActions,
    Text,
    ListItem,
  } from "@react-native-material/core";

    
function Profile() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const manager = useSelector((state) => state.management.manager)
    const worker = useSelector((state) => state.workerInfoTotal.worker)
    const manageName = useSelector((state) => state.management.manageName);

    const navigation = useNavigation();
    const handleRequestClick = () => {
            navigation.navigate('PerRequest')
    }

    const dispatch = useDispatch()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSelectManager = (managerName) => {
        dispatch(setManager(managerName))
        toggleMenu();
    }

    const managers = ['Bora', 'Gökhan', 'Aydın', 'Hakan']

    return (
        <View>
            <View>
                {!manageName &&
                    <View>
                        <Text>Adı Soyadı</Text>
                        <Text>{worker}</Text>

                        <TouchableOpacity onPress={toggleMenu}>
                            <Text>Yönetici Listesi</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
            {manageName &&
                <Text>Yönetici Adı: {manageName} </Text>
            }
            {isMenuOpen && (
                <View>
                    {managers.map((managerName, index) => (
                        <TouchableOpacity key={index} onPress={() => handleSelectManager(managerName)}>
                            <Text>{managerName}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
            {!manageName &&
                <Text>Seçilen Yönetici: {manager}</Text>
            }
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 0,
        backgroundColor: 'white',
        height: '100%',
    },
    profile: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#d2d2d2',
    },
    profileIcon: {
        marginRight: 20,
        backgroundColor: 'gray',
        padding: 18,
        borderRadius: 80,
    },
    profileText: {
        flexDirection: 'column',
        marginRight: 20,
        padding: 5,
    },
    listItem:{
        borderWidth: 1,
        fontSize: 20,
    },
    selectedManager:{
        flexDirection: 'column',
        marginBottom: 320,
    },

});


export default Profile;
