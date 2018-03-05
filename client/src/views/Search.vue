<template>
<div><pre>{{allResults}}</pre>
  <div class="container col-lg-11 col-sm-11">
	  <div class="modal-content ">
	      	
    <div class="modal-heading text-center ">
    <br>
		<h2>Search portfolios page</h2>
	  </div>
    
    
  <div class=" d-flex flex-column align-items-center pb-3" >
   
  
        <div v-for="result in allResults" :key="result.id" class="col-lg-10 col-sm-10 ">
        <b-card class="mb-2 mt-3" :title="result.portfolioName"
          header-tag="header"
          footer-tag="footer">
        <h6 slot="header" class="mb-0">Header</h6>
        <em slot="footer">Rating</em>
        <p class="card-text">{{result.description}} </p>
        <b-button href="#" variant="primary">Get the details</b-button>
        </b-card>
         </div>
   
   
  


    </div>


  </div>
  </div>
  </div>
  

</template>


<script>
import { getAllPortfolios } from "../api";

export default {
  data() {
    return {
      word: "",
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
    this.$root.searchWord = "";
  }
};
</script>

