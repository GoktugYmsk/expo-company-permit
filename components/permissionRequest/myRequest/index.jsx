import React from 'react'

import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

function MyRequest() {

    const workerPerReq = useSelector((state) => state.workerInfoTotal.workerPerReq);
    const worker = useSelector((state) => state.workerInfoTotal.worker);
    console.log('workerPerReq', workerPerReq)

    return (
        <View>
            <View>
                <Text style={styles.title} >İzinlerim</Text>
            </View>
            {workerPerReq &&
                workerPerReq.map((item, index) => (
                    <View key={index}>
                        {item.name === worker && (
                            <View>
                                {item.accept === null && (
                                    <View>
                                        <Text style={styles.titleWait} >Beklenen İstek</Text>
                                        <Text> isim {item.name}</Text>
                                        <Text> başlangıç tarihi {item.startDay}</Text>
                                        <Text>  bitiş tarihi {item.endDay}</Text>
                                        <Text> sebep {item.reason}</Text>
                                        <Text> yönetici {item.manager}</Text>
                                    </View>
                                )}
                                {item.accept === true && (

                                    <View>
                                        <Text style={styles.titleAccept} >Onaylanan İstek</Text>
                                        <Text> isim {item.name}</Text>
                                        <Text> başlangıç tarihi {item.startDay}</Text>
                                        <Text>  bitiş tarihi {item.endDay}</Text>
                                        <Text> sebep {item.reason}</Text>
                                        <Text> yönetici {item.manager}</Text>
                                    </View>
                                )}
                                {item.accept === false && (
                                    <View>
                                        <Text style={styles.titleAccept} >Reddedilen İstek</Text>
                                        <Text> isim {item.name}</Text>
                                        <Text> başlangıç tarihi {item.startDay}</Text>
                                        <Text>  bitiş tarihi {item.endDay}</Text>
                                        <Text> sebep {item.reason}</Text>
                                        <Text> yönetici {item.manager}</Text>
                                    </View>
                                )}
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
    },
    titleWait: {
        fontSize: 30,
        color: 'orange',
    },
    titleAccept: {
        fontSize: 30,
        color: 'green',
    },
    titleReject: {
        fontSize: 30,
        color: 'red',
    },

});

export default MyRequest
