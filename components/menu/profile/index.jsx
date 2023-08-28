import React, { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

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
import api from "../../../intercepter";

import { setIdControl, setManager } from "../../configure";
import { useEffect } from "react";

function Profile() {
  const [visible, setVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState('')
  const [regUserList, setRegUserList] = useState([])

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const manager = useSelector((state) => state.management.manager);
  const worker = useSelector((state) => state.workerInfoTotal.worker);
  const idControl = useSelector((state) => state.management.idControl);
  const manageName = useSelector((state) => state.management.manageName);
  const isWorkerPermit = useSelector((state) => state.isWorker.isWorkerPermit);


  const isAdmin = manageName !== "";

  useEffect(() => {
    api.get('/users')
      .then((response) => {
        setRegUserList(response.data);
      })
      .catch((error) => {
        console.error(error);
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
    switch (managerName) {
      case 'Selin':
        setSelectedManager(managerName)
        dispatch(setManager(11));
        break;
      case 'Tolga':
        setSelectedManager(managerName)
        dispatch(setManager(7));
        break;
      case 'Aydın':
        setSelectedManager(managerName)
        dispatch(setManager(2));
        break;
      case 'Hakan':
        setSelectedManager(managerName)
        dispatch(setManager(3));
        break;
      default:
        break;
    }
  };

  const managers = ["Selin", "Tolga", "Aydın", "Hakan"];

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
                {/* {manageName ? <Text>{manageName}</Text> : <Text>{regUserList.userName}</Text>} */}
              </View>
              {regUserList.map((item, key) => (
                <View key={key}>
                  {item.id === idControl && (
                    <View style={styles.profileContent}>
                      {!manageName && (
                        <View>
                          <Text>{item.userName}</Text>
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
                              {new Date(item.userCreateDate).toLocaleDateString('tr-TR')}
                            </Text>
                          </Text>
                          <Text style={{ color: "gray", fontSize: 14 }}>
                            Kalan izin hakkı :
                            <Text
                              style={{
                                color: "gray",
                                fontSize: 17,
                                fontWeight: "bold",
                              }}
                            >
                              {" "}
                              {item.ramainingDayOff}
                            </Text>
                          </Text>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              ))}
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
                title={`${selectedManager}`}
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
