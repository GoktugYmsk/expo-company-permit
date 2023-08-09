import React from 'react'

import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

function MyRequest() {

    const workerPerReq = useSelector((state) => state.workerInfoTotal.workerPerReq);
    const worker = useSelector((state) => state.workerInfoTotal.worker);
    console.log('worker', worker)

    return (
        <View>
            <View>
                <Text style={styles.title} >İzinlerim</Text>
            </View>
            <Text>Beklenen</Text>
            {workerPerReq &&
                workerPerReq.map((item, index) => (
                    <View key={index}>
                        {item.name === worker && (
                            <View>
                                <Text> isim {item.name}</Text>
                                <Text> başlangıç tarihi {item.startDay}</Text>
                                <Text>  bitiş tarihi {item.endDay}</Text>
                                <Text> sebep {item.reason}</Text>
                                <Text> yönetici {item.manager}</Text>
                            </View>
                        )}
                    </View>
                ))
            }
            <Text>Aktif</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        color: 'red',
    },

});

export default MyRequest
