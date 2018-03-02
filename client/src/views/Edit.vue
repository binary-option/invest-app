
<template>
 <div>
<!-- v-model for bankdetails missing -->

<div class="container">
      <div class="row justify-content-md-center">
        <div class="col-lg-10">
  <div class="modal-dialog">
		<div class="modal-content">
    <div class="modal-heading">
        <br>
				<h1 class="text-center">Edit {{$root.user.name}} profile</h1>
		</div>

    <b-form @submit.prevent="updateUser">
        <br>
        <div class="row justify-content-md-center">
          <b-img   v-bind:src="userInfo.picture" width="200" alt="Profile Picture"/>
        </div>
        <br>

        <div class="ml-3 mr-3">
        <b-form-file  v-model="userInfo.picture" :state="Boolean(userInfo.picture)" placeholder="Choose a file..."></b-form-file>
        <div class="mt-3">Selected file: {{userInfo.picture && userInfo.picture.name}}</div>
        <b-form-input v-model="userInfo.picture" :value="userInfo.picture"></b-form-input>
       </div>
        <br>
        
        <b-form-group class="ml-3 mr-3" label="Name:"> 
         <b-form-input v-model="userInfo.name" :value="userInfo.name"></b-form-input>
        </b-form-group>
   

        <b-form-group class="ml-3 mr-3" label="Family name">
         <b-form-input v-model="userInfo.familyName" :value="userInfo.familyName"></b-form-input>
        </b-form-group>

         <b-form-group class="ml-3 mr-3" label="Role:">
          <b-form-select required v-model="userInfo.role" :value="userInfo.role">
              <option>Select option</option>
              <option>client</option>
              <option>manager</option>
          </b-form-select>
        </b-form-group>

        <b-form-group class="ml-3 mr-3" label="Username" >
         <b-form-input v-model="userInfo.username" :value="userInfo.username" ></b-form-input>
        </b-form-group>

        <div class="ml-3 mr-3">
          <div class="mt-4">Bank details:</div> 
         
            <b-form-group class="mt-3" id="fieldsetHorizontal"
                horizontal
                :label-cols="2"
                label="IBAN"
                label-for="inputHorizontal">
                <b-form-input  id="inputHorizontal"></b-form-input>
   
            </b-form-group>
              <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="2"
                label="BIC"
                label-for="inputHorizontal">
                <b-form-input  id="inputHorizontal"></b-form-input>
             
            </b-form-group>
              <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="2"
                label="Owner"
                label-for="inputHorizontal">
                <b-form-input  id="inputHorizontal"></b-form-input>
            </b-form-group>
  </b-form-group>
  <br>
     <div class="row justify-content-md-center">
        <b-button type="submit" variant="primary">Submit</b-button>
        </div>
           <br>
            <br>
</div>
    </b-form>
  </div>
</div>
</div>
</div>
</div>
</div>
</template>

<script>
import { getUser } from "../api";
import { updateUser } from "../api";

export default {
  data() {
    return {
      userInfo: {}
    };
  },
  created() {
    const userId = this.$root.user.id;
    getUser(userId).then(userInfo => {
      this.userInfo = userInfo;
    });
  },
  methods: {
    fullname(name, familyName) {
      fullname = this.name + this.familyName;
    },
    updateUser() {
      this.error = null;
      const userId = this.$root.user.id;
      updateUser(userId, {
        picture: this.picture,
        name: this.name,
        familyName: this.familyName,
        role: this.role,
        username: this.username,
        password: this.password
      })
        .then(() => {
          this.$router.push("/profile");
        })
        .catch(err => {
          this.error = err;
        });
    }
  }
};
</script>