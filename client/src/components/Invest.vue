<template>
<div calass="container">
<div>
  <div class="row">
    <div class="col-lg-12 col-sm-12">

    <div class="card">
      <div class="card-body">
        <span class="card-title h4"> Invest now </span>
        <br/>
        <b-form @submit.prevent="signup" class="text-left">
            <b-form-group label="Your account balance">
          <b-form-input v-model="balance" readonly></b-form-input>
          </b-form-group>
          <b-form-group label="Amount">
          <b-form-input placeholder="Type a quantity in USD" v-model="quantity"></b-form-input>
          </b-form-group>
          <button type="submit" @click="$emit('invest',quantity)" class="btn btn-primary btn-block">Invest now</button>
        </b-form>
      </div>
    </div>
    </div>
  </div>
  </div>
  <br/>
  </div>

</template>

<script>
export default {
  props: ["balance"],
  name: "Invest",
  data() {
    return {
      quantity: null
    };
  }
};
</script>
