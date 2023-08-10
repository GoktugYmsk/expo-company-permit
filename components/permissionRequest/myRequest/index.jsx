import React from "react";
import { Button } from "@react-native-material/core";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

function MyRequest() {
  const workerInfo = useSelector((state) => state.workerInfoTotal.workerInfo);

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
                                        <View>
                                            {item.endDay &&
                                                <Text>  bitiş tarihi </Text>
                                            }
                                        </View>
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
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 30,
    color: "red",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 150,
  },
});

export default MyRequest;
