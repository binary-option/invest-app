<template>
<div class="portfolio-card-text">
      <div class="row">
 <b-card border-variant="light" class="col-sm-12 col-lg-12 card" :title="portfolio.portfolioName"
          header-tag="header"
          footer-tag="footer">

        <h6 slot="header" class="mb-0">
          <div class= "d-flex flex-row justify-content-between">
          <div>{{totalInvestors}} investors</div>
          <div>{{totalFollowers}} followers</div>
          </div>
        </h6>

        <em slot="footer">
           <star-rating class="star-rating" 
           :rating="averageRate" 
           :show-rating="false" 
           @rating-selected ="setRating" 
           :star-size="25"></star-rating>
          </em>

          <div class= "flex-row ">
            <div>
        <p class="card-text">{{portfolio.description}} </p>
      
            </div>
              <span> Risk: {{portfolio.risk}}</span>
            
              <span> Performance: {{portfolio.performancey1}}</span>
              <br/>
              <br/>
              <b-button to="details"  variant="dark" @click="storePortfolioId">See the details</b-button>
        </div>
        </b-card>
        </div>

</div>
</template>

<script>
import StarRating from "vue-star-rating";
import { addRating } from "../api";

export default {
  components: {
    StarRating
  },
  data() {
    return {
      rate: "",
      portfolioId: ""
    };
  },
  props: {
    portfolio: {},
    averageRate: "",
    totalFollowers: "",
    totalInvestors: ""
  },
  name: "PortfolioGenericCard",
  methods: {
    storePortfolioId() {
      this.$root.portfolioId = this.portfolio._id;
    },
    setRating(rating) {
      this.rate = rating;
      this.portfolioId = this.portfolio._id;
      this.portfolio.ratings.push(this.rate);
      this.$emit("rate", { rate: this.rate, portfolioId: this.portfolioId });
    }
  }
};
</script>



