<template>
<div>
<div class="container">
  <div class="row ">
    <div class="col-lg-8 col-sm-12">

    <div class="card">
      <div class="card-body">
        <img :src="imageURL" class="user-image"><span class="h5">   {{name}} wrote on </span><span class="h5 pull-right">{{date}}</span>
          <div class="text item">
          {{content}}
          </div>
      </div>
    </div>
    </div>
  </div>
</div>
<br/>
</div>


</template>

<script>
import moment from "moment";
export default {
  props: ["imageURL", "name", "date", "content"],
  name: "Comment"
};
</script>


<style>
.user-image {
  border-radius: 50%;
  height: 40px;
}
</style>