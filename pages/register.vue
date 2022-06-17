<template>
<div id="loginView" class="container text-center">

    <form class="form-signin">
      <img class="mb-4" :src="require('assets/images/general/wilduser.svg')" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Registrarse</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Correo" required="" autofocus="">
      <div class="mt-2"></div>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
      
      <div class="mt-2"></div>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
      
      <div class="mt-2"></div>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
      
      <div class="mt-5"></div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Registrarse</button>
      <p class="mt-5 mb-3 text-muted">Ya tienes cuenta? <NuxtLink to="/login">Iniciar sesión</NuxtLink> </p>
    </form>
  




  <!-- <div class="card" style="width: 20rem;">
    <div class="card-body">
      
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1">
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div> -->

</div>
</template>

<script>
export default {
  auth: 'guest',
  layout: "guests"
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