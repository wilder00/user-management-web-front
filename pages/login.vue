<template>
<div id="loginView" class="container text-center">

    <form class="form-signin" @submit.prevent="onLogIn">
      <img class="mb-4" :src="require('assets/images/general/wilduser.svg')" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Wild User</h1>


      <label for="email" class="sr-only">Email address</label>
      <input id="email" v-model="credentialForm.email" type="email"  class="form-control" placeholder="Correo" required="true" autofocus="">
      <div class="mt-2"></div>
      
      <label for="password" class="sr-only">Password</label>
      <input id="password" v-model="credentialForm.password" type="password"  class="form-control" placeholder="Contraseña" required="true">
      <div class="mt-5"></div>
      
      <button class="btn btn-lg btn-primary btn-block position-relative" type="submit">
        
        <span v-if="isLoginLoading" class="spinner position-absolute" >
          <b-spinner class="" small variant="" label="Small Spinner"></b-spinner>
        </span>
        <span :class="{'invisible': isLoginLoading}">Iniciar Sesión</span>
      </button>
      <p class="mt-5 mb-3 text-muted">¿Sin cuenta? <NuxtLink to="/register">Regístrate</NuxtLink> </p>
    </form>
  

</div>
</template>

<script>
export default {
  auth: 'guest',
  layout: "guests",
  data(){
    return {
      isLoginLoading: false,
      credentialForm: {
        email:'',
        password:''
      }
    }
  },

  methods: {
    async onLogIn(){
      if(this.isLoginLoading){
        return;
      }

      try {
        this.isLoginLoading = true;
        const response = await this.$auth.loginWith('local', { data: this.credentialForm })
        if(response.statusText === 'OK'){
          this.makeToast(
            `Redirigiendo al portal`,
            'success',
            'Inicio de Sesión exitoso'
          )
        }
      } catch (err) {
        let message = ""
        message = 'Datos inválidos.'
        if(err.request){
          if(err.message === 'Network Error'){
            message = `Error al intentar conectarse`
          }
        }
        if(err.response){
          message = err.response.data.message;
          console.log(message);
          console.log(typeof(message) === 'string' ? message : message[0]);
          const text = typeof(message) === 'string' ? message : message[0]
          message = text;
        }

        this.makeToast(
          ` ${ message }`,
          'danger',
          'Inicio de sesión fallido.'
        )
        this.isLoginLoading = false
      }finally{
        this.isLoginLoading = false;
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

  .spinner {
    left:50%; 
    top: 50%; 
    object-position: center;
    transform: translate(-50%,-50%)
  }

}
</style>