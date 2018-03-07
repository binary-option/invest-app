<template>
  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
    <pre>{{userInfo}}</pre>
   
    <b-container fluid class="bv-example-row">

      <div class="row justify-content-md-center mb-3 p-3 mb-2 bg-dark text-white mb-0">
        <h3>{{$root.user.name}} dashboard </h3>
      </div>


      <b-row class="row-eq-height mt-0">

<!-- Side colomn for clients  -->
        <div v-if="userInfo.role==='client'" id="side-column" class="col-lg-3 col-sm-12 pb-3 border d-flex flex-column justify-content-start align-items-center  ">
          <div class="pt-5">
            <p>Risk profile:</p>
            <p>Number of portfolios: {{clientPortfoliosNumber}}</p>
            <p>Total investment:</p>
            <p>Total benefit:</p>
          </div>
        </div>

<!-- Side colomn for managers  -->
        <div v-else id="side-column" class="col-lg-3 col-sm-12 border d-flex flex-column justify-content-start align-items-center ">
          <div class="pt-5">
            <p>Portfolios number: {{managerPortfoliosNumber}}</p>
            <!-- to fill this we need to populae the portfolioIds to see who is the owner -->
            <p>Total clients: {{managerTotalClients}}</p>
            <!-- We need to add the field in the model? -->
            <p>Total followers: {{managerTotalFollowers}}</p>
            <!-- Also for this we need to populate the portfolios -->
            <p>Total managed money: {{managerTotalManagedMoney}}</p>
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



        <div id="card-column" class="col-lg-9 col-sm-12 pt-5 border  d-flex flex-row  align-items-center justify-content-center flex-wrap">

          <PortfolioGenericCard v-if="userInfo.role==='manager'" v-for="portfolio in userInfo.managerPortfolios" :key="portfolio.id" :portfolio="portfolio"/> 

         <PortfolioGenericCard v-if="userInfo.role==='client'" v-for="portfolio in userInfo.customerPortfoliosOwned" :key="portfolio.id" :portfolio="portfolio"/> 
          


        </div>
      </b-row>
    </b-container>


  </div>
</template>

<script>
import { getUser } from "../api";
import { getUserAndPopulate } from "../api";
import { createPortfolio } from "../api";
import datePicker from "vue-bootstrap-datetimepicker";
import PortfolioGenericCard from "../components/PortfolioGenericCard";

export default {
  components: {
    datePicker,
    PortfolioGenericCard
  },

  data() {
    return {
      userInfo: {},
      config: {
        format: "YYYY-MM-DD",
        useCurrent: false
      },
      modal1IsVisible: false,
      modal2IsVisible: false,
      displayAlert: false,
      managerPortfoliosNumber: "",
      managerTotalClients: "",
      managerTotalFollowers: "",
      managerTotalManagedMoney: "",
      stock: {},
      newStocks: [],
      newPortfolio: {},
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
        this.managerPortfoliosNumber = userInfo.managerPortfolios.length;

        this.managerPortfoliosMovements = this.getFields(
          this.userInfo.managerPortfolios,
          "movements"
        );
        if ((this.userInfo.managerPortfolios.investors = []))
          this.managerTotalClients = 0;
        else {
          this.managerTotalClients = this.userInfo.managerPortfolios.investors.reduce(
            (a, b) => a + b
          );
        }
        if ((this.userInfo.managerPortfolios.followers = []))
          this.managerTotalFollowers = 0;
        else {
          this.managerTotalFollowers = this.userInfo.managerPortfolios.followers.reduce(
            (a, b) => a + b
          );
        }
        if ((this.userInfo.managerPortfolios.Movement = []))
          this.managerTotalManagedMoney = 0;
        else {
          this.managerTotalManagedMoney = this.managerPortfoliosMovement.reduce(
            (a, b) => a.amountOfMoney + b.amountOfMoney
          );
        }
      } else if (userInfo.role === "client") {
        //if he is a client

        this.clientPortfoliosNumber = userInfo.customerPortfoliosOwned.length;
        (this.clientTotalInvestment = ""), (this.clientTotalBenefit = "");
      }
    });
  },
  methods: {
    getFields(input, field) {
      var output = [];
      for (var i = 0; i < input.length; i++) output.push(input[i][field]);
      return output;
    },
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
</style>