import {StyledRowFlexContainer, StyledArea} from "../SharedStyleComponents";
import {StyledAddItem, StyledInput, StyledLabel, SaveButton} from "./AddSectionStyledComps";

import {v4 as uuidv4} from "uuid";
import {useDispatch} from "react-redux";
import {ADD_LEDGER} from "../../redux/modules/ledger";
import {useRef} from "react";

const AddSection = () => {
  const dispatch = useDispatch();

  const dateInputRef = useRef(null);
  const categoryInputRef = useRef(null);
  const moneyInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  const handleClickSaveBtn = (event) => {
    const id = uuidv4();
    const newLedgerItem = {
      date: dateInputRef.current.value,
      category: categoryInputRef.current.value,
      money: moneyInputRef.current.value,
      description: descriptionInputRef.current.value,
      id: id,
    };
    dispatch(ADD_LEDGER(newLedgerItem));
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
