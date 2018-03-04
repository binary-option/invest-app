<template>

<b-navbar toggleable="md" type="light" variant="light">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand>
      <router-link class="navbar-item" to="/">
      <img src="https://bulma.io/images/bulma-logo.png"  alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
    </router-link>
  </b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-nav-item href="/about"  @click.native="isActive = false">(About)</b-nav-item>
      <b-nav-item href="/signup"  @click.native="isActive = false" >(Signup)</b-nav-item>
      <b-nav-item href="/login" @click="logout" >(Logout)</b-nav-item>
    </b-navbar-nav>

    <!-- Right aligned nav items -->

     <b-navbar-nav class="ml-auto" v-if="!$root.user">
    <b-button  variant='outline-primary' href="/login"  @click.native="isActive = false">Login</b-button>
    </b-navbar-nav>


    <b-navbar-nav class="ml-auto align-items-center" v-else>

       <b-nav-item href="/dashboard" >Dashboard</b-nav-item>

      <b-nav-item-dropdown   left>
      <template slot="button-content">
        <em> 
          <div  v-if="!$root.user.picture">{{$root.user.name}}</div>
          <div  v-if="$root.user.picture" class="icon-image" >
            <b-img  rounded="circle" :src="$root.user.picture" fluid/>
          </div>
        </em>
      </template>
        <b-dropdown-item href="/profile"  @click.native="isActive = false">See my profile</b-dropdown-item>
        <b-dropdown-item href="/edit"  @click.native="isActive = false">Edit my profile</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item href="/wishlist"  @click.native="isActive = false">My wishlist</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item href="/login" @click="logout">Logout</b-dropdown-item>
      </b-nav-item-dropdown>

     
      <b-nav-form >
        <b-form-input  class="mr-sm-2" type="text" placeholder="Search"/>
        <b-button class="my-2 my-sm-0" type="submit" variant="primary">Search</b-button>
      </b-nav-form>
      
      

  
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


