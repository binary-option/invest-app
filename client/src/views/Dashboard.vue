<template>
<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
 <b-container  fluid class="bv-example-row">
     
      <div id="title" class="row justify-content-md-center mb-3">
          <h3>{{$root.user.name}} dashboard </h3>
      </div>
      
    
    <b-row class="row-eq-height">

        
        <div id="side-column"  class="col-lg-3 col-sm-12 border d-flex flex-column justify-content-start " >
        <div class="pt-5">
	   <p>Total risk</p>
       <p>Total investment</p>
       <p>Total benefit</p>
       </div>
        </div>
      
  
       
        <div id="card-column"  class="col-lg-9 col-sm-12 border  d-flex flex-row  align-items-center flex-wrap" >
	   
        
       <b-card  class="card" bg-variant="dark" text-variant="white">
             <p class="card-text">
            Some quick example text to build on the <em>card title</em> and make up the bulk of the card's content.
            </p>
            <br>
            <br>
            <br>
            <br>
            <br>
             <br>
            <br>
            <a href="#"
            class="card-link">Card link</a>
             <b-link href="#"
            class="card-link">Another link</b-link>
        </b-card>

        <b-card  class="card" bg-variant="secondary" text-variant="white">
             <p class="card-text">
            Some quick example text to build on the <em>card title</em> and make up the bulk of the card's content.
            </p>
            <br>
            <br>
            <br>
            <br>
            <br>
             <br>
            <br>
            <a href="#"
            class="card-link">Card link</a>
             <b-link href="#"
            class="card-link">Another link</b-link>
        </b-card>

        <b-card title="Title"
                header-tag="header"
                footer-tag="footer">
            <h6 slot="header"
            class="mb-0">Header Slot</h6>
            <em slot="footer">Footer Slot</em>
            <p class="card-text">Header and footers using slots.</p>
            <b-button href="#"
                      variant="primary">Go somewhere</b-button>
        </b-card>
         
      
         </div>
    </b-row>
</b-container>


</div>
</template>

<script>
</script>

<style>
#title {
  height: 50px;
  color: rgb(246, 250, 252);
  background-color: rgba(2, 14, 26, 0.884);
  padding-top: 5px;
}

#side-column {
  color: white;
  background-color: rgba(61, 64, 78, 0.623);
}

#card-column {
  overflow-y: auto;
  height: 100%;
  background-color: rgba(248, 251, 252, 0.1);
}

.row-eq-height {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.card {
  width: 550px;
  height: 300px;
  margin: 40px;
}
</style>