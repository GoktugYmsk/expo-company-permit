import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setManager } from '../../configure';

import CustomHamburger from '../../customHamburger';


function Profile() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const manager = useSelector((state) => state.management.manager)
    const worker = useSelector((state) => state.workerInfoTotal.worker)
    const manageName = useSelector((state) => state.management.manageName);
    const workerPerReq = useSelector((state) => state.workerInfoTotal.workerPerReq);
    const isWorkerPermit = useSelector((state) => state.isWorker.isWorkerPermit);

    console.log('isWorkerPermit', isWorkerPermit)

    const dispatch = useDispatch()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSelectManager = (managerName) => {
        dispatch(setManager(managerName))
        // toggleMenu();
        // if (worker && workerPerReq) {
        //     const savedUser = workerPerReq.filter((item) => item.name === worker);
        //     console.log('savedUser', savedUser)
        //     setReqUser(savedUser)
        // }
    }

    const managers = ['Bora', 'Gökhan', 'Aydın', 'Hakan']


    return (
        <View>
            <CustomHamburger />
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
            {!isWorkerPermit && <Text>buton</Text>}
        </View>
    );
}


export default Profile;
