import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function SummaryScreen() {
  const params = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your details</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{params.name}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>
          {params.address}
          {params.address2 ? `, ${params.address2}` : ""}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Pin Code</Text>
        <Text style={styles.value}>{params.pinCode}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Playing Status</Text>
        <Text style={styles.value}>{params.playingStatus}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Sport you like</Text>
        <Text style={styles.value}>{params.sport}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Feedback</Text>
        <Text style={styles.value}>{params.feedback}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    paddingHorizontal: 22,
    paddingTop: 70,
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 40,
  },

  section: {
    marginBottom: 26,
  },

  label: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
  },

  value: {
    color: "#CFCFCF",
    fontSize: 15,
    lineHeight: 22,
  },
});