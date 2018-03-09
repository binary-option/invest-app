
<template>
  <div id="app" class="app-size">
    <NavBar/>
    <section class="section">
<router-view/>
     
    </section>
      <div slot="footer" class="text-center mt-5">
        <small class="text-muted"><strong>Invest-app</strong> by Manuel Rojas & Hanna Mazzoni <br> Ironhack Web Dev 2018</small>
      </div>
    <footer class="footer">
      
    </footer>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import { loadUser } from "./api";
import AppFooter from "./components/AppFooter";

export default {
  components: {
    NavBar,
    AppFooter
  },

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

#app {
  font-family: "Raleway", sans-serif;
}
</style>

