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
      <button class="btn btn-lg btn-primary btn-block position-relative" type="submit">
        <span v-if="isLoading" class="spinner position-absolute" >
          <b-spinner class="" small variant="" label="Small Spinner"></b-spinner>
        </span>
        <span :class="{'invisible': isLoading}">Registrarse</span>
      </button>
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
      isLoading: false,
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
      if(this.isLoading === true) return;
      this.isLoading = true
      try {
        const response = await this.$axios.post('/auth/register', this.registerForm)
        if( response.status >= 200  && response.status <= 299 ){ // statusText es 'Created' y no 'OK', en el deploy llega vacío
          this.resetForm();
          const user = response.data
          this.makeToast(
            `${user.name}, debes esperar a que un administrador acepte tu registro.`,
            'success',
            'Registro exitoso'
          )
        }else{
          const message = response.data.message;
          const text = typeof(message) === 'string'? message : message[0]
          this.makeToast(
            ` ${text}. El estatus no es satisfactorio.`,
            'danger',
            'Registro fallido'
          )
        }

      } catch (error) {
        if (error.response){
          const message = error.response.data.message;
          if(message){
            const text = typeof(message) === 'string'? message : message[0]
            this.makeToast(text, 'danger', 'Registro fallido')
          }
        }else{
          this.makeToast(
            `En caso de persistir el error, comunicarse con un administrador`,
            'danger',
            'Registro fallido'
          )
        }
      }finally{
        this.isLoading = false;
      }
    },

    resetForm(){
      this.registerForm.name = ''
      this.registerForm.lastName = ''
      this.registerForm.email = ''
      this.registerForm.password = ''
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

  .spinner {
    left:50%; 
    top: 50%; 
    object-position: center;
    transform: translate(-50%,-50%)
  }
}
</style>