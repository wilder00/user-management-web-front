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
        <b-button variant="info">Ver</b-button>
          <b-button variant="danger">Eliminar</b-button>
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

  }
}
</script>