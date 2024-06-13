import {useQuery} from "@tanstack/react-query";
import {getUserData} from "../axios/authApi";
import {useLogInSignUpStore} from "../zustand/logInSignUpStore";
import {useRef} from "react";

const MyPage = () => {
  const idInputRef = useRef(null);
  const nicknameInputRef = useRef(null);

  const {data: currentUserData, isPending, isError} = useQuery({queryKey: ["currentUserData"], queryFn: getUserData});
  console.log(currentUserData);
  const shiftToLogOut = useLogInSignUpStore((state) => state.shiftToLogOut);

  if (isPending) {
    return <div>로딩중...</div>;
  } else if (isError) {
    return <div>데이터 조회 중 오류 발생</div>;
  } else {
    if (currentUserData.statusText !== "OK") {
      shiftToLogOut();
      localStorage.removeItem("accessToken");
      alert(currentUserData.data.message);

      return <></>;
    } else {
      return (
        <>
          <div className="flex flex-col justify-between gap-8 mt-8">
            <div>
              <p className="mb-2">가입 id</p>
              <p className="text-lg font-black">{currentUserData.data.id}</p>
            </div>
            <div>
              <p className="mb-2">회원 닉네임</p>
              <p className="text-lg font-black">{currentUserData.data.nickname}</p>
            </div>
          </div>
        </>
      );
    }
  }
};

export default MyPage;
