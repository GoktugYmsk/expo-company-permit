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
        <Provider>
            <View style={styles.container}>
                <View style={styles.profile}>
                    <View style={styles.profileIcon}>
                        <Icon name="account" size={24} color="white"/>
                    </View>
                    
                    <View style={styles.profileText}>
                        <Text style={{ fontSize: 25 }} variant="h6">Adı Soyadı</Text>
                        <Text>{worker}</Text>
                    </View>

                </View>

                <Text style={{ marginTop: 30,fontSize: 23, padding: 10,paddingLeft: 36, }} variant="h6">Yönetici Seç :</Text>
                <Button
                    title="YÖNETİCİ LİSTESİ"
                    style={{marginLeft: 36,marginRight: 36,}}
                    color="#8754ce"
                    leading={<Icon style={{ marginRight: 5 }} name="format-list-bulleted" color="white" size={20} />}
                    onPress={() => {
                        toggleMenu();
                        setVisible(true);
                    }}
                />

                <Dialog  visible={visible} onDismiss={() => setVisible(false)}>
                    <DialogHeader  title="Yöneticiler" />
                    <DialogContent>
                        <View>
                            {managers.map((managerName, index) => (
                                    
                                <ListItem 
                                key={index} onPress={() => handleSelectManager(managerName)} title={`${managerName}`
                            
                            }/>
                                
                            ))}
                        </View>
                    </DialogContent>


                    <DialogActions>
                        <Button
                            title="Çık"
                            compact
                            variant="outlined"
                            onPress={() => setVisible(false)}
                        />
                        <Button
                            title="Tamam"
                            compact
                            variant="outlined"
                            onPress={() => setVisible(false)}
                        />
                    </DialogActions>
                </Dialog>

                <View style={styles.selectedManager}>
                    <Text style={{ marginTop: 30,fontSize: 23, padding: 10,paddingLeft: 36, }} variant="h6">Seçilen Yönetici :</Text>
                    <Button style={{ marginLeft: 36,marginRight: 36,}} variant="outlined" title={`${manager}`} />
                </View>
                <Button 
                    style={{ marginLeft: 36,marginRight: 36,}} 
                    color="#8754ce" 
                    tintColor="white" 
                    title="İZİN TALEBİ OLUŞTUR"
                    onPress={handleRequestClick}
                
                />
            </View>
        </Provider>
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
