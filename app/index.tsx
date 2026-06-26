import React, { useState } from "react";
import { router } from "expo-router";
import { sendOtp } from "../services/auth";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

export default function Index() {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  const isValid = mobile.length === 10;

  const handleSendOtp = async () => {
    if (!isValid) {
      Alert.alert("Invalid Mobile", "Please enter a valid 10 digit mobile number.");
      return;
    }

    try {
      setLoading(true);

      const response = await sendOtp(mobile);
      console.log("OTP Response:", response);

      router.push({
        pathname: "/otp",
        params: {
          mobile: mobile,
        },
      });
    } catch (err: any) {
      console.log(err);
      Alert.alert(
        "Error",
        err?.response?.data?.message || "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Login to Your Account</Text>

        <Text style={styles.subtitle}>
          Enter your mobile number to continue
        </Text>

        <View style={styles.inputRow}>
          <View style={styles.countryCode}>
            <Text style={styles.codeText}>+91</Text>
          </View>

          <TextInput
            placeholder="9999999999"
            placeholderTextColor="#777"
            keyboardType="number-pad"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          disabled={!isValid || loading}
          onPress={handleSendOtp}
          style={[
            styles.button,
            {
              backgroundColor: isValid ? "#2F80ED" : "#333",
              opacity: loading ? 0.7 : 1,
            },
          ]}
        >
          <Text style={styles.buttonText}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Don't have an account?{" "}
          <Text style={styles.link}>Create Account</Text>
        </Text>
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

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    color: "#9A9A9A",
    textAlign: "center",
    marginBottom: 30,
    fontSize: 15,
  },

  inputRow: {
    flexDirection: "row",
    marginBottom: 18,
  },

  countryCode: {
    width: 60,
    height: 50,
    borderWidth: 1,
    borderColor: "#555",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginRight: 10,
  },

  codeText: {
    color: "#fff",
    fontSize: 16,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 8,
    color: "#fff",
    paddingHorizontal: 15,
    fontSize: 16,
  },

  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  footer: {
    color: "#999",
    textAlign: "center",
    fontSize: 13,
  },

  link: {
    color: "#2F80ED",
    fontWeight: "600",
  },
});