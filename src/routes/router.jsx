import {createBrowserRouter} from "react-router-dom";
import MainPage from "../pages/MainPage";
import ExpenseEditPage from "../pages/ExpenseEditPage";
import LogInPage from "../pages/LogInPage";
import Redirect from "../pages/Redirect";
import SignInPage from "../pages/SignInPage";

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
    element: <Redirect />,
  },
  {
    path: "/logIn",
    element: <LogInPage />,
  },
  {
    path: "/signIn",
    element: <SignInPage />,
  },
  {
    path: "/expenseEdit/:id",
    element: <Redirect />,
  },
]);
