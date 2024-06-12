import {createSlice} from "@reduxjs/toolkit";

const initialLedgers = JSON.parse(localStorage.getItem("ledger") || "[]");

const initialLedgerState = {
  ledgers: initialLedgers,
  selectedMonth: 0,
  currentLedgerItem: {
    date: "",
    category: "",
    money: 0,
    description: "",
    id: "",
  },
};

const handleLedger = createSlice({
  name: "handleLedger",
  initialState: initialLedgerState,
  reducers: {
    SET_SELECTED_MONTH: (state, action) => {
      state.selectedMonth = action.payload.month;
    },
    ADD_LEDGER: (state, action) => {
      state.ledgers = [...state.ledgers, action.payload];
      localStorage.setItem("ledger", JSON.stringify([...state.ledgers]));
    },

    APPLY_EDITED_LEDGER: (state, action) => {
      const editedLedger = action.payload;

      const currentLedgerIndex = state.ledgers.findIndex((ledgerItem) => {
        return ledgerItem.id == action.payload.id;
      });

      state.ledgers.splice(currentLedgerIndex, 1, editedLedger);
      localStorage.setItem("ledger", JSON.stringify([...state.ledgers]));
    },

    DELETE_LEDGER: (state, action) => {
      const currentLedgerIndex = state.ledgers.findIndex((ledgerItem) => {
        return ledgerItem.id == action.payload.id;
      });
      console.log(currentLedgerIndex);
      state.ledgers.splice(currentLedgerIndex, 1);
      localStorage.setItem("ledger", JSON.stringify([...state.ledgers]));
    },
  },
});

export const {SET_SELECTED_MONTH, ADD_LEDGER, APPLY_EDITED_LEDGER, DELETE_LEDGER} = handleLedger.actions;
export default handleLedger.reducer;
