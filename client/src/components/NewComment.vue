<template>

<div class="container">
  <div class="row ">
    <div class="col-lg-6 col-sm-12">

    <div class="card">
      <div class="card-body">
        <span class="card-title h5"> Add a commment: </span>
        <br/>
        <textarea class="form-control" v-model="content"></textarea>
        <br/>
        <button type="submit" @click="$emit('addComment',content)" class="btn btn-primary btn-sm">Submit</button>
      </div>
    </div>
    </div>
  </div>
</div>

</template>

<script>
export default {
  props: ["user"],
  name: "NewComment",
  data() {
    return {
      content: ""
    };
  }
};
</script>
