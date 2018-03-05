<template>
<div><pre>{{allResults}}</pre>
<h2>This is the search page</h2>
</div>
</template>


<script>
import { getAllPortfolios } from "../api";

export default {
  data() {
    return {
      allResults: []
    };
  },

  methods: {
    searchByRisk() {},
    searchByPerformance() {},
    searchByRating() {},
    searchByWord(word) {
      console.log("DEBUG word ", word);
      return getAllPortfolios().then(portfolios =>
        portfolios.filter(portfolio => {
          const stocksNames = portfolio.stocks
            .map(stock => stock.stockName)
            .join();
          console.log("DEBUG stockNames = ", stocksNames);
          return (
            portfolio.portfolioName.toLowerCase().indexOf(word.toLowerCase()) >
              -1 ||
            portfolio.description.toLowerCase().indexOf(word.toLowerCase()) >
              -1 ||
            stocksNames.toLowerCase().indexOf(word.toLowerCase()) > -1
          );
        })
      );
    }
  },

  created() {
    //using this or not?
    const word = this.$root.searchWord;
    this.searchByWord(word).then(results => (this.allResults = results));
    console.log(this.allResults);
  }
};
</script>

