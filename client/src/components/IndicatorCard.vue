<template>
<div class="container">
  <div class="row">
    <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
      <div class="card mx-auto" >
        <div class="card-body">
            <h5 class="card-title text-center">Portfolio return</h5>
            <h2 class="card-text text-center">16%</h2>
            <star-rating class="star-rating" :rating="3" :read-only="true" :show-rating="false" :star-size="25"></star-rating>
        </div>
        </div>
    </div>
    <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
      <div class="card mx-auto" >
        <div class="card-body">
            <h5 class="card-title text-center">Portfolio return</h5>
            <h2 class="card-text text-center">16%</h2>
            <star-rating class="star-rating" :rating="3" :read-only="true" :show-rating="false" :star-size="25"></star-rating>
        </div>
        </div>
    </div>
    <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
      <div class="card mx-auto" >
        <div class="card-body">
            <h5 class="card-title text-center">Portfolio return</h5>
            <h2 class="card-text text-center">16%</h2>
            <star-rating class="star-rating" :rating="3" :read-only="true" :show-rating="false" :star-size="25"></star-rating>
        </div>
        </div>
    </div>
    <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
      <div class="card mx-auto" >
        <div class="card-body">
            <h5 class="card-title text-center">Portfolio return</h5>
            <h2 class="card-text text-center">16%</h2>
            <star-rating class="star-rating" :rating="3" :read-only="true" :show-rating="false" :star-size="25"></star-rating>
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


