<template>
  <div id="app">
    <div id="nav">
      <NavBar/>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  components: { NavBar }
};
</script>
