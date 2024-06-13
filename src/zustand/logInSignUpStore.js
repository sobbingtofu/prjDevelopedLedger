import {create} from "zustand";

const checkAccessToken = () => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken")) || "";
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
