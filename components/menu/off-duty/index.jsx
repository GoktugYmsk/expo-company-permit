import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

function OffDuty() {
    const manageName = useSelector((state) => state.management.manageName);
    const workerInfo = useSelector((state) => state.workerInfoTotal.workerInfo);

    const [selectedWorker, setSelectedWorker] = useState(null);

    const handleWorkerClick = (worker) => {
        if (selectedWorker === worker) {
            setSelectedWorker(null);
        } else {
            setSelectedWorker(worker);
        }
    };

    return (
        <ScrollView>
            {workerInfo &&
                workerInfo?.map((worker) => (
                    <View key={worker.name} style={styles.container}>
                        {(manageName === worker.manager) && (
                            <TouchableOpacity onPress={() => handleWorkerClick(worker)}>
                                <Text style={styles.workerName}>Adı: {worker.name}</Text>
                            </TouchableOpacity>
                        )}
                        {selectedWorker === worker && (
                            <View style={styles.workerDetails}>
                                <Text style={styles.detailText}>Başlangıç Tarihi: {worker.startDay}</Text>
                                <Text style={styles.detailText}>Bitiş Tarihi: {worker.endDay}</Text>
                                <Text style={styles.detailText}>Sebep: {worker.reason}</Text>
                            </View>
                        )}
                    </View>
                ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    workerName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    workerDetails: {
        marginTop: 10,
        marginLeft: 20,
    },
    detailText: {
        fontSize: 14,
        marginBottom: 5,
    },
});

export default OffDuty;
