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
      <td>
        {{ `Eliminado por ${user.deletingUser.name} ${user.deletingUser.lastName} como ${rolLabels[user.deletingUser.role]} el ${ new Date() }.` }}
      </td>
      <td>
        <b-button variant="success">Button</b-button>
          <b-button variant="danger">Button</b-button>
      </td>
    </tr>

  </tbody>
</table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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

  }
}
</script>