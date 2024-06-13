import {useQuery} from "@tanstack/react-query";
import {getUserData} from "../axios/authApi";

const MyPage = () => {
  const {data: currentUserData, isPending, isError} = useQuery({queryKey: ["currentUserData"], queryFn: getUserData});
  if (isPending) {
    return <div>로딩중...</div>;
  }
  if (isError) {
    return <div>데이터 조회 중 오류 발생</div>;
  }
  return (
    <>
      <p>가입 id: {currentUserData.data.id}</p>
      <p>회원 이름: {currentUserData.data.nickname}</p>
    </>
  );
};

export default MyPage;
