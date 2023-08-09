import React from 'react'

import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

function MyRequest() {

    const workerInfo = useSelector((state) => state.workerInfoTotal.workerInfo);

    return (
        <View>
            <View>
                <Text style={styles.title} >İzinlerim</Text>
            </View>
            <Text>Beklenen</Text>

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
