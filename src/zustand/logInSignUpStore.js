import {create} from "zustand";
import {getUserData} from "../axios/authApi";

const checkAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken") || "";
  if (accessToken === "") {
    return false;
  } else {
    return true;
  }
};

export const useLogInSignUpStore = create((set) => ({
  isLoggedIn: checkAccessToken(),
  shiftToLogIn: () => set((state) => ({isLoggedIn: true})),
  shiftToLogOut: () => set((state) => ({isLoggedIn: false})),
  idInput: "",
  setIdInput: (idInput) => set((state) => ({idInput: idInput})),
}));
