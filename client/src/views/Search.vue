<template>
<div><pre>{{allResults}}</pre>
  <div class="container col-lg-11 col-sm-11">
	  <div class="modal-content ">
	      	
    <div class="modal-heading text-center p-3 mb-2 bg-info text-white mb-0">
    <br>
		<h2>Search results</h2>
    <div>
      <span>Sort by: </span>
      <select v-model="selected" @change="sort">
      <option disabled value="">Select</option>
      <option value="risk">Risk</option>
      <option value="rating">Rating</option>
      <option value="performance1y">Performance</option>
    </select>
    </div>
	  </div>
    
    
  <div class=" d-flex flex-column align-items-center pb-3" >
   
  
        <div v-for="result in allResults" :key="result.id" class="col-lg-10 col-sm-10 ">
        <b-card class="mb-2 mt-3" :title="result.portfolioName"
          header-tag="header"
          footer-tag="footer">
        <h6 slot="header" class="mb-0">Header</h6>
        <em slot="footer">Rating: {{result.rating}}</em>
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
      allResults: [],
      selected: ""
    };
  },

  methods: {
    searchByWord(word) {
      return getAllPortfolios().then(portfolios =>
        portfolios.filter(portfolio => {
          const stocksNames = portfolio.stocks
            .map(stock => stock.stockName)
            .join();
          return (
            portfolio.portfolioName.toLowerCase().indexOf(word.toLowerCase()) >
              -1 ||
            portfolio.description.toLowerCase().indexOf(word.toLowerCase()) >
              -1 ||
            stocksNames.toLowerCase().indexOf(word.toLowerCase()) > -1
          );
        })
      );
    },

    sortByRating(allResults) {
      this.allResults.sort((a, b) => {
        if (a.rating < b.rating) return -1;
        else return 1;
      });
    },

    sortByRisk() {
      this.allResults.sort((a, b) => {
        if (a.risk < b.risk) return -1;
        else return 1;
      });
    },

    sortByPerformance() {
      this.allResults.sort((a, b) => {
        if (a.performance1y < b.performance1y) return -1;
        else return 1;
      });
    },

    sort(selected) {
      console.log("Selected = ", this.selected);
      if (this.selected === "rating") this.sortByRating(this.allResults);
      else if (this.selected === "risk") this.sortByRisk(this.allResults);
      else if (this.selected === "performance1y")
        this.sortByPerformance(this.allResults);
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

