import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setWorkerInfo, setStartDay, setEndDay, setWorker } from '../../configure';

function Approval() {
    const manageName = useSelector((state) => state.management.manageName);
    const worker = useSelector((state) => state.workerInfoTotal.worker);
    const workerInfo = useSelector((state) => state.workerInfoTotal.workerInfo);

    const dispatch = useDispatch();

    const startDay = useSelector((state) => state.offDays.startDay);
    const endDay = useSelector((state) => state.offDays.endDay);
    const reason = useSelector((state) => state.userReason.reason);

    const isAdmin = manageName !== '';

    const handleApprovalClick = () => {
        const existingWorker = workerInfo?.find((existingWorker) => existingWorker.name === worker);

        if (!existingWorker && worker) {
            const newWorkerInfo = {
                name: worker,
                startDay: startDay,
                endDay: endDay,
                reason: reason,
                manager: manageName,
            };
            dispatch(setWorkerInfo([...workerInfo, newWorkerInfo]));
        }

        dispatch(setWorker(''))
        dispatch(setStartDay(''))
        dispatch(setEndDay(''))
    };

    const handleRejectClick = () => {
        dispatch(setWorker(''))
        dispatch(setStartDay(''))
        dispatch(setEndDay(''))
    }

    return (
        <View>
            {isAdmin && (
                <View>
                    <Text>{worker}</Text>
                    <Text>{startDay}</Text>
                    <Text>{endDay}</Text>
                    {worker &&
                        <View>
                            <TouchableOpacity onPress={handleApprovalClick}>
                                <Text>Onayla</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleRejectClick}>
                                <Text>Reddet</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            )}
            {!isAdmin && (
                <Text>İzin taleplerini onaylama yetkiniz yok.</Text>
            )}
        </View>
    );
}

export default Approval;
