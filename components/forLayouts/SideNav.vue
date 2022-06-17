<template>
  <nav id="sidenav" class=" ">
    <div class="sidenav-content pt-4 pl-2">
      <div class="list-group">
        <NuxtLink
          v-for="element in sidenavElements"
          :key="element.name" 
          :to="element.href" 
          class="list-group-item list-group-item-action"
        >
          {{ element.name }}
        </NuxtLink >
      </div>
      <div class="list-group mt-2">
        <b-list-group-item class="list-group-item list-group-item-action text-danger"   @click="onLogOut"  button>Cerrar Sesión</b-list-group-item>
        <!-- <NuxtLink to="#" @click="onLogOut" class="list-group-item list-group-item-action text-danger">
          Cerrar Sesión
        </NuxtLink > -->
      </div>

      <!-- <b-list-group>
        <b-list-group-item v-for="element in sidenavElements" :key="element.name" href="#some-link">

        </b-list-group-item>
      </b-list-group> -->

    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      sidenavElements: [
        {name: 'Usuarios', href:'/'},
        {name: 'Solicitudes', href:'/registerRequests'},
        {name: 'carter', href:'/a'}
      ]
    }
  },

  methods: {
    onLogOut(){
      this.$auth.logout();
      this.$router.push('/login')
    },
    /* isActive(path){
      const fullPath = this.$route.fullPath;
      return path === fullPath;
    } */
  }
}
</script>

<style lang="scss" scoped>
  #sidenav{
    height: 100%;
    width: 100%;
  }
</style>