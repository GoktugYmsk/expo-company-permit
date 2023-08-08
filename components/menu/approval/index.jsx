import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setWorkerInfo, setStartDay, setEndDay, setWorker } from '../../configure';

function Approval() {
    const [adminHakan, setAdminHakan] = useState(false);
    const manageName = useSelector((state) => state.management.manageName);

    const dispatch = useDispatch();

    const startDay = useSelector((state) => state.offDays.startDay);
    const endDay = useSelector((state) => state.offDays.endDay);
    const reason = useSelector((state) => state.userReason.reason);
    const worker = useSelector((state) => state.workerInfoTotal.worker);
    const workerInfo = useSelector((state) => state.workerInfoTotal.workerInfo);

    useEffect(() => {
        if (manageName === 'Hakan') {
            setAdminHakan(true);
        }
        else {
            setAdminHakan(false);
        }
    }, [manageName]);

    const handleApprovalClick = () => {
        const existingWorker = workerInfo?.find((existingWorker) => existingWorker.name === worker);

        if (!existingWorker && worker) {
            const newWorkerInfo = {
                name: worker,
                startDay: startDay,
                endDay: endDay,
                reason: reason
            };
            dispatch(setWorkerInfo([...workerInfo, newWorkerInfo]));
        }
    };

    const handleRejectClick = () => {
        dispatch(setWorker(''))
        dispatch(setStartDay(''))
        dispatch(setEndDay(''))
    }

    return (
        <View>
            {adminHakan && (
                <View>
                    <Text>{worker}</Text>
                    <Text>{startDay}</Text>
                    <Text>{endDay}</Text>
                    {/* {workerInfo &&
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
                    } */}
                    <TouchableOpacity onPress={handleApprovalClick}>
                        <Text>Onayla</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleRejectClick}>
                        <Text>Reddet</Text>
                    </TouchableOpacity>



                </View>
            )}
        </View>
    );
}

export default Approval;
