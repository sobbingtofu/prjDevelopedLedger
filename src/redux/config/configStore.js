import {configureStore} from "@reduxjs/toolkit";
import handleLedger from "../modules/ledger";

const store = configureStore({
  reducer: {
    handleLedger: handleLedger,
  },
});

export default store;
