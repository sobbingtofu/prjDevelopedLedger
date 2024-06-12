import {useSelector} from "react-redux";
import {StyledArea} from "../../SharedStyleComponents";
import {ExpenseLogItem, LogDate, LogDescription, LogMoney} from "./ExpenseLogStyledComps";

const ExpenseLog = () => {
  const selectedMonth = useSelector((state) => {
    return state.handleLedger.selectedMonth;
  });

  const currentLedgers = useSelector((state) => {
    return state.handleLedger.ledgers;
  });

  const SelectedMonthLedger = currentLedgers.filter((ledgerItem) => {
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
};

export default ExpenseLog;
