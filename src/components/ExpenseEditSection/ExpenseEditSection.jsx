import React, {useEffect, useRef, useState} from "react";
import {StyledArea} from "../SharedStyleComponents";
import {
  StyledEditInput,
  StyledEditors,
  StyledEditLabel,
  EditBtn,
  DeleteBtn,
  GoBackBtn,
  StyledBtnContainer,
} from "./ExpenseEditSectionStyledComps";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {APPLY_EDITED_LEDGER, DELETE_LEDGER} from "../../redux/modules/ledger";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteLedger, fetchLedgers, patchLedger} from "../../axios/ledgerApi";

const ExpenseEditSection = () => {
  const params = useParams().id;

  const navigate = useNavigate();

  const dateInputRef = useRef(null);
  const categoryInputRef = useRef(null);
  const moneyInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  const queryClient = useQueryClient();

  const {
    data: currentLedgers,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["fetchCurrentLedgers"],
    queryFn: fetchLedgers,
  });

  const {mutate: patchLedgerToServer} = useMutation({
    mutationFn: patchLedger,
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchCurrentLedgers"]);
    },
  });

  const {mutate: deleteLedgerInServer} = useMutation({
    mutationFn: deleteLedger,
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchCurrentLedgers"]);
    },
  });

  if (isPending) {
    return <div>로딩중입니다...</div>;
  } else if (isError) {
    return <div>데이터 조회 중 오류가 발생했습니다.</div>;
  } else {
    const currentLedgerItem = currentLedgers.find((ledgerItem) => {
      return ledgerItem.id === params;
    });
    const handleBtnClick = (event) => {
      if (event.target.id === "edit") {
        const editConfirmation = confirm("지출 내역을 수정할까요?");
        if (editConfirmation) {
          const editedLedgerItem = {
            id: params,
            category: categoryInputRef.current.value,
            date: dateInputRef.current.value,
            money: moneyInputRef.current.value,
            description: descriptionInputRef.current.value,
            createdBy: currentLedgerItem.createdBy,
          };
          patchLedgerToServer(editedLedgerItem);
          alert("수정되었습니다");
          navigate("/");
        }
      } else {
        const deleteConfirmation = confirm("지출 내역을 삭제할까요?");
        if (deleteConfirmation) {
          deleteLedgerInServer(params);
          navigate("/");
        }
      }
    };
    console.log(currentLedgerItem);
    return (
      <>
        <h1 className="w-920 text-start font-black text-xl mb-4">지출 내역 수정</h1>
        <StyledArea>
          <StyledEditors>
            <StyledEditLabel>날짜</StyledEditLabel>
            <StyledEditInput
              id="date"
              type="date"
              defaultValue={currentLedgerItem.date}
              ref={dateInputRef}
            ></StyledEditInput>
          </StyledEditors>
          <StyledEditors>
            <StyledEditLabel>항목</StyledEditLabel>
            <StyledEditInput
              id="category"
              defaultValue={currentLedgerItem.category}
              ref={categoryInputRef}
            ></StyledEditInput>
          </StyledEditors>
          <StyledEditors>
            <StyledEditLabel>금액</StyledEditLabel>
            <StyledEditInput
              id="money"
              type="number"
              defaultValue={currentLedgerItem.money}
              ref={moneyInputRef}
            ></StyledEditInput>
          </StyledEditors>
          <StyledEditors>
            <StyledEditLabel>내용</StyledEditLabel>
            <StyledEditInput
              id="description"
              defaultValue={currentLedgerItem.description}
              ref={descriptionInputRef}
            ></StyledEditInput>
          </StyledEditors>
          <StyledBtnContainer>
            <EditBtn id="edit" onClick={handleBtnClick}>
              수정
            </EditBtn>
            <DeleteBtn id="delete" onClick={handleBtnClick}>
              삭제
            </DeleteBtn>
            <GoBackBtn id="go-back" to={"/"}>
              뒤로가기
            </GoBackBtn>
          </StyledBtnContainer>
        </StyledArea>
      </>
    );
  }
};

export default ExpenseEditSection;
