import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setWorkerInfo } from '../../configure';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Button, ListItem,} from "@react-native-material/core";

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
                    <View style={styles.box}>
                        {(manageName === worker.manager) && (
                            <View key={worker.name} style={styles.container} >
                                <TouchableOpacity style={styles.containerOpa} onPress={() => handleWorkerClick(worker)}>
                                    <Text style={styles.workerName}>{worker.name}</Text>
                                    <Icon style={styles.workerIcon} name="check-circle" size={28} color="green"/>
                                </TouchableOpacity>
                            </View>
                        )}
                        {selectedWorker === worker && (
                            <View style={styles.workerDetails}>
                                <Text style={styles.detailText}>Başlangıç Tarihi: {worker.startDay}</Text>
                                {worker.endDay &&
                                    <Text style={styles.detailText}>Bitiş Tarihi: {worker.endDay}</Text>
                                }
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
    box: {
        backgroundColor: "white",
    },
    container: {
        padding: 10,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
    },
    containerOpa: {
        padding: 10,
        backgroundColor: "white",
        flexDirection: 'row',
        width: '100%',
    },
    workerName: {
        fontSize: 19,
        fontWeight: 'bold',
        width: '90%',
    },
    workerIcon:{
        alignItems: "right",
    },
    workerDetails: {
        flexDirection: 'column',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    workerButton: {
        marginRight: 40,
        marginLeft: 40,
        marginBottom: 20,
        marginTop: 20,
    },
});

export default OffDuty;
