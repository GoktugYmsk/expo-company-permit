import React from "react";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native";
import { Platform } from "react-native";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Button, ListItem } from "@react-native-material/core";

import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { useState } from "react";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../../../firebase";

function MyRequest() {
  const idControl = useSelector((state) => state.management.idControl);
  const [fireWorkerPer, setFireWorkerPer] = useState([])

  useEffect(() => {
    console.log("idControl", idControl)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const regUserCollection = collection(db, 'workerPerReq');
        const snapshot = await getDocs(regUserCollection);
        const regUserListData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('ANKARA', regUserListData);
        setFireWorkerPer(regUserListData);
      } catch (error) {
        console.error('Hatalı veri alınırken: ', error);
      }
    };
    fetchData();
  }, []);



  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>İzinlerim</Text>
        </View>
        {fireWorkerPer &&
          fireWorkerPer.map((item, index) => (
            <View key={index}>
              {item.id === idControl && (
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
                  {item.accept === true && (
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
                  {item.accept === false && (
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
