import React from "react";
import { Button ,ListItem} from "@react-native-material/core";
import { ScrollView } from 'react-native';

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
        <ScrollView>
        
        <View  style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>İzinlerim</Text>
            </View>
            {workerPerReq &&
                workerPerReq.map((item, index) => (
                    <View key={index}>
                        {item.name === worker && (
                            <View>
                                {item.accept === null && (
                                    <View>
                                        <ListItem
                                            title={styles.titleWait}
                                            secondaryText="Beklenen İstek"
                                        />
                                        <ListItem
                                            title={item.name}
                                            secondaryText="İsim"
                                        />
                                        <ListItem
                                            title={item.startDay}
                                            secondaryText="başlangıç tarihi"
                                        />
                                        {item.endDay &&
                                            <ListItem
                                                title={item.endDay}
                                                secondaryText="bitiş tarihi"
                                            />
                                        }
                                        
                                        <ListItem
                                            title={item.reason}
                                            secondaryText="sebep"
                                        />
                                        <ListItem
                                            title={item.manager}
                                            secondaryText="yönetici"
                                        />
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
        </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingVertical: 16,
    
  },
  header: {
    backgroundColor: '#8754ce',
    width: '100%',
    padding: 10,
    borderRadius: 4,
  },
  headerText: {
      fontSize: 20,
      width: '100%',
      textAlign: "center",
      fontWeight: "bold",
      color: 'white',
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
