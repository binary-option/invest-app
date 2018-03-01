<template>
  <div class="about">
    <h1>This is an about page</h1>
    <pre>portfolioBeta {{portfolioBeta}}</pre>
    <pre>stockBetas {{stockBetas}}</pre>
    <pre>stockIncreases {{stockIncreases}}</pre>
    <pre>stockValueFiltered {{stockValueFiltered}}</pre>
    <pre>{{stockDeltas}}</pre>
    
  </div>
</template>


<script>
import { getStockDelta } from "@/apiHandler";
import { getStockValue } from "@/apiHandler";
import _ from "lodash";
import * as ss from "simple-statistics";
export default {
  name: "dishes",
  components: {},
  created() {
    // This array of promises makes sure that the functions are carried out when both callbacks are ready
    Promise.all([
      Promise.all(this.stockInfo.map(getStockDelta)),
      Promise.all(this.stockInfo.map(getStockValue))
    ]).then(([stockDelta, stockValue]) => {
      this.initializeData();
      this.stockDeltas = stockDelta;
      this.calculateReturnDeltas();

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
    });
  },
  mounted() {},
  data() {
    return {
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
      stockInfo: [
        {
          name: "FB",
          startDate: "2017-12-01",
          endDate: "2017-12-31",
          frequency: "weekly",
          lastUpdated: "2014-01-05",
          lastStockValue: 54,
          lastHoldingValue: "1000"
        },
        {
          name: "GE",
          startDate: "2017-12-01",
          endDate: "2017-12-31",
          frequency: "weekly",
          lastUpdated: "2014-01-05",
          lastStockValue: 27.48,
          lastHoldingValue: "2000"
        }
      ]
    };
  },
  computed: {
    betaBenchmark() {
      let tempBetas = [];
      for (var i = 0; i < this.stockIncreases[0].length; i++) {
        tempBetas.push(Math.random() * (1.1 - 1.07) + 1.07);
      }
      return tempBetas;
    },
    totalHoldingValue() {
      return this.currentHoldingValue.reduce((acc, curr) => {
        return acc + curr;
      });
    }
  },
  methods: {
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
    calculateReturnDeltas() {
      for (let i = 0; i < this.stockDeltas.length; i++) {
        let returnVector = [];
        for (let j = 1; j < this.stockDeltas[i].dataset.data.length; j++) {
          returnVector.push(this.stockDeltas[i].dataset.data[j][1]);
        }
        this.stockIncreases.push(returnVector);
      }
    },
    calculateValueDeltas() {
      for (let i = 0; i < this.stockValue.length; i++) {
        let returnVector = [];
        for (let j = 0; j < this.stockValue[i].dataset.data.length; j++) {
          returnVector.push(this.stockValue[i].dataset.data[j][1]);
        }
        this.stockValueFiltered.push(returnVector);
      }
    },
    initializeData() {
      for (var i = 0; i < this.stockInfo.length; i++) {
        var name = this.stockInfo[i].name;
        console.log(name);
        this.stockData.push(`{${name}: {}}`);
      }
    }
  }
};
</script>