import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setWorkerInfo, setStartDay, setEndDay, setWorker, setWorkerPerReq } from '../../configure';

function Approval() {
    const dispatch = useDispatch();

    const workerPerReq = useSelector((state) => state.workerInfoTotal.workerPerReq);
    const manageName = useSelector((state) => state.management.manageName);
    const workerInfo = useSelector((state) => state.workerInfoTotal.workerInfo);

    const isAdmin = manageName !== '';

    useEffect(() => {
        console.log('denem', workerPerReq);
    }, [workerPerReq]);

    const handleApprovalClick = (index) => {
        if (isAdmin && index >= 0 && index < workerPerReq.length) {
            const approvedWorker = workerPerReq[index];

            const isWorkerAlreadyExists = workerInfo?.includes(worker => worker.name === approvedWorker.name);

            if (!isWorkerAlreadyExists) {
                const newWorkerInfo = {
                    name: approvedWorker.name,
                    startDay: approvedWorker.startDay,
                    endDay: approvedWorker.endDay,
                    reason: approvedWorker.reason,
                    manager: approvedWorker.manager,
                    accept: approvedWorker.accept === true,
                };
                dispatch(setWorkerInfo([...workerInfo, newWorkerInfo]));
                dispatch(setWorkerPerReq(workerPerReq.filter((_, i) => i !== index)));
            }

        }
    };


    const handleRejectClick = (index) => {
        if (isAdmin && index >= 0 && index < workerPerReq.length) {
            dispatch(setWorkerPerReq(workerPerReq.filter((_, i) => i !== index)));
        }
    };

    return (
        <View>
            {isAdmin && (
                <View>
                    {workerPerReq &&
                        workerPerReq.map((item, index) => (
                            <View key={index}>
                                <Text> isim {item.name}</Text>
                                <Text> başlangıç tarihi {item.startDay}</Text>
                                <Text>  bitiş tarihi {item.endDay}</Text>
                                <Text> sebep {item.reason}</Text>
                                <Text> yönetici {item.manager}</Text>
                                <TouchableOpacity onPress={() => handleApprovalClick(index)}>
                                    <Text>Onayla</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleRejectClick(index)}>
                                    <Text>Reddet</Text>
                                </TouchableOpacity>
                            </View>
                        ))
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
