import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import { setReason, setStartDay, setEndDay, setWorkerPerReq } from '../configure';
import { Switch, TextInput, Button } from "@react-native-material/core";

import CustomHamburger from '../customHamburger';
import { useEffect } from 'react';

function PermissionRequest() {
    const [error, setError] = useState('')
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [checked, setChecked] = useState(false)

    const [sreason, setSreason] = useState('')

    // console.log('checked', checked)

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const manager = useSelector((state) => state.management.manager)
    const worker = useSelector((state) => state.workerInfoTotal.worker);
    const workerPerReq = useSelector((state) => state.workerInfoTotal.workerPerReq);
    const workerInfo = useSelector((state) => state.workerInfoTotal.workerInfo);
    const regUser = useSelector((state) => state.saveRegUser.regUser)
    const idControl = useSelector((state) => state.management.idControl);

    console.log('workerPerReq', workerPerReq)


    // const reason = useSelector((state) => state.userReason.reason)
    // const startDay = useSelector((state) => state.offDays.startDay)
    // const endDay = useSelector((state) => state.offDays.endDay)

    const allPermits = useSelector((state) => state.workerInfoTotal.allPermits)
    // console.log(workerPerReq);

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


    const startDate = new Date(selectedStartDate);
    const endDate = checked ? new Date(selectedEndDate) : startDate;
    const daysDifference = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const oneDay = Math.ceil((startDate) / (1000 * 60 * 60 * 24));


    const handleSendRequest = () => {
        if (manager && selectedStartDate && selectedEndDate) { // Yönetici ve tarihler seçilmiş mi kontrolü
            if (workerPerReq) { // Çalışan izin talepleri var mı kontrolü
                const isWorkerId = workerPerReq.find(workerInfo => workerInfo.id === idControl);

                console.log('isWorkerId', isWorkerId)

                console.log('MANİSA')
                if (isWorkerId) {

                    console.log('ANKARA')
                    console.log('isWorkerInfo', isWorkerId.totalPerDay)

                    if (isWorkerId) {
                        const leavePer = 30 - isWorkerId.totalPerDay;

                        if (isWorkerId.totalPerDay >= 30) {
                            console.log('DENİZLİ')
                            setError(`Bu çalışan yıllık toplam 30 günden fazla izin talebinde bulunamaz. Kalan izin hakkı: ${leavePer}`);
                        } else {
                            const newPerDate = daysDifference + isWorkerId.totalPerDay;

                            console.log('ISTANBUL')

                            if (newPerDate > 30) {
                                setError(`Bu çalışan yıllık toplam 30 günden fazla izin talebinde bulunamaz. Kalan izin hakkı: ${leavePer}`);
                            } else {

                                const newWorkerInfo = {
                                    name: worker,
                                    startDay: selectedStartDate,
                                    endDay: selectedEndDate,
                                    reason: sreason,
                                    manager: manager,
                                    accept: null,
                                    id: idControl,
                                    totalPerDay: newPerDate
                                };

                                const deneme = [...workerPerReq, newWorkerInfo]

                                dispatch(setWorkerPerReq(deneme));


                                navigation.navigate('MyRequest');
                            }
                            console.log('Deneme', workerPerReq)
                        }
                    }
                }
                else {
                    const newPerDate = daysDifference; // Yeni izin tarih aralığı hesaplanıyor

                    if (newPerDate >= 30) { // İzin sınırını aşarsa hata mesajı oluşturuluyor
                        setError(`Bu çalışan yılık toplam 30 günden fazla izin talebinde bulunamaz kalan izin hakkı 2`);
                    } else {
                        // Yeni çalışan bilgileri oluşturuluyor ve depoya ekleniyor
                        const newWorkerInfo = {
                            name: worker,
                            startDay: selectedStartDate,
                            endDay: selectedEndDate,
                            reason: sreason,
                            manager: manager,
                            accept: null,
                            id: idControl,
                            totalPerDay: newPerDate,
                        };
                        dispatch(setWorkerPerReq([...workerPerReq, newWorkerInfo]));
                        navigation.navigate('MyRequest'); // İstek sayfasına yönlendiriliyor
                    }
                }
            } else {
                const newPerDate = daysDifference; // Yeni izin tarih aralığı hesaplanıyor

                if (newPerDate >= 30) { // İzin sınırını aşarsa hata mesajı oluşturuluyor
                    setError(`Bu çalışan yılık toplam 30 günden fazla izin talebinde bulunamaz kalan izin hakkı 30`);
                } else {
                    // Yeni çalışan bilgileri oluşturuluyor ve depoya ekleniyor
                    const newWorkerInfo = {
                        name: worker,
                        startDay: selectedStartDate,
                        endDay: selectedEndDate,
                        reason: sreason,
                        manager: manager,
                        accept: null,
                        id: idControl,
                        totalPerDay: newPerDate,
                    };
                    dispatch(setWorkerPerReq([...workerPerReq, newWorkerInfo]));
                    navigation.navigate('MyRequest'); // İstek sayfasına yönlendiriliyor
                }
            }
        } else if (manager && selectedStartDate) {
            if (workerPerReq) { // Çalışan izin talepleri var mı kontrolü
                const isWorkerId = workerPerReq.find(workerInfo => workerInfo.id); // Aynı id'ye sahip çalışan var mı kontrolü

                if (idControl === isWorkerId) {
                    const isWorkerInfo = workerPerReq.find(workerInfo => workerInfo.id === idControl);

                    if (isWorkerInfo) {
                        const leavePer = 30 - isWorkerInfo.totalPerDay;

                        if (isWorkerInfo.totalPerDay >= 30) {
                            setError(`Bu çalışan yıllık toplam 30 günden fazla izin talebinde bulunamaz. Kalan izin hakkı: ${leavePer}`);
                        } else {
                            const newPerDate = daysDifference + isWorkerInfo.totalPerDay;

                            if (newPerDate >= 30) {
                                setError(`Bu çalışan yıllık toplam 30 günden fazla izin talebinde bulunamaz. Kalan izin hakkı: ${leavePer}`);
                            } else {
                                // Yeni totalPerDay değerini hesapla
                                const updatedPerDay = newPerDate;



                                const newWorkerInfo = {
                                    name: worker,
                                    startDay: selectedStartDate,
                                    endDay: selectedEndDate,
                                    reason: sreason,
                                    manager: manager,
                                    accept: null,
                                    totalPerDay: daysDifference

                                };
                                const updatedWorkerPerReq = workerPerReq.map(workerInfo =>
                                    workerInfo.id === idControl ? newWorkerInfo : workerInfo
                                );

                                dispatch(setWorkerPerReq(updatedWorkerPerReq));
                                navigation.navigate('MyRequest');
                            }
                        }
                    }
                }
                else {
                    const newPerDate = daysDifference; // Yeni izin tarih aralığı hesaplanıyor

                    if (newPerDate >= 30) { // İzin sınırını aşarsa hata mesajı oluşturuluyor
                        setError(`Bu çalışan yılık toplam 30 günden fazla izin talebinde bulunamaz kalan izin hakkı 2`);
                    } else {
                        // Yeni çalışan bilgileri oluşturuluyor ve depoya ekleniyor
                        const newWorkerInfo = {
                            name: worker,
                            startDay: selectedStartDate,
                            endDay: selectedEndDate,
                            reason: sreason,
                            manager: manager,
                            accept: null,
                            id: idControl,
                            totalPerDay: newPerDate,
                        };
                        dispatch(setWorkerPerReq([...workerPerReq, newWorkerInfo]));
                        navigation.navigate('MyRequest'); // İstek sayfasına yönlendiriliyor
                    }
                }
            } else {
                const newPerDate = daysDifference; // Yeni izin tarih aralığı hesaplanıyor

                if (newPerDate >= 30) { // İzin sınırını aşarsa hata mesajı oluşturuluyor
                    setError(`Bu çalışan yılık toplam 30 günden fazla izin talebinde bulunamaz kalan izin hakkı 30`);
                } else {
                    // Yeni çalışan bilgileri oluşturuluyor ve depoya ekleniyor
                    const newWorkerInfo = {
                        name: worker,
                        startDay: selectedStartDate,
                        endDay: selectedEndDate,
                        reason: sreason,
                        manager: manager,
                        accept: null,
                        id: idControl,
                        totalPerDay: newPerDate,
                    };
                    dispatch(setWorkerPerReq([...workerPerReq, newWorkerInfo]));
                    navigation.navigate('MyRequest'); // İstek sayfasına yönlendiriliyor
                }
            }
        } else if (!manager) {
            setError('Lütfen profil sayfasından yönetici seçiniz.');
        } else {
            console.log('Tarih bilgilerini kontrol ediniz.');
        }
    };



    return (
        <ScrollView>
            {/* <CustomHamburger /> */}
            <>
                <View style={styles.container}>

                    <View style={styles.header}>
                        <Text style={styles.headerText}>İZİN ALMA FORMU</Text>
                    </View>
                    {error &&
                        <Text>{error}</Text>
                    }
                    <View style={styles.topContent}>
                        <TextInput
                            placeholder="İzin Nedeni"
                            variant="outlined"
                            style={{ width: 265 }}
                            onChangeText={handleReasonChange}
                        />
                    </View>
                    <View style={styles.middleContent}>
                        <View style={styles.middleContentText}>
                            <Text style={styles.inlineText}>Tek gün izin</Text>
                            {
                                checked &&
                                <Text style={styles.inlineText}>/ Çoklu gün izin</Text>
                            }
                        </View>
                        <Switch style={{ marginTop: 5, }} trackColor="#8754ce" thumbColor="white" value={checked} onValueChange={() => setChecked(!checked)} />
                    </View>
                    <View style={styles.altContent}>


                        <View style={styles.datePicker}>
                            <Button
                                title="İZİN BAŞLANGIÇ TARİHİ SEÇİN"
                                variant="outlined"
                                disabled
                                color="#8754ce"
                                tintColor="white"
                                style={{ marginTop: 20, }}
                            />
                            <Calendar
                                style={styles.calendar}
                                onDayPress={(day) => handleStartDate(day.dateString)}
                                selected={selectedStartDate}
                            />
                        </View>
                        {checked &&

                            <View style={styles.datePicker}>
                                <Button
                                    title="İZİN BİTİŞ TARİHİ SEÇİN"
                                    variant="outlined"
                                    disabled
                                    color="#8754ce"
                                    tintColor="white"
                                    style={{ marginTop: 20, paddingHorizontal: 23, }}
                                />
                                <Calendar
                                    style={styles.calendar}
                                    onDayPress={(day) => handleEndDate(day.dateString)}
                                    selected={selectedEndDate}
                                />
                            </View>
                        }
                    </View>
                    <TouchableOpacity style={styles.button}>

                        <Button
                            onPress={handleSendRequest}
                            title="İZİNİ ONAYA GÖNDER"
                            uppercase={false}
                            color="#8754ce"
                            tintColor="white"
                        />
                    </TouchableOpacity>
                </View>
            </>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        height: '100%',
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
    topContent: {
        margin: 20,
    },
    middleContent: {
        flexDirection: 'row',
        backgroundColor: '#f1f1f1',
        justifyContent: 'space-around',
        width: '95%',
        borderRadius: 5,
    },
    middleContentText: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '70%',
        borderRadius: 5,
        paddingTop: 3,
    },
    inlineText: {
        color: "#8754ce",
        fontSize: 18,
        padding: 10,
    },
    calendar: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#cecece",
        width: 350,
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


