<template>
<div>

<!-- <div  v-if="allResults!== []" class="container col-lg-11 col-sm-11 text-center">
      <h3>Sorry we couldn't find any porfolio</h3>
</div>   -->

 <div class="container col-lg-10 col-sm-12 mt-3 "> 
	
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
    
    <div id="card-column" class="col-lg-9 col-sm-12 pt-5 border  d-flex flex-row  align-items-center justify-content-center flex-wrap">
    
        <div v-for="result in allResults" :key="result.id">
          <PortfolioGenericCard v-if="userInfo.role==='manager'" v-for="portfolio in userInfo.managerPortfolios" 
          :key="portfolio.id" 
          :portfolio="portfolio" 
          :totalInvestors="getPortfolioTotalClients(portfolio)"
          :totalFollowers="getPortfolioTotalFollowers(portfolio)"
          :averageRate="calculateAverageRating(portfolio.ratings)"
            /> 

         <PortfolioGenericCard v-if="userInfo.role==='client'" v-for="portfolio in allResults" 
         :key="portfolio.id" 
         :portfolio="portfolio" 
          :totalInvestors="getPortfolioTotalClients(portfolio)"
          :totalFollowers="getPortfolioTotalFollowers(portfolio)"
         :averageRate="calculateAverageRating(portfolio.ratings)" 
          /> 
         


 
       </div>
    </div>

  </div>
  
 </div>

</template>


<script>
import { getAllPortfolios } from "../api";
import { getUserAndPopulate } from "../api";
import { addRating } from "../api";
import PortfolioGenericCard from "../components/PortfolioGenericCard";
import Dashboard from "../components/PortfolioGenericCard";

export default {
  components: {
    PortfolioGenericCard
  },
  data() {
    return {
      userInfo: {},
      word: "",
      allResults: [],
      selected: "",
      averageRaing: ""
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
    },

    getPortfolioTotalClients(item) {
      console.log(item.investors.length);
      return item.investors.length;
    },

    getPortfolioTotalFollowers(item) {
      return item.followers.length;
    },

    getPortfolioTotalFollowers(item) {
      return item.followers.length;
    },

    calculateAverageRating(item) {
      this.averageRate = 0;
      if (item.length > 0) return item.reduce((a, b) => a + b, 0) / item.length;
      else return 0;
    }
  },

  created() {
    const word = this.$root.searchWord;
    const userId = this.$root.user.id;
    getUserAndPopulate(userId)
      .then(userInfo => (this.userInfo = userInfo))
      .catch(err => console.err);

    this.searchByWord(word).then(results => (this.allResults = results));
  }
};
</script>

<style>

</style>

