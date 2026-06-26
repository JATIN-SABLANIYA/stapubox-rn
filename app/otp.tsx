import React, { useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { verifyOtp, resendOtp } from "../services/auth";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function OtpScreen() {
  const { mobile } = useLocalSearchParams<{ mobile: string }>();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");

  const input1 = useRef<TextInput>(null);
  const input2 = useRef<TextInput>(null);
  const input3 = useRef<TextInput>(null);
  const input4 = useRef<TextInput>(null);

  const verify = async (code: string) => {
    try {
      setError("");

      const res = await verifyOtp(mobile!, code);

      console.log("Verify Response:", res);

      if (res.status === "success") {
        router.replace("/details");
      } else {
        setError(res.msg || "Wrong OTP Entered");

        setOtp(["", "", "", ""]);
        input1.current?.focus();
      }
    } catch (e) {
      console.log(e);

      setError("Wrong OTP Entered");

      setOtp(["", "", "", ""]);
      input1.current?.focus();
    }
  };

  const handleChange = (
    value: string,
    index: number,
    next?: React.RefObject<TextInput | null>
  ) => {
    const arr = [...otp];
    arr[index] = value;
    setOtp(arr);

    if (value && next?.current) {
      next.current.focus();
    }

    const code = arr.join("");

    if (code.length === 4) {
      verify(code);
    }
  };

  const handleResend = async () => {
    try {
      setError("");

      const res = await resendOtp(mobile!);

      console.log("Resend Response:", res);

      // Success par kuch bhi mat dikhao
      if (res.status !== "success") {
        setError(res.msg || "Unable to resend OTP");
      }
    } catch (e: any) {
      console.log("Resend Error:", e.response?.data || e);

      setError(
        e.response?.data?.msg || "Unable to resend OTP"
      );
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#202020",
        padding: 20,
      }}
    >
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 18,
          marginTop: 20,
          fontWeight: "600",
        }}
      >
        Phone Verification
      </Text>

      <Text
        style={{
          color: "white",
          marginTop: 40,
          fontSize: 22,
          lineHeight: 34,
        }}
      >
        Enter 4 digit OTP sent to your phone number
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 30,
        }}
      >
        <TextInput
          ref={input1}
          maxLength={1}
          keyboardType="number-pad"
          value={otp[0]}
          onChangeText={(v) => handleChange(v, 0, input2)}
          style={{
            width: 55,
            height: 55,
            borderWidth: 1,
            borderColor: "#555",
            color: "white",
            textAlign: "center",
            fontSize: 22,
          }}
        />

        <TextInput
          ref={input2}
          maxLength={1}
          keyboardType="number-pad"
          value={otp[1]}
          onChangeText={(v) => handleChange(v, 1, input3)}
          style={{
            width: 55,
            height: 55,
            borderWidth: 1,
            borderColor: "#555",
            color: "white",
            textAlign: "center",
            fontSize: 22,
          }}
        />

        <TextInput
          ref={input3}
          maxLength={1}
          keyboardType="number-pad"
          value={otp[2]}
          onChangeText={(v) => handleChange(v, 2, input4)}
          style={{
            width: 55,
            height: 55,
            borderWidth: 1,
            borderColor: "#555",
            color: "white",
            textAlign: "center",
            fontSize: 22,
          }}
        />

        <TextInput
          ref={input4}
          maxLength={1}
          keyboardType="number-pad"
          value={otp[3]}
          onChangeText={(v) => handleChange(v, 3)}
          style={{
            width: 55,
            height: 55,
            borderWidth: 1,
            borderColor: "#555",
            color: "white",
            textAlign: "center",
            fontSize: 22,
          }}
        />
      </View>

      {error ? (
        <Text
          style={{
            color: "red",
            marginTop: 10,
            fontSize: 14,
          }}
        >
          {error}
        </Text>
      ) : null}

      <TouchableOpacity onPress={handleResend}>
        <Text
          style={{
            color: "#2F80ED",
            marginTop: 15,
            fontWeight: "600",
          }}
        >
          Resend OTP
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}