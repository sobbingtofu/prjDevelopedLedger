import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {signIn} from "../axios/authApi";
import {useLogInSignUpStore} from "../zustand/logInSignUpStore";

const SignInPage = () => {
  const navigate = useNavigate();

  const setIdInput = useLogInSignUpStore((state) => state.setIdInput);

  const [inputUserProfileData, setInputUserProfileData] = useState({
    inputUserId: "",
    inputUserPw: "",
    inputUserPwVerify: "",
    inputNickname: "",
  });

  const handleInputChange = (event) => {
    if (event.target.id === "id") {
      setInputUserProfileData({...inputUserProfileData, ...{inputUserId: event.target.value}});
    } else if (event.target.id === "pw") {
      setInputUserProfileData({...inputUserProfileData, ...{inputUserPw: event.target.value}});
    } else if (event.target.id === "pw-verify") {
      setInputUserProfileData({...inputUserProfileData, ...{inputUserPwVerify: event.target.value}});
    } else {
      setInputUserProfileData({...inputUserProfileData, ...{inputNickname: event.target.value}});
    }
  };

  const handleClickToLogInPage = () => {
    navigate("/logIn");
  };

  const handleClickSignInBtn = () => {
    if (
      inputUserProfileData.inputNickname === "" ||
      inputUserProfileData.inputUserId === "" ||
      inputUserProfileData.inputUserPw === "" ||
      inputUserProfileData.inputUserPwVerify === ""
    ) {
      alert("모든 입력창을 입력해주세요");
    } else if (inputUserProfileData.inputUserPw !== inputUserProfileData.inputUserPwVerify) {
      alert("입력하신 패스워드와 패스워드 확인이 일치하지 않습니다");
      setInputUserProfileData({...inputUserProfileData, ...{inputUserPw: "", inputUserPwVerify: ""}});
    } else {
      const userProfileBody = {
        id: inputUserProfileData.inputUserId,
        password: inputUserProfileData.inputUserPw,
        nickname: inputUserProfileData.inputNickname,
      };
      signIn(userProfileBody).then((response) => {
        if (response.statusText === "Created") {
          alert(`ID: ${inputUserProfileData.inputUserId}\n회원가입완료`);
          setIdInput(inputUserProfileData.inputUserId);
          navigate("/logIn");
        } else if (response.statusText === "Conflict") {
          alert(`${response.data.message}\n다른 ID를 사용해주세요.`);
        } else if (response.statusText === "Unauthorized") {
          alert(`${response.data.message}\n비밀번호를 다시 설정해주세요.`);
        } else {
          alert(`${response.data.message}`);
        }
      });
    }
  };

  return (
    <div className="flex w-80 flex-col items-center justify-center gap-4">
      <h1 className="w-56 text-center font-black text-5xl mb-5">회원가입</h1>
      <div className="flex gap-4 items-center justify-center">
        <p className="w-28">아이디:</p>
        <input
          className="p-1 w-56"
          id="id"
          onChange={handleInputChange}
          value={inputUserProfileData.inputUserId}
          autoFocus
        ></input>
      </div>
      <div className="flex gap-4 items-center justify-center">
        <p className="w-28">패스워드:</p>
        <input
          placeholder="4글자 이상을 입력해주세요"
          type="password"
          className="p-1 w-56"
          id="pw"
          onChange={handleInputChange}
          value={inputUserProfileData.inputUserPw}
        ></input>
      </div>
      <div className="flex gap-4 items-center justify-center">
        <p className="w-28">패스워드 확인:</p>
        <input
          placeholder="4글자 이상을 입력해주세요"
          type="password"
          className="p-1 w-56"
          id="pw-verify"
          onChange={handleInputChange}
          value={inputUserProfileData.inputUserPwVerify}
        ></input>
      </div>
      <div className="flex gap-4 items-center justify-center">
        <p className="w-28">이름:</p>
        <input
          type="text"
          className="p-1 w-56"
          id="nickname"
          onChange={handleInputChange}
          value={inputUserProfileData.inputNickname}
        ></input>
      </div>
      <button
        onClick={handleClickSignInBtn}
        className="mt-3 border-solid border border-sky-900 rounded-lg py-2 px-8 bg-slate-200 transition-all duration-300 hover:bg-slate-900 hover:font-black hover:text-white hover:transition-all hover:duration-300"
      >
        회원가입하기
      </button>
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
