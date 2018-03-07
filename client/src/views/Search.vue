<template>
<div><pre>{{allResults}}

</pre>

<div v-if="allResults===[]" class="container col-lg-11 col-sm-11 text-center">
      <h3>Sorry we couldn't find any porfolio</h3>
    </div> 

  <div v-else class="container col-lg-10 col-sm-12  ">
	  
    <div class="modal-heading text-center p-3 mb-2 bg-dark text-white mb-0">
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
    
  <div id="card-column" class="d-flex flex-row justify-content-center  ">
    
  <div class="col-6 pb-3 pt-5  " >
   
        <PortfolioGenericCard v-for="result in allResults" :key="result.id" :portfolio="result"> </PortfolioGenericCard>
       
    </div>
  </div>
  </div>


    

  </div>

 
  

</template>


<script>
import { getAllPortfolios } from "../api";
import PortfolioGenericCard from "../components/PortfolioGenericCard";

export default {
  components: {
    PortfolioGenericCard
  },
  data() {
    return {
      word: "",
      allResults: [],
      selected: ""
    };
  },

  methods: {
    searchByWord(word) {
      console.log("word ", word);
      return getAllPortfolios().then(portfolios =>
        portfolios.filter(portfolio => {
          const stocksNames = portfolio.stocks
            .map(stock => stock.stockName)
            .join();
          console.log("stocksNames ", stocksNames);
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
    // this.$root.searchWord = "";
  }
};
</script>

<style>

</style>

