import axios from "axios";

const LEDGER_BASE_URL = "http://localhost:5000";

const ledgerApi = axios.create({
  baseURL: LEDGER_BASE_URL,
});

export const fetchLedgers = async () => {
  try {
    const path = "/ledgers";
    const response = await ledgerApi.get(path);

    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const postLedger = async (ledgerItem) => {
  try {
    const path = "/ledgers";
    const response = await ledgerApi.post(path, ledgerItem);
    return response.data;
  } catch (error) {
    return error.response;
  }
};
