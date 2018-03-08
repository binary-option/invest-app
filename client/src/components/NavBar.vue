<template>

<b-navbar toggleable="md" type="light" variant="light">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand>
      <router-link class="navbar-item" to="/about">
      <img src="https://bulma.io/images/bulma-logo.png"  alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
    </router-link>
  </b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

  

    <!-- Right aligned nav items -->

<!-- if not logged in -->
     <b-navbar-nav class="ml-auto" v-if="!$root.user">
    <b-button  variant='outline-dark' to="/login"  @click.native="isActive = false">Login</b-button>
    </b-navbar-nav>

<!-- if logged in -->
    <b-navbar-nav class="ml-auto align-items-center" v-else>

       <b-nav-item to="/dashboard" >Dashboard</b-nav-item>
      <b-nav-item to="/"  @click.native="isActive = false">Find portfolio</b-nav-item>
      <b-nav-item-dropdown id="ddown-right" right text="Right align">
      <template slot="button-content">
        <em> 
          <div  v-if="!$root.user.picture">{{$root.user.name}}</div>
          <div  v-if="$root.user.picture" class="icon-image" >
            <b-img  rounded :src="$root.user.picture" fluid/>
          </div>
        </em>
      </template>
        <b-dropdown-item to="/profile"  @click.native="isActive = false">See my profile</b-dropdown-item>
        <b-dropdown-item to="/edit"  @click.native="isActive = false">Edit my profile</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item to="/wishlist"  @click.native="isActive = false">My wishlist</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item to="/login" @click="logout">Logout</b-dropdown-item>
      </b-nav-item-dropdown>
  
    </b-navbar-nav>  

  </b-collapse>
</b-navbar>



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

<style>
.icon-image {
  margin-top: -5px;
  margin-right: 5px;
  float: left;
  width: 30px;
  height: 30px;
}
</style>


