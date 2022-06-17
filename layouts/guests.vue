<template>
  <div id="layout" class="bg-gray-100">

    <main class="main">
      <Nuxt />
    </main>
    
  </div>
</template>
<script>

export default {

}
</script>

<style lang="scss" scoped>
#layout {
  height: 100vh;
  width: 100%;


  .main{
    height: 100%;
    width: 100%;    
    padding: 2rem 0;
  }
}
</style>