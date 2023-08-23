import React, { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import api from "../../../intercepter";

import axios from 'axios';

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
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

import { setManager } from "../../configure";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../../../firebase";
import { useEffect } from "react";

function Profile() {
  const [visible, setVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [regUserList, setRegUserList] = useState([]);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const manager = useSelector((state) => state.management.manager);
  const regUser = useSelector((state) => state.saveRegUser.regUser);
  const worker = useSelector((state) => state.workerInfoTotal.worker);
  const idControl = useSelector((state) => state.management.idControl);
  const manageName = useSelector((state) => state.management.manageName);
  const isWorkerPermit = useSelector((state) => state.isWorker.isWorkerPermit);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const regUserCollection = collection(db, 'regUser');
        const snapshot = await getDocs(regUserCollection);
        const regUserListData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('ANKARA', regUserListData);

        setRegUserList(regUserListData);
      } catch (error) {
        console.error('Hatalı veri alınırken: ', error);
      }
    };

    fetchData();
  }, []);



  const isAdmin = manageName !== "";

  useEffect(() => {
    api.get('/users')
      .then((response) => {

        setDeneme(response.data);

      })
      .catch((error) => {
      });
    dispatch(setIdControl(deneme.id))

  }, [])

  useEffect(() => {
    api.get('/time-off')
      .then((response) => {
        console.log('Response Data:', response.data); // Verileri yazdır
        console.log('Response Status:', response.status); // Yanıt durumunu yazdır
        setDenemeTime(response.data);
        console.log('Göktuğ');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);


  const handleRequestClick = () => {
    if (manager) {
      navigation.navigate("PerRequest");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSelectManager = (managerName) => {
    dispatch(setManager(managerName));
  };

  const managers = ["Bora", "Gökhan", "Aydın", "Hakan"];

  return (
    <View>
      <View>
        <View style={styles.container}>
          <View style={styles.profile}>
            <View style={styles.profileIcon}>
              <Icon name="account" size={24} color="white" />
            </View>
            <View style={styles.profileContent}>
              <View style={styles.profileText}>
                <Text style={{ fontSize: 25 }} variant="h6">
                  Adı Soyadı
                </Text>
                {manageName ? <Text>{manageName}</Text> : <Text>{worker}</Text>}
              </View>
              {regUserList.map((item, key) => (
                <View key={key}>
                  {item.id === idControl && (
                    <View style={styles.profileContent}>
                      {!manageName && (
                        <View>
                          <Text style={{ color: "gray", fontSize: 14 }}>
                            İşe Başlama Tarihi :
                            <Text
                              style={{
                                color: "gray",
                                fontSize: 17,
                                fontWeight: "bold",
                              }}
                            >
                              {" "}
                              {item.startDate}
                            </Text>
                          </Text>
                          {/* <Text style={{ color: "gray", fontSize: 14 }}>
                            Kalan izin hakkı :
                            <Text
                              style={{
                                color: "gray",
                                fontSize: 17,
                                fontWeight: "bold",
                              }}
                            >
                              {" "}
                              {item.perDateTotal}
                            </Text>
                          </Text> */}
                        </View>
                      )}
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
          {deneme &&
            <View>
              {deneme.firstName}
              {deneme.role}
            </View>
          }
          {denemeTime &&

            <View>
              <Text>Burada yazacak</Text> {denemeTime.description}
            </View>
          }
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
              {isWorkerPermit && (
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
    paddingLeft: Platform.OS === 'web' ? 300 : 0
  },
  profile: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#d2d2d2",
  },
  profileIcon: {
    width: 60,
    height: 60,
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
  profileContent: {
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
    marginBottom: 280,
  },
});

export default Profile;
