import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  // state consists of only one array which i am filling with 
  // transactions and then with help of getters i read everywhere in the app 
  state: {
    transactions: [],
    error: ""
  },
  // getters has only one method which is responsible for reading/providing state of the transactions
  getters: {
    getAllTransactions: (state) => state.transactions,
    getError: (state) => state.error,
  },
  // Actions are methods where i am calling api's and then with help of mutations i am setting the values to array 
  actions: {
    async submitForm({ commit }, formData) {
          let accountInformation = null
      const headers = {
        "Content-Type": "application/json",
      };
      const url = "https://infra.devskills.app/api/accounting/transactions";
      await axios
        .get(
          `https://infra.devskills.app/api/accounting/accounts/${formData.accountID}`
        )
        .then((res) => {
          accountInformation = res.data
          // commit("setAccountInfo", res.data);
        })
        .then((err) => commit("setError", `Error while getting response for account information with ${formData.accountID} and error is ${err}`));
        // I use post request after reading each account 
      await axios({
        method: "POST",
        url: url,
        data: {
          account_id: formData.accountID,
          amount: formData.amount,
        },
        headers: headers,
      })
        .then((res) => {
          const data = res.data
          res.data["balance"] = accountInformation.balance
          // Here i am populating the response object with one more balance inquiry property for simplicity 
          commit("setAllTransactions", res.data);
        })
        .then((err) => commit("setError", `Error while posting transaction and error is ${err}`));
    },
  },
  // Mutations are use to set value of the states here i 
  // have only one method which is pushing new object/transaction to transactions array
  mutations: {
    setAllTransactions: (state, payload) => {
      console.log(state, payload);
      state.transactions.unshift(payload);
    },
    setError: (state, payload) => state.error = payload
  },
});

export default store;
