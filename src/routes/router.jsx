import {createBrowserRouter} from "react-router-dom";
import MainPage from "../pages/MainPage";
import ExpenseEditPage from "../pages/ExpenseEditPage";

export const loggedInRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/expenseEdit/:id",
    element: <ExpenseEditPage />,
  },
]);

export const loggedOutRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
]);
