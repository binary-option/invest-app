<template>
  <div class="container">
    <div class="text-center row justify-content-center">
      <div class="col-lg-8 col-sm-8">
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
  methods: {
    search() {
      this.$router.push("/search");
    }
  }
};
</script>
