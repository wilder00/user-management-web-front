<template>
  <nav id="sidenav" class=" ">
    <div class="sidenav-content pt-4 pl-2">
      <div class="list-group">
        <NuxtLink v-for="element in sidenavElements" :key="element.name" :to="element.href" class="list-group-item list-group-item-action">
          {{ element.name }}
        </NuxtLink >
      </div>
      <div class="list-group mt-2">
        <NuxtLink to="/logout" class="list-group-item list-group-item-action text-danger">
          Cerrar Sesión
        </NuxtLink >
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
        {name: 'Users', href:'/users'},
        {name: 'Employees', href:'/'},
        {name: 'carter', href:'/'}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  #sidenav{
    height: 100%;
    width: 100%;
  }
</style>