import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View ,Modal} from 'react-native';
import { Calendar, DotMarking } from 'react-native-calendars';

const users = [
    {
        name: 'Ahmet',
        date: '2023-08-16',
    },
];



function Home() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [requests, setRequests] = useState(users);

    const formattedSelectedDate = selectedDate.toISOString().split('T')[0];

    const filteredUsers = requests.filter(item => item.date === formattedSelectedDate);

    return (
        <View style={styles.container}>
            <Calendar
                style={styles.calendar}
                current={selectedDate}
                onDayPress={(day) => setSelectedDate(new Date(day.dateString))}
                monthFormat={'yyyy MMMM'}
                markingType={'multi-dot'}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flexStart',
        alignItems: 'center',
        width: '100%',
    },
    calendar:{
        width: 410,
        marginTop: 10,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default Home;
