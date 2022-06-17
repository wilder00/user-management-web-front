<template>
<div class="container">

  <div>
    <b-card>
      <b-form inline>
        <!-- <label class="sr-only" for="inline-form-input-name">Name</label>
        <b-form-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Buscar usuario"
        ></b-form-input> -->

        <label class="sr-only" for="inline-form-input-username">Username</label>
        <b-input-group prepend="" class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-input id="inline-form-input-username" placeholder="Buscar usuario"></b-form-input>
        </b-input-group>

        <!-- <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">Remember me</b-form-checkbox> -->

        <!-- <b-button variant="primary">Save</b-button> -->
      </b-form>
    </b-card>
  </div>

  <div class="">
    <UserTable />
  </div>

</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import UserTable from '~/components/tables/UserTable.vue';
export default {
  components: { UserTable },
  computed: {
    ...mapState('users',['isUsersLoading', 'users']),
    ...mapState('roles',['isRolesLoading', 'roles']),
  },
  methods: {
    ...mapActions('users', ['fetchUsers']),
    ...mapActions('roles', ['fetchRoles']),
  },
  created(){
    this.fetchUsers();
    this.fetchRoles();
  }
}
</script>
