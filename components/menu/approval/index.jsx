import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setWorkerInfo, setStartDay, setEndDay, setWorker, setWorkerPerReq, setRegUser } from '../../configure';
import { Button, ListItem } from "@react-native-material/core";

function Approval() {
  const dispatch = useDispatch();

  const idControl = useSelector((state) => state.management.idControl);
  const manageName = useSelector((state) => state.management.manageName);
  const workerInfo = useSelector((state) => state.workerInfoTotal.workerInfo);
  const workerPerReq = useSelector((state) => state.workerInfoTotal.workerPerReq);
  const regUser = useSelector((state) => state.saveRegUser.regUser)


  const isAdmin = manageName !== '';

  useEffect(() => {
    // console.log('denem', workerPerReq);
  }, [workerPerReq]);

  const handleApprovalClick = (index) => {
    if (isAdmin && index >= 0 && index < workerPerReq.length) {
      const approvedWorker = workerPerReq[index];
      // 26. satırda hata olabilir


      const isWorkerAlreadyExists = workerPerReq.includes(worker => worker.id === approvedWorker.id);

      console.log('Gökay', isWorkerAlreadyExists)


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

        console.log('ANTALYA')
        dispatch(setWorkerPerReq(workerPerReq.map((worker, i) => i === index ? newWorkerInfo : worker)));
      }
    }
  };

  const handleRejectClick = (index) => {
    if (isAdmin && index >= 0 && index < workerPerReq.length) {
      const approvedWorker = workerPerReq[index];


      const starttDay = approvedWorker.startDay
      const enddDay = approvedWorker.endDay

      console.log('START', starttDay)
      console.log('START', enddDay)

      const isWorkerAlreadyExists = workerPerReq.includes(worker => worker.id === approvedWorker.id);

      console.log('KEŞAN', isWorkerAlreadyExists)

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

          const daysDifference = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

          console.log('TURKEY', daysDifference);

          const updatedRegUser = regUser.map(user => {
            if (user.id === idControl) {
              const calculate = user.perDateTotal + daysDifference;
              return { ...user, perDateTotal: calculate };
            }
            return user;
          });

          dispatch(setWorkerPerReq(workerPerReq.map((worker, i) => i === index ? newWorkerInfo : worker)));
          dispatch(setRegUser(updatedRegUser));
        }
        else if (starttDay) {

          console.log('İZMİR')

          const updatedRegUser = regUser.map(user => {
            if (user.id === idControl) {
              const calculate = user.perDateTotal + 1;
              return { ...user, perDateTotal: calculate };
            }
            return user;
          });

          dispatch(setWorkerPerReq(workerPerReq.map((worker, i) => i === index ? newWorkerInfo : worker)));
          dispatch(setRegUser(updatedRegUser));
        }


      }
    }
  };


  return (
    <ScrollView>
      <View>
        {isAdmin && (
          <View style={styles.mainContainer}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Onay Bekleyen İzinler</Text>
            </View>
            {workerPerReq && workerPerReq.some(item => item.accept === null) ? (
              workerPerReq.map((item, index) => (
                <View key={index}>
                  {item.manager === manageName &&
                    <View>
                      {item.accept === null ? (
                        <View style={styles.container} key={index}>
                          <View style={styles.permitTextContainer}>
                            <ListItem
                              title={item.name}
                              secondaryText="İsim"
                            />
                          </View>
                          <View style={styles.permitTextContainer}>
                            <ListItem
                              title={item.startDay}
                              secondaryText="Başlangıç Tarihi"
                            />
                          </View>
                          <View style={styles.permitTextContainer}>
                            <ListItem
                              title={item.endDay}
                              secondaryText="Bitiş Tarihi"
                            />
                          </View>
                          <View style={styles.permitTextContainer}>
                            <ListItem
                              title={item.reason}
                              secondaryText="Sebep"
                            />
                          </View>
                          <View style={styles.permitTextContainer}>
                            <ListItem
                              title={item.manager}
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
                      ) : null
                      }
                    </View>
                  }
                </View>
              ))
            ) : (
              <Button
                title="Bekleyen İstek bulunmamaktadır."
                variant="outlined"
                disabled
                color="#8754ce"
                tintColor="white"
                style={{ marginTop: 20, marginHorizontal: 20, }}
              />
            )}
          </View>
        )}
        {!isAdmin && (
          <Button
            title="İzinleri onaylama yetkiniz yok."
            variant="outlined"
            disabled
            color="#8754ce"
            tintColor="white"
            style={{ marginTop: 20, marginHorizontal: 20, }}
          />
        )}
      </View>
    </ScrollView>
  );

}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 24,
  },
  container: {
    padding: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#a767ff",
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
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
  },
  buttonApprove: {
    marginRight: 10
  },
  buttonReject: {
    marginLeft: 10
  }
});

export default Approval;
