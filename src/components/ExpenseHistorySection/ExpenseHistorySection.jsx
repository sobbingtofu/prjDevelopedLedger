import MonthSelectSection from "./MonthSelector/MonthSelector";
import ExpenseDiagram from "./ExpenseDiagram/ExpenseDiagram";
import ExpenseLog from "./ExpenseLog/ExpenseLog";

const ExpenseHistorySection = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <MonthSelectSection />
      <ExpenseDiagram />
      <ExpenseLog />
    </div>
  );
};

export default ExpenseHistorySection;
