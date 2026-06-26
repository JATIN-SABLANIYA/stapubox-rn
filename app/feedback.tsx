import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";

export default function FeedbackScreen() {
  const params = useLocalSearchParams();

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert("Error", "Please give a rating");
      return;
    }

    router.push({
      pathname: "/summary",
      params: {
        ...params,
        rating: rating.toString(),
        feedback,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Feedback</Text>

      <Text style={styles.label}>Rate your experience</Text>

      <View style={styles.starRow}>
        {[1, 2, 3, 4, 5].map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setRating(item)}
          >
            <Text
              style={[
                styles.star,
                {
                  color: item <= rating ? "#FFD700" : "#666",
                },
              ]}
            >
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Write your feedback</Text>

      <TextInput
        style={styles.input}
        multiline
        numberOfLines={5}
        placeholder="Share your experience..."
        placeholderTextColor="#777"
        value={feedback}
        onChangeText={setFeedback}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    padding: 20,
    justifyContent: "center",
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
  },

  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
    marginTop: 15,
  },

  starRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
  },

  star: {
    fontSize: 40,
    marginHorizontal: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 10,
    color: "#fff",
    padding: 15,
    textAlignVertical: "top",
    height: 140,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#2F80ED",
    height: 52,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});