import React, {useEffect} from "react";
import {useLogInSignUpStore} from "../zustand/logInSignUpStore";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getUserData} from "../axios/authApi";

const Header = () => {
  const navigate = useNavigate();
  const shiftToLogOut = useLogInSignUpStore((state) => state.shiftToLogOut);

  useEffect(() => {
    // const accessToken = localStorage.getItem("accessToken");
    getUserData().then((response) => {
      if (response.statusText !== "OK") {
        shiftToLogOut();
        localStorage.removeItem("accessToken");
        alert(response.data.message);
      }
    });
  });

  const handleLogOutClick = () => {
    shiftToLogOut();
    localStorage.removeItem("accessToken");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleMyPageClick = () => {
    navigate("/myPage");
  };

  return (
    <div className="flex w-full justify-center bg-teal-200 mb-4 shadow-sm">
      <div className="flex w-920 justify-between">
        <div className="flex gap-4 py-4">
          <p className="cursor-pointer hover:font-black" onClick={handleHomeClick}>
            홈
          </p>
          <p className="cursor-pointer hover:font-black" onClick={handleMyPageClick}>
            마이페이지
          </p>
        </div>
        <div className="flex gap-4 py-4">
          <p className="cursor-pointer hover:font-black" onClick={handleLogOutClick}>
            로그아웃
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
