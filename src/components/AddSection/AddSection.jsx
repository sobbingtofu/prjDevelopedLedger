import {StyledRowFlexContainer, StyledArea} from "../SharedStyleComponents";
import {StyledAddItem, StyledInput, StyledLabel, SaveButton} from "./AddSectionStyledComps";
import {v4 as uuidv4} from "uuid";
import {useRef} from "react";
import {postLedger} from "../../axios/ledgerApi";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {getUserData} from "../../axios/authApi";
import {useLogInSignUpStore} from "../../zustand/logInSignUpStore";

const AddSection = () => {
  const dateInputRef = useRef(null);
  const categoryInputRef = useRef(null);
  const moneyInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  const queryClient = useQueryClient();
  const shiftToLogOut = useLogInSignUpStore((state) => state.shiftToLogOut);

  const {mutate: postLedgerToServer} = useMutation({
    mutationFn: postLedger,
    onSuccess: () => {
      alert("데이터 삽입이 성공했습니다.");
      queryClient.invalidateQueries(["fetchCurrentLedgers"]);
    },
  });

  const handleClickSaveBtn = async (event) => {
    const id = uuidv4();
    await getUserData().then((response) => {
      console.log(response);
      if (response.statusText !== "OK") {
        shiftToLogOut();
        localStorage.removeItem("accessToken");
        alert(response.data.message);
      } else {
        const newLedgerItem = {
          date: dateInputRef.current.value,
          category: categoryInputRef.current.value,
          money: moneyInputRef.current.value,
          description: descriptionInputRef.current.value,
          id: id,
          createdBy: response.data.id,
        };
        postLedgerToServer(newLedgerItem);
      }
    });
  };

  return (
    <StyledArea>
      <StyledRowFlexContainer>
        <StyledAddItem>
          <StyledLabel>날짜</StyledLabel>
          <StyledInput type="date" id="date" ref={dateInputRef} />
        </StyledAddItem>
        <StyledAddItem>
          <StyledLabel>항목</StyledLabel>
          <StyledInput id="category" ref={categoryInputRef} />
        </StyledAddItem>
        <StyledAddItem>
          <StyledLabel>금액</StyledLabel>
          <StyledInput type="number" id="money" ref={moneyInputRef} />
        </StyledAddItem>
        <StyledAddItem>
          <StyledLabel>내용</StyledLabel>
          <StyledInput id="description" ref={descriptionInputRef} />
        </StyledAddItem>
        <SaveButton onClick={handleClickSaveBtn}>저장</SaveButton>
      </StyledRowFlexContainer>
    </StyledArea>
  );
};

export default AddSection;
