<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">correo</th>
          <th scope="col">Rol</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <th scope="row">{{index +1}}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ rolLabels[user.role] }}</td>
          <td>
            <b-button class="position-relative" variant="success" @click="acceptUser(user)">
              <span v-if="user.isBeingAccepted" class="spinner position-absolute" >
                <b-spinner class="" small variant="" label="Small Spinner"></b-spinner>
              </span>
              <span :class="{'invisible': user.isBeingAccepted}">Aceptar</span>
            </b-button>
            <b-button class="d-none" variant="danger">Button</b-button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="users.length <= 0" class="text-center">
      No hay solicitudes de usuarios
    </p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState('users', ['isUsersLoading', 'users']),
    ...mapState('roles', ['isRolesLoading', 'roles']),

    rolLabels(){
      return this.roles.reduce((prev,curr) => {
        prev[curr.roleName] = curr.label
        return prev
      },{})
    }
  },
  methods: {
    ...mapActions('users', ['fetchUserRequests']),

    async acceptUser(user){
      if(user.isBeingAccepted === true) return;
      try {
        user.isBeingAccepted = true;
        this.$forceUpdate();
        const response = await this.$axios.post(`users/requests/${user.id}`)
        if( response.status >= 200  && response.status <= 299 ){
          this.fetchUserRequests();
          this.makeToast(response.data.message, 'info', 'Usuario Aceptado')
        }else{
          throw new Error('No Se pudo obtener respuesta')
        }
      } catch (error) {
        if(error.response){
          user.isBeingAccepted = false;
          const message = error.response.data.message;
          if(message){
            const text = typeof(message) === 'string'? message : message[0]
            this.makeToast(text, 'danger', 'Aceptación fallida')
          }else{
            this.makeToast("No está disponible el servicio.", 'danger', 'Aceptación fallida')
          }
        }else{
          this.makeToast("Ocurrió un problema en la aceptación", 'danger', 'Aceptación fallida')
        }
          this.$forceUpdate();
      }finally{
        user.isBeingAccepted = false;
      }
    },

    makeToast(message, variant, title = "", solid = false) {
      this.toastCount++
      this.$bvToast.toast(message, {
        title,
        toaster: 'b-toaster-bottom-left',
        autoHideDelay: 5000,
        noAutoHide: false,
        appendToast: true,
        variant,
        solid,
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.spinner {
  left:50%; 
  top: 50%; 
  object-position: center;
  transform: translate(-50%,-50%)
}
</style>