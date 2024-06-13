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

  // const response = await axios.get("http://localhost:4000/todos");
  // return response.data;
};
