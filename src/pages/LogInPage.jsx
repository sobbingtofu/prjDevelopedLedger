import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const LogInPage = () => {
  const navigate = useNavigate();

  const [inputUserProfileData, setInputUserProfileData] = useState({
    inputUserId: "",
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

  useEffect(() => {
    console.log(inputUserProfileData);
  });
  return (
    <div className="flex w-80 flex-col items-center justify-center gap-4">
      <h1 className="text-center font-black text-5xl mb-5">로그인</h1>
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
