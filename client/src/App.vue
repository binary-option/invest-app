<template>
  <div id="app" class="app-size">
    <NavBar/>
    <br>
    <br>
    <section class="section">
      <pre>{{$root.user}}
      searchWord {{this.$root.searchWord}}
      portfolioId {{$root.portfolioId}}
      </pre>
      <router-view/>
     
    </section>
      <div slot="footer">
        <small class="text-muted"><span class="oi oi-aperture" title="icon name" aria-hidden="true"></span><strong>Invest-app</strong> by Ironhack WebDev Cohort (c) 2018</small>
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
    if (user) {
      this.$root.user = user;
    } else if (this.$route.meta.requiresAuth) this.$router.push("/login");
  }
};
</script>

<style>
.app-size {
  min-width: 370px;
}
</style>

