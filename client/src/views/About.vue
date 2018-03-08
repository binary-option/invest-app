<template>
  <div class="container justify-content-center justify-text-center search-container">
    <br/>
    <br/>
    <br/>
    <br/>
    <h2 class="text-white text-center">Search for a portfolio</h2>
    <br/>
    <div class="row text-center justify-content-center">
      <div class="col-lg-12 col-sm-12">

        	<b-alert variant ="danger" show v-if="noWord" >
          Insert a word!
         </b-alert> 

        <div class="container">
        <b-form>

          <div class="row justify-content-center">
            <b-form-input class="search-input col col-lg-8 align-self-center" type="text"  v-model="$root.searchWord" placeholder="Type a word or stock handler (e.g. AMZN for Amazon Inc.)"/>
          </div>
          <br/>
          <br/>
          <div class="row justify-content-center">
            <br/>
            <b-button  type="submit" variant="dark"  @click.prevent="search">Search</b-button>
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
      noWord: false
    };
  },
  methods: {
    search() {
      if (this.$root.searchWord) this.$router.push("/search");
      else {
        this.noWord = true;
        this.$router.push("/");
      }
    }
  }
};
</script>

<style>
.search-container {
  background-image: url("/pictures/search_bg.jpg");
  height: 100%;
  width: 100%;
  max-width: 1300px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.search-input {
  width: 80%;
}
</style>
