import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setWorkerInfo, setWorkerPerReq } from '../../configure';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Button, ListItem, } from "@react-native-material/core";

function OffDuty() {
    const [selectedWorker, setSelectedWorker] = useState(null);

    const manageName = useSelector((state) => state.management.manageName);
    const workerPerReq = useSelector((state) => state.workerInfoTotal.workerPerReq);

    console.log('GÖKTUĞ', workerPerReq)

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
                                <Text style={styles.workerName}>{worker.totalPerDay}</Text>
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
                                <Text style={styles.workerName}>{worker.totalPerDay}</Text>
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
