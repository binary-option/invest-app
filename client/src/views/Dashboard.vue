<template>
<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
  <pre>{{userInfo}}</pre>
 <b-container  fluid class="bv-example-row">
     
      <div  class="row justify-content-md-center mb-3 p-3 mb-2 bg-info text-white mb-0">
          <h3>{{$root.user.name}} dashboard </h3>
      </div>
      
    
    <b-row class="row-eq-height mt-0">

        
        <div  v-if="$root.user.role==='client'" id="side-column"  class="col-lg-3 col-sm-12 border d-flex flex-column justify-content-start " >
        <div class="pt-5">
	     <p>Risk profile:</p>
       <p>Number of portfolios:</p>
       <p>Total investment:</p>
       <p>Total benefit:</p>
       </div>
        </div>

           <div  v-else id="side-column"  class="col-lg-3 col-sm-12 border d-flex flex-column justify-content-start " >
        <div class="pt-5">
	      <p>Portfolios number: {{managerPortfoliosNumber}}</p>
        <!-- to fill this we need to populae the portfolioIds to see who is the owner -->
        <p>Total clients: {{managerTotalClients}}</p>
        <!-- We need to add the field in the model? -->
        <p>Total followers: {{managerTotalFollowers}}</p>
        <!-- Also for this we need to populate the portfolios -->
        <p>Total managed money: {{managerTotalManagedMoney}}</p>
        <div>
        <b-button type="button" class="btn btn-info" @click="modal1IsVisible = !modal1IsVisible" >
          Add a portfolio
        </b-button>

            <b-modal v-model="modal1IsVisible" style="color:black" ref="modal1"  @ok="submitModal">
              <form @submit.stop.prevent="submitModal">
                <p><strong>Portfolio informations:</strong></p>
                 <b-form-input  class="mt-2 mb-2" type="text"
                      placeholder="Enter the portfolio name"
                      v-model="newPortfolio.portfolioName"></b-form-input>
                <b-form-textarea  class="mt-2 mb-2" type="text"
                      placeholder="Enter the portfolio description"
                      v-model="newPortfolio.description"></b-form-textarea>
                <hr>
                  <div class="modal-footer">
                  <button  class="btn btn-info" @click.prevent="addInformations">Add the stocks</button>
                  <button  class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>  
              </form>
              </b-modal>

                  <b-modal  style="color:black" ref="modal2"  @ok="submitModal">
                <form @submit.stop.prevent="submitModal">
                <p><strong>Stock:</strong></p>
                <b-form-input class="mt-2 mb-2" type="text"
                      placeholder="Enter the stock name"
                      v-model="stock.stockName"></b-form-input>
                <b-form-input  class="mt-2 mb-2" type="text"
                      placeholder="Enter the stock value"
                      v-model="stock.stockValue"></b-form-input>

                  <div class="row">
                <div class="col-md-12">
                <date-picker v-model="stock.stockStartingDate" placeholder="Enter the starting date" :config="config">
                </date-picker>
                <span class="oi oi-calendar" title="icon name" aria-hidden="true"></span>
                </div>
                 </div>

                <b-form-input  class="mt-2 mb-2" type="text"
                      placeholder="Enter the holding value"
                      v-model="stock.holdingValue"></b-form-input>
              <hr>
              <b-button  variant="outline-info" size="sm" @click.prevent="addSingleStock"> Add one more stock</b-button>
               <div class="modal-footer">
                  <button  class="btn btn-info" @click="submitModal">Save</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div> 
              </form>

            </b-modal>
          </div>

          <div class="modal fade bd-example-modal-lg " tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
          <div class="modal-content">
           ...
        </div>
        </div>
        </div>



       </div>
        </div>
      
  
       
        <div id="card-column"  class="col-lg-9 col-sm-12 border  d-flex flex-row  align-items-center flex-wrap" >
	   
        
       <b-card  class="card" bg-variant="dark" text-variant="white">
             <p class="card-text">
            Some quick example text to build on the <em>card title</em> and make up the bulk of the card's content.
            </p>
            <br>
            <br>
            <br>
            <br>
            <br>
             <br>
            <br>
            <a href="#"
            class="card-link">Card link</a>
             <b-link href="#"
            class="card-link">Another link</b-link>
        </b-card>

        <b-card  class="card" bg-variant="secondary" text-variant="white">
             <p class="card-text">
            Some quick example text to build on the <em>card title</em> and make up the bulk of the card's content.
            </p>
            <br>
            <br>
            <br>
            <br>
            <br>
             <br>
            <br>
            <a href="#"
            class="card-link">Card link</a>
             <b-link href="#"
            class="card-link">Another link</b-link>
        </b-card>

        <b-card border-variant="dark" title="Title"
                header-tag="header"
                footer-tag="footer">
            <h6 slot="header"
            class="mb-0">Header Slot</h6>
            <em slot="footer">Footer Slot</em>
            <p class="card-text">Header and footers using slots.</p>
            <b-button href="#"
                      variant="primary">Go somewhere</b-button>
        </b-card>
         
      
         </div>
    </b-row>
</b-container>


</div>
</template>

<script>
import { getUser } from "../api";
import { createPortfolio } from "../api";
import datePicker from "vue-bootstrap-datetimepicker";

export default {
  components: {
    datePicker
  },

  data() {
    return {
      config: {
        format: "DD/MM/YYYY",
        useCurrent: false
      },
      modal1IsVisible: false,
      userInfo: {},
      managerPortfoliosNumber: "",
      managerTotalClients: "",
      managerTotalFollowers: "",
      managerTotalManagedMoney: "",
      stock: {},
      newStocks: [],
      newPortfolio: {},
      numberOfStocks: "",
      clientRiskProfile: "",
      clientPortfoliosNumber: "",
      clientTotalInvestment: "",
      clientTotalBenefit: ""
    };
  },
  created() {
    const userId = this.$root.user.id;
    getUser(userId).then(userInfo => {
      this.userInfo = userInfo;
      if (userInfo.role === "manager") {
        this.managerPortfoliosNumber = userInfo.managerPortfolios.length;
        (this.managerTotalClients = ""),
          (this.managerTotalFollowers = ""),
          (this.managerTotalManagedMoney = "");
      } else {
        this.clientRiskProfile = userInfo.riskProfile;
        this.clientPortfoliosNumber = userInfo.customerPortfoliosOwned.length;
        (this.clientTotalInvestment = ""), (this.clientTotalBenefit = "");
      }
    });
  },
  methods: {
    addInformations() {
      this.modal1IsVisible = false;
      this.$refs.modal2.show();
    },
    addSingleStock() {
      this.newStocks.push(this.stock);
      this.stock = {};
      this.$refs.modal2.show();
      this.numberOfStocks = this.newStocks.length + 1;
    },
    submitModal() {
      this.newStocks.push(this.stock);
      this.stock = {};
      this.$refs.modal2.hide();

      const newStocks = this.newStocks;
      const newPortfolio = {
        ...this.newPortfolio,
        stocks: newStocks
      };
      console.log("DEBUG newPortfolio = ", newPortfolio);
      createPortfolio(newStocks)
        .then(() => {
          this.$router.push("/dashboard");
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
};
</script>

<style >
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

.card {
  width: 550px;
  height: 300px;
  margin: 40px;
}
</style>