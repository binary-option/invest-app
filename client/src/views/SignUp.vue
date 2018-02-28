<template>
  <section>
    <form @submit.prevent="signup">

      <div class="field">
      <label class="label">Name</label>
      <div class="control">
      <input class="input" type="text" v-model="name">
      </div>
      </div>

    <div class="field">
      <label class="label"
      :type="usernameError && 'is-danger'"
      :message="usernameError">
      Username</label>
      <div class="control">
        <input class="input" maxlength="30" v-model="username" required icon="account">
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="password"
            required
            v-model="password" 
            icon="lock"
            password-reveal>
        </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button type="submit" class="button is-link">Signup</button>
      </div>
    </div>
      
    </form>
  </section>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      name: "",
      username: "",
      password: "",
      error: null
    };
  },
  methods: {
    signup() {
      this.error = null;
      api
        .signup({
          name: this.name,
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.push("/login");
        })
        .catch(err => {
          this.error = err;
        });
    }
  },
  computed: {
    usernameError() {
      if (!this.error) return null;
      if (this.error.name === "UserExistsError") {
        return this.error.message;
      }
    }
  }
};
</script>
