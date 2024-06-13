import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/config/configStore.js";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
);

// [전역관리]: 선택 월 정보 및 관리 함수  => RTK
// [전역관리]: 로그인 상태 정보 및 관리 함수, 회원가입 시 입력한 ID (로그인으로 이동 시 자동 입력 용도) => Zustand
// [서버 통신]: 회원가입, 로그인, 회원 정보 가져오기 => axisos
// [서버 통신 비동기 작업 전역관리]: JSON 서버와 통신하며 ledger item CRUD 작업 => Tanstack Query + axios
