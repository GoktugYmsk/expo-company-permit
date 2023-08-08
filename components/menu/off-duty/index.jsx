import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

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

function OffDuty() {
    const [selectedWorker, setSelectedWorker] = useState(null);
    const workerInfo = useSelector((state) => state.workerInfoTotal.workerInfo);

    const handleWorkerClick = (worker) => {
        if (selectedWorker === worker) {
            setSelectedWorker(null);
        } else {
            setSelectedWorker(worker);
        }
    };

    return (
        <View>
            {workerInfo &&
                workerInfo.map((worker) => (
                    <View key={worker.name} style={styles.container}>
                        <TouchableOpacity onPress={() => handleWorkerClick(worker)}>
                            <Text style={styles.workerName}>Adı: {worker.name}</Text>
                        </TouchableOpacity>
                        {selectedWorker === worker && (
                            <View style={styles.workerDetails}>
                                <Text style={styles.detailText}>Başlangıç Tarihi: {worker.startDay}</Text>
                                <Text style={styles.detailText}>Bitiş Tarihi: {worker.endDay}</Text>
                                <Text style={styles.detailText}>Sebep: {worker.reason}</Text>
                            </View>
                        )}
                    </View>
                ))}
        </View>
    );
}

export default OffDuty;
