import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {changeUserNickname, getUserData} from "../axios/authApi";
import {useLogInSignUpStore} from "../zustand/logInSignUpStore";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";

const MyPage = () => {
  const nicknameInputRef = useRef(null);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const {data: currentUserData, isPending, isError} = useQuery({queryKey: ["currentUserData"], queryFn: getUserData});

  const {mutate: changeNicknameInServer} = useMutation({
    mutationFn: changeUserNickname,
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUserData"]);
      alert("닉네임 변경 성공");
      navigate("/");
    },
  });

  console.log(currentUserData);
  const shiftToLogOut = useLogInSignUpStore((state) => state.shiftToLogOut);

  const handleEditNicknameBtn = () => {
    const editConfirmation = confirm("닉네임을 변경할까요?");
    if (editConfirmation) {
      changeNicknameInServer(nicknameInputRef.current.value);
    }
  };

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
              <p className="mb-2 px-4">가입 id</p>
              <p className="text-lg font-black px-4">{currentUserData.data.id}</p>
            </div>
            <div>
              <p className="mb-2 px-4">회원 닉네임</p>
              <input
                className="text-lg font-black px-4 py-2 rounded-md"
                defaultValue={currentUserData.data.nickname}
                autoFocus
                ref={nicknameInputRef}
              ></input>
            </div>
            <button
              onClick={handleEditNicknameBtn}
              className="text-lg font-black px-4 py-2 rounded-md border-solid border-2 border-slate-600 bg-emerald-100 transition-all hover:transition-all hover:bg-emerald-500"
            >
              닉네임 수정하기
            </button>
          </div>
        </>
      );
    }
  }
};

export default MyPage;
