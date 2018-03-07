<template>
<div>
 <b-card border-variant="dark" class="card mb-2 mt-3" :title="portfolio.portfolioName"
          header-tag="header"
          footer-tag="footer">
        <h6 slot="header" class="mb-0">Header</h6>
        <em slot="footer">Rating: {{portfolio.rating}}</em>
        <p class="card-text">{{portfolio.description}} </p>
        <b-button to="#"  variant="dark" @click="storePortfolioId">Get the details</b-button>
        </b-card>
</div>
</template>

<script>
export default {
  props: {
    portfolio: {}
  },
  name: "PortfolioGenericCard",
  methods: {
    storePortfolioId() {
      this.$root.portfolioId = this.portfolio._id;
    }
  }
};
</script>

