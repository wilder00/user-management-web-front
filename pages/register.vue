<template>
<div id="loginView" class="container text-center">

    <form class="form-signin" @submit.prevent="onRegisterUser">
      <img class="mb-4" :src="require('assets/images/general/wilduser.svg')" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Wild User</h1>

      <label for="inputName" class="sr-only">Nombre</label>
      <input id="inputName" v-model="registerForm.name" type="text"  class="form-control" placeholder="Nombre" required="true">

      <div class="mt-2"></div>
      <label for="inputLastName" class="sr-only">Apellido</label>
      <input id="inputLastName" v-model="registerForm.lastName" type="text"  class="form-control" placeholder="Apellido" required="true">
      
      <div class="mt-2"></div>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input id="inputEmail" v-model="registerForm.email"  type="email"  class="form-control" placeholder="Correo" required="true" autofocus="">
      
      <div class="mt-2"></div>
      <label for="inputPassword" class="sr-only">Password</label>
      <input id="inputPassword" v-model="registerForm.password"  type="password"  class="form-control" placeholder="Contraseña" required="true">
      
      
      <div class="mt-5"></div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Registrarse</button>
      <p class="mt-5 mb-3 text-muted">¿Ya tienes cuenta? <NuxtLink to="/login">Iniciar sesión</NuxtLink> </p>
    </form>
  

</div>
</template>

<script>
export default {
  auth: 'guest',
  layout: "guests",
  data () {
    return {
      registerForm:{
        name:'',
        lastName:'',
        email:'',
        password:'',
      },
      toastCount: 0,
    }
  },

  methods: {
    async onRegisterUser(){

      try {
        const resp = await this.$axios.post('/auth/register', this.registerForm)
        if(resp.statusText === 'OK'){
          const user = resp.data
          this.makeToast(
            `${user.name}, debes esperar a que un administrador acepte tu registro.`,
            'success',
            'Registro exitoso'
          )
        }else{
          const message = resp.data.message;
          this.makeToast(
            ` ${message[0]}. En caso de persistir el error, comunicarse con un administrador`,
            'danger',
            'Registro fallido'
          )
        }

      } catch (error) {
        if (error.response){
          let message="";
          message = error.response.data.message;
          this.makeToast(
            ` ${ message[0] }`,
            'danger',
            'Registro fallido'
          )
        }else{
          this.makeToast(
            `En caso de persistir el error, comunicarse con un administrador`,
            'danger',
            'Registro fallido'
          )
        }
      }
    },

    makeToast(message, variant, title = "", solid = false) {
      this.toastCount++
      this.$bvToast.toast(message, {
        title,
        toaster: 'b-toaster-bottom-left',
        autoHideDelay: 5000,
        noAutoHide: true,
        appendToast: true,
        variant,
        solid,
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#loginView{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

}
</style>