import React from "react";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native";
import { Platform } from "react-native";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Button, ListItem } from "@react-native-material/core";

import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { useEffect } from "react";

function MyRequest() {
  const [regUserList, setRegUserList] = useState([])
  const worker = useSelector((state) => state.workerInfoTotal.worker);
  const workerPerReq = useSelector((state) => state.workerInfoTotal.workerPerReq);
  const idControl = useSelector((state) => state.management.idControl);

  useEffect(() => {
    api.get('/users')
      .then((response) => {
        setRegUserList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>İzinlerim</Text>
        </View>
        {regUserList &&
          regUserList.map((item, index) => (
            <View key={index}>
              {item.id === idControl && (
                <View>
                  {item.accept === 'PENDING' && (
                    <View>
                      <View style={styles.circleTick}>
                        <Button
                          title="Beklenen İstek"
                          variant="outlined"
                          disabled
                          color="#8754ce"
                          tintColor="white"
                          style={{ marginTop: 20, paddingHorizontal: 23 }}
                        />
                        <Icon
                          style={styles.workerIcon}
                          name="clock-outline"
                          size={28}
                          color="orange"
                        />
                      </View>
                      <ListItem title={item.name} secondaryText="İsim" />
                      <ListItem
                        title={item.startDay}
                        secondaryText="başlangıç tarihi"
                      />
                      {item.endDay && (
                        <ListItem
                          title={item.endDay}
                          secondaryText="bitiş tarihi"
                        />
                      )}
                      <ListItem title={item.reason} secondaryText="sebep" />
                      <ListItem title={item.manager} secondaryText="yönetici" />
                    </View>
                  )}
                  {item.accept === 'ACCEPT' && (
                    <View>
                      <View style={styles.circleTick}>
                        <Button
                          title="Onaylanan İstek"
                          variant="outlined"
                          disabled
                          color="#8754ce"
                          tintColor="white"
                          style={{ marginTop: 20, paddingHorizontal: 23 }}
                        />
                        <Icon
                          style={styles.workerIcon}
                          name="check-circle"
                          size={28}
                          color="green"
                        />
                      </View>
                      <ListItem title={item.name} secondaryText="isim" />
                      <ListItem
                        title={item.startDay}
                        secondaryText="başlangıç tarihi"
                      />
                      <ListItem
                        title={item.endDay}
                        secondaryText="bitiş tarihi"
                      />
                      <ListItem title={item.reason} secondaryText="sebep" />
                      <ListItem title={item.manager} secondaryText="yönetici" />
                    </View>
                  )}
                  {item.accept === 'REJECTED' && (
                    <View>
                      <View style={styles.circleTick}>
                        <Button
                          title="Reddedilen İstek"
                          variant="outlined"
                          disabled
                          color="#8754ce"
                          tintColor="white"
                          style={{ marginTop: 20, paddingHorizontal: 23 }}
                        />
                        <Icon
                          style={styles.workerIcon}
                          name="close-circle"
                          size={28}
                          color="red"
                        />
                      </View>
                      <ListItem title={item.name} secondaryText="isim" />
                      <ListItem
                        title={item.startDay}
                        secondaryText="başlangıç tarihi"
                      />
                      <ListItem
                        title={item.endDay}
                        secondaryText="bitiş tarihi"
                      />
                      <ListItem title={item.reason} secondaryText="sebep" />
                      <ListItem title={item.manager} secondaryText="yönetici" />
                    </View>
                  )}
                </View>
              )}
            </View>
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingVertical: 16,
    paddingLeft: Platform.OS === "web" ? 300 : 0,
  },
  header: {
    backgroundColor: "#8754ce",
    width: "100%",
    padding: 10,
    borderRadius: 4,
  },
  headerText: {
    fontSize: 20,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
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
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    justifyContent: "space-around",
  },
  workerIcon: {
    paddingTop: 20,
  },
});

export default MyRequest;
