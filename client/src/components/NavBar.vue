<template>

<b-navbar toggleable="md" type="light" variant="light">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand>
      <router-link class="navbar-item" to="/">
      <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
    </router-link>
  </b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-nav-item href="/"  @click.native="isActive = false">(About)</b-nav-item>
      <b-nav-item href="/signup"  @click.native="isActive = false" >(Signup)</b-nav-item>
      <b-nav-item href="/login" @click="logout" >(Logout)</b-nav-item>
    </b-navbar-nav>

    <!-- Right aligned nav items -->

     <b-navbar-nav class="ml-auto" v-if="!$root.user">
    <b-button  variant='outline-primary' href="/login"  @click.native="isActive = false">Login</b-button>
    </b-navbar-nav>


    <b-navbar-nav class="ml-auto" v-else>
      <b-nav-form >
        <b-form-input  class="mr-sm-2" type="text" placeholder="Search"/>
        <b-button class="my-2 my-sm-0" type="submit" variant="primary">Search</b-button>
      </b-nav-form>
      <b-nav-item href="/dashboard" >Dashboard</b-nav-item>
      <b-nav-item-dropdown right>
       <template slot="button-content">
          <em> {{ $root.user.name }} </em>
        </template>
        <b-dropdown-item href="/profile"  @click.native="isActive = false">See my profile</b-dropdown-item>
        <b-dropdown-item href="/edit"  @click.native="isActive = false">Edit my profile</b-dropdown-item>
        <b-dropdown-item href="/wishlist"  @click.native="isActive = false">My wishlist</b-dropdown-item>
        <b-dropdown-item href="/login"  @click.native="isActive = false">Logout</b-dropdown-item>
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


