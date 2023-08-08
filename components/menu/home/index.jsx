import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const users = [
    {
        name: 'Ahmet',
        date: '2023-08-16',
    },
    // Diğer çalışanları da buraya ekleyebilirsiniz.
];

function Home() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [requests, setRequests] = useState(users);

    const formattedSelectedDate = selectedDate.toISOString().split('T')[0];

    const filteredUsers = requests.filter(item => item.date === formattedSelectedDate);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>İzinlilerin Listesi</Text>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default Home;
