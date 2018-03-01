
<template>
 <div>
<h1>{{$root.user.name}} profile</h1>
    <b-form>
        <br>
        <div>
          <b-img  src="http://vvcexpl.com/wordpress/wp-content/uploads/2013/09/profile-default-male.png" width="200" />
        </div>
        <br>
        <br>
      <b-form-group label="Name">
         <b-form-input></b-form-input>
        </b-form-group>

        <b-form-group label="Family name">
         <b-form-input ></b-form-input>
        </b-form-group>

         <b-form-group label="Role:">
        <b-form-select required >
             <option>Select option</option>
            <option>client</option>
            <option>manager</option>
        </b-form-select>
      </b-form-group>

      <b-form-group label="Username" >
         <b-form-input  ></b-form-input>
        </b-form-group>

        <div>
          <b-form-group label="Bank details" >
            <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="4"
                breakpoint="md"
              
                label="IBAN"
                label-for="inputHorizontal">
                <b-form-input id="inputHorizontal"></b-form-input>
            </b-form-group>
              <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="4"
                breakpoint="md"
              
                label="IBAN"
                label-for="inputHorizontal">
                <b-form-input id="inputHorizontal"></b-form-input>
            </b-form-group>
              <b-form-group id="fieldsetHorizontal"
                horizontal
                :label-cols="4"
                breakpoint="md"
              
                label="IBAN"
                label-for="inputHorizontal">
                <b-form-input id="inputHorizontal"></b-form-input>
            </b-form-group>
  </b-form-group>
</div>

     
        </b-form-group>
    
    </b-form>
  </div>


</template>

<script>
export default {
  methods: {}
};
</script>