<template>
<div class="">
  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 dashboard-container">
   
    <b-container fluid class="bv-example-row col-lg-12 col-sm-12 mt-3">
      <div class="row justify-content-md-center mb-3 p-3 mb-2  text-white mb-0 dashboard-banner">
        <h4>Your dashboard </h4>
      </div>


      <b-row class="row-eq-height mt-0 mb-3">

<!-- Side colomn for clients  -->
        <div v-if="userInfo.role==='client'" id="side-column" class="col-lg-3 col-md-4 col-sm-4 pb-3 border d-flex flex-column justify-content-start align-items-center text-left">
          <div class="pt-5">
            <p>Risk profile:</p>
            <p>Number of portfolios: {{clientPortfoliosNumber}}</p>
            <p>Invested amount: {{clientTotalInvestment}}</p>
            <p>Your profit: {{clientTotalBenefit}}</p>
          </div>
        </div>

<!-- Side colomn for managers  -->
        <div v-else id="side-column" class="col-lg-3 col-md-4 col-sm-4 border d-flex flex-column justify-content-start align-items-center ">
          <div class="pt-5">
            <p>Number of portfolios: {{managerPortfoliosNumber}}</p>
            <!-- to fill this we need to populae the portfolioIds to see who is the owner -->
            <p>Total clients: {{managerTotalClients}}</p>
            <!-- We need to add the field in the model? -->
            <p>Total followers: {{managerTotalFollowers}}</p>
            <!-- Also for this we need to populate the portfolios -->
            <p>Managed funds: {{managerTotalManagedMoney}}</p>
            <div>
              <b-button type="button" class="btn btn-dark" @click="modal1IsVisible = !modal1IsVisible">
                Add a portfolio
              </b-button>

<!-- Add a portfolio: first modal  -->
              <b-modal v-model="modal1IsVisible" style="color:black" ref="modal1" :hide-footer="true">
                <form>
                  <b-alert variant="danger"  show v-if="displayAlert" >
                     Fill all the fields please
                 </b-alert>
                  <p class="text-center">
                    <strong>Portfolio informations:</strong>
                  </p>
                  <b-form-input require class="mt-2 mb-2" type="text" placeholder="Enter the portfolio name" v-model="newPortfolio.portfolioName"></b-form-input>
                  <b-form-textarea require class="mt-2 mb-2" type="text" placeholder="Enter the portfolio description" v-model="newPortfolio.description"></b-form-textarea>
                  <hr>
                  <div class="modal-footer">
                    <button class="btn btn-dark" @click.prevent="addInformations">Add the stocks</button>
                    <button class="btn btn-secondary" type="button" data-dismiss="modal" @click="closeModal1">Cancel</button>
                  </div>
                </form>
              </b-modal>
<!-- Ending Modal 1 -->
<!-- Add a portfolio:  second modal  -->
              <b-modal v-model="modal2IsVisible" style="color:black" ref="modal2" :hide-footer="true">
                <form @submit.stop.prevent="submitModal">
                  <p class="text-center">
                    <strong>Stock:</strong>
                  </p>
                  <b-form-input class="mt-2 mb-2" type="text" placeholder="Enter the stock name" v-model="stock.stockName"></b-form-input>
                  <b-form-input class="mt-2 mb-2" type="text" placeholder="Enter the stock value" v-model="stock.stockValue"></b-form-input>

                  <b-form-input class="mt-2 mb-2" type="text" placeholder="Enter the holding value" v-model="stock.holdingValue"></b-form-input>
                  
                    <div>
                      <div class="input-group ">
                      <date-picker v-model="stock.stockStartingDate" placeholder="Enter the starting date" :config="config">
                      </date-picker>
                      <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon1">
                        <span class="oi oi-calendar"></span>
                       </span>
                    </div>
                   </div>                   
                    </div>
                    
                 
                 <br>
                <br>
                  <b-button variant="outline-dark" size="sm" @click.prevent="addSingleStock"> Add one more stock</b-button>
                <br>
                   <br>
                  
                  <div class="modal-footer">
                    <button class="btn btn-dark">Save</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModal2">Close</button>
                  </div>
                </form>

              </b-modal>
<!-- Ending Modal 2 -->
            </div>



          </div>
        </div>



        <div id="card-column" class="col-lg-9 col-sm-12 pt-5 d-flex flex-row  align-items-center justify-content-center flex-wrap">

          <PortfolioGenericCard v-if="userInfo.role==='manager'" v-for="portfolio in userInfo.managerPortfolios" 
          :key="portfolio.id" 
          :portfolio="portfolio" 
          :totalInvestors="getPortfolioTotalClients(portfolio)"
          :totalFollowers="getPortfolioTotalFollowers(portfolio)"
          :averageRate="calculateAverageRating(portfolio.ratings)"
           v-on:rate="addRating"  /> 

         <PortfolioGenericCard v-if="userInfo.role==='client'" v-for="portfolio in userInfo.customerPortfoliosOwned" 
         :key="portfolio.id" 
         :portfolio="portfolio" 
          :totalInvestors="getPortfolioTotalClients(portfolio)"
          :totalFollowers="getPortfolioTotalFollowers(portfolio)"
         :averageRate="calculateAverageRating(portfolio.ratings)" 
         v-on:rate="addRating" /> 
          


        </div>
      </b-row>
    </b-container>


  </div>
</div>
</template>

<script>
import { getUser } from "../api";
import { getUserAndPopulate } from "../api";
import { createPortfolio } from "../api";
import { addRating } from "../api";
import StarRating from "vue-star-rating";
import datePicker from "vue-bootstrap-datetimepicker";
import PortfolioGenericCard from "../components/PortfolioGenericCard";

export default {
  components: {
    StarRating,
    datePicker,
    PortfolioGenericCard
  },

  data() {
    return {
      //information for both client and manager
      userInfo: {},
      config: {
        format: "YYYY-MM-DD",
        useCurrent: false
      },
      //information for managers
      modal1IsVisible: false,
      modal2IsVisible: false,
      displayAlert: false,
      managerPortfoliosNumber: "",
      managerTotalClients: "",
      managerTotalFollowers: "",
      managerTotalManagedMoney: "",
      //information for portfolios
      stock: {},
      newStocks: [],
      newPortfolio: {},
      averageRate: "",
      portfolioId: "",
      portfolioTotalClients: "",
      portfolioTotalFollowers: "",
      //information for the client
      clientPortfoliosNumber: "",
      clientTotalInvestment: "",
      clientTotalBenefit: ""
    };
  },
  created() {
    const userId = this.$root.user.id;
    getUserAndPopulate(userId).then(userInfo => {
      this.userInfo = userInfo;
      //if he is a manager
      if (userInfo.role === "manager") {
        this.userInfo.managerPortfolios.forEach(item => {
          this.averageRate = this.calculateAverageRating(item.ratings);
        });

        this.managerPortfoliosNumber = this.userInfo.managerPortfolios.length;
        this.managerTotalClients = this.getManagerTotalClients(this.userInfo);
        this.managerTotalFollowers = this.getManagerTotalFollowers(
          this.userInfo
        );
        this.managerTotalManagedMoney = this.getManagerTotalManagedMoney(
          this.userInfo
        );
      } else if (userInfo.role === "client") {
        //if he is a client
        this.clientPortfoliosNumber = userInfo.customerPortfoliosOwned.length;
        (this.clientTotalInvestment = this.getClientTotalInvestment(
          this.userInfo
        )),
          (this.clientTotalBenefit = "");
      }
    });
  },
  methods: {
    getFields(input, field) {
      var output = [];
      for (var i = 0; i < input.length; i++) output.push(input[i][field]);
      return output;
    },

    calculateAverageRating(item) {
      this.averageRate = 0;
      if (item.length > 0) return item.reduce((a, b) => a + b, 0) / item.length;
      else return 0;
    },

    addRating(payload) {
      console.log("payload ", payload);
      this.rate = parseInt(payload.rate);
      this.rate = payload.rate;
      console.log("payload rate in client", payload.rate);
      this.portfolioId = payload.portfolioId;
      console.log("portfolioID ", this.portfolioId);
      addRating(this.rate, this.portfolioId)
        .then(() => $router.push("/dashboard"))
        .catch(err => (this.err = err));
    },

    getManagerTotalClients(manager) {
      if ((manager.managerPortfolios.investors = [])) return 0;
      else {
        return manager.managerPortfolios.investors.reduce((a, b) => a + b);
      }
    },

    getManagerTotalFollowers(manager) {
      if ((manager.managerPortfolios.followers = [])) return 0;
      else {
        return manager.managerPortfolios.followers.reduce((a, b) => a + b);
      }
    },

    getManagerTotalManagedMoney(manager) {
      let movements = this.getFields(manager.managerPortfolios, "movements");
      if ((manager.managerPortfolios.Movement = [])) return 0;
      else {
        return movemets.reduce((a, b) => a.amountOfMoney + b.amountOfMoney);
      }
    },

    getPortfolioTotalClients(item) {
      console.log(item.investors.length);
      return item.investors.length;
    },

    getPortfolioTotalFollowers(item) {
      return item.followers.length;
    },

    getClientTotalInvestment(client) {
      if (
        client.customerPortfoliosOwned === [] ||
        client.customerPortfoliosOwned.movements === []
      )
        return 0;
      let movements = this.getFields(
        client.customerPortfoliosOwned,
        "movements"
      );
      let total = movements.reduce(
        (a, b) => a.amountOfMoney + b.amountOfMoney,
        0
      );
      console.log(total);
      if (total) return total;
      else return 0;
    },

    getClientTotalBenefit(client) {},

    // Modal 1 buttons
    closeModal1() {
      this.modal1IsVisible = false;
      this.newPortfolio.portfolioName = "";
      this.newPortfolio.description = "";
    },
    addInformations() {
      if (this.newPortfolio.portfolioName && this.newPortfolio.description) {
        this.modal1IsVisible = false;
        this.$refs.modal2.show();
      } else {
        this.newPortfolio.portfolioName = "";
        this.newPortfolio.description = "";
        this.$refs.modal1.show();
        this.displayAlert = true;
      }
    },
    //Modal2 buttons
    closeModal2() {
      this.modal2IsVisible = false;
      this.stock = {};
      this.newStocks = [];
      this.newPortfolio.portfolioName = "";
      this.newPortfolio.description = "";
    },
    addSingleStock() {
      const lastUpdatedDate = this.stock.stockStartingDate;
      this.stock = {
        ...this.stock,
        lastUpdatedDate
      };
      this.newStocks.push(this.stock);
      this.stock = {};
      this.modal2IsVisible = true;
    },
    submitModal() {
      this.addSingleStock();
      this.modal2IsVisible = false;
      const newStocks = this.newStocks;
      const newPortfolio = {
        ...this.newPortfolio,
        stocks: newStocks
      };
      createPortfolio(newPortfolio)
        .then(() => {
          this.$router.push("/dashboard");
        })
        .catch(err => {
          this.error = err;
        });
      this.newStocks = [];
      this.newPortfolio.portfolioName = "";
      this.newPortfolio.description = "";
    }
  }
};
</script>

<style>
#title {
  height: 50px;
  color: rgb(246, 250, 252);
  background-color: rgba(2, 14, 26, 0.884);
  padding-top: 5px;
}

#side-column {
  color: white;
  background-color: rgba(96, 100, 114, 0.623);
}

#card-column {
  overflow-y: auto;
  height: 100%;
  background-color: rgba(248, 251, 252, 0.1);
}

.row-eq-height {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.dashboard-container {
  padding-left: 0;
  padding-right: 0;
}

.dashboard-banner {
  padding-bottom: 0;
  margin-top: -16px !important;
  margin-bottom: 0 !important;
  background-color: #33495c;
}
</style>