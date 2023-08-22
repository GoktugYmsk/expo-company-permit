import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { setIsWorkerPermit, setWorkerPerReq } from "../configure";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

function Menu() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const manageName = useSelector((state) => state.management.manageName);
  const manager = useSelector((state) => state.management.manager);
  const worker = useSelector((state) => state.workerInfoTotal.worker);
  const workerPerReq = useSelector((state) => state.workerInfoTotal.workerPerReq);
  const regUser = useSelector((state) => state.saveRegUser.regUser);
  const idControl = useSelector((state) => state.management.idControl);

  console.log(regUser);

  const isAdmin = manageName !== "";

  const handleMainClick = () => {
    if (manager) {
      navigation.navigate("Home");
    } else {
      alert("Profile sayfasından yönetici Seçimi yapınız");
    }
  };

  const handleRequestClick = () => {
    if (manager) {
      navigation.navigate("PerRequest");
    } else {
      alert("Profile sayfasından yönetici Seçimi yapınız");
    }
  };

  const handleApprovalClick = () => {
    if (manageName && worker) {
      navigation.navigate("Approval");
    } else if (!manageName && worker && manager) {
      navigation.navigate("MyRequest");
    } else if (!manageName && worker && !manager) {
      alert("Profile sayfasından yönetici Seçimi yapınız");
    }
  };



  const handleProfileClick = () => {
    if (worker && workerPerReq) {
      const isWorkerHavePerm = regUser.find((item) => item.id === idControl);

      if (isWorkerHavePerm.perDateTotal === 0) {
        dispatch(setIsWorkerPermit(false));
      } else {
        dispatch(setIsWorkerPermit(true));
      }
    } else {
      dispatch(setIsWorkerPermit(true));
    }
    navigation.navigate("Profile");
  };



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
        dispatch(setWorkerPerReq(regUserListData))
      } catch (error) {
        console.error('Hatalı veri alınırken: ', error);
      }
    };
    fetchData();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Pinsoft İzinlerim</Text>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.button} onPress={handleMainClick}>
          <Icon name="home" size={30} color="#8754ce" />
          <Text style={styles.buttonText}>Anasayfa</Text>
          <Icon name="arrow-right" size={23} color="#6d6e70" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleProfileClick}>
          <Icon name="account" size={30} color="#8754ce" />
          <Text style={styles.buttonText}>Profil</Text>
          <Icon name="arrow-right" size={23} color="#6d6e70" />
        </TouchableOpacity>
        {!manageName && (
          <TouchableOpacity style={styles.button} onPress={handleRequestClick}>
            <Icon name="thumb-up" size={30} color="#8754ce" />
            <Text style={styles.buttonText}>İzin talebi</Text>
            <Icon name="arrow-right" size={23} color="#6d6e70" />
          </TouchableOpacity>
        )}
        {isAdmin && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("OffDuty")}
          >
            <Icon name="sunglasses" size={30} color="#8754ce" />
            <Text style={styles.buttonText}>İzinlilerim</Text>
            <Icon name="arrow-right" size={23} color="#6d6e70" />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={handleApprovalClick}>
          <Icon name="progress-clock" size={30} color="#8754ce" />
          <Text style={styles.buttonText}>Onay Bekleyen İşlemler</Text>
          <Icon name="arrow-right" size={23} color="#6d6e70" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
    alignItems: "center",
    height: "100%",
    padding: 10,
  },
  menu: {
    width: "100%",
    padding: 20,
    paddingRight: 10,
    paddingLeft: 10,
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
  button: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "#c4c4c4",
  },
  buttonText: {
    width: "80%",
    paddingLeft: 10,
  },
});

export default Menu;
