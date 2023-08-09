import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setWorkerInfo } from '../../configure';

function OffDuty() {
    const [selectedWorker, setSelectedWorker] = useState(null);

    const manageName = useSelector((state) => state.management.manageName);
    const workerInfo = useSelector((state) => state.workerInfoTotal.workerInfo);

    const dispatch = useDispatch()

    const handleWorkerClick = (worker) => {
        if (selectedWorker === worker) {
            setSelectedWorker(null);
        } else {
            setSelectedWorker(worker);
        }
    };

    const handleDelete = () => {
        if (selectedWorker) {
            const updatedWorkerInfo = workerInfo.filter(worker => worker !== selectedWorker);
            dispatch(setWorkerInfo(updatedWorkerInfo))
        }
    }

    return (
        <ScrollView>
            {workerInfo &&
                workerInfo.map((worker) => (
                    <View >
                        {(manageName === worker.manager) && (
                            <View key={worker.name} style={styles.container} >
                                <TouchableOpacity onPress={() => handleWorkerClick(worker)}>
                                    <Text style={styles.workerName}>Adı: {worker.name}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        {selectedWorker === worker && (
                            <View style={styles.workerDetails}>
                                <Text style={styles.detailText}>Başlangıç Tarihi: {worker.startDay}</Text>
                                <Text style={styles.detailText}>Bitiş Tarihi: {worker.endDay}</Text>
                                <Text style={styles.detailText}>Sebep: {worker.reason}</Text>
                                <TouchableOpacity onPress={handleDelete}>
                                    <Text>Delete</Text>
                                </TouchableOpacity>
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
