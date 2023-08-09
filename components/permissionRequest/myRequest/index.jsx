import React from "react";
import { Button } from "@react-native-material/core";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

function MyRequest() {
  const workerInfo = useSelector((state) => state.workerInfoTotal.workerInfo);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>İzinlerim</Text>
      </View>
      <Text>Beklenen</Text>
      <Text>Aktif</Text>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} title="Click Me" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 30,
    color: "red",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 150,
  },
});

export default MyRequest;
