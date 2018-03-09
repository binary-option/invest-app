<template>
<div>
<div>

<<<<<<< HEAD
<div id="slider">
  <slider animation="fade" style="height: 400px">
  <p style="line-height: 280px; font-size: 5rem;  text-align: center;" v-if="!list.length">Loading...</p>
  <slider-item v-for="(i, index) in list" :key="index">
    <div :style="i">
       <b-button  type="button" to="/signup" variant="dark">Signup</b-button>
      <p style="line-height: 1000px; font-size: 2rem; text-align: center; "> 
          
        <b-button  class= "btn btn-lg align-self-center" type="button" to="/signup" variant="primary">Signup</b-button>
      </p>
     
=======
<div class="container justify-content-center justify-text-center search-container">
    <br/>
    <br/>
    <br/>
    <br/>
    <h2 class="h1 text-white text-center display-1">iInvest</h2>
    <br/>
    <h3 class="text-white text-center"> Take your financial future into your own hands</h3>
    <div class="row text-center justify-content-center">
      <div class="col-lg-12 col-sm-12">

        <div class="container">
        <b-form>

          <br/>
          <br/>
          <div class="row justify-content-center">
            <br/>
            <b-button  type="submit" variant="dark"  to="signup">Sign up</b-button>
          </div>
          
        </b-form>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
>>>>>>> f48c67e1c0c5100dd9f0514198f064bcac62c3b6
    </div>
  </div>

<br/>
<br/>
<div class="container-fluid landing-container">
  <div class="row">
    <div class="col d-flex justify-content-start landing-col-size">
      <div class="container">
        <div class="row">
          <div class="col col-lg-7">
            <div class="row">
              <div class="col col-lg-10">
                <h2>Advanced analytics on demand</h2>
                <p>Rating a single stock is complicated enough. Rating a whole portfolio is a huge undertaking and by no means trivial. At iInvest we do the heavy lifting for you, giving you the information you need, so that you can focus on what’s really important. </p>
                <h2>Intuitive indicators</h2>
                <p>Investing can be a tricky topic, especially when you have no previous knowledge. This is why we emphasized accessibility and simple, intuitive indicators. Just pick a portfolio, review the indicators and you will be able to reach sound financial decisions in no time. Feeling lost about what the different indicators mean? We've got you covered! Just hover over the financial terms for a short description. </p>
              </div>
            </div>
          </div>
          <div class="col col-lg-5">
            <img src="/pictures/analytics.png" height="100%">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col d-flex justify-content-start landing-col-size">
      <div class="container">
        <br/>
        <br/>
        <br/>
        <br/>
        <div class="row">
          <div class="col col-lg-5">
            <img src="/pictures/discuss.png" height="100%">
          </div>
          <div class="col col-lg-7">
            <div class="row">
              <div class="col col-lg-10">
                <h2>Full transparency </h2>
                <p>We know it is difficult to decide whom to trust managing your money, but it doesn’t have to be like that. Review the details of the portfolios up to a single transaction to fully understand your portfolio’s strategy. </p>
                <h2>Join the discussion</h2>
                <p>Our platform enables you to get in touch with current and prospective investors, as well as long-term customers of any given portfolio manager. By giving the investors a voice, we empower long-lasting relationships. </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<br/>
<br/>
</div>

<app-footer></app-footer>
</div>
</template>

<script>
import AppFooter from "@/components/AppFooter";

export default {
  components: {
    AppFooter
  }
};
</script>



<style>
.centered-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.landing-container {
  margin-left: 0;
  margin-right: 0;
}

.landing-container-pic,
.landing-container-row {
  padding: 0;
}

.landing-container-pic {
  background-size: cover;
  background-repeat: no-repeat;
  height: 60%;
}

.search-container {
  background-image: url("/pictures/search_bg.jpg");

  width: 100%;
  max-width: 1300px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.search-input {
  width: 80%;
}
</style>




