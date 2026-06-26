import axios from "axios";

const api = axios.create({
  baseURL: "https://stapubox.com/trial",
  headers: {
    "Content-Type": "application/json",
    "X-Api-Token": "trial_86197677_aca79dac68392373e10d60dd079a5250",
  },
});

export default api;