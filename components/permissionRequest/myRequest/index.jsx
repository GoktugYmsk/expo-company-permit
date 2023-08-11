import React from "react";
import { Button ,ListItem} from "@react-native-material/core";
import { ScrollView } from 'react-native';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

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
                                        <View style={styles.circleTick}>
                                            <Button 
                                                title="Beklenen İstek" 
                                                variant="outlined" 
                                                disabled 
                                                color="#8754ce" 
                                                tintColor="white" 
                                                style={{ marginTop: 20, paddingHorizontal: 23,}}
                                            />
                                            <Icon style={styles.workerIcon} name="clock-outline" size={28} color="orange"/>
                                        </View>
                                        <ListItem title={item.name} secondaryText="İsim" />
                                        <ListItem title={item.startDay} secondaryText="başlangıç tarihi" />
                                        {item.endDay &&
                                            <ListItem title={item.endDay} secondaryText="bitiş tarihi" />
                                        }
                                        
                                        <ListItem title={item.reason} secondaryText="sebep" />
                                        <ListItem title={item.manager} secondaryText="yönetici" />
                                    </View>
                                )}
                                {item.accept === true && (

                                    <View>
                                        <View style={styles.circleTick}>
                                            <Button 
                                                title="Onaylanan İstek" 
                                                variant="outlined" 
                                                disabled 
                                                color="#8754ce" 
                                                tintColor="white" 
                                                style={{ marginTop: 20, paddingHorizontal: 23,}}
                                            />
                                            <Icon style={styles.workerIcon} name="check-circle" size={28} color="green"/>
                                        </View>
                                        <ListItem title={item.name} secondaryText="isim" />
                                        <ListItem title={item.startDay} secondaryText="başlangıç tarihi" />
                                        <ListItem title={item.endDay} secondaryText="bitiş tarihi" />
                                        <ListItem title={item.reason} secondaryText="sebep" />
                                        <ListItem title={item.manager} secondaryText="yönetici" />
                                    </View>
                                )}
                                {item.accept === false && (
                                    <View>
                                        <View style={styles.circleTick}>
                                            <Button 
                                                title="Reddedilen İstek" 
                                                variant="outlined" 
                                                disabled 
                                                color="#8754ce" 
                                                tintColor="white" 
                                                style={{ marginTop: 20, paddingHorizontal: 23,}}
                                            />
                                            <Icon style={styles.workerIcon} name="close-circle" size={28} color="red"/>
                                        </View>
                                        <ListItem title={item.name} secondaryText="isim" />
                                        <ListItem title={item.startDay} secondaryText="başlangıç tarihi" />
                                        <ListItem title={item.endDay} secondaryText="bitiş tarihi" />
                                        <ListItem title={item.reason} secondaryText="sebep" />
                                        <ListItem title={item.manager} secondaryText="yönetici" />
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
  circleTick: {
    flexDirection: 'row',
    backgroundColor: "white",
    padding: 10,
    justifyContent: 'space-around',
  },
  workerIcon: {
    paddingTop: 20,
  },
});

export default MyRequest;
