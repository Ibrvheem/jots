import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface apiPropsType {
  endpoint: string;
  payload: any;
}
export async function api() {
  const token = await AsyncStorage.getItem("token");
  console.log("token", token);
  const url = "http://127.0.0.1:5001";
  return {
    post: async ({ endpoint, payload }: apiPropsType) => {
      try {
        console.log(url);
        const response = await axios.post(`${url}/${endpoint}`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        return response;
      } catch (err) {}
    },
    get: async (endpoint: string) => {
      try {
        const response = await axios.get(`${url}/${endpoint}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        return response;
      } catch (err) {}
    },
  };
}
