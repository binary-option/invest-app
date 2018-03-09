<template>
<div>
  <div v-loading="!dataLoaded" v-if="!dataLoaded&&!quandlErrorFlag"></div>
  <div v-loading="!dataLoaded" v-if="dataLoaded" class="about">
    <indicator-card :rating="ratings" :ratingValues="ratingValues" :read-only="true"></indicator-card>

    <div class="container">

        <br/>
    </div>

    
    
    <div class="container">
      <hr />
      <br/>

      <div class="row text-center justify-content-center">
        <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12" >
          <h3>Single stock development</h3>
          <br/>
          <line-chart :data="plotObject" :options="plotObject.options"></line-chart>
          <span class="text-muted">From Feb 17 to Mar 18</span>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
          <h3>Portfolio allocation</h3>
          <br/>
          <pie-chart :data="pieChartObject"></pie-chart>
          <span class="text-muted">Per stock in [%]</span>
        </div>
        <div class="col-lg-4 col-md-8 col-sm-12 col-xs-12">
          <h3>Portfolio vs Benchmark </h3>
          <br/>
          <line-chart :data="indexPlotObject" :options="indexPlotObject.options"></line-chart>
          <span class="text-muted">From Feb 17 to Mar 18</span>
        </div>
      </div>
      <br/>
      <hr />
      <br/>

    <div class="container">
      <div class="row text-center justify-content-start">
        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12 lg-push-right">
          <complete-profile v-if="this.$root.user.role!=='manager' && this.$root.user.riskAssessded===false"></complete-profile>
          <invest v-if="this.$root.user.role!=='manager' && this.$root.user.riskAssessded===true"
          :balance="userInfo.accountBalance"
          v-on:invest="addMoneyToPortfolio"></invest>
        </div>
        <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12">
          <div class="container">
            <new-comment @addComment="addComment"></new-comment>
          </div>

          <br/>

          <div class="container">
            <comment v-if="messagesLoaded" v-for="(message, i) in messages" :key="i" 
            :imageURL="message.imageURL"
            :name="message.name"
            :date="message.date"
            :content="message.content"></comment>
          </div>
        </div>
      </div>
    </div>

    </div>
    
    
     </div>
    <!-- <div v-if="quandlErrorFlag">
      <quandl-error></quandl-error>
    </div> -->
  </div>
</template>


