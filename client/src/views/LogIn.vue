<template>
  <section>

    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-lg-5 col-md-6 col-sm-9 col-xs-12">
            <div class="modal-dialog">
	        	<div class="modal-content">
	      	
          	<div class="modal-heading">
            <br>
		    		<h2 class="text-center">Login</h2>
	    		</div>
			    <hr />
		    	<div class="modal-body">
			  	<b-alert variant ="danger" show v-if="error" >
          {{ error}} 
         </b-alert>


 <b-form @submit.prevent="login">
        <b-form-group label="Username">
         <b-form-input maxlength="10" v-model="username" required ></b-form-input>
        </b-form-group>
        <b-form-group label="Password">
         <b-form-input type="password" v-model="password" required></b-form-input>
        </b-form-group>
 <!-- icon="lock"
password-reveal> -->
      <br>
       <div class="row justify-content-md-center">
       <b-button type="submit" variant="primary">Login</b-button>
        </div>
     <br >
      <br>
   </b-form>
</div>
  </div>
</div>
  </div>
</div>
</div>
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
