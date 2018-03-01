
<template>
<div>
<h1>Edit profile</h1>
   
    <b-form>
        <br>
        <div>
          <b-img  src="http://vvcexpl.com/wordpress/wp-content/uploads/2013/09/profile-default-male.png" width="200" />
        </div>
        <br>
        <br>
      <b-form-group label="Name:"> 
         <b-form-input :value="userInfo.name"></b-form-input>
        </b-form-group>

        <b-form-group label="Family name">
         <b-form-input :value="userInfo.familyName"></b-form-input>
        </b-form-group>

         <b-form-group label="Role:">
        <b-form-input :value="userInfo.role"></b-form-input>
      </b-form-group>

      <b-form-group label="Username" >
         <b-form-input :value="userInfo.username" ></b-form-input>
        </b-form-group>

        <div>
          <b-form-group label="Bank details" >
            <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="2"
                label="IBAN"
                label-for="inputHorizontal">
                <b-form-input id="inputHorizontal"></b-form-input>
            </b-form-group>
              <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="2"
                label="BIC"
                label-for="inputHorizontal">
                <b-form-input id="inputHorizontal"></b-form-input>
            </b-form-group>
              <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="2"
                label="Owner"
                label-for="inputHorizontal">
                <b-form-input id="inputHorizontal"></b-form-input>
            </b-form-group>
  </b-form-group>
</div>
    </b-form>
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
</template>