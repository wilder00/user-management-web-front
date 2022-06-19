<template>
  <div id="layout" class="bg-gray-100">
    <div class="header">
      <HeaderApp />
    </div>
    <div class="side-nav">
      <SideNav />
    </div>
    <main class="main">
      <Nuxt />
    </main>
    
  </div>
</template>
<script>
import HeaderApp from '~/components/forLayouts/HeaderApp'
import SideNav from '~/components/forLayouts/SideNav.vue'
export default {
  components: { HeaderApp, SideNav },
}
</script>

<style lang="scss" scoped>
#layout {
  height: 100vh;
  overflow: hidden !important;
  display: grid;
  grid-template-columns: repeat(2, 120px) repeat(6, auto);
  grid-template-rows: auto repeat(5,1fr);

  .header{
    grid-column-start: 1;
    grid-column-end: 9;
    grid-row: 1;
  }
  .side-nav{
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 7;
  }
  .main{
    grid-column-start: 3;
    grid-column-end: 9;
    grid-row-start: 2;
    grid-row-end: 7;

    overflow-y: auto !important;
    padding: 2rem 0;
  }
}
</style>