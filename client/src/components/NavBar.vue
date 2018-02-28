<template>
<nav class="navbar is-transparent">
  
  <div class="navbar-brand">
    <router-link class="navbar-item" to="/">
      <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
    </router-link>
 
  </div>

  <div class="navbar-menu" :class="{ 'is-active': isActive }">
    <div class="navbar-start">
      <router-link
        class="navbar-item" to="/about"
        @click.native="isActive = false"
      >
        About
      </router-link>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control">
            <router-link
              class="navbar-item" to="/login"
              @click.native="isActive = false"
            >
              Login
            </router-link>
          </p>
          <p class="control">
            <router-link
              class="navbar-item" to="/signup"
              @click.native="isActive = false"
            >
              Signup
            </router-link>
          </p>
        </div>
        <div class="field is-grouped">
          <p class="control">
           
          </p>
          <p class="control">
            <a href="#"
              class="navbar-item"
              @click="logout"
            >
              Logout
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</nav>

</template>


<script>
import { logout } from "../api";

export default {
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    logout() {
      logout();
      this.$root.user = null;
      this.$router.push("/login");
    }
  }
};
</script>


