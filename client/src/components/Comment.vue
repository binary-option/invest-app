<template>
<div class="container">
  <div class="row ">
    <div class="col-lg-6 col-sm-12">

    <div class="card">
      <div class="card-body">
        <img :src="message.imageURL" class="user-image"><span class="h5">   {{message.user}} wrote on </span><span class="h5 pull-right">{{message.date}}</span>
          <div class="text item">
          {{message.content}}
          </div>
      </div>
    </div>
    </div>
  </div>
</div>


</template>

<script>
export default {
  props: ["message"],
  name: "Comment"
};
</script>


<style>
.user-image {
  border-radius: 50%;
  height: 40px;
}
</style>