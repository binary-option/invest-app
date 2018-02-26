<template>
  <div class="home">
    <img src="../assets/logo.png">
    {{users}}
  </div>
</template>

<script>
// @ is an alias to /src
import { getUsers } from "@/api";

export default {
  name: "home",
  components: {},
  created() {
    getUsers().then(users => {
      console.log(users);
      this.users = users;
    });
  },
  data() {
    return {
      users: {}
    };
  }
};
</script>
