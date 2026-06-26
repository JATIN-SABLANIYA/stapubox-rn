import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function PreferencesScreen() {
  const params = useLocalSearchParams();

  const [playingStatus, setPlayingStatus] = useState<string>(
    "Looking for Playground"
  );
  const [sport, setSport] = useState<string>("Basketball");

  const handleNext = () => {
    router.push({
      pathname: "/feedback",
      params: {
        ...params,
        playingStatus,
        sport,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Enter Your Details</Text>

      <Text style={styles.label}>Playing Status</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={playingStatus}
          dropdownIconColor="#ffffff"
          style={styles.picker}
          onValueChange={(itemValue) =>
            setPlayingStatus(itemValue.toString())
          }
        >
          <Picker.Item
            label="Looking for Playground"
            value="Looking for Playground"
          />
          <Picker.Item
            label="Looking for Player"
            value="Looking for Player"
          />
        </Picker>
      </View>

      <Text style={styles.label}>Sport you like</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={sport}
          dropdownIconColor="#ffffff"
          style={styles.picker}
          onValueChange={(itemValue) => setSport(itemValue.toString())}
        >
          <Picker.Item label="Archery" value="Archery" />
          <Picker.Item label="Badminton" value="Badminton" />
          <Picker.Item label="Basketball" value="Basketball" />
          <Picker.Item label="Boxing" value="Boxing" />
          <Picker.Item label="Cricket" value="Cricket" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    paddingHorizontal: 20,
    justifyContent: "center",
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 40,
  },

  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
    marginTop: 10,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 8,
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: "#2B2B2B",
  },

  picker: {
    color: "#fff",
    height: 50,
  },

  button: {
    backgroundColor: "#2F80ED",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});