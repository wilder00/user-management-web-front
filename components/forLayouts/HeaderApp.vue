<template>
  <nav>
    <div>
      <!-- Image and text -->
      <b-navbar variant="primary" type="light">
        <b-navbar-brand href="#">
          <!-- <img src="https://placekitten.com/g/30/30" class="d-inline-block align-top" alt="Kitten"> -->
          <!-- <b-avatar src="https://placekitten.com/300/300"></b-avatar> -->
          <b-avatar :src='require("~/assets/images/general/wilduser.svg")'></b-avatar>
          <span class="font-weight-bold text-black-50">
            WildUsers
          </span>
        </b-navbar-brand>

        <div class="ml-auto">
          <span class="text-white">{{ fullName }}</span>
        </div>
      </b-navbar>
    </div>
  </nav>
</template>
<script>
export default {
  computed: {
    fullName(){
      return ` ${ this.$auth.user.name } ${ this.$auth.user.lastName }`
    }
  }
}
</script>
