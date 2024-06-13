import {useSelector} from "react-redux";
import {StyledArea} from "../../SharedStyleComponents";
import {ExpenseLogItem, LogDate, LogDescription, LogMoney} from "./ExpenseLogStyledComps";
import {useQuery} from "@tanstack/react-query";
import {fetchLedgers} from "../../../axios/ledgerApi";

const ExpenseLog = () => {
  const selectedMonth = useSelector((state) => {
    return state.handleLedger.selectedMonth;
  });

  const {
    data: fetchedCurrentLedgers,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["fetchCurrentLegers"],
    queryFn: fetchLedgers,
  });

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

    if (SelectedMonthLedger.length === 0) {
      return <StyledArea>비어있음</StyledArea>;
    } else {
      return (
        <StyledArea>
          {SelectedMonthLedger.map((ledgerItem) => {
            return (
              <ExpenseLogItem key={ledgerItem.id} to={`/expenseEdit/${ledgerItem.id}`}>
                <div>
                  <LogDate>{ledgerItem.date}</LogDate>
                  <LogDescription>{`${ledgerItem.category}:    ${ledgerItem.description}`}</LogDescription>
                </div>
                <LogMoney>{`${ledgerItem.money}원`}</LogMoney>
              </ExpenseLogItem>
            );
          })}
        </StyledArea>
      );
    }
  }
};

export default ExpenseLog;
