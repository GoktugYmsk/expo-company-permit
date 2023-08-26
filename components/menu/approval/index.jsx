import React, { useState } from "react";
import { Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { Button, ListItem } from "@react-native-material/core";

import api from "../../../intercepter";
import { setWorkerPerReq, setRegUser } from "../../configure";
import { useEffect } from "react";

function Approval() {
  const dispatch = useDispatch();

  const regUser = useSelector((state) => state.saveRegUser.regUser);
  const idControl = useSelector((state) => state.management.idControl);
  const isManager = useSelector((state) => state.management.isManager);
  const workerPerReq = useSelector((state) => state.workerInfoTotal.workerPerReq);
  const [regUserList, setRegUserList] = useState([])
  const [managerName, setManagerName] = useState('')
  const [workerName, setWorkerName] = useState('')
  const [user, setUser] = useState([])
  const [update, setUpdate] = useState(false)


  useEffect(() => {
    api.get(`time-off/getallmanager/${isManager}`)
      .then((response) => {
        setRegUserList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    api.get('/users')
      .then((response) => {
        setUser(response.data);
        console.log('UsersArray', response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const workerId = regUserList.find(item => item.employeID)



  const isWorkerName = user.find(u => u.id === workerId.employeID)


  useEffect(() => {
    console.log('isWorkerName', isWorkerName)
  }, [isWorkerName])

  useEffect(() => {
    console.log('workerId', workerId)
  }, [workerId])

  const isManagerName = user.find(item => item.id === isManager)


  useEffect(() => {
    console.log('isManagerName', isManagerName)
  }, [isManagerName])


  useEffect(() => {
    if (isManagerName || isWorkerName) {

      setManagerName(isManagerName.userName)
      setWorkerName(isWorkerName.userName)
    }
  }, [isManagerName || regUserList])



  // useEffect(() => {
  //   const veriID = workerId.employeID;
  //   const updatedTimeOff = {
  //     timeOffType: "Rejected",
  //   };

  //   api.put(`/time-off/update/${veriID}`, updatedTimeOff) // Veri ID'sini URL'ye ekliyoruz
  //     .then((response) => {
  //       console.log('Veri güncellendi:', response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Hata:', error);
  //     });

  //   // setUpdate(true)

  // }, [update]);





  const handleApprovalClick = (index) => {
    if (isManager && index >= 0 && index < workerPerReq.length) {
      const approvedWorker = workerPerReq[index];

      const isWorkerAlreadyExists = workerPerReq.includes(
        (worker) => worker.id === approvedWorker.id
      );

      if (!isWorkerAlreadyExists) {
        const newWorkerInfo = {
          name: approvedWorker.name,
          startDay: approvedWorker.startDay,
          endDay: approvedWorker.endDay,
          reason: approvedWorker.reason,
          manager: approvedWorker.manager,
          id: idControl,
          accept: true,
        };
        dispatch(
          setWorkerPerReq(
            workerPerReq.map((worker, i) =>
              i === index ? newWorkerInfo : worker
            )
          )
        );
      }
    }
  };

  const handleRejectClick = (index) => {
    setUpdate
    if (isManager && index >= 0 && index < workerPerReq.length) {
      const approvedWorker = workerPerReq[index];

      const starttDay = approvedWorker.startDay;
      const enddDay = approvedWorker.endDay;

      const isWorkerAlreadyExists = workerPerReq.includes(
        (worker) => worker.id === approvedWorker.id
      );

      if (!isWorkerAlreadyExists) {
        const newWorkerInfo = {
          name: approvedWorker.name,
          startDay: approvedWorker.startDay,
          endDay: approvedWorker.endDay,
          reason: approvedWorker.reason,
          manager: approvedWorker.manager,
          accept: false,
        };

        const startDate = new Date(newWorkerInfo.startDay);
        const endDate = new Date(newWorkerInfo.endDay);

        if (starttDay && enddDay) {
          const daysDifference = Math.ceil(
            (endDate - startDate) / (1000 * 60 * 60 * 24)
          );

          const updatedRegUser = regUser.map((user) => {
            if (user.id === idControl) {
              const calculate = user.perDateTotal + daysDifference;
              return { ...user, perDateTotal: calculate };
            }
            return user;
          });
          dispatch(
            setWorkerPerReq(
              workerPerReq.map((worker, i) =>
                i === index ? newWorkerInfo : worker
              )
            )
          );
          dispatch(setRegUser(updatedRegUser));
        } else if (starttDay) {
          const updatedRegUser = regUser.map((user) => {
            if (user.id === idControl) {
              const calculate = user.perDateTotal + 1;
              return { ...user, perDateTotal: calculate };
            }
            return user;
          });
          dispatch(
            setWorkerPerReq(
              workerPerReq.map((worker, i) =>
                i === index ? newWorkerInfo : worker
              )
            )
          );
          dispatch(setRegUser(updatedRegUser));
        }
      }
    }
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <ScrollView>
      <View>
        {isManager && (
          <View style={styles.mainContainer}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Onay Bekleyen İzinler</Text>
            </View>
            {regUserList &&
              regUserList.some((item) => item.timeOffType === 'Pending') ? (
              regUserList.map((item, index) => (
                <View key={index}>
                  {item.managerID === isManager && (
                    <View>
                      {item.timeOffType === 'Pending' ? (
                        <View style={styles.container} key={index}>
                          <View style={styles.permitTextContainer}>
                            <ListItem title={workerName} secondaryText="İsim" />
                          </View>
                          <View style={styles.permitTextContainer}>
                            <ListItem
                              title={formatDate(item.startDate)}
                              secondaryText="Başlangıç Tarihi"
                            />
                          </View>
                          <View style={styles.permitTextContainer}>
                            <ListItem
                              title={formatDate(item.endDate)}
                              secondaryText="Bitiş Tarihi"
                            />
                          </View>
                          <View style={styles.permitTextContainer}>
                            <ListItem
                              title={item.description}
                              secondaryText="Sebep"
                            />
                          </View>
                          <View style={styles.permitTextContainer}>
                            <ListItem
                              title={managerName}
                              secondaryText="Yönetici"
                            />
                          </View>
                          <View style={styles.buttonContainer}>
                            <Button
                              title="Onayla"
                              onPress={() => handleApprovalClick(index)}
                              color="#8754ce"
                              style={styles.buttonApprove}
                            />
                            <Button
                              title="Reddet"
                              onPress={() => handleRejectClick(index)}
                              color="#8754ce"
                              variant="outlined"
                              style={styles.buttonReject}
                            />
                          </View>
                        </View>
                      ) : null}
                    </View>
                  )}
                </View>
              ))
            ) : (
              <Button
                title="Bekleyen İstek bulunmamaktadır."
                variant="outlined"
                disabled
                color="#8754ce"
                tintColor="white"
                style={{ marginTop: 20, marginHorizontal: 20 }}
              />
            )}
          </View>
        )}
        {!isManager && (
          <Button
            title="İzinleri onaylama yetkiniz yok."
            variant="outlined"
            disabled
            color="#8754ce"
            tintColor="white"
            style={{ marginTop: 20, marginHorizontal: 20 }}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 24,
    marginLeft: 15,
    paddingLeft: Platform.OS === "web" ? 300 : 0,
  },
  container: {
    padding: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#a767ff",
  },
  header: {
    backgroundColor: "#8754ce",
    width: "100%",
    padding: 10,
    borderRadius: 4,
    marginLeft: 10,
  },
  headerText: {
    fontSize: 20,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  permitTextContainer: {
    backgroundColor: "#a95e13",
    color: "white",
    borderRadius: 4,
  },
  permitText: {
    color: "white",
    textAlign: "center",
  },
  buttonContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    padding: 15,
  },
  buttonApprove: {
    marginRight: 10,
  },
  buttonReject: {
    marginLeft: 10,
  },
});

export default Approval;
