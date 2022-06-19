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
            <b-button class="d-none" variant="info">Ver</b-button>
            <b-button class="position-relative" variant="danger" @click="deleteUser(user)">
              <span v-if="user.isBeingDeleting" class="spinner position-absolute" >
                <b-spinner class="" small variant="" label="Small Spinner"></b-spinner>
              </span>
              <span :class="{'invisible': user.isBeingDeleting}">Eliminar</span>
            </b-button>
          </td>
        </tr>

      </tbody>
    </table>
    <p v-if="users.length <= 0" class="text-center">
      No hay usuarios
    </p>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
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
    ...mapActions('users', ['fetchUsers']),
    async deleteUser(user){
      if(user.isBeingDeleting === true) return;
      try {
        user.isBeingDeleting = true;
        this.$forceUpdate();
        const response = await this.$axios.delete(`users/${user.id}`)
        if( response.status >= 200  && response.status <= 299 ){
          this.fetchUsers();
          this.makeToast(response.data.message, 'info', 'Eliminado exitoso')
        }
      } catch (error) {
        if(error.response){
          user.isBeingDeleting = false;
          const message = error.response.data.message;
          if(message){
            const text = typeof(message) === 'string'? message : message[0]
            this.makeToast(text, 'danger', 'Eliminado fallido')
          }
          this.$forceUpdate();
        }
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