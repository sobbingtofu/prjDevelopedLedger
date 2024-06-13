import axios from "axios";

const AUTH_BASE_URL = "https://moneyfulpublicpolicy.co.kr";

const authApi = axios.create({
  baseURL: AUTH_BASE_URL,
});

export const signIn = async (userData) => {
  try {
    const path = "/register";
    const response = await authApi.post(path, userData);

    return response;
  } catch (error) {
    return error.response;
  }
};

export const logIn = async (userData) => {
  try {
    const path = "/login?expiresIn=10m";
    const response = await authApi.post(path, userData);

    return response;
  } catch (error) {
    return error.response;
  }
};

export const getUserData = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    try {
      const path = "/user";
      const response = await authApi.get(path, {
        headers: {Authorization: `Bearer ${accessToken}`},
      });

      return response;
    } catch (error) {
      return error;
    }
  }
};
