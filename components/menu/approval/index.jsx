import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setEndDay, setStartDay } from '../../configure';

function Approval() {
    const [adminHakan, setAdminHakan] = useState(false)
    const manageName = useSelector((state) => state.management.manageName)

    const dispatch = useDispatch()

    const startDay = useSelector((state) => state.offDays.startDay)
    const endDay = useSelector((state) => state.offDays.endDay)
    const reason = useSelector((state) => state.userReason.reason)
    const worker = useSelector((state) => state.workerInfo.worker)

    useEffect(() => {
        if (manageName === 'Hakan') {
            setAdminHakan(true)
        }
    }, [manageName])

    return (
        <View>
            {adminHakan &&
                <View>
                    <Text>Adı: {worker}</Text>
                    <Text>{startDay}</Text>
                    <Text>{endDay}</Text>
                    <Text>Sebep: {reason}</Text>
                </View>
            }
        </View>
    )
}

export default Approval
