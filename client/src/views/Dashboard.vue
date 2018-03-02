<template>
<div> 
 <b-container fluid class="bv-example-row">
      <div class="row justify-content-md-center mb-3">
          <h1>{{$root.user.name}} dashboard </h1>
      </div>
    <b-row>
        <b-col sm="4" class="border border-primary" >
	   Side colomn
        
        <figure class="image is-24x24"> <img :src="$root.user.picture"> </figure>
      
        </b-col>
         <b-col sm="8" class="border border-secondary"  >
	   Cards
        </b-col>
    </b-row>
</b-container>


</div>
</template>

<script>
</script>