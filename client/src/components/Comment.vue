<template>
  

<el-card class="box-card">
  <div slot="header" class="clearfix">
      <img :src="message.imageURL" class="user-image">
    <span>{{message.user}}</span> wrote on <span>{{message.date}}</span>
  </div>
  <div class="text item">
      {{message.content}}
  </div>
</el-card>

</template>

<script>
export default {
  props: ["message"],
  name: "Comment"
};
</script>


<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  /* width: 480px; */
}

.user-image {
  border-radius: 50%;
  height: 40px;
}
</style>