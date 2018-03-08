<template>

    <div class="text-center row justify-content-center">
      <h2>this is the landing page</h2>
      <div class="col-lg-8 col-sm-8">
            <b-button  type="button" to="/signup" variant="dark">Signup</b-button>
      </div>
    </div>
 
  <!-- <div>
    <new-comment :user="message"></new-comment>
  </div> -->
  
</template>


<script>
import NewComment from "@/components/NewComment.vue";

export default {
  name: "About",
  components: {
    NewComment
  },
  data() {
    return {
      message: {
        user: "Manuel",
        content: "Testing a message",
        date: "2018-02-28",
        imageURL:
          "https://cdn.pixabay.com/photo/2014/10/21/14/46/mongoose-496374_960_720.jpg"
      }
    };
  }
};
</script>