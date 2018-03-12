<template>
  <div class="container justify-content-center justify-text-center search-container">
    <br/>
    <br/>
    <br/>
    <h2 class="text-white text-center display-4">Search for a portfolio</h2>
    <br/>
    <div class="row text-center justify-content-center">
      <div class="col col-lg-8 col-md-8 col-sm-8 col-xs-12 align-self-center">

        	<b-alert variant ="secondary" show v-if="noWord" >
          Please enter a valid word to start your search
         </b-alert> 

        <div class="container">
        <b-form>

          <div class="row justify-content-center">
            <b-form-input class="search-input col col-lg-8 align-self-center" type="text"  v-model="word" placeholder="Type a word or stock handler (e.g. AMZN for Amazon Inc.)"/>
          </div>
          <br/>
          <br/>
          <div class="row justify-content-center">
            <br/>
            <b-button  class="btn" type="submit" variant="dark"  @click.prevent="search">Search</b-button>
          </div>
          
        </b-form>
        </div>
        <br/>
        <br/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      noWord: false,
      word: ""
    };
  },
  methods: {
    search() {
      this.$root.searchWord = this.word;
      if (this.$root.searchWord) this.$router.push("/search");
      else {
        this.noWord = true;
        (this.word = ""), this.$router.push("/searchNew");
      }
    }
  }
};
</script>

<style scoped>
.search-container {
  background-image: url("/pictures/search_bg.png");
  height: 100%;
  width: 100%;
  max-width: 1300px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0;
}
.search-input {
  width: 80%;
}
</style>