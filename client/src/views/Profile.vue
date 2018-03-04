
<template>
<div class="container">
    <div class="row justify-content-md-center">
    <div class="col-lg-10">
    <div class="modal-dialog">
		<div class="modal-content">
    
    <div class="modal-heading">
        <br>
				<h1 class="text-center">{{$root.user.name}} profile</h1>
		</div>
    <b-form>
        <br>
         <br>
        <div class="row justify-content-md-center">
          <b-img  class="profile-picture" :src="userInfo.picture" width="200" />
        </div>
        <br>
       
      <b-form-group class="ml-3 mr-3" label="Name:"> 
         <b-form-input :value="userInfo.name"></b-form-input>
        </b-form-group>

        <b-form-group class="ml-3 mr-3" label="Family name">
         <b-form-input :value="userInfo.familyName"></b-form-input>
        </b-form-group>

         <b-form-group class="ml-3 mr-3" label="Role:">
        <b-form-input :value="userInfo.role"></b-form-input>
      </b-form-group>

      <b-form-group class="ml-3 mr-3" label="Username" >
         <b-form-input :value="userInfo.username" ></b-form-input>
        </b-form-group>

      <b-form-group class="ml-3 mr-3" label="IBAN" >
         <b-form-input ></b-form-input>
        </b-form-group>
      
    <br>
     <div class="row justify-content-md-center">
        <b-button href="/edit" variant="primary">Edit</b-button>
      </div>
      <br>
      <br>
    </b-form>
  </div>
  </div>
  </div>
  </div>
</div>


</template>

<script>
import { getUser } from "../api";

export default {
  data() {
    return { userInfo: {} };
  },
  created() {
    const userId = this.$root.user.id;
    getUser(userId).then(userInfo => {
      this.userInfo = userInfo;
    });
  }
};
</script>

<style scoped>
.profile-picture {
  height: 100px;
}
</style>