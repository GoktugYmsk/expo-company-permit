import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

function Home() {
    const [selectedDate, setSelectedDate] = useState(new Date()); // Varsayılan seçili tarih

    return (
        <View style={styles.container}>
            <Text style={styles.title}>İzinlilerin Listesi</Text>
            <Calendar
                current={selectedDate}
                onDayPress={(day) => setSelectedDate(day.dateString)}
                monthFormat={'yyyy MMMM'}
                markingType={'period'}
                hideExtraDays={true}
                markedDates={{
                    [selectedDate]: { selected: true, selectedColor: 'blue' },
                }}
            />
            <Text>7 Ağustos izinlilerin Listesi</Text>
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
