import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const url = "http://127.0.0.1:5001";
// const url = "https://7e8d-105-112-73-190.ngrok-free.app";

export const api = {
  post: async ({ endpoint, payload }: { payload: NonNullable<unknown>; endpoint: string }) => {
    const token = await AsyncStorage.getItem("token");
    {
      const { data } = await axios.post(`${url}/${endpoint}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      return data;
    }
  },

  get: async (endpoint: string) => {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await axios.get(`${url}/${endpoint}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  delete: async (endpoint: string) => {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await axios.delete(`${url}/${endpoint}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  form: async ({ endpoint, payload }: { payload: NonNullable<unknown>; endpoint: string }) => {
    const token = await AsyncStorage.getItem("token");
    {
      const { data } = await axios.postForm(`${url}/${endpoint}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });
      return data;
    }
  },
};
