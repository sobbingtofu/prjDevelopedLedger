import {RouterProvider} from "react-router-dom";
import {loggedInRouter, loggedOutRouter} from "./routes/router";
import "./App.css";
import {useLogInSignUpStore} from "./zustand/logInSignUpStore";

function App() {
  const isLoggedIn = useLogInSignUpStore((state) => state.isLoggedIn);

  return isLoggedIn ? (
    <RouterProvider router={loggedInRouter}></RouterProvider>
  ) : (
    <RouterProvider router={loggedOutRouter}></RouterProvider>
  );
}

export default App;
