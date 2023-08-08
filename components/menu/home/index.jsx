import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useSelector } from 'react-redux';

const users = [
    {
        name: 'Ahmet',
        date: '2023-08-16',
    },
];



function Home() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [requests, setRequests] = useState(users);

    const workerInfo = useSelector((state) => state.workerInfoTotal.workerInfo);

    const formattedSelectedDate = selectedDate.toISOString().split('T')[0];

    const filteredUsers = requests.filter(item => item.date === formattedSelectedDate);

    return (
        <View style={styles.container}>
            <Calendar
                current={selectedDate}
                onDayPress={(day) => setSelectedDate(new Date(day.dateString))}
                monthFormat={'yyyy MMMM'}
                markingType={'period'}
                hideExtraDays={true}
            />
            <Text>{formattedSelectedDate} tarihinde izinli olan çalışanlar:</Text>
            {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                    <Text key={index}>{user.name}</Text>
                ))
            ) : (
                <Text>İzinli çalışan bulunamadı.</Text>
            )}

            <View>
                {workerInfo &&
                    <View>
                        {workerInfo?.map((worker) => (
                            <View key={worker.name}>
                                <Text>Adı: {worker.name}</Text>
                                <Text>Başlangıç Tarihi: {worker.startDay}</Text>
                                <Text>Bitiş Tarihi: {worker.endDay}</Text>
                                <Text>Sebep: {worker.reason}</Text>
                            </View>
                        ))}
                    </View>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flexStart',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default Home;
