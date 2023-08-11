import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setHamburgerActive } from '../configure';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";


function CustomHamburger() {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const hamburgerActive = useSelector((state) => state.management.hamburgerActive);

    console.log('hamburgerActive Denem', hamburgerActive)

    const handleHamburgerClick = () => {
        dispatch(setHamburgerActive(!hamburgerActive));
    };

    const handleHomeClick = () => {
        dispatch(setHamnburgerActive(false));
        navigation.navigate('Home');
    }
    const handleProfileClick = () => {
        dispatch(setHamnburgerActive(false));
        navigation.navigate('Profile');
    }
    const handlePerRequestClick = () => {
        dispatch(setHamburgerActive(false));
        navigation.navigate('PerRequest');
    }



    const handleMenuItemClick = (screenName) => {
        navigation.navigate(screenName);
        dispatch(setHamburgerActive(false));
    };

    const handleApprovalClick = () => {
        if (manageName && worker) {
            navigation.navigate('Approval')
        }
        else if (!manageName && worker && manager) {
            navigation.navigate('MyRequest')
        }
        else if (!manageName && worker && !manager) {
            alert('Profile sayfasından yönetici Seçimi yapınız')
        }
    }

    return (
        <View>
            <View style={styles.mainBar} >
                <Icon onPress={handleHamburgerClick} style={styles.hamburgerMenu} name="menu" size={36} />
                {hamburgerActive && (
                    <View style={styles.menuContainer}>
                        <TouchableOpacity onPress={() => handleMenuItemClick('Home')}>
                            <Text>Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleMenuItemClick('Profile')}>
                            <Text>Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handlePerRequestClick}>
                            <Text>Permission Request</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleApprovalClick}>
                            <Text>Onay Bekleyen İşlemler</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainBar: {
        position: 'relative',
        width: '100%',
    },
    hamburgerMenu: {
        fontSize: 40,
        position: 'relative',
        top: 0,
        right: 0,
        height: 120,

    },
    menuContainer: {

        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'white',
        width: 200,
        elevation: 4,
        padding: 10,
        gap: 40,
        zIndex: 2,
    },
});

export default CustomHamburger;
