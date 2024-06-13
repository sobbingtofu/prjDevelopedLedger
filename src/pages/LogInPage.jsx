import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useLogInSignUpStore} from "../zustand/logInSignUpStore";
import {logIn} from "../axios/authApi";

const LogInPage = () => {
  const navigate = useNavigate();

  const idInput = useLogInSignUpStore((state) => state.idInput);
  const shiftToLogIn = useLogInSignUpStore((state) => state.shiftToLogIn);

  const [inputUserProfileData, setInputUserProfileData] = useState({
    inputUserId: idInput,
    inputUserPw: "",
  });

  const handleInputChange = (event) => {
    if (event.target.id === "id") {
      setInputUserProfileData({...inputUserProfileData, ...{inputUserId: event.target.value}});
    } else {
      setInputUserProfileData({...inputUserProfileData, ...{inputUserPw: event.target.value}});
    }
  };

  const handleClickToSignInPage = () => {
    navigate("/signIn");
  };

  const handleClickLogInBtn = async () => {
    if (inputUserProfileData.inputUserId === "" || inputUserProfileData.inputUserPw === "") {
      alert("모든 입력창을 입력해주세요");
    } else {
      const userProfileBody = {
        id: inputUserProfileData.inputUserId,
        password: inputUserProfileData.inputUserPw,
      };
      await logIn(userProfileBody).then((response) => {
        if (response.statusText === "OK") {
          localStorage.setItem("accessToken", response.data.accessToken);
          alert(`로그인 완료`);
          shiftToLogIn();
        } else {
          alert(`${response.data.message}`);
        }
      });
    }
  };

  // useEffect(() => {
  //   console.log(inputUserProfileData);
  // });
  return (
    <div className="flex w-80 flex-col items-center justify-center gap-4 mt-24">
      <h1 className="text-center font-black text-5xl mb-8">로그인</h1>
      <div className="flex gap-4 items-center justify-center">
        <p className="w-20">아이디:</p>
        <input
          className="p-1 w-56"
          id="id"
          onChange={handleInputChange}
          autoFocus
          value={inputUserProfileData.inputUserId}
        ></input>
      </div>
      <div className="flex gap-4 items-center justify-center">
        <p type="password" className="w-20">
          패스워드:
        </p>
        <input
          type="password"
          className="p-1 w-56"
          id="pw"
          onChange={handleInputChange}
          value={inputUserProfileData.inputUserPw}
        ></input>
      </div>
      <button
        onClick={handleClickLogInBtn}
        className="mt-3 border-solid border border-sky-900 rounded-lg py-2 px-8 bg-slate-200 transition-all duration-300 hover:bg-slate-900 hover:font-black hover:text-white hover:transition-all hover:duration-300"
      >
        로그인하기
      </button>
      <p
        onClick={handleClickToSignInPage}
        className="text-xl mt-5 font-black cursor-pointer text-gray-400 transition-all duration-300 hover:text-black hover:transition-all hover:duration-300"
      >
        회원가입하기
      </p>
    </div>
  );
};

export default LogInPage;
