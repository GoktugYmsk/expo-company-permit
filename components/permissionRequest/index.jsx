import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import { setReason, setStartDay, setEndDay, setWorkerPerReq } from '../configure';
import { Switch } from "@react-native-material/core";

function PermissionRequest() {
    const [error, setError] = useState('')
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [checked, setChecked] = useState(false)

    const [sreason, setSreason] = useState('')

    console.log('checked', checked)

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const manager = useSelector((state) => state.management.manager)
    const worker = useSelector((state) => state.workerInfoTotal.worker);
    const workerPerReq = useSelector((state) => state.workerInfoTotal.workerPerReq);
    const workerInfo = useSelector((state) => state.workerInfoTotal.workerInfo);
    // const reason = useSelector((state) => state.userReason.reason)
    // const startDay = useSelector((state) => state.offDays.startDay)
    // const endDay = useSelector((state) => state.offDays.endDay)

    const allPermits = useSelector((state) => state.workerInfoTotal.allPermits)
    console.log(workerPerReq);

    const handleStartDate = (e) => {
        setSelectedStartDate(e)
    }
    const handleEndDate = (e) => {
        setSelectedEndDate(e)
    }

    const handleReasonChange = (e) => {
        setSreason(e)
    }
    // console.log("Manager:", manager);
    // console.log("Selected Start Date:", selectedStartDate);
    // console.log("Selected End Date:", selectedEndDate);
    // console.log("Reason:", sreason);


    const handleSendRequest = () => {
        if (manager && selectedStartDate && selectedEndDate) {
            if (workerInfo) {
                const isNameInWorkerInfo = workerInfo.find(workerInfoItem => workerInfoItem.name === worker);

                if (isNameInWorkerInfo) {
                    setError('Bu işçinin zaten bir izin isteği bulunmaktadır.');
                }
                else {
                    const newWorkerInfo = {
                        name: worker,
                        startDay: selectedStartDate,
                        endDay: selectedEndDate,
                        reason: sreason,
                        manager: manager,
                        accept: null,
                    };
                    dispatch(setWorkerPerReq([...workerPerReq, newWorkerInfo]));
                    navigation.navigate('MyRequest');
                }
            }
            else if (workerPerReq) {
                const isNameInWorkerPerReq = workerPerReq.find(workerInfo => workerInfo.name === worker);

                if (isNameInWorkerPerReq) {
                    setError('Bu işçinin zaten bir izin isteği bulunmaktadır.');
                }
                else {
                    const newWorkerInfo = {
                        name: worker,
                        startDay: selectedStartDate,
                        endDay: selectedEndDate,
                        reason: sreason,
                        manager: manager,
                        accept: null,

                    };
                    dispatch(setWorkerPerReq([...workerPerReq, newWorkerInfo]));
                    navigation.navigate('MyRequest');
                }
            }
            else {
                const newWorkerInfo = {
                    name: worker,
                    startDay: selectedStartDate,
                    endDay: selectedEndDate,
                    reason: sreason,
                    manager: manager,
                    accept: null,

                };

                dispatch(setWorkerPerReq([...workerPerReq, newWorkerInfo]));
                navigation.navigate('MyRequest');
            }
        }
        else if (manager && selectedStartDate) {
            if (workerInfo) {
                const isNameInWorkerInfo = workerInfo.find(workerInfoItem => workerInfoItem.name === worker);

                if (isNameInWorkerInfo) {
                    setError('Bu işçinin zaten bir izin isteği bulunmaktadır.');
                }
                else {
                    const newWorkerInfo = {
                        name: worker,
                        startDay: selectedStartDate,
                        endDay: selectedEndDate,
                        reason: sreason,
                        manager: manager,
                        accept: null,
                    };
                    dispatch(setWorkerPerReq([...workerPerReq, newWorkerInfo]));
                    navigation.navigate('MyRequest');
                }
            }
            else if (workerPerReq) {
                const isNameInWorkerPerReq = workerPerReq.find(workerInfo => workerInfo.name === worker);

                if (isNameInWorkerPerReq) {
                    setError('Bu işçinin zaten bir izin isteği bulunmaktadır.');
                }
                else {
                    const newWorkerInfo = {
                        name: worker,
                        startDay: selectedStartDate,
                        endDay: selectedEndDate,
                        reason: sreason,
                        manager: manager,
                        accept: null,

                    };
                    dispatch(setWorkerPerReq([...workerPerReq, newWorkerInfo]));
                    navigation.navigate('MyRequest');
                }
            }
            else {
                const newWorkerInfo = {
                    name: worker,
                    startDay: selectedStartDate,
                    endDay: selectedEndDate,
                    reason: sreason,
                    manager: manager,
                    accept: null,

                };

                dispatch(setWorkerPerReq([...workerPerReq, newWorkerInfo]));
                navigation.navigate('MyRequest');
            }
        }
        else if (!manager) {
            setError('Lütfen profil sayfasından yönetici seçiniz.');
        }
        else {
            console.log('Tarih bilgilerini kontrol ediniz.');
        }
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <>
                {error &&
                    <Text>{error}</Text>
                }
                <Text>İzin Nedeni</Text>
                <TextInput style={styles.input} onChangeText={handleReasonChange} />
                <View style={styles.middleContent}>
                    <Text style={styles.inlineText}>Tek gün izin</Text>
                    <Text style={styles.inlineText}>/</Text>
                    {
                        checked &&
                        <Text style={styles.inlineText}>Çoklu gün izin</Text>
                    }
                    <Switch value={checked} onValueChange={() => setChecked(!checked)} />
                </View>
                <View style={styles.altContent}>
                    <Text>İzin Tarihi Aralığı</Text>
                    <View style={styles.datePicker}>
                        <Text>Başlangıç</Text>
                        <Calendar
                            style={styles.calendar}
                            onDayPress={(day) => handleStartDate(day.dateString)}
                            selected={selectedStartDate}
                        />
                    </View>
                    {checked &&

                        <View style={styles.datePicker}>
                            <Text>Bitiş</Text>
                            <Calendar
                                style={styles.calendar}
                                onDayPress={(day) => handleEndDate(day.dateString)}
                                selected={selectedEndDate}
                            />
                        </View>
                    }
                </View>
                <TouchableOpacity onPress={handleSendRequest} style={styles.button}>
                    <Text>İzni Onaya gönder</Text>
                </TouchableOpacity>
            </>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'red',
        paddingBottom: 20,
    },
    middleContent: {
        flexDirection: 'row',
        backgroundColor: 'green',
        justifyContent: 'space-around',
        width: '100%',
    },
    input: {
        width: '80%',
        height: 40,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    calendar: {
        width: 410,
        marginTop: 10,
    },
    button: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
    },
    altContent: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    datePicker: {
        flexDirection: 'column',
        alignItems: 'center',
    },
});

export default PermissionRequest;
