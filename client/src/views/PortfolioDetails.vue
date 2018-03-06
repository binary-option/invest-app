<template>
  <div v-if="dataLoaded" class="about">
    <indicator-card :rating="ratings" :read-only="true"></indicator-card>

    <div class="container">
        <br/>
    </div>
    
    <div class="container">

      <div class="row text-center">
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <h3>Single stock development</h3>
          <br/>
          <line-chart :data="plotObject" :options="plotObject.options"></line-chart>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <h3>Portfolio vs Benchmark </h3>
            <br/>
            <line-chart :data="indexPlotObject" :options="indexPlotObject.options"></line-chart>
        </div>
      </div>
      <div class="row text-center">
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <h3>Portfolio allocation</h3>
          <br/>
          <pie-chart :data="pieChartObject"></pie-chart>
        </div>
          
        </div>

        <div class="container">
        <comment :message="message"></comment>
    </div>

    </div>
    
    
  </div>
</template>


<script>
import { getPortfolio } from "@/api";
import { getStockDelta } from "@/api";
import { getStockValue } from "@/api";
import { retrieveBenchmarkData } from "@/api";
import PieChart from "@/components/PieChart.vue";
import LineChart from "@/components/LineChart.vue";
import IndicatorCard from "@/components/IndicatorCard.vue";
import Comment from "@/components/Comment.vue";
import _ from "lodash";
import * as ss from "simple-statistics";
import moment from "moment";
export default {
  name: "portfolioDetails",
  components: {
    PieChart,
    LineChart,
    IndicatorCard,
    Comment
  },
  created() {
    // This array of promises makes sure that the functions are carried out when both callbacks are ready
    getPortfolio("5a96bc309826b01503719a30")
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

        return Promise.all([
          Promise.all(this.stockInfo.map(getStockDelta)),
          Promise.all(this.stockInfo.map(getStockValue)),
          retrieveBenchmarkData("2017-02-27", "2018-02-27")
        ]);
      })
      .then(([stockRdiff, stockValue, benchmarkData]) => {
        console.log("bmd ", benchmarkData);
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
        this.caclulateCompositeStock();
        this.preparePlotData();
        this.prepareIndexPlotData();
        this.preparePieChartData();
        console.log(this.portfolioReturn);
        console.log(this.portfolioAlpha);
        console.log(this.benchmarkReturn);
      });
  },
  mounted() {},
  data() {
    return {
      message: {
        user: "Manuel",
        content: "Testing a message",
        date: "2018-02-28",
        imageURL:
          "https://cdn.pixabay.com/photo/2014/10/21/14/46/mongoose-496374_960_720.jpg"
      },
      //Object holding the different ratings
      ratings: {
        alpha: 1,
        beta: 2,
        return: 3,
        returnBenchmark: 4
      },
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
            text: "Portfolio allocation"
          }
        }
      },
      plotObject: {
        labels: [],
        datasets: [],
        options: {
          scales: {
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
      ).toFixed(2);
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
      ).toFixed(2);
    },
    benchmarkReturn() {
      return (
        (this.benchmarkData.value[this.benchmarkData.value.length - 1] -
          this.benchmarkData.value[0]) /
        this.benchmarkData.value[0] *
        100
      ).toFixed(2);
    }
  },
  methods: {
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
      //Calculate the weighted rdiffs a Vi/Vtotal * rdiffi
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
      //console.log("tws ", tempWeightedStock);
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
    }
  }
};
</script>
