<template>
<div class="container">
<div class="row text-center justify-content-center">
 <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12">
<complete-profile v-if="this.$root.user.role!=='manager' && this.userInfo.riskProfileCompleted===false"></complete-profile>
<invest v-if="this.$root.user.role!=='manager' && this.userInfo.riskProfileCompleted===true"
          :balance="userInfo.accountBalance"
          v-on:invest="addMoneyToPortfolio"></invest>
</div>
</div>
</div>
</template>
<script>
import { addMoney } from "../api";
import { getPortfolio } from "@/api";
import { getUser } from "@/api";
import Invest from "@/components/Invest.vue";
import CompleteProfile from "@/components/CompleteProfile.vue";
export default {
  name: "payment",
  components: {
    Invest,
    CompleteProfile
  },
  data() {
    return {
      userInfo: {},
      portfolioId: ""
    };
  },
  created() {
    console.log(this.$route.params.portfolioId);
    this.portfolioId = this.$route.params.portfolioId;
    getUser(this.$root.user.id).then(user => {
      this.userInfo = user;
    });
  },
  methods: {
    addMoneyToPortfolio(payload) {
      this.quantity = parseInt(payload.quantity);
      this.clientId = this.userInfo._id;
      console.log("T want to add this quantity of Money ", this.quantity);
      console.log("by this user ", this.clientId);
      console.log("to this portfolio", this.portfolioId);
      addMoney(this.portfolioId, this.clientId, this.quantity)
        .then(() => {
          console.log("added Money");
          this.$router.push("/search");
        })
        .catch(err => {
          console.log(err);
          this.err = err;
        });
    }
  }
};
</script>
