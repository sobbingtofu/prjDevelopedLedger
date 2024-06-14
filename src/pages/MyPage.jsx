import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {changeUserProfile, getUserData} from "../axios/authApi";
import {useLogInSignUpStore} from "../zustand/logInSignUpStore";
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

const MyPage = () => {
  const nicknameInputRef = useRef(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {data: currentUserData, isPending, isError} = useQuery({queryKey: ["currentUserData"], queryFn: getUserData});
  const [profileImg, setProfileImg] = useState(currentUserData?.data.avatar);

  const {mutate: changeNicknameInServer} = useMutation({
    mutationFn: changeUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUserData"]);
      alert("프로필 변경 성공");
      navigate("/");
    },
  });

  const shiftToLogOut = useLogInSignUpStore((state) => state.shiftToLogOut);

  const handleEditNicknameBtn = () => {
    const editConfirmation = confirm("프로필을 변경할까요?");
    if (editConfirmation) {
      const userProfileFormData = new FormData();
      userProfileFormData.append("nickname", nicknameInputRef.current.value);
      userProfileFormData.append("avatar", profileImg);

      changeNicknameInServer(userProfileFormData);
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
            <img
              src={currentUserData.data.avatar ? currentUserData.data.avatar : "src/assets/default-profile.jpg"}
              className="w-80 h-80"
            ></img>
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
            <div>
              <StyledLabel htmlFor="avatar" className="mb-2 px-4">
                프로필 이미지
              </StyledLabel>
              <StyledInput type="file" accept="image/*" onChange={(event) => setProfileImg(event.target.files[0])} />
            </div>
            <button
              onClick={handleEditNicknameBtn}
              className="text-lg font-black px-4 py-2 rounded-md border-solid border-2 border-slate-600 bg-emerald-100 transition-all hover:transition-all hover:bg-emerald-500"
            >
              프로필 수정하기
            </button>
          </div>
        </>
      );
    }
  }
};

export default MyPage;
