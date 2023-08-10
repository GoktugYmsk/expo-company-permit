import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setWorkerInfo,
  setStartDay,
  setEndDay,
  setWorker,
  setWorkerPerReq,
} from "../../configure";
import { Button } from "@react-native-material/core";

function Approval() {
  const dispatch = useDispatch();

  const workerPerReq = useSelector(
    (state) => state.workerInfoTotal.workerPerReq
  );
  const manageName = useSelector((state) => state.management.manageName);
  const workerInfo = useSelector((state) => state.workerInfoTotal.workerInfo);

  const isAdmin = manageName !== "";

  useEffect(() => {
    console.log("denem", workerPerReq);
  }, [workerPerReq]);

  const handleApprovalClick = (index) => {
    if (isAdmin && index >= 0 && index < workerPerReq.length) {
      const approvedWorker = workerPerReq[index];

      const isWorkerAlreadyExists = workerInfo?.includes(
        (worker) => worker.name === approvedWorker.name
      );

      if (!isWorkerAlreadyExists) {
        const newWorkerInfo = {
          name: approvedWorker.name,
          startDay: approvedWorker.startDay,
          endDay: approvedWorker.endDay,
          reason: approvedWorker.reason,
          manager: approvedWorker.manager,
          accept: approvedWorker.accept === true,
        };
        dispatch(setWorkerInfo([...workerInfo, newWorkerInfo]));
        dispatch(setWorkerPerReq(workerPerReq.filter((_, i) => i !== index)));
      }
    }
  };

  const handleRejectClick = (index) => {
    if (isAdmin && index >= 0 && index < workerPerReq.length) {
      dispatch(setWorkerPerReq(workerPerReq.filter((_, i) => i !== index)));
    }
  };

  return (
    <View>
      {isAdmin && (
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Onay Bekleyen İzinler</Text>
          {workerPerReq &&
            workerPerReq.map((item, index) => (
              <View style={styles.container} key={index}>
                <View style={styles.permitTextContainer}>
                  <Text style={styles.permitTitle}>isim</Text>
                  <Text style={styles.permitText}>{item.name}</Text>
                </View>
                <View style={styles.permitTextContainer}>
                  <Text style={styles.permitTitle}>başlangıç tarihi</Text>
                  <Text style={styles.permitText}>{item.startDay}</Text>
                </View>
                <View style={styles.permitTextContainer}>
                  <Text style={styles.permitTitle}>bitiş tarihi</Text>
                  <Text style={styles.permitText}> {item.endDay}</Text>
                </View>
                <View style={styles.permitTextContainer}>
                  <Text style={styles.permitTitle}>sebep</Text>
                  <Text style={styles.permitText}>{item.reason}</Text>
                </View>
                <View style={styles.permitTextContainer}>
                  <Text style={styles.permitTitle}>yönetici</Text>
                  <Text style={styles.permitText}> {item.manager}</Text>
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    title="Onayla"
                    onPress={() => handleApprovalClick(index)}
                    color="green"
                    style={styles.buttonApprove}
                  />
                  <Button
                    title="Reddet"
                    onPress={() => handleRejectClick(index)}
                    color="error"
                    style={styles.buttonReject}
                  />
                </View>
              </View>
              
            ))}
        </View>
      )}
      {!isAdmin && <Text>İzin taleplerini onaylama yetkiniz yok.</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 24,
  },
  container: {
    padding: 12,
    paddingVertical: 6,
    borderBottomWidth: 4,
    borderBottomColor: "#ff6131",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#ff6131",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 4,
    textAlign: "center",
    marginBottom: 8,
  },
  permitTextContainer: {
    flexDirection: "row",
    backgroundColor: "#a95e13",
    color: "white",
    borderRadius: 4,
    marginBottom: 4,
    alignItems: "center",
  },
  permitTitle: {
    width: 150,
    fontWeight: "bold",
    color: "white",
    paddingLeft: 8,
    paddingVertical: 5,
  },
  permitText: {
    color: "white",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection:'row',
    justifyContent:'center',
    marginTop:5
  },
  buttonApprove:{
    marginRight:10
  },
  buttonReject: {
    marginLeft:10
  }
});

export default Approval;
