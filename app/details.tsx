import React, { useState } from "react";
import { router } from "expo-router";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function DetailsScreen() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [pinCode, setPinCode] = useState("");

  const handleNext = () => {
    if (!name.trim() || !address.trim() || !pinCode.trim()) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    if (pinCode.length !== 6) {
      Alert.alert("Error", "Please enter a valid 6-digit Pin Code");
      return;
    }

    router.push({
      pathname: "/preferences",
      params: {
        name,
        address,
        address2,
        pinCode,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Your Details</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#777"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Address Line 1"
          placeholderTextColor="#777"
          value={address}
          onChangeText={setAddress}
        />

        <TextInput
          style={styles.input}
          placeholder="Address Line 2 (Optional)"
          placeholderTextColor="#777"
          value={address2}
          onChangeText={setAddress2}
        />

        <TextInput
          style={styles.input}
          placeholder="Pin Code"
          placeholderTextColor="#777"
          keyboardType="number-pad"
          maxLength={6}
          value={pinCode}
          onChangeText={setPinCode}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  header: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 35,
  },

  input: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 10,
    height: 52,
    color: "#fff",
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 18,
  },

  button: {
    height: 52,
    backgroundColor: "#2F80ED",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});