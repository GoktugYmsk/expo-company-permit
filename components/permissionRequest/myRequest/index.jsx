import React from "react";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native";
import { Platform } from "react-native";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Button, ListItem } from "@react-native-material/core";
import api from "../../../intercepter";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { useEffect } from "react";

function MyRequest() {
  const [regUserList, setRegUserList] = useState([])

  const idControl = useSelector((state) => state.management.idControl);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState([])


  console.log(idControl)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`time-off/getallemployee/${idControl}`);
        console.log('DENEME', response.data);
        setRegUserList(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }


    const timeout = setTimeout(() => {
      fetchData();
    }, 3000);

    return () => clearTimeout(timeout);

  }, []);

  useEffect(() => {
    api.get('/users')
      .then((response) => {
        setUser(response.data);
        console.log('UsersArray', response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    const deneme = regUserList.find((item) => item.managerID)

    console.log('denemeGöktuğ', deneme)

    const isManagerName = user.find((item) => item.id === deneme.managerID);
    console.log('isManagerName', isManagerName);
  }, [isLoading, regUserList]);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  };


  const isManagerName = user.find((item) => item.id === regUserList.managerID)

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>İzinlerim</Text>
        </View>
        {!isLoading ? (
          <View>
            {regUserList &&
              regUserList.map((item, index) => (
                <View key={index}>
                  {console.log('regUserListItem', item)}
                  {item.employeID === idControl && (

                    < View key={index} >
                      {
                        item.timeOffType === 'Pending' && (
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
                            <ListItem
                              title={formatDate(item.startDate)}
                              secondaryText="başlangıç tarihi"
                            />
                            {item.endDate && (
                              <ListItem
                                title={formatDate(item.endDate)}
                                secondaryText="bitiş tarihi"
                              />
                            )}
                            <ListItem title={item.description} secondaryText="sebep" />
                            {/* <ListItem title={isManagerName.userName} secondaryText="yönetici" /> */}
                          </View>
                        )
                      }
                      {item.accept === 'Accept' && (
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
                          <ListItem title={item.description} secondaryText="sebep" />
                          <ListItem title={isManagerName} secondaryText="yönetici" />
                        </View>
                      )}
                      {item.accept === 'Rejected' && (
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
                          <ListItem title={item.description} secondaryText="sebep" />
                          <ListItem title={isManagerName} secondaryText="yönetici" />
                        </View>
                      )}
                    </View>
                  )}
                </View>
              ))}
          </View>
        ) : (
          <Text>Loading...</Text>
        )}

      </View>
    </ScrollView >
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