<script>
import { getPortfolio } from "@/api";
import { getUser } from "@/api";
import { getStockDelta } from "@/api";
import { getStockValue } from "@/api";
import { updatePortfolio } from "@/api";
import { retrieveBenchmarkData } from "@/api";
import { addPortfolioComment } from "@/api";
import { getPortfolioComments } from "@/api";
import { addMoney } from "../api";
import PieChart from "@/components/PieChart.vue";
import LineChart from "@/components/LineChart.vue";
import IndicatorCard from "@/components/IndicatorCard.vue";
import Comment from "@/components/Comment.vue";
import Invest from "@/components/Invest.vue";
import NewComment from "@/components/NewComment.vue";
import QuandlError from "@/components/QuandlError.vue";
import CompleteProfile from "@/components/CompleteProfile.vue";
import _ from "lodash";
import * as ss from "simple-statistics";
import moment from "moment";
export default {
  name: "portfolioDetails",
  components: {
    PieChart,
    LineChart,
    IndicatorCard,
    Comment,
    QuandlError,
    NewComment,
    Invest,
    CompleteProfile
  },
  created() {
    // This array of promises makes sure that the functions are carried out when both callbacks are ready
    this.portfolioId = this.$route.params.portfolioId;
    console.log(this.portfolioId);
    getPortfolio(this.$route.params.portfolioId)
      .then(portfolio => {
        portfolio.stocks.forEach(pf => {
          let name = pf.stockName;
          let date = new Date();
          //Calculate start date, one year and one day from now
          let startDate = moment(date)
            .subtract(1, "year")
            .subtract(1, "day")
            .format("YYYY-MM-DD");
          //Start one day from now to ensure data availability
          let endDate = moment(date)
            .subtract(1, "day")
            .format("YYYY-MM-DD");
          let frequency = "weekly";
          let lastUpdatedDate = moment(pf.lastUpdatedDate).format("YYYY-MM-DD");
          let lastStockValue = pf.stockValue;
          let lastHoldingValue = pf.holdingValue;
          let stock = {
            name: name,
            startDate: startDate,
            endDate: endDate,
            frequency: frequency,
            lastUpdatedDate: lastUpdatedDate,
            lastStockValue: lastStockValue,
            lastHoldingValue: lastHoldingValue
          };
          this.stockInfo.push(stock);
        });
        getUser(this.$root.user.id).then(user => {
          console.log("user", this.userInfo);
          this.userInfo = user;
        });

        return Promise.all([
          Promise.all(this.stockInfo.map(getStockDelta)),
          Promise.all(this.stockInfo.map(getStockValue)),
          retrieveBenchmarkData("2017-02-27", "2018-02-27")
        ]);
      })
      .then(([stockRdiff, stockValue, benchmarkData]) => {
        this.benchmarkData = benchmarkData;
        this.stockRdiffs = stockRdiff;
        this.filterStockRdiffs();
        this.filteredStockRdiffs.forEach(stockRdiff => {
          this.stockBetas.push(
            ss.sampleCovariance(
              stockRdiff,
              this.benchmarkData.rdiff.slice(0, stockRdiff.length)
            ) / ss.sampleVariance(this.benchmarkData.rdiff)
          );
        });
        this.stockValue = stockValue;
        this.filterStockValues();
        this.holdingDelta();
        for (var i = 0; i < this.stockBetas.length; i++) {
          this.portfolioBeta +=
            this.stockBetas[i] *
            this.currentHoldingValue[i] /
            this.totalHoldingValue;
          this.portfolioAllocation.push(
            (
              this.currentHoldingValue[i] /
              this.totalHoldingValue *
              100
            ).toFixed(0)
          );
        }
        this.portfolioBeta = this.portfolioBeta.toFixed(2);
        this.caclulateCompositeStock();
        this.preparePlotData();
        this.prepareIndexPlotData();
        this.preparePieChartData();

        //This function updates the portfolio returns in the database
        var portfolioReturns = [];
        this.compositeStockValue.forEach((value, i) => {
          portfolioReturns.push({
            value: value,
            date: this.stockDateFiltered[i]
          });
        });
        var updateObject = {
          risk: 100 - this.portfolioBetaRating * 20,
          performance: this.portfolioReturn,
          returns: portfolioReturns
        };

        this.userId = this.$root.user.id;
        console.log("aa ", this.$route.params);
        this.portfolioId = this.$route.params.portfolioId;
        updatePortfolio(this.portfolioId, updateObject).then(res => {});

        getPortfolioComments(this.portfolioId).then(res => {
          console.log("res ", res.messages);
          res.messages.forEach(message => {
            let messageObject = {
              imageURL: message.user.picture,
              name: message.user.name,
              date: message.date,
              content: message.content
            };
            this.messages.push(messageObject);
            this.messagesLoaded = true;
          });
        });
      })
      .catch(err => {
        if (err) {
          this.quandlErrorFlag = true;
        }
      });
  },
  mounted() {},
  data() {
    return {
      //Locally store the userId
      userInfo: {},
      //Locally store the portfolio Id
      messages: [],
      messagesLoaded: false,
      portfolioId: "",
      //Store the quantity of money invested in a portfolio
      quantity: 0,
      newBalance: 0,
      //Object holding the different ratings
      ratings: {
        alpha: 1,
        beta: 2,
        return: 3,
        returnBenchmark: 4
      },
      ratingValues: {
        alpha: 1,
        beta: 2,
        return: 3,
        returnBenchmark: 4
      },
      //Boolean to show a message if there is a problem with Quandl
      quandlErrorFlag: false,
      //Boolean to only show the charts when all data is available
      dataLoaded: false,
      //Composite stock: wheighted value of portfolio in rdiff
      compositeStockRdiff: [],
      //Composite stock: wheighted value of portfolio in USD
      compositeStockValue: [],
      //Calculates the development of the compounded stock with the compounded rdiff
      compoundedStockDevelopment: [],
      //The array with the benchmark data: date, rdiff and value
      benchmarkData: {},
      //The array with the rdiffs as returned from quandl
      stockRdiffs: [],
      //The array with the values as returned from quandl
      stockValue: [],
      //Matrix with arrays of the rdiffs
      filteredStockRdiffs: [],
      //Matrix with the arrays of the value of the stocks in dollar
      stockValueFiltered: [],
      //Matrix with the arrays of date when the stocks were updated
      stockDateFiltered: [],
      //Array holding the updated value of the holdings
      currentHoldingValue: [],
      //Array with the betas of the stocks for the given period
      stockBetas: [],
      //Weighted portfolio beta
      portfolioBeta: 0,
      //Portfolio allocation as percentage
      portfolioAllocation: [],
      standardColors: [
        "#17202a",
        "#186a3b",
        "#641e16",
        "#154360",
        "#4a235a",
        "#1c2833",
        "#1d8348",
        "#7b241c",
        "#1a5276",
        "#5b2c6f",
        "#212f3d",
        "#239b56",
        "#922b21",
        "#1f618d",
        "#6c3483"
      ],
      pieChartObject: {
        labels: [],
        datasets: [],
        options: {
          title: {
            display: true,
            text: "Portfolio allocation",
            maintainAspectRatio: false
          }
        }
      },
      plotObject: {
        labels: [],
        datasets: [],
        options: {
          scales: {
            xAxes: [
              {
                display: false
              }
            ],
            yAxes: [
              {
                id: "dollar",
                position: "left",
                ticks: { min: 0 },
                scaleLabel: {
                  display: true,
                  labelString: "USD"
                }
              }
            ]
          }
        }
      },
      indexPlotObject: {
        labels: [],
        datasets: [],
        options: {
          scales: {
            xAxes: [
              {
                display: false
              }
            ],
            yAxes: [
              {
                id: "dollar",
                position: "left",
                ticks: { min: 0 },
                scaleLabel: {
                  display: true,
                  labelString: "USD"
                }
              },
              {
                id: "index",
                position: "right",
                ticks: { min: 0 },
                scaleLabel: {
                  display: true,
                  labelString: "SP500"
                }
              }
            ]
          }
        }
      },
      stockInfo: []
    };
  },
  computed: {
    totalHoldingValue() {
      return this.currentHoldingValue.reduce((acc, curr) => {
        return acc + curr;
      });
    },
    portfolioReturn() {
      return (
        (1 +
          (this.compositeStockValue[this.compositeStockValue.length - 1] -
            this.compositeStockValue[0]) /
            this.compositeStockValue[0]) *
          100 -
        100
      ).toFixed(0);
    },
    portfolioReturnRating() {
      if (this.portfolioReturn < 5) {
        return 0;
      } else if (this.portfolioReturn > 5 && this.portfolioReturn < 8) {
        return 1;
      } else if (this.portfolioReturn > 8 && this.portfolioReturn < 11) {
        return 2;
      } else if (this.portfolioReturn > 11 && this.portfolioReturn < 17) {
        return 3;
      } else if (this.portfolioReturn > 17 && this.portfolioReturn < 20) {
        return 4;
      } else if (this.portfolioReturn > 20) {
        return 5;
      }
    },
    portfolioAlphaRating() {
      if (this.portfolioAlpha < 5) {
        return 0;
      } else if (this.portfolioAlpha > 5 && this.portfolioAlpha < 10) {
        return 1;
      } else if (this.portfolioAlpha > 10 && this.portfolioAlpha < 12) {
        return 2;
      } else if (this.portfolioAlpha > 12 && this.portfolioAlpha < 17) {
        return 3;
      } else if (this.portfolioAlpha > 17 && this.portfolioAlpha < 20) {
        return 4;
      } else if (this.portfolioAlpha > 20) {
        return 5;
      }
    },
    portfolioBetaRating() {
      if (this.portfolioBeta < -5) {
        return 5;
      } else if (this.portfolioBeta > -5 && this.portfolioBeta < 0) {
        return 4;
      } else if (this.portfolioBeta > 0 && this.portfolioBeta < 0.5) {
        return 3;
      } else if (this.portfolioBeta > 0.5 && this.portfolioBeta < 1) {
        return 2;
      } else if (this.portfolioBeta > 1 && this.portfolioBeta < 1.5) {
        return 1;
      } else if (this.portfolioBeta > 2) {
        return 1;
      }
    },
    benchmarkReturnRating() {
      if (this.benchmarkReturn < 5) {
        return 0;
      } else if (this.benchmarkReturn > 5 && this.benchmarkReturn < 8) {
        return 1;
      } else if (this.benchmarkReturn > 8 && this.benchmarkReturn < 11) {
        return 2;
      } else if (this.benchmarkReturn > 11 && this.benchmarkReturn < 17) {
        return 3;
      } else if (this.benchmarkReturn > 17 && this.benchmarkReturn < 20) {
        return 4;
      } else if (this.benchmarkReturn > 20) {
        return 5;
      }
    },
    //The value of the risk-free return needs to be update periodically until an
    //API is available
    portfolioAlpha() {
      let riskFreeReturn = 0.0204;
      let marketReturn =
        (this.benchmarkData.value[this.benchmarkData.value.length - 1] -
          this.benchmarkData.value[0]) /
        this.benchmarkData.value[0];
      return (
        (this.portfolioReturn / 100 -
          riskFreeReturn -
          this.portfolioBeta * (marketReturn - riskFreeReturn)) *
        100
      ).toFixed(0);
    },
    benchmarkReturn() {
      return (
        (this.benchmarkData.value[this.benchmarkData.value.length - 1] -
          this.benchmarkData.value[0]) /
        this.benchmarkData.value[0] *
        100
      ).toFixed(1);
    }
  },
  methods: {
    addMoneyToPortfolio(payload) {
      this.portfolioId = this.$route.params.portfolioId;
      console.log("I'm here", payload);
      this.quantity = parseInt(payload.quantity);
      this.clientId = this.userInfo._id;

      // this.newBalance = this.userInfo.accountBalance - this.quantity;
      // console.log("new balance", this.newBalance);
      console.log("T want to add this quantity of Money ", this.quantity);
      console.log("by this user ", this.clientId);
      console.log("to this portfolio", this.portfolioId);
      addMoney(this.quantity, this.portfolioId, this.clientId, this.newBalance)
        .then(() => {
          console.log("added Money");
          this.$router.push("/dashboard");
        })
        .catch(err => {
          console.log(err);
          this.err = err;
        });
    },

    getClientTotalBalance(clientId) {
      get;
    },

    addComment(content) {
      let contentObject = {
        content: content,
        portfolio: this.portfolioId,
        date: new Date(),
        user: this.userId
      };
      let messageObject = {
        imageURL: this.$root.user.picture,
        name: this.$root.user.name,
        date: new Date(),
        content: content
      };
      this.messages.unshift(messageObject);
      addPortfolioComment(this.portfolioId, contentObject).then(res => {});
    },
    //Returns an array with the weighted value of the stock
    caclulateCompositeStock() {
      //Initialize
      /**Calculate the number of stocks as the value of the holding, which was updated
      in holdingDelta() divided by the current value of the stock
       **/
      var numberOfStocks = [];
      for (var i = 0; i < this.currentHoldingValue.length; i++) {
        numberOfStocks.push(
          this.currentHoldingValue[i] / this.stockValueFiltered[i][0]
        );
      }
      var totalNumberOfStocks = numberOfStocks.reduce((acc, curr) => {
        return acc + curr;
      });
      var stockValueVector = [];
      //i iterates through number of weeks in period
      for (var i = 0; i < this.stockValueFiltered[0].length; i++) {
        //Array with holding value as number of stock * current value
        //j iterates through number of stocks
        let tempStockValue = [];
        for (var j = 0; j < this.stockValueFiltered.length; j++) {
          tempStockValue.push(
            this.stockValueFiltered[j][i] * numberOfStocks[j]
          );
        }
        stockValueVector.push(tempStockValue);
      }

      //A Matrix, containing in each row the wheighted stock contributions to the
      //composite stock per period
      var tempWeightedStock = [];
      //Calculate the weighted rdiffs as Vi/Vtotal * rdiffi
      for (var i = 0; i < stockValueVector.length - 1; i++) {
        //Holds temporarily a single wheighted stock for a given period. Is pushed
        //afterwards to tempWeightedStock matrix
        var weightedStockHolder = [];
        for (var j = 0; j < this.stockInfo.length; j++) {
          weightedStockHolder.push(
            this.filteredStockRdiffs[j][i] *
              stockValueVector[i][j] /
              stockValueVector[i].reduce((acc, curr) => {
                return acc + curr;
              })
          );
        }
        tempWeightedStock.push(weightedStockHolder);
      }
      //Array holding the value of the composite stock per period in rdiff
      for (var i = 0; i < tempWeightedStock.length; i++) {
        this.compositeStockRdiff.push(
          tempWeightedStock[i].reduce((acc, curr) => {
            return acc + curr;
          })
        );
      }
      //Array holding the total value of the composite stock
      for (var i = 0; i < tempWeightedStock.length; i++) {
        var weightedStock = [];
        for (var j = 0; j < tempWeightedStock[0].length; j++) {
          weightedStock.push(
            (1 + tempWeightedStock[i][j]) * stockValueVector[i][j]
          );
        }
        this.compositeStockValue.push(
          weightedStock.reduce((acc, curr) => {
            return acc + curr;
          }) / totalNumberOfStocks
        );
      }
    },
    //Calculates the change in value of the stocks since the last time they were updated
    holdingDelta() {
      for (var i = 0; i < this.stockValueFiltered.length; i++) {
        this.currentHoldingValue.push(
          ((this.stockValueFiltered[i][this.stockValueFiltered[i].length - 1] -
            this.stockInfo[i].lastStockValue) /
            this.stockInfo[i].lastHoldingValue +
            1) *
            this.stockInfo[i].lastHoldingValue
        );
      }
    },
    //Takes the rdiff data from the query to quandl into an array
    filterStockRdiffs() {
      for (let i = 0; i < this.stockRdiffs.length; i++) {
        let returnVector = [];
        for (let j = 1; j < this.stockRdiffs[i].dataset.data.length; j++) {
          returnVector.push(this.stockRdiffs[i].dataset.data[j][1]);
        }
        this.filteredStockRdiffs.push(returnVector);
      }
    },
    //Takes the value data from the query to quandl into an array
    filterStockValues() {
      for (let i = 0; i < this.stockValue.length; i++) {
        let returnVector = [];
        let datesVector = [];
        for (let j = 0; j < this.stockValue[i].dataset.data.length; j++) {
          returnVector.push(this.stockValue[i].dataset.data[j][1]);
          datesVector.push(this.stockValue[i].dataset.data[j][0]);
        }
        this.stockValueFiltered.push(returnVector.reverse());
        this.stockDateFiltered = datesVector;
        this.plotObject.labels = datesVector.reverse();
      }
    },
    preparePlotData() {
      for (var i = 0; i < this.stockInfo.length; i++) {
        var label = this.stockInfo[i].name;
        var data = this.stockValueFiltered[i];
        let plotData = {
          label: label,
          borderColor: "#f87979",
          data: data,
          yAxisID: "dollar"
        };
        this.plotObject.datasets.push(plotData);
      }
    },
    prepareIndexPlotData() {
      let plotData = {
        label: "Portfolio",
        borderColor: "#0F445D",
        data: this.compositeStockValue,
        yAxisID: "dollar"
      };
      this.indexPlotObject.datasets.push(plotData);
      this.indexPlotObject.labels = this.plotObject.labels.slice(
        0,
        this.compositeStockValue.length
      );

      let sp500Data = {
        label: "SP500",
        borderColor: "#076940",
        data: this.benchmarkData.value.slice(
          0,
          this.compositeStockValue.length
        ),
        yAxisID: "index"
      };
      this.indexPlotObject.datasets.push(sp500Data);
    },
    //Push the stock name to the data: { labels: [array
    //Picks a random color and pushes it to data: { datasets: [{ backgroundColor: [ array
    //Pushes the value of the portfolio allocation to data: { datasets: [{ data: [ array
    preparePieChartData() {
      let colorsArray = [];
      for (var i = 0; i < this.stockInfo.length; i++) {
        var name = this.stockInfo[i].name;
        this.pieChartObject.labels.push(this.stockInfo[i].name);
        let color = this.standardColors[
          Math.floor(Math.random() * (this.standardColors.length - 0))
        ];
        colorsArray.push(color);
        this.plotObject.datasets[i].borderColor = color;
      }

      let data = this.portfolioAllocation;
      let dataset = {
        data: data,
        backgroundColor: colorsArray
      };
      this.pieChartObject.datasets.push(dataset);
      this.dataLoaded = true;
    },
    addRatings() {
      this.ratings = {
        alpha: this.portfolioAlphaRating,
        beta: this.portfolioBetaRating,
        return: this.portfolioReturnRating,
        returnBenchmark: this.benchmarkReturnRating
      };
      this.ratingValues = {
        alpha: this.portfolioAlpha,
        beta: this.portfolioBeta,
        return: this.portfolioReturn,
        returnBenchmark: this.benchmarkReturn
      };
    }
  }
};
</script>