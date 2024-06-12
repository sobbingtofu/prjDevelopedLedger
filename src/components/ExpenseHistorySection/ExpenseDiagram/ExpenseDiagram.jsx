import {useSelector} from "react-redux";
import {StyledArea} from "../../SharedStyleComponents";
import {
  ExpenseLabel,
  ExpenseDiagramContainer,
  ExpenseDiagramSegment,
  FootnoteContainer,
  FootnoteItem,
  FootnoteColorbox,
} from "./ExpenseDiagramStyledComps";

const ExpenseDiagram = () => {
  const selectedMonth = useSelector((state) => {
    return state.handleLedger.selectedMonth;
  });

  const currentLedgers = useSelector((state) => {
    return state.handleLedger.ledgers;
  });

  const tmpSelectedMonthLedger = currentLedgers.filter((ledgerItem) => {
    return parseInt(ledgerItem.date.slice(5, 7)) == parseInt(selectedMonth);
  });

  let totalExpenseAmount = 0;
  tmpSelectedMonthLedger.forEach((ledgerItem) => {
    totalExpenseAmount += parseInt(ledgerItem.money);
  });

  const SelectedMonthLedger = tmpSelectedMonthLedger.map((ledgerItem) => {
    return {...ledgerItem, ...{expenseRatio: 100 * (ledgerItem.money / totalExpenseAmount).toFixed(3)}};
  });

  const SelectedMonthLedgerGroupedByCategory = [];

  SelectedMonthLedger.forEach((ledgerItem) => {
    if (SelectedMonthLedgerGroupedByCategory.length === 0) {
      const tmp = {
        category: ledgerItem.category,
        totalExpense: parseInt(ledgerItem.money),
        totalExpenseRatio: parseFloat(ledgerItem.expenseRatio).toFixed(3),
      };
      SelectedMonthLedgerGroupedByCategory.push(tmp);
    } else {
      const targetIndex = SelectedMonthLedgerGroupedByCategory.findIndex((groupedLedgerItem) => {
        return groupedLedgerItem.category === ledgerItem.category;
      });

      if (targetIndex === -1) {
        const tmpObj = {
          category: ledgerItem.category,
          totalExpense: parseInt(ledgerItem.money),
          totalExpenseRatio: parseFloat(ledgerItem.expenseRatio).toFixed(3),
        };
        SelectedMonthLedgerGroupedByCategory.push(tmpObj);
      } else {
        SelectedMonthLedgerGroupedByCategory[targetIndex].totalExpense += parseInt(ledgerItem.money);
        SelectedMonthLedgerGroupedByCategory[targetIndex].totalExpenseRatio += parseFloat(
          ledgerItem.expenseRatio
        ).toFixed(3);
      }
    }
  });

  SelectedMonthLedgerGroupedByCategory.sort((a, b) => {
    return b.totalExpenseRatio - a.totalExpenseRatio;
  });

  const DIAGRAM_LIMITER = 4;

  const overflowAmount = SelectedMonthLedgerGroupedByCategory.length - DIAGRAM_LIMITER;

  if (overflowAmount > 0) {
    const extraLedger = {category: "기타", totalExpense: 0, totalExpenseRatio: 0};
    for (let i = 0; i < overflowAmount; i++) {
      const tmpObj = SelectedMonthLedgerGroupedByCategory.pop();
      extraLedger.totalExpense += tmpObj.totalExpense;
      extraLedger.totalExpenseRatio += tmpObj.totalExpenseRatio;
    }
    SelectedMonthLedgerGroupedByCategory.push(extraLedger);
  }

  if (selectedMonth !== 0) {
    return (
      <StyledArea>
        <ExpenseLabel>{selectedMonth}월 총 지출</ExpenseLabel>
        <ExpenseDiagramContainer>
          {SelectedMonthLedgerGroupedByCategory.map((ledgerItem, index) => {
            return (
              <ExpenseDiagramSegment
                $expenseRatio={ledgerItem.totalExpenseRatio}
                key={index}
                $index={index}
              ></ExpenseDiagramSegment>
            );
          })}
        </ExpenseDiagramContainer>
        <FootnoteContainer>
          {SelectedMonthLedgerGroupedByCategory.map((ledgerItem, index) => {
            return (
              <FootnoteItem key={index}>
                <FootnoteColorbox $index={index}></FootnoteColorbox>
                <p>{`${ledgerItem.category}: ${ledgerItem.totalExpense}원 (${parseFloat(
                  ledgerItem.totalExpenseRatio
                ).toFixed(1)}%)`}</p>
              </FootnoteItem>
            );
          })}
        </FootnoteContainer>
      </StyledArea>
    );
  } else {
    return (
      <StyledArea>
        <ExpenseLabel>지출 내역을 조회할 달을 선택해주세요</ExpenseLabel>
        <ExpenseDiagramContainer></ExpenseDiagramContainer>
      </StyledArea>
    );
  }
};

export default ExpenseDiagram;
