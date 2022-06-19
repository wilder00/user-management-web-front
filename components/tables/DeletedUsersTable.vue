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
          <th scope="col">Description</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in deletedUsers" :key="user.id">
          <th scope="row">{{index +1}}</th>
          <td>{{ user.deletedUser.name }}</td>
          <td>{{ user.deletedUser.lastName }}</td>
          <td>{{ user.deletedUser.email }}</td>
          <td>{{ rolLabels[user.deletedUser.role] }}</td>
          <td class="text-muted">
            Eliminado por
            <span class="text-success">{{ user.deletingUser.name }}</span>
            <span class="text-success">{{ user.deletingUser.lastName }}</span>
            como
            <span class="text-warning">{{ rolLabels[user.asRole] }}</span>
              el 
            <span>{{ (new Date()).toLocaleDateString() }}</span>.
            
          </td>
          <td>
            <b-button variant="success" @click="restoreUser(user)">
              <span v-if="user.isBeingRestored" class="spinner position-absolute" >
                <b-spinner class="" small variant="" label="Small Spinner"></b-spinner>
              </span>
              <span :class="{'invisible': user.isBeingRestored}">Restaurar</span>          
            </b-button>

            <b-button class="d-none" variant="danger">Button</b-button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="deletedUsers.length <= 0" class="text-center">
      No hay usuarios eliminados
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
    ...mapState('users', ['isUsersLoading', 'deletedUsers']),
    ...mapState('roles', ['isRolesLoading', 'roles']),
    rolLabels(){
      return this.roles.reduce((prev,curr) => {
        prev[curr.roleName] = curr.label
        return prev
      },{})
    }
  },
  methods: {
    ...mapActions('users', ['fetchDeletedUsers']),
    async restoreUser(user){
      if(user.isBeingRestored === true) return;
      try {
        user.isBeingRestored = true;
        this.$forceUpdate();
        const response = await this.$axios.post(`users/deleted/${user.id}`)
        if(response.statusText === 'OK'){
          this.fetchDeletedUsers();
          this.makeToast(response.data.message, 'success', 'Restauración exitoso')
        }
      } catch (error) {
        if(error.response){
          user.isBeingRestored = false;
          const message = error.response.data.message;
          if(message){
            const text = typeof(message) === 'string'? message : message[0]
            this.makeToast(text, 'danger', 'Restauración fallido')
          }
          this.$forceUpdate();
        }else{
          this.makeToast('Ha ocurrido un error', 'danger', 'Restauración fallido')
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
    },
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