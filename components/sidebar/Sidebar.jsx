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
  const worker = useSelector((state) => state.workerInfoTotal.worker);
  const manageName = useSelector((state) => state.management.manageName);

  const isAdmin = manageName !== "";

  const handleApprovalClick = () => {
    if (manageName && worker) {
      navigation.navigate("Approval");
    } else if (!manageName && worker && manager) {
      navigation.navigate("MyRequest");
    } else if (!manageName && worker && !manager) {
      alert("Profile sayfasından yönetici Seçimi yapınız");
    }
  };


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

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity
        style={styles.sidebarContainer}
        onPress={handleMainClick}
      >
        <Text style={styles.sidebarItem}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.sidebarContainer}
        onPress={() => navigation.navigate("Profile")}>
        <Text style={styles.sidebarItem}>Profile</Text>
      </TouchableOpacity>
      {!manageName && (
        <TouchableOpacity
          style={styles.sidebarContainer}
          onPress={handleRequestClick}
        >
          <Text style={styles.sidebarItem}>İzin talebi</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.sidebarContainer}
        onPress={handleApprovalClick}
      >
        <Text style={styles.sidebarItem}>Onay Bekleyen İşlemler</Text>
      </TouchableOpacity>
      {isAdmin && (
        <TouchableOpacity
          style={styles.sidebarContainer}
          onPress={() => navigation.navigate("OffDuty")}>
          <Text style={styles.sidebarItem}>İzinlilerim</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    height: "100%",
    marginTop: 100,
  },
  sidebarItem: {
    fontSize: 18,
    marginVertical: 16,
    color: "white",
    textAlign: "center",
    padding: 4,
  },
  sidebarContainer: {
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "#8754ce",
    borderRadius: 4,
  },
});
