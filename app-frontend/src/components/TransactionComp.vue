<template>
  <div class="float-container">
    <div class="float-child1">
      <p class="header">Submit new transaction</p>
      <form @submit.prevent="checkForm" class="form">
        <span>Account ID</span>
        <input class="inputs" ref="account" v-model="formData.accountID" type="text" />
        <span>Amount</span>
        <input class="inputs" ref="amount" v-model="formData.amount" type="number" />
        <div class="input-div">
        </div>
        <input class="submit" value="Submit" :disabled="formData.accountID == '' || formData.amount == ''" type="submit" />
      </form>
      <div v-if="getError" class="error-div">
        <h3 class="alert">
          {{ getError }}
        </h3>
      </div>
    </div>

    <div class="float-child2">
      <p class="header">Transactions histroy</p>
  
      <div
        v-for="(transaction, index) in getAllTransactions"
        :key="index"
        class="all-transactions"
      >
      <!-- There are 2 dev's which shows the deposit or withdrawal based on the amount is (+) or (-) -->
        <div v-if="transaction.amount < 0" class="withdraw-transaction">
          <div class="transactions-cell">
          <p>Transferred ${{ transaction.amount * (-1) }} to account {{ transaction.transaction_id }}</p>
          <p>
            The current account balance <span class="">${{transaction.balance}}</span>
          </p>
        </div>
        </div>

        <div v-if="transaction.amount > 0" class="div deposit-tran">
          <div class="transactions-cell">
          <p>Transferred ${{ transaction.amount }} from account {{ transaction.transaction_id }}</p>
          <p>
            The current account balance <span class="">${{transaction.balance}}</span>
          </p>
        </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";

const count = ref(0);

export default {
  name: "TransactionsComponent",
  data() {
    return {
      formData: {
        accountID: "",
        amount: "",
      },
    };
  },
  methods: {
    ...mapActions(["fetchTransactions", "submitForm"]),
    checkForm: function () {
      this.submitForm(this.formData);
      setTimeout(() => {
        this.formData.accountID = ""
      this.formData.amount = "" 
      }, 2500);
    },
  },
  computed: {...mapGetters(["getAllTransactions", "getError"])},
};
</script>

<style scoped>

.form span {
  text-align: start;}
.float-container {
  padding: 20px;
  display: flex;
}
.form {
  padding-top: 15px;
}

.float-child1 {
  width: 35%;
  padding: 0 20px;
}
.float-child1 .header {
  text-align: start;
}
.float-child1 .form {
  display: flex;
  flex-direction: column;
}
.float-child1 .error-div {
  background: rgba(234, 37, 37, 0.722);
  border-radius: 10px;
  padding: 10px;
  color: white;
}
.float-child2 {
  width: 100%;
}
.all-transactions .transactions-cell {
  box-shadow: 0.2px 0px 2px 0.1px rgb(56, 54, 54);
  /* display: inline-flex; */
  padding: 15px;
  margin-bottom: 1rem;
  width: 90%;
  text-align: start;
}
.all-transactions .transactions-cell p {
  font-size: 16px;
  font-weight: 500;
  color: rgb(43, 42, 42);
}
.all-transactions span.plus {
  color: green;
  font-weight: bold;
}

input[type="text"] {
  margin-bottom: 1rem;
}
.float-child1 .submit {
  padding: 5px;border-radius: 10px; font-weight: bold;}
.float-child1 .submit:disabled {
  background: #7c7d7c83;
  color: rgb(255, 252, 252);
  border: 1px #949b98 solid;
  cursor: not-allowed;
  width: 60%;
  margin: 15px auto;
}
.float-child1 .submit:enabled {
  background: #41b883;
  color: #fff;
  border: 1px #41b883 solid;
  cursor: pointer;
  width: 60%;
  margin: 15px auto;
}
</style>
