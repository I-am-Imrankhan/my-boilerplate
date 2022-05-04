import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    transactions: [],
    accountInfo: {},
    eachPostInfo: {},
  },
  getters: {
    getAllTransactions: (state) => state.transactions,
  },
  actions: {
    async fetchTransactions({ commit }) {
      const response = await axios.get(
        "https://infra.devskills.app/api/accounting/transactions"
      );
      console.log(response.data);
      // commit("setAllTransactions", response.data);
    },
    async submitForm({ commit }, formData) {
      const headers = {
        "Content-Type": "application/json",
      };
      // console.log(formData.accountID, formData.amount);
      const url = "https://infra.devskills.app/api/accounting/transactions";
      let response2 = await axios
      .get(
        `https://infra.devskills.app/api/accounting/accounts/${formData.accountID}`
        )
        .then((res) => {
          commit("setAccountInfo", res.data);
        })
        .then((err) => console.log(err));
        let response1 = await axios({
          method: "POST",
          url: url,
          data: {
            account_id: formData.accountID,
            amount: formData.amount,
          },
          headers: headers,
        }).then((res) => {
          commit("setEachTransactionInfo", res.data)
          .then((err) =>
            console.log(err)
          );
          console.log("post Response ", res);
        });
      //   function(response) {
      //   console.log("2 ",response.data.account_id, response.data.amount, response.data.transaction_id)
      //   const transactionId = response.data.transaction_id
      //   /* const url = `https://infra.devskills.app/api/accounting/accounts/${response.data.transaction_id}`
      //   console.log("yes ",transactionId, url)
      //   const response = axios.get(url)
      //   if(response) {console.log("account response: ", response)}
      //   else {
      //     console.log("account response error: ")
      //   }
      //   if(response.data.transaction_id != null) {
      //   } */
      //   commit("setNewTransition", response.data)
      //   return response
      // }
      //   )
      // .then((error) => console.log("error-------", error));
    },
    findAccount(transactionId) {
      console.log(transactionId);
      const url = "https://infra.devskills.app/api/accounting/accounts";
      const response = axios.get(url + transactionId);
      if (response !== null || response !== undefined) {
        console.log("account response: ", response);
      } else {
        console.log("account response error: ");
      }
      /* .then(response => console.log("account response: ", response))
      .then(error =>  console.log("response error. ", error)) */
    },
  },
  mutations: {
    setAllTransactions: (state, allTransactions) => {
      //console.log(state, allTransactions);
      state.transactions = allTransactions;
    },
    setNewTransition: (state, newTransition) => {
      state.transactions.unshift(newTransition);
    },
    setEachTransactionInfo: (state, payload) => {
      console.log(state, payload);
      state.eachPostInfo = payload;
    },
    setAccountInfo: (state, payload) => {
      console.log(state, payload);
      state.accountInfo = payload;
    },
  },
});

export default store;
