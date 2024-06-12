import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();

  const [inputUserProfileData, setInputUserProfileData] = useState({
    inputUserId: "",
    inputUserPw: "",
    inputUserPwVerify: "",
  });

  const handleInputChange = (event) => {
    if (event.target.id === "id") {
      setInputUserProfileData({...inputUserProfileData, ...{inputUserId: event.target.value}});
    } else if (event.target.id === "pw") {
      setInputUserProfileData({...inputUserProfileData, ...{inputUserPw: event.target.value}});
    } else {
      setInputUserProfileData({...inputUserProfileData, ...{inputUserPwVerify: event.target.value}});
    }
  };

  const handleClickToLogInPage = () => {
    navigate("/logIn");
  };

  useEffect(() => {
    console.log(inputUserProfileData);
  });
  return (
    <div className="flex w-80 flex-col items-center justify-center gap-4">
      <h1 className="w-56 text-center font-black text-5xl mb-5">회원가입</h1>
      <div className="flex gap-4 items-center justify-center">
        <p className="w-28">아이디:</p>
        <input
          className="p-1"
          id="id"
          onChange={handleInputChange}
          value={inputUserProfileData.inputUserId}
          autoFocus
        ></input>
      </div>
      <div className="flex gap-4 items-center justify-center">
        <p className="w-28">패스워드:</p>
        <input
          type="password"
          className="p-1"
          id="pw"
          onChange={handleInputChange}
          value={inputUserProfileData.inputUserPw}
        ></input>
      </div>
      <div className="flex gap-4 items-center justify-center">
        <p className="w-28">패스워드 확인:</p>
        <input
          type="password"
          className="p-1"
          id="pw-verify"
          onChange={handleInputChange}
          value={inputUserProfileData.inputUserPwVerify}
        ></input>
      </div>
      <p
        onClick={handleClickToLogInPage}
        className="text-xl mt-5 font-black cursor-pointer text-gray-400 transition-all duration-300 hover:text-black hover:transition-all hover:duration-300"
      >
        로그인으로 돌아가기
      </p>
    </div>
  );
};

export default SignInPage;
