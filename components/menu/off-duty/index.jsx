import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Button, ListItem, } from "@react-native-material/core";

import { setWorkerInfo, setWorkerPerReq } from '../../configure';

function OffDuty() {
    const [selectedWorker, setSelectedWorker] = useState(null);

    const dispatch = useDispatch()

    const manageName = useSelector((state) => state.management.manageName);
    const workerPerReq = useSelector((state) => state.workerInfoTotal.workerPerReq);

    const handleWorkerClick = (worker) => {
        if (selectedWorker === worker) {
            setSelectedWorker(null);
        } else {
            setSelectedWorker(worker);
        }
    };

    const handleDelete = () => {
        if (selectedWorker) {
            const updatedWorkerInfo = workerPerReq.filter(worker => worker !== selectedWorker);
            dispatch(setWorkerInfo(updatedWorkerInfo))
            dispatch(setWorkerPerReq(updatedWorkerInfo))
        }
    }

    return (
        <ScrollView>
            {workerPerReq &&
                workerPerReq.map((worker) => (
                    <View style={styles.box}>
                        {worker.accept === true &&
                            <View>
                                {(manageName === worker.manager) && (
                                    <View key={worker.name} style={styles.container} >
                                        <TouchableOpacity style={styles.containerOpa} onPress={() => handleWorkerClick(worker)}>
                                            <Text style={styles.workerName}>{worker.name}</Text>
                                            <Icon style={styles.workerIcon} name="check-circle" size={28} color="green" />
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        }
                        {worker.accept === false &&
                            <View>
                                {(manageName === worker.manager) && (
                                    <View key={worker.name} style={styles.container} >
                                        <TouchableOpacity style={styles.containerOpa} onPress={() => handleWorkerClick(worker)}>
                                            <Text style={styles.workerName}>{worker.name}</Text>
                                            <Icon style={styles.workerIcon} name="close-circle" size={28} color="red" />
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        }
                        {selectedWorker === worker && (
                            <View style={styles.workerDetails}>
                                <ListItem
                                    style={{ marginTop: 10, fontSize: 23, padding: 10, paddingLeft: 36, }}
                                    title={worker.startDay}
                                    secondaryText="Başlangıç Tarihi"
                                />
                                {worker.endDay &&
                                    <ListItem
                                        style={{ marginTop: 30, fontSize: 23, padding: 10, paddingLeft: 36, }}
                                        title={worker.endDay}
                                        secondaryText="Bitiş Tarihi"
                                    />
                                }
                                <ListItem
                                    style={{ marginTop: 30, fontSize: 23, padding: 10, paddingLeft: 36, }}
                                    title={worker.reason}
                                    secondaryText="Sebep"
                                />
                                <Button
                                    onPress={handleDelete}
                                    style={styles.workerButton}
                                    title="İZİNİ İPTAL ET"
                                    color="error"
                                />
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
    workerDetails: {
        flexDirection: 'column',
        marginTop: 0,
        marginBottom: 0,
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
