import {useQuery} from "@tanstack/react-query";
import {getUserData} from "../axios/authApi";
import {useLogInSignUpStore} from "../zustand/logInSignUpStore";

const MyPage = () => {
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
          <p>가입 id: {currentUserData.data.id}</p>
          <p>회원 이름: {currentUserData.data.nickname}</p>
        </>
      );
    }
  }
};

export default MyPage;
