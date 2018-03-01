<template>
  <div id="app">
    <NavBar/>
    <br>
    <br>
    <section class="section">
      <router-view/>
    </section>
      <div slot="footer">
        <small class="text-muted"><strong>Invest-app</strong> by Ironhack WebDev Cohort (c) 2018</small>
      </div>
    <footer class="footer">
     
    </footer>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import { loadUser } from "./api";

export default {
  components: { NavBar },

  created() {
    const user = loadUser();
    if (user) this.$root.user = user;
  }
};
</script>
