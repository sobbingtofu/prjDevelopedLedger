import {RouterProvider} from "react-router-dom";
import {loggedInRouter, loggedOutRouter} from "./routes/router";
import "./App.css";

function App() {
  const isLoggedIn = false;

  return isLoggedIn ? (
    <RouterProvider router={loggedInRouter}></RouterProvider>
  ) : (
    <RouterProvider router={loggedOutRouter}></RouterProvider>
  );
}

export default App;
