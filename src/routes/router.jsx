import {createBrowserRouter} from "react-router-dom";
import MainPage from "../pages/MainPage";
import ExpenseEditPage from "../pages/ExpenseEditPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage></MainPage>,
  },
  {
    path: "/expenseEdit/:id",
    element: <ExpenseEditPage></ExpenseEditPage>,
  },
]);

export default router;
