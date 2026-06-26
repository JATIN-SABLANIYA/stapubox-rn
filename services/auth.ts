import axios from "axios";

const BASE_URL = "https://stapubox.com/trial";

const API_TOKEN =
  "trial_86197677_aca79dac68392373e10d60dd079a5250";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-Api-Token": API_TOKEN,
    "Content-Type": "application/json",
  },
});

export const sendOtp = async (mobile: string) => {
  const response = await api.post("/sendOtp", {
    mobile,
  });

  return response.data;
};

export const verifyOtp = async (
  mobile: string,
  otp: string
) => {
  const response = await api.post(
    `/verifyOtp?mobile=${mobile}&otp=${otp}`
  );

  return response.data;
};

export const resendOtp = async (mobile: string) => {
  const response = await api.post(
    `/resendOtp?mobile=${mobile}`
  );

  return response.data;
};