import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Platform, Text, TouchableOpacity, StyleSheet, ScrollView, } from "react-native";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ListItem } from "@react-native-material/core";

import api from "../../../intercepter";

function OffDuty() {
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [regUserList, setRegUserList] = useState([])

  const isManager = useSelector((state) => state.management.isManager);

  useEffect(() => {
    api.get(`time-off/getallmanager/${isManager}`)
      .then((response) => {
        setRegUserList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleWorkerClick = (worker) => {
    if (selectedWorker === worker) {
      setSelectedWorker(null);
    } else {
      setSelectedWorker(worker);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <ScrollView>
      {regUserList &&
        <View style={styles.mainContainer}>
          {
            regUserList.map((worker) => (
              <View style={styles.box}>
                {worker.timeOffType === 'Accept' && (
                  <View>
                    <View key={worker.employeeName} style={styles.container}>
                      <TouchableOpacity
                        style={styles.containerOpa}
                        onPress={() => handleWorkerClick(worker)}
                      >
                        <Text style={styles.workerName}>{worker.employeeName}</Text>
                        <Icon
                          style={styles.workerIcon}
                          name="check-circle"
                          size={28}
                          color="green"
                        />
                      </TouchableOpacity>
                    </View>

                  </View>
                )}
                {worker.timeOffType === 'Rejected' && (
                  <View>
                    <View key={worker.employeeName} style={styles.container}>
                      <TouchableOpacity
                        style={styles.containerOpa}
                        onPress={() => handleWorkerClick(worker)}
                      >
                        <Text style={styles.workerName}>{worker.employeeName}</Text>
                        <Icon
                          style={styles.workerIcon}
                          name="close-circle"
                          size={28}
                          color="red"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                {selectedWorker === worker && (
                  <View style={styles.workerDetails}>
                    <ListItem
                      style={{
                        marginTop: 10,
                        fontSize: 23,
                        padding: 10,
                        paddingLeft: 36,
                      }}
                      title={formatDate(worker.startDate)}
                      secondaryText="Başlangıç Tarihi"
                    />
                    {worker.endDay && (
                      <ListItem
                        style={{
                          marginTop: 30,
                          fontSize: 23,
                          padding: 10,
                          paddingLeft: 36,
                        }}
                        title={formatDate(worker.endDate)}
                        secondaryText="Bitiş Tarihi"
                      />
                    )}
                    <ListItem
                      style={{
                        marginTop: 30,
                        fontSize: 23,
                        padding: 10,
                        paddingLeft: 36,
                      }}
                      title={worker.description}
                      secondaryText="Sebep"
                    />
                  </View>
                )}
              </View>
            ))
          }
        </View>
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "red",

  },
  container: {
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    paddingLeft: Platform.OS === "web" ? 300 : 0,
  },
  containerOpa: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    width: "100%",

  },
  workerName: {
    fontSize: 19,
    fontWeight: "bold",
    width: "90%",
  },
  workerDetails: {
    flexDirection: "column",
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingLeft: Platform.OS === "web" ? 300 : 0,
  },
  workerButton: {
    marginRight: 40,
    marginLeft: 40,
    marginBottom: 20,
    marginTop: 20,
  },
  mainContainer: {
    overflow: 'scroll',
    height: Platform.OS === "web" ? 500 : '100%'
  },
});

export default OffDuty;
