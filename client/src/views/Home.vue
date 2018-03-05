<template>
<div class="container text-center row justify-content-md-center">

    
  <div class="col-lg-8 col-sm-6 ">
    <b-form>
        <b-form-input  type="text"  v-model="$root.searchWord" placeholder="Search"/>
         <br>
       
        <b-button  type="submit" variant="primary"  @click.prevent="search">Search</b-button>
       
    </b-form>
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
