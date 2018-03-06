
<template>
 <div>
<!-- v-model for bankdetails missing -->

<div class="container">

        <div class="col-lg-10">
         <div class="modal-dialog">
		      <div class="modal-content">

          <div class="modal-heading text-center">
            <br>
			    	<h1 >Edit {{$root.user.name}} profile</h1>
	  	  </div>

   <div class="text-center">
    <b-form @submit.prevent="updateUser">
        <br>
          <b-img  rounded :src="userInfo.picture" class=" profile-picture img-fluid"  thumbnail alt="Profile Picture"/>
        <br>
        <br>
        <div class="ml-3 mr-3">
        <b-form-file  v-model="file" :state="Boolean(file)" placeholder="Choose a file..."></b-form-file>
       </div>
        <br>
        
        <b-form-group class="ml-3 mr-3" label="Name:"> 
         <b-form-input v-model="userInfo.name" :value="userInfo.name"></b-form-input>
        </b-form-group>
   

        <b-form-group class="ml-3 mr-3" label="Family name">
         <b-form-input v-model="userInfo.familyName" :value="userInfo.familyName"></b-form-input>
        </b-form-group>

         <b-form-group class="ml-3 mr-3" label="Role:">
          <b-form-select v-model="userInfo.role">
              <option :value="userInfo.username">{{userInfo.role}}</option>
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
        <b-button type="submit" variant="dark">Submit</b-button>       
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
        picture: "",
        name: "",
        familyName: "",
        role: "",
        username: "",
        password: ""
      },
      file: null
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
      const picture = this.file;
      const userInfo = {
        ...this.userInfo,
        picture: picture
      };
      updateUser(userId, userInfo)
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


<style scoped>
.profile-picture {
  height: 130px;
}
</style>