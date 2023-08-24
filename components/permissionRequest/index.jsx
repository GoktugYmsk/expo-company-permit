import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Platform } from "react-native";

import { Calendar } from "react-native-calendars";
import { Switch, TextInput, Button } from "@react-native-material/core";

import { setWorkerPerReq, setRegUser } from '../configure';
import { useEffect } from 'react';
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../../firebase";

function PermissionRequest() {
  const [error, setError] = useState('');
  const [sreason, setSreason] = useState('');
  const [checked, setChecked] = useState(false);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [data, setData] = useState([])

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const manager = useSelector((state) => state.management.manager);
  const regUser = useSelector((state) => state.saveRegUser.regUser);
  const worker = useSelector((state) => state.workerInfoTotal.worker);
  const idControl = useSelector((state) => state.management.idControl);
  const workerPerReq = useSelector((state) => state.workerInfoTotal.workerPerReq) || [];

  const handleStartDate = (e) => {
    setSelectedStartDate(e);
  };
  const handleEndDate = (e) => {
    setSelectedEndDate(e);
  };

  const handleReasonChange = (e) => {
    setSreason(e);
  };

  const signWorkerId = regUser.find(item => item.id === idControl);

  const startDate = new Date(selectedStartDate);
  const endDate = checked ? new Date(selectedEndDate) : startDate;
  const daysDifference = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

  useEffect(() => {

    useEffect(() => {
      api.post('/getall')
        .then((response) => {
          setData(response)
          console.log(response.data);
        })
        .catch((error) => {

          console.error(error);
        });
    }, [])


  }, [])

  const handleSendRequest = () => {

    if (manager && selectedStartDate && selectedEndDate) {
      if (data) {
        const isWorkerId = data.find(
          (workerInfo) => workerInfo.id === idControl
        );
        const signWorkerId = regUserList.find((item) => item.id === idControl);

        const calculate = signWorkerId.perDateTotal - daysDifference - 1;

        if (isWorkerId) {
          if (calculate < 0) {
            alert('Kullanabileceğiniz max izin 30 gündür');
          } else {
            setFireCalculate(calculate)

            const newWorkerInfo = {
              name: worker,
              startDay: selectedStartDate,
              endDay: selectedEndDate,
              reason: sreason,
              manager: manager,
              accept: null,
              id: idControl,
            };
            navigation.navigate("MyRequest");
          }

        } else {
          if (calculate < 0) {
            alert("Kullanabileceğiniz max izin 30 gündür");
          } else {
            setFireCalculate(calculate)

            const newWorkerInfo = {
              name: worker,
              startDay: selectedStartDate,
              endDay: selectedEndDate,
              reason: sreason,
              manager: manager,
              accept: null,
              id: idControl,
            };


            navigation.navigate("MyRequest");
          }
        }
      } else {

        const calculate = signWorkerId.perDateTotal - daysDifference - 1;

        if (calculate < 0) {
          alert("Kullanabileceğiniz max izin 30 gündür");
        } else {
          setFireCalculate(calculate)

          dispatch(setRegUser(updatedRegUser));

          const newWorkerInfo = {
            name: worker,
            startDay: selectedStartDate,
            endDay: selectedEndDate,
            reason: sreason,
            manager: manager,
            accept: null,
            id: idControl,
          };


          navigation.navigate("MyRequest");
        }
      }
    } else if (manager && selectedStartDate) {
      if (fireWorkerPer) {
        const isWorkerId = data.find(
          (workerInfo) => workerInfo.id === idControl
        );
        const signWorkerId = regUserList.find((item) => item.id === idControl);

        const calculate = signWorkerId.perDateTotal - 1

        if (isWorkerId) {
          if (calculate < 0) {
            alert("Kullanabileceğiniz max izin 30 gündür");
          } else {
            setFireCalculate(calculate)

            const newWorkerInfo = {
              name: worker,
              startDay: selectedStartDate,
              endDay: selectedEndDate,
              reason: sreason,
              manager: manager,
              accept: null,
              id: idControl,
            };



            navigation.navigate("MyRequest");
          }
        } else {
          if (calculate < 0) {
            alert("Kullanabileceğiniz max izin 30 gündür");
          } else {
            setFireCalculate(calculate)

            const newWorkerInfo = {
              name: worker,
              startDay: selectedStartDate,
              endDay: selectedEndDate,
              reason: sreason,
              manager: manager,
              accept: null,
              id: idControl,
            };


            navigation.navigate("MyRequest");
          }
        }

        if (calculate < 0) {
          alert('Kullanabileceğiniz max izin 30 gündür')
        }
        else {
          const updatedRegUser = regUser.map(user => {
            if (user.id === idControl) {
              const calculate = user.perDateTotal - 1;
              return { ...user, perDateTotal: calculate };
            }
            return user;
          });
          dispatch(setRegUser(updatedRegUser));

          const newWorkerInfo = {
            name: worker,
            startDay: selectedStartDate,
            endDay: selectedEndDate,
            reason: sreason,
            manager: manager,
            accept: null,
            id: idControl,
          };
          dispatch(setWorkerPerReq([...workerPerReq, newWorkerInfo]));
          navigation.navigate("MyRequest");
        }
      }
    }
    else {
      const calculate = signWorkerId.perDateTotal - 1

      if (calculate < 0) {
        alert("Kullanabileceğiniz max izin 30 gündür");
      } else {
        setFireCalculate(calculate)

        const newWorkerInfo = {
          name: worker,
          startDay: selectedStartDate,
          endDay: selectedEndDate,
          reason: sreason,
          manager: manager,
          accept: null,
          id: idControl,
        };

        const workersCollectionRef = collection(db, "workerPerReq");
        addDoc(workersCollectionRef, newWorkerInfo)
          .then(() => {
            console.log("Veri başarıyla Firestore'a eklendi.");
          })
          .catch((error) => {
            console.error("Veri eklenirken hata oluştu: ", error);
          });

        // dispatch(setWorkerPerReq([newWorkerInfo]));
        navigation.navigate("MyRequest");
      }
    }
  }


  return (
    <ScrollView>
      <>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>İZİN ALMA FORMU</Text>
          </View>
          {error && <Text>{error}</Text>}
          <View style={styles.topContent}>
            <TextInput
              placeholder="İzin Nedeni"
              variant="outlined"
              style={{ width: 350 }}
              onChangeText={handleReasonChange}
            />
          </View>
          <View style={styles.middleContent}>
            <View style={styles.middleContentText}>
              <Text style={styles.inlineText}>Tek gün izin</Text>
              {checked && (
                <Text style={styles.inlineText}>/ Çoklu gün izin</Text>
              )}
            </View>
            <Switch
              style={{ marginTop: 5 }}
              trackColor="#8754ce"
              thumbColor="white"
              value={checked}
              onValueChange={() => setChecked(!checked)}
            />
          </View>
          <View style={styles.altContent}>
            <View style={styles.datePicker}>
              <Button
                title="İZİN BAŞLANGIÇ TARİHİ SEÇİN"
                variant="outlined"
                disabled
                color="#8754ce"
                tintColor="white"
                style={{ marginTop: 20 }}
              />
              <Calendar
                style={styles.calendar}
                onDayPress={(day) => handleStartDate(day.dateString)}
                selected={selectedStartDate}
                monthFormat={"yyyy MMMM"}
                markingType={"multi-dot"}
                markedDates={marked1}
              />
            </View>
            {checked && (
              <View style={styles.datePicker}>
                <Button
                  title="İZİN BİTİŞ TARİHİ SEÇİN"
                  variant="outlined"
                  disabled
                  color="#8754ce"
                  tintColor="white"
                  style={{ marginTop: 20, paddingHorizontal: 23 }}
                />
                <Calendar
                  style={styles.calendar}
                  onDayPress={(day) => handleEndDate(day.dateString)}
                  selected={selectedEndDate}
                  markedDates={marked2}
                />
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.button}>
            <Button
              onPress={handleSendRequest}
              title="İZİNİ ONAYA GÖNDER"
              uppercase={false}
              color="#8754ce"
              tintColor="white"
            />
          </TouchableOpacity>
        </View>
      </>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    height: "100%",
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
  topContent: {
    margin: 20,
  },
  middleContent: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-around",
    width: "95%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#cecece",
  },
  middleContentText: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
    borderRadius: 5,
    paddingTop: 3,
  },
  inlineText: {
    color: "#8754ce",
    fontSize: 18,
    padding: 10,
  },
  calendar: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#cecece",
    width: 350,
    marginTop: 10,
  },
  button: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 60,
  },
  altContent: {
    flexDirection: "column",
    alignItems: "center",
  },
  datePicker: {
    flexDirection: "column",
    alignItems: "center",
  },
});

export default PermissionRequest;