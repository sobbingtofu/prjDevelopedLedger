import {createBrowserRouter} from "react-router-dom";
import MainPage from "../pages/MainPage";
import ExpenseEditPage from "../pages/ExpenseEditPage";
import LogInPage from "../pages/LogInPage";
import Redirect from "../pages/Redirect";
import SignInPage from "../pages/SignInPage";
import DefaultLayout from "../layout/DefaultLayout";
import MyPage from "../pages/MyPage";

export const loggedInRouter = createBrowserRouter([
  {
    element: <DefaultLayout></DefaultLayout>,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/expenseEdit/:id",
        element: <ExpenseEditPage />,
      },
      {
        path: "/myPage",
        element: <MyPage />,
      },
      {
        path: "/logIn",
        element: <Redirect />,
      },
      {
        path: "/signIn",
        element: <Redirect />,
      },
    ],
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
