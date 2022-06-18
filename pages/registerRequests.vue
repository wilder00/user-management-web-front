<template>
<LoadingWindow v-if="isUserRequestLoading" />

<div v-else class="container">
  <div>
    <b-card>
      <b-form inline>

        <label class="sr-only" for="inline-form-input-username">Username</label>
        <b-input-group prepend="" class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-input id="inline-form-input-username" placeholder="Buscar usuario"></b-form-input>
        </b-input-group>

      </b-form>
    </b-card>
  </div>

  <div class="">
    <UserRequestsTable />
  </div>

</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import UserRequestsTable from '~/components/tables/UserRequestsTable.vue';
import LoadingWindow from '~/components/pseudoViews/LoadingWindow.vue';

export default {
  components: { UserRequestsTable, LoadingWindow },
  data(){
    return {
      searchQuery:'',
      isUserRequestLoading:true,
    } 
  },
  computed: {
    ...mapState('users',['isUsersLoading', 'users']),
    ...mapState('roles',['isRolesLoading', 'roles']),
  },
  methods: {
    ...mapActions('users', ['fetchUserRequests']),
    ...mapActions('roles', ['fetchRoles']),
  },
  created(){
    this.isUserRequestLoading=true;
    this.fetchUserRequests().then(() => { this.isUserRequestLoading = false });
    this.fetchRoles();
  }
}
</script>
