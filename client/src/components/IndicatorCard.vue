<template>
<div class="container">
  <div class="row">
    <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
      <div class="card mx-auto" >
        <div class="card-body">
            <h5 class="card-title text-center" v-b-tooltip title="Increase in value in percent, for the given period.">Portfolio's return</h5>
            <h2 class="card-text text-center">16%</h2>
            <star-rating class="star-rating" :rating="rating.return" :read-only="true" :show-rating="false" :star-size="25"></star-rating>
        </div>
        </div>
    </div>
    <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
      <div class="card mx-auto" >
        <div class="card-body">
            <h5 class="card-title text-center" v-b-tooltip title="Increase in value in percent, for the given period of Standard&Poors 500 index.">Benchmarks's return</h5>
            <h2 class="card-text text-center">16%</h2>
            <star-rating class="star-rating" :rating="rating.returnBenchmark" :read-only="true" :show-rating="false" :star-size="25"></star-rating>
        </div>
        </div>
    </div>
    <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
      <div class="card mx-auto" >
        <div class="card-body">
            <h5 class="card-title text-center" v-b-tooltip title="Alpha gives an estimate of how the pottfolio compared to the market. A high, positive value is a good thing.">Portfolio's alpha</h5>
            <h2 class="card-text text-center">16%</h2>
            <star-rating class="star-rating" :rating="rating.alpha" :read-only="true" :show-rating="false" :star-size="25"></star-rating>
        </div>
        </div>
    </div>
    <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
      <div class="card mx-auto" >
        <div class="card-body">
            <h5 class="card-title text-center" v-b-tooltip title="Beta measures the portfolio's risk compared to the market. A value between 1 and 2.5 is a good thing.">Portfolio's beta</h5>
            <h2 class="card-text text-center">16%</h2>
            <star-rating class="star-rating" :rating="rating.beta" :read-only="true" :show-rating="false" :star-size="25"></star-rating>
        </div>
        </div>
    </div>
  </div>
</div>
  
</template>

<script>
import StarRating from "vue-star-rating";
export default {
  components: {
    StarRating
  },
  props: ["rating", "read-only"],
  name: "IndicatorCard"
};
</script>

<style>
.star-rating {
  display: flex;
  justify-content: center;
}
</style>


