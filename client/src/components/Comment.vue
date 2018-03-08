<template>
<div>
<div>
  <div class="row">
    <div class="col-lg-12 col-sm-12">

    <div class="card">
      <div class="card-body text-left">
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
  name: "Comment",
  data() {
    return {
      content: ""
    };
  }
};
</script>


<style>
.user-image {
  border-radius: 50%;
  height: 40px;
}
</style>