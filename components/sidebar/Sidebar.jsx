import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const navigation = useNavigation();
  const manager = useSelector((state) => state.management.manager);
  const isManager = useSelector((state) => state.management.isManager);

  function checkManager(page) {
    if (manager) {
      navigation.navigate(page);
    } else {
      alert("Profile sayfasından yönetici Seçimi yapınız");
    }
  }

  return (
    <View style={styles.sidebar}>
      {/* Profil Iconu ve Ad Soyad */}
      <View style={styles.profileContainer}>
        <View style={styles.profile} >
          <Icon style={styles.profileIcon} name="account" size={24} color="white" />

          <View style={styles.profileTextArea}>
            <Text style={styles.profileTextTop}>Profil</Text>
            {/* <Text style={styles.profileText}>{manageName}</Text> */}
          </View>

        </View>
        <View style={styles.profileContainerContent}>
          <TouchableOpacity
            style={styles.sidebarContainer}
            onPress={() => checkManager("Home")}
          >
            <Text style={styles.sidebarItem}>İzinliler Takvimi</Text>
            <Icon style={styles.sidebarIcon} name="calendar" size={23} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sidebarContainer}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={styles.sidebarItem}>Profil</Text>
            <Icon style={styles.sidebarIcon} name="account" size={23} />
          </TouchableOpacity>
          {!isManager &&
            <TouchableOpacity
              style={styles.sidebarContainer}
              onPress={() => checkManager("MyRequest")}
            >
              <Text style={styles.sidebarItem}>İzinlerim</Text>
              <Icon style={styles.sidebarIcon} name="clock" size={23} />
            </TouchableOpacity>
          }
          {!isManager &&
            <TouchableOpacity
              style={styles.sidebarContainer}
              onPress={() => checkManager("PerRequest")}
            >
              <Text style={styles.sidebarItem}>İzin Alma Formu</Text>
              <Icon style={styles.sidebarIcon} name="thumb-up" size={23} />
            </TouchableOpacity>
          }
          {isManager && (
            <TouchableOpacity
              style={styles.sidebarContainer}
              onPress={() => navigation.navigate("Approval")}
            >
              <Text style={styles.sidebarItem}>Onay Bekleyen İşlemler</Text>
              <Icon style={styles.sidebarIcon} name="progress-clock" size={23} />
            </TouchableOpacity>
          )}
          {isManager && (
            <TouchableOpacity
              style={styles.sidebarContainer}
              onPress={() => navigation.navigate("OffDuty")}
            >
              <Text style={styles.sidebarItem}>İzin Verilenler</Text>
              <Icon style={styles.sidebarIcon} name="sunglasses" size={23} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.sidebarContainer}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.sidebarItem}>Çıkış Yap</Text>
            <Icon style={styles.sidebarIcon} name="door" size={23} />
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: "#8c5bd0",
    height: 1000,
    width: 275,
    marginTop: 0,

  },
  sidebarItem: {
    fontSize: 18,
    width: 220,
    marginVertical: 10,
    color: "white",
    textAlign: "left",
    paddingLeft: 5,
  },
  sidebarIcon: {
    marginTop: 10,
    color: 'white',
    paddingRight: 5,
  },
  sidebarContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#b58eec",
    backgroundColor: "#8c5bd0",
    borderRadius: 4,
    marginBottom: 15,
  },
  // Yeni Stiller
  profile: {
    flexDirection: "row",
    marginTop: 100,
    height: 100,
  },
  profileContainer: {
    flexDirection: "column",
    height: 1000,
    paddingHorizontal: 15,
    backgroundColor: "#8c5bd0",
  },
  profileContainerContent: {
    flexDirection: "column",
  },



  profileTextArea: {
    flexDirection: "column",
  },
  profileText: {
    fontSize: 16,
    paddingTop: 8,
    color: "white",
  },
  profileTextTop: {
    fontSize: 20,
    paddingTop: 8,
    color: "white",
    fontWeight: 'bold',
  },
  profileIcon: {
    width: 60,
    height: 60,
    marginRight: 20,
    backgroundColor: "gray",
    padding: 18,
    borderRadius: 80,
  },
});
