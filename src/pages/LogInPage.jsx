import {useEffect, useState} from "react";

const LogInPage = () => {
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
  useEffect(() => {
    console.log(inputUserProfileData);
  });
  return (
    <>
      <div className="flex justify-between items-center px-5 bg-gray-200">
        <p>ID:</p>
        <input id="id" placeholder="아이디를 입력하세요" onChange={handleInputChange}></input>
      </div>

      <input id="pw" placeholder="비밀번호를 입력하세요" onChange={handleInputChange}></input>
    </>
  );
};

export default LogInPage;
