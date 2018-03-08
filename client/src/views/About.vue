<template>
  <div class="container">
    <h2>This is the search page</h2>
    <div class="text-center row justify-content-center">
      <div class="col-lg-8 col-sm-8">

        	<b-alert variant ="danger" show v-if="noWord" >
          Insert a word!
         </b-alert> 

        <b-form>
            <b-form-input  type="text"  v-model="$root.searchWord" placeholder="Type a word or stock handler (e.g. AAPL for Apple Inc."/>
            <br>
          
            <b-button  type="submit" variant="dark"  @click.prevent="search">Search</b-button>
          
        </b-form>
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
