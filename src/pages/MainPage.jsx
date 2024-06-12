import "../App.css";

import ExpenseHistorySection from "../components/ExpenseHistorySection/ExpenseHistorySection";
import AddSection from "../components/AddSection/AddSection";

function MainPage() {
  return (
    <>
      <h1>지출 입력</h1>
      <AddSection />
      <h1>올해 지출 내역</h1>
      <ExpenseHistorySection />
    </>
  );
}

export default MainPage;
