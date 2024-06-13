import {useSelector} from "react-redux";
import {StyledArea} from "../../SharedStyleComponents";
import {ExpenseLogItem, LogDate, LogDescription, LogMoney} from "./ExpenseLogStyledComps";
import {useQuery} from "@tanstack/react-query";
import {fetchLedgers} from "../../../axios/ledgerApi";
import {useNavigate} from "react-router-dom";
import {getUserData} from "../../../axios/authApi";
import {useLogInSignUpStore} from "../../../zustand/logInSignUpStore";

const ExpenseLog = () => {
  const navigate = useNavigate();

  const selectedMonth = useSelector((state) => {
    return state.handleLedger.selectedMonth;
  });

  const {
    data: fetchedCurrentLedgers,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["fetchCurrentLedgers"],
    queryFn: fetchLedgers,
  });

  const shiftToLogOut = useLogInSignUpStore((state) => state.shiftToLogOut);

  if (isPending) {
    return <>로딩 중...</>;
  } else if (isError) {
    return <>오류 발생...</>;
  } else {
    const SelectedMonthLedger = fetchedCurrentLedgers.filter((ledgerItem) => {
      return parseInt(ledgerItem.date.slice(5, 7)) == parseInt(selectedMonth);
    });

    SelectedMonthLedger.sort((a, b) => {
      return parseInt(a.date.replace(/-/g, "")) - parseInt(b.date.replace(/-/g, ""));
    });

    const handleLedgerClick = async (event) => {
      await getUserData().then((response) => {
        if (response.statusText !== "OK") {
          shiftToLogOut();
          localStorage.removeItem("accessToken");
          alert(response.data.message);
        } else {
          const currentLedgerItem = fetchedCurrentLedgers.find((ledgerItem) => {
            return ledgerItem.id === event.target.id;
          });
          if (response.data.id === currentLedgerItem.createdBy) {
            navigate(`/expenseEdit/${event.target.id}`);
          } else {
            alert("수정 및 삭제 권한이 없습니다");
          }
        }
      });
    };

    if (SelectedMonthLedger.length === 0) {
      return <StyledArea>비어있음</StyledArea>;
    } else {
      return (
        <StyledArea>
          {SelectedMonthLedger.map((ledgerItem) => {
            return (
              <ExpenseLogItem id={ledgerItem.id} key={ledgerItem.id} onClick={handleLedgerClick}>
                <div>
                  <LogDate>{ledgerItem.date}</LogDate>
                  <LogDescription>{`${ledgerItem.category}:    ${ledgerItem.description} `}</LogDescription>
                </div>
                <div className="flex gap-8 w-72 justify-between">
                  <p>{`[지출 책임자: ${ledgerItem.createdBy}]`}</p>
                  <LogMoney>{`${ledgerItem.money}원`}</LogMoney>
                </div>
              </ExpenseLogItem>
            );
          })}
        </StyledArea>
      );
    }
  }
};

export default ExpenseLog;
