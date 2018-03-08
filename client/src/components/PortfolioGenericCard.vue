<template>
<div>
 <b-card border-variant="dark" class="col-sm-12 col-lg-8 card mb-2 mt-3" :title="portfolio.portfolioName"
          header-tag="header"
          footer-tag="footer">
        <h6 slot="header" class="mb-0">Header</h6>
        <em slot="footer">

           <star-rating class="star-rating" :rating="averageRate" :show-rating="false" @rating-selected ="setRating" :star-size="25"></star-rating>
          
          </em>
        <p class="card-text">{{portfolio.description}} </p>
        <b-button to="details"  variant="dark" @click="storePortfolioId">Get the details</b-button>
        </b-card>
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
    averageRate: ""
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

