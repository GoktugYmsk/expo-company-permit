import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import { setReason } from '../configure';

function PermissionRequest() {
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const reason = useSelector((state) => state.userReason.reason)

    const dispatch = useDispatch()

    const handleReasonChange = (e) => {
        dispatch(setReason(e))
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text>İzin Nedeni</Text>
            <TextInput style={styles.input} onChangeText={handleReasonChange} />
            <Text>{reason}</Text>
            <View style={styles.middleContent}>
                <Text style={styles.inlineText}>Tek gün izin</Text>
                <Text style={styles.inlineText}>/</Text>
                <Text style={styles.inlineText}>Çoklu gün izin</Text>
                <Text>Switch</Text>
            </View>
            <View style={styles.altContent}>
                <Text>İzin Tarihi Aralığı</Text>
                <View style={styles.datePicker}>
                    <Text>Başlangıç</Text>
                    <Calendar
                        onDayPress={(day) => setSelectedStartDate(day.dateString)}
                        selected={selectedStartDate}
                    />
                </View>
                <View style={styles.datePicker}>
                    <Text>Bitiş</Text>
                    <Calendar
                        onDayPress={(day) => setSelectedEndDate(day.dateString)}
                        selected={selectedEndDate}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text>İzni Onaya gönder</Text>
            </TouchableOpacity>
        </ScrollView>
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
