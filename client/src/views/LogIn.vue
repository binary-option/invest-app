<template>
  <section>
   <!-- notification for errors missing  -->
    
     <b-alert variant ="danger" show v-if="error" >
      {{ error}} 
    </b-alert>

    <form @submit.prevent="login">
     
      <label>Username</label>
          <input maxlength="30" v-model="username" required icon="account">
   

      <label>Password</label>
          <input type="password"
            required
            v-model="password" 
            icon="lock"
            password-reveal>
          
      
      <button class="button is-primary">Login</button>
    </form>
  </section>
</template>

<script>
import { login } from "../api";
export default {
  data() {
    return {
      username: "",
      password: "",
      error: null
    };
  },
  methods: {
    login() {
      this.error = null;
      console.log("error =" + this.error);
      login(this.username, this.password)
        .then(user => {
          this.$root.user = user;
          this.$router.push("/");
        })
        .catch(err => {
          this.error = err;
          console.log("error1 =" + this.error);
        });
    }
  }
};
</script>
