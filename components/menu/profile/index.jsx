import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setAnnualLeave, setManager } from "../../configure";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import {
  Provider,
  Button,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Text,
  ListItem,
} from "@react-native-material/core";

import CustomHamburger from "../../customHamburger";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect } from "react";

function Profile() {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const manager = useSelector((state) => state.management.manager);
  const worker = useSelector((state) => state.workerInfoTotal.worker);
  const manageName = useSelector((state) => state.management.manageName);
  const workerPerReq = useSelector(
    (state) => state.workerInfoTotal.workerPerReq
  );
  const isWorkerPermit = useSelector((state) => state.isWorker.isWorkerPermit);

  const regUser = useSelector((state) => state.saveRegUser.regUser);
  const idControl = useSelector((state) => state.management.idControl);
  const loggedInUser = useSelector(
    (state) => state.workerInfoTotal.loggedInUser
  );

  //Annual Leave Algorithm
  const permitsPerUser = workerPerReq.filter(
    (permit) => permit.name === worker
  );
  const acceptedPermitsPerUser = permitsPerUser.filter(
    (permit) => permit.accept === true
  );
  const rejectedPermitsPerUser = permitsPerUser.filter(
    (permit) => permit.accept === false
  );

  const handleRemainingAnnualLeave = () => {  // ---> tek yapacağımız şey kalan günler  - seçilen tarihler arasındaki gün sayısı kalan izinleri 0 ın altına indirip indirmediğine bakmak.
    if (acceptedPermitsPerUser.length > 0) {
      const calculatedPermits = acceptedPermitsPerUser.map((permit) => {
        const oneDay = 24 * 60 * 60 * 1000;
        const firstDate = new Date(permit.startDay);
        const secondDate = new Date(permit.endDay);

        return Math.round(Math.abs((firstDate - secondDate) / oneDay));
      });

      const totalPermitDays = calculatedPermits.reduce(
        (partialSum, a) => partialSum + a,
        0
      );

      const remainingAnnualLeave = 30 - totalPermitDays;
      dispatch(setAnnualLeave(remainingAnnualLeave));
    }
  };

  useEffect(() => {
    handleRemainingAnnualLeave();
  }, []);

  console.log("LOGGED IN USER :", loggedInUser);

  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();
  const handleRequestClick = () => {
    navigation.navigate("PerRequest");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSelectManager = (managerName) => {
    dispatch(setManager(managerName));
    // toggleMenu();
    // if (worker && workerPerReq) {
    //     const savedUser = workerPerReq.filter((item) => item.name === worker);
    //     console.log('savedUser', savedUser)
    //     setReqUser(savedUser)
    // }
  };

  const managers = ["Bora", "Gökhan", "Aydın", "Hakan"];

  const isAdmin = manageName !== "";

  return (
    <View>
      <View>
        {/* <CustomHamburger /> */}
        <View style={styles.container}>
          <View style={styles.profile}>
            <View style={styles.profileIcon}>
              <Icon name="account" size={24} color="white" />
            </View>

            <View style={styles.profileText}>
              <Text style={{ fontSize: 25 }} variant="h6">
                Adı Soyadı
              </Text>
              {manageName ? <Text>{manageName}</Text> : <Text>{worker}</Text>}
            </View>
          </View>

          <View>
            <View>
              <Text>İşe Başlama Tarihi {loggedInUser.startDate}</Text>
              <Text>Kalan Yıllık İzin : {loggedInUser.perDateTotal}</Text>
            </View>
          </View>

          <Text
            style={{
              marginTop: 30,
              fontSize: 23,
              padding: 10,
              paddingLeft: 36,
            }}
            variant="h6"
          >
            Yönetici Seç :
          </Text>
          <Button
            title="YÖNETİCİ LİSTESİ"
            style={{ marginLeft: 36, marginRight: 36 }}
            color="#8754ce"
            leading={
              <Icon
                style={{ marginRight: 5 }}
                name="format-list-bulleted"
                color="white"
                size={20}
              />
            }
            onPress={() => {
              toggleMenu();
              setVisible(true);
            }}
          />
          <Provider>
            <Dialog visible={visible} onDismiss={() => setVisible(false)}>
              <DialogHeader title="Yöneticiler" />
              <DialogContent>
                <View>
                  {managers.map((managerName, index) => (
                    <ListItem
                      key={index}
                      onPress={() => handleSelectManager(managerName)}
                      title={`${managerName}`}
                    />
                  ))}
                </View>
              </DialogContent>

              <DialogActions>
                <Button
                  title="Çık"
                  compact
                  variant="outlined"
                  onPress={() => setVisible(false)}
                />
                <Button
                  title="Tamam"
                  compact
                  variant="outlined"
                  onPress={() => setVisible(false)}
                />
              </DialogActions>
            </Dialog>

            <View style={styles.selectedManager}>
              <Text
                style={{
                  marginTop: 30,
                  fontSize: 23,
                  padding: 10,
                  paddingLeft: 36,
                }}
                variant="h6"
              >
                Seçilen Yönetici :
              </Text>
              <Button
                style={{ marginLeft: 36, marginRight: 36 }}
                variant="outlined"
                title={`${manager}`}
              />
            </View>
          </Provider>
          {!isAdmin && (
            <>
              {!isWorkerPermit && (
                <Button
                  style={{
                    marginLeft: 36,
                    marginRight: 36,
                    position: "relative",
                    bottom: 120,
                  }}
                  color="#8754ce"
                  tintColor="white"
                  title="İZİN TALEBİ OLUŞTUR"
                  onPress={handleRequestClick}
                />
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: "white",
    height: "100%",
  },
  profile: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#d2d2d2",
  },
  profileIcon: {
    marginRight: 20,
    backgroundColor: "gray",
    padding: 18,
    borderRadius: 80,
  },
  profileText: {
    flexDirection: "column",
    marginRight: 20,
    padding: 5,
  },
  listItem: {
    borderWidth: 1,
    fontSize: 20,
  },
  selectedManager: {
    flexDirection: "column",
    marginBottom: 320,
  },
});

export default Profile;
