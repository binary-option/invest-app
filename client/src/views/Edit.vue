
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
          <b-img   v-bind:src="userInfo.picture.name" width="200" alt="Profile Picture"/>
        </div>
        <br>



        <div class="ml-3 mr-3">
        <b-form-file  v-model="files" :state="Boolean(files[0])" placeholder="Choose a file..."></b-form-file>
        <div class="mt-3" v-if="files && files.length">Selected file:  {{ files[0].name}}</div>
{{this.files[0]}}
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

      <b-form-group class="ml-3 mr-3" label="IBAN" >
         <b-form-input ></b-form-input>
        </b-form-group>

  <br>
     <div class="row justify-content-md-center">
        <b-button type="submit" variant="primary">Submit</b-button>
        </div>
           <br>
            <br>

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
      userInfo: {
        picture: {},
        name: "",
        familyName: "",
        role: "",
        username: "",
        password: ""
      },
      files: []
    };
  },
  created() {
    const userId = this.$root.user.id;
    getUser(userId).then(userInfo => {
      this.userInfo = userInfo;
    });
  },
  methods: {
    updateUser() {
      const userId = this.$root.user.id;
      const picture = this.files[0];
      const userInfo = {
        picture: picture,
        name: this.name,
        familyName: this.familyName,
        role: this.role,
        username: this.username,
        password: this.password
      };
      updateUser(userId, this.userInfo)
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