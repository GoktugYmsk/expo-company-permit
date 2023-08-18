import { useNavigation } from "@react-navigation/native";
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
  const manageName = useSelector((state) => state.management.manageName);

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
        <Text style={styles.profileText}>{manageName}</Text>
        <Text style={styles.profileText}>Profil</Text>
      </View>

      <TouchableOpacity
        style={styles.sidebarContainer}
        onPress={() => checkManager("Home")}
      >
        <Text style={styles.sidebarItem}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sidebarContainer}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.sidebarItem}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sidebarContainer}
        onPress={() => checkManager("MyRequest")}
      >
        <Text style={styles.sidebarItem}>My Request</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sidebarContainer}
        onPress={() => checkManager("PerRequest")}
      >
        <Text style={styles.sidebarItem}>Permission Request</Text>
      </TouchableOpacity>
      {manageName && (
        <TouchableOpacity
          style={styles.sidebarContainer}
          onPress={() => navigation.navigate("Approval")}
        >
          <Text style={styles.sidebarItem}>Approval</Text>
        </TouchableOpacity>
      )}
      {manageName && (
        <TouchableOpacity
          style={styles.sidebarContainer}
          onPress={() => navigation.navigate("OffDuty")}
        >
          <Text style={styles.sidebarItem}>Off Duty</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: "blue",
    padding: 20,
    height: 1000,
    width: 300,
    marginTop: 0,
   
  },
  sidebarItem: {
    fontSize: 18,
    marginVertical: 10,
    color: "white",
    textAlign: "center",
    padding: 4,
  },
  sidebarContainer: {
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "blue",
    borderRadius: 4,
  
  },
  // Yeni Stiller
  profileContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  profileText: {
    fontSize: 16,
    color: "white",
  },
});
