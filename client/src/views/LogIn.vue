<template>
  <section>
   <!-- notification for errors missing  -->
    
     <b-alert variant ="danger" show v-if="error" >
      {{ error}} 
    </b-alert>


 <b-form @submit.prevent="login">
        <b-form-group label="Username">
         <b-form-input maxlength="10" v-model="username" required ></b-form-input>
        </b-form-group>
        <b-form-group label="Password">
         <b-form-input type="password"v-model="password" required></b-form-input>
        </b-form-group>
 <!-- icon="lock"
password-reveal> -->
    <b-button type="submit" variant="primary">Login</b-button>
   </b-form>
 
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
