<template>

<div id="slider">
  <slider animation="fade" style="height: 400px">
  <p style="line-height: 280px; font-size: 5rem;  text-align: center;" v-if="!list.length">Loading...</p>
  <slider-item v-for="(i, index) in list" :key="index">
    <div :style="i">
       <b-button  type="button" to="/signup" variant="dark">Signup</b-button>
      <p style="line-height: 1000px; font-size: 2rem; text-align: center; "> 
          
        <b-button  class= "btn btn-lg align-self-center" type="button" to="/signup" variant="primary">Signup</b-button>
      </p>
     
    </div>
  </slider-item>
</slider>
</div>
<!-- 
    <div class="text-center row justify-content-center">
      <h2>this is the landing page</h2>
      <div class="col-lg-8 col-sm-8">
            <b-button  type="button" to="/signup" variant="dark">Signup</b-button>
      </div>
    </div>
  -->
 
</template>


<script>
import NewComment from "@/components/NewComment.vue";
import { Slider, SliderItem } from "vue-easy-slider";

export default {
  name: "About",
  components: {
    Slider,
    SliderItem
  },
  data() {
    return {
      list: [
        { backgroundColor: "#3f51b5", width: "100%", height: "100%" },
        { backgroundColor: "#eee", width: "100%", height: "100%" },
        { backgroundColor: "#f44336", width: "100%", height: "100%" }
      ]
    };
  },
  methods: {
    test() {
      console.log(1);
    }
  },

  mounted() {
    setTimeout(() => {
      this.list = [
        { backgroundColor: "#3f51b5", width: "100%", height: "100%" },
        { backgroundColor: "#eee", width: "100%", height: "100%" },
        { backgroundColor: "#f44336", width: "100%", height: "100%" }
      ];
    }, 1000000);
  }
};
</script>

<style>
p {
  margin: 0;
}
</style>