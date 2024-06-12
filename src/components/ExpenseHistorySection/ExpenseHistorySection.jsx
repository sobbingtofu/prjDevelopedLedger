import MonthSelectSection from "./MonthSelector/MonthSelector";
import ExpenseDiagram from "./ExpenseDiagram/ExpenseDiagram";
import ExpenseLog from "./ExpenseLog/ExpenseLog";

const ExpenseHistorySection = ({currentLocalStorage}) => {
  return (
    <>
      <MonthSelectSection />
      <ExpenseDiagram />
      <ExpenseLog />
    </>
  );
};

export default ExpenseHistorySection;
