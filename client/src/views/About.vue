<template>
  <div class="about">
    <div v-if="dataLoaded" class="container">
      <div class="row ">
        <div class="col-lg-5 col-md-6 col-sm-9 col-xs-12">
          <h3>Portfolio allocation</h3>
          <pie-chart :data="pieChartObject"></pie-chart>
        </div>
        <div class="col-lg-5 col-md-6 col-sm-9 col-xs-12">
          <h3>Portfolio's development</h3>
          <line-chart :data="plotObject" :options="plotObject.options">1</line-chart>
        </div>
      </div>
    </div>
    <h1>This is an about page</h1>
    <pre>portfolioBeta {{portfolioBeta}}</pre>
    <pre>stockBetas {{stockBetas}}</pre>
    <pre>stockIncreases {{stockIncreases}}</pre>
    <pre>stockValueFiltered {{stockValueFiltered}}</pre>
    <pre>{{stockDeltas}}</pre>
    
  </div>
</template>


<script>
import { getPortfolio } from "../api";
import { getStockDelta } from "@/api";
import { getStockValue } from "@/api";
import PieChart from "@/components/PieChart.vue";
import LineChart from "@/components/LineChart.vue";
import _ from "lodash";
import * as ss from "simple-statistics";
import moment from "moment";
export default {
  name: "test",
  components: {
    PieChart,
    LineChart
  },
  created() {
    // This array of promises makes sure that the functions are carried out when both callbacks are ready
    getPortfolio("5a96bc309826b01503719a30")
      .then(portfolio => {
        portfolio.stocks.forEach(pf => {
          console.log(pf);
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
          let lastUpdated = moment(pf.lastUpdated).format("YYYY-MM-DD");
          let lastStockValue = pf.stockValue;
          let lastHoldingValue = pf.holdingValue;
          let stock = {
            name: name,
            startDate: startDate,
            endDate: endDate,
            frequency: frequency,
            lastUpdated: lastUpdated,
            lastStockValue: lastStockValue,
            lastHoldingValue: lastHoldingValue
          };
          this.stockInfo.push(stock);
        });

        // this.tempPortfolio = portfolio.stocks;

        return Promise.all([
          Promise.all(this.stockInfo.map(getStockDelta)),
          Promise.all(this.stockInfo.map(getStockValue))
        ]);
      })
      .then(([stockDelta, stockValue]) => {
        this.stockDeltas = stockDelta;
        this.calculateReturnDeltas();
        this.initializeData();

        this.stockIncreases.forEach(beta => {
          this.stockBetas.push(
            ss.sampleCovariance(beta, this.betaBenchmark) /
              ss.sampleVariance(this.betaBenchmark)
          );
        });
        this.stockValue = stockValue;
        this.calculateValueDeltas();
        this.holdingDelta();
        for (var i = 0; i < this.stockBetas.length; i++) {
          this.portfolioBeta +=
            this.stockBetas[i] *
            this.currentHoldingValue[i] /
            this.totalHoldingValue;

          this.portfolioAllocation.push(
            this.currentHoldingValue[i] / this.totalHoldingValue
          );
        }
        this.preparePlotData();
        this.preparePieChartData();
      });
  },
  mounted() {},
  data() {
    return {
      dataLoaded: false,
      tempPortfolio: [],
      stockData: [],
      //The array with the rdiffs as returned from quandl
      stockDeltas: [],
      //The array with the values as returned from quandl
      stockValue: [],
      //Matrix with arrays of the rdiffs
      stockIncreases: [],
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
        "#263745",
        "#BE481A",
        "#D6AB3B",
        "#029B5E",
        "#007A66",
        "#1A6288",
        "#643A70",
        "#97302A"
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
                scaleLabel: {
                  display: true,
                  labelString: "USD"
                }
              }
            ]
          }
        }
      },
      stockInfo: [
        // {
        //   name: "FB",
        //   startDate: "2017-12-01",
        //   endDate: "2017-12-31",
        //   frequency: "weekly",
        //   lastUpdated: "2014-01-05",
        //   lastStockValue: 54,
        //   lastHoldingValue: 1000
        // },
        // {
        //   name: "GE",
        //   startDate: "2017-12-01",
        //   endDate: "2017-12-31",
        //   frequency: "weekly",
        //   lastUpdated: "2014-01-05",
        //   lastStockValue: 27.48,
        //   lastHoldingValue: 2000
        // }
      ]
    };
  },
  computed: {
    //Creates an array with random values between 1.07 and 1.1 for benchmark
    betaBenchmark() {
      let tempBetas = [];
      for (var i = 0; i < this.stockIncreases[0].length; i++) {
        tempBetas.push(Math.random() * (1.1 - 1.07) + 1.07);
      }
      return tempBetas;
    },
    //Adds the value in dollars of all stocks in the portfolio
    totalHoldingValue() {
      return this.currentHoldingValue.reduce((acc, curr) => {
        return acc + curr;
      });
    }
  },
  methods: {
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
    calculateReturnDeltas() {
      for (let i = 0; i < this.stockDeltas.length; i++) {
        let returnVector = [];
        for (let j = 1; j < this.stockDeltas[i].dataset.data.length; j++) {
          returnVector.push(this.stockDeltas[i].dataset.data[j][1]);
        }
        this.stockIncreases.push(returnVector);
      }
    },
    //Takes the value data from the query to quandl into an array
    calculateValueDeltas() {
      for (let i = 0; i < this.stockValue.length; i++) {
        let returnVector = [];
        let datesVector = [];
        for (let j = 0; j < this.stockValue[i].dataset.data.length; j++) {
          returnVector.push(this.stockValue[i].dataset.data[j][1]);
          datesVector.push(this.stockValue[i].dataset.data[j][0]);
        }
        this.stockValueFiltered.push(returnVector);
        this.plotObject.labels = datesVector;
      }
    },
    initializeData() {
      for (var i = 0; i < this.stockInfo.length; i++) {
        var name = this.stockInfo[i].name;
        console.log(name);
        this.stockData.push(`{${name}: {}}`);
      }
    },
    preparePlotData() {
      for (var i = 0; i < this.stockInfo.length; i++) {
        var label = this.stockInfo[i].name;
        var data = this.stockValueFiltered[i];
        let plotData = {
          label: label,
          borderColor: "#f87979",
          data: data
        };
        this.plotObject.datasets.push(plotData);
      }
    },
    //Push the stock name to the data: { labels: [array
    //Picks a random color and pushes it to data: { datasets: [{ backgroundColor: [ array
    //Pushes the value of the portfolio allocation to data: { datasets: [{ data: [ array
    preparePieChartData() {
      let colorsArray = [];
      for (var i = 0; i < this.stockInfo.length; i++) {
        console.log(this.stockInfo.length);
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