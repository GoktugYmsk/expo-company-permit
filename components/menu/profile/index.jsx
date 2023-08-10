import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setManager } from '../../configure';


function Profile() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const manager = useSelector((state) => state.management.manager)
    const worker = useSelector((state) => state.workerInfoTotal.worker)
    const manageName = useSelector((state) => state.management.manageName);

    const dispatch = useDispatch()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSelectManager = (managerName) => {
        dispatch(setManager(managerName))
        toggleMenu();
    }

    const managers = ['Bora', 'Gökhan', 'Aydın', 'Hakan']

    // useEffect(() => {
    //     dispatch(setManager(''))
    // }, [])

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


export default Profile;
