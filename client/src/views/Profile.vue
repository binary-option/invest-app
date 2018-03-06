
<template>
<div class="container">
   
    <div class="col-lg-10">
    <div class="modal-dialog">
		<div class="modal-content">
   
    <div class="modal-heading text-center">
        <br>
				<h1 class="text-center">{{$root.user.name}} profile</h1>
        <br>
         <br>
          <b-img  rounded class="profile-picture img-fluid" thumbnail :src="userInfo.picture" alt="Profile Picture" />
        <br>
		</div>
      
    <div class="text-center">
        <b-form>
      <b-form-group class="ml-3 mr-3" label="Name:"> 
         <b-form-input readonly :value="userInfo.name"></b-form-input>
        </b-form-group>

        <b-form-group class="ml-3 mr-3" label="Family name">
         <b-form-input readonly :value="userInfo.familyName"></b-form-input>
        </b-form-group>

         <b-form-group class="ml-3 mr-3" label="Role:">
        <b-form-input readonly :value="userInfo.role"></b-form-input>
      </b-form-group>

      <b-form-group class="ml-3 mr-3" label="Username" >
         <b-form-input readonly :value="userInfo.username" ></b-form-input>
        </b-form-group>

      <b-form-group class="ml-3 mr-3" label="IBAN" >
         <b-form-input readonly ></b-form-input>
        </b-form-group>
      
    <br>
        <b-button href="/edit" variant="primary">Edit</b-button>
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
  height: 130px;
}
</style>