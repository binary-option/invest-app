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
         <div class="input-group mb-3">
         <b-form-input  v-model="username" required ></b-form-input>
         <div class="input-group-append">
            <span class="input-group-text" id="basic-addon1">
              <span class="oi oi-person"></span>
            </span>
          </div>
          </div>
        </b-form-group>


        <b-form-group label="Password">
          <div class="input-group mb-3">
          <b-form-input type="password"  class="form-control" v-model="password" required> </b-form-input>
          <div class="input-group-append">
            <span class="input-group-text" id="basic-addon1">
              <span class="oi oi-lock-locked"></span>
            </span>
          </div>
          </div>
        </b-form-group>
         
 <!-- icon="lock"
password-reveal> -->
      <br>
       <div class="row justify-content-md-center">
       <b-button type="submit" variant="dark">Login</b-button>
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
