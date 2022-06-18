<template>
  <div class="loading-container d-flex justify-content-center align-items-center">
    <b-spinner :class="sizeClass" label="Busy"></b-spinner>
  </div>
</template>
<script>

export default {
  props: {
    size: {
      type: Number,
      default: 5,
    }  
  },
  data() {
    return {
    }
  },
  computed:{
    sizeClass(){
      return `m-${this.size}`;
    }
  }
}
</script>
<style lang="scss" scoped>
.loading-container{
  height: 100%;
  width: 100%;
}
</style>