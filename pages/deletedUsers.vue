<template>
<LoadingWindow v-if="isDeletingUsersLoading" />
<div v-else class="container">
  <div>
    <b-card>
      <b-form inline>

        <label class="sr-only" for="inline-form-input-username">Username</label>
        <b-input-group prepend="" class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-input id="inline-form-input-username" v-model="searchQuery" placeholder="Buscar usuario"></b-form-input>
        </b-input-group>

      </b-form>
    </b-card>
  </div>

  <div class="table-container">
    <DeletedUsersTable />
  </div>

</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DeletedUsersTable from '~/components/tables/DeletedUsersTable.vue';
import LoadingWindow from '~/components/pseudoViews/LoadingWindow.vue';

export default {
  components: { DeletedUsersTable, LoadingWindow },
  data () {
    return {
      searchQuery:'',
      isDeletingUsersLoading: true,
    }
  },
  computed: {
    ...mapState('users',['isUsersLoading', 'users']),
    ...mapState('roles',['isRolesLoading', 'roles']),
  },
  methods: {
    ...mapActions('users', ['fetchDeletedUsers']),
    ...mapActions('roles', ['fetchRoles']),
  },
    watch: {
    searchQuery (text, oldText){
      if(text === "") this.fetchDeletedUsers();
      if(text.trim() === ""){
        return;
      }
      const params = {
        q: text.trim()
      };
      this.fetchDeletedUsers({ params });
    }
  },
  created(){
    this.isDeletingUsersLoading = true;
    this.fetchDeletedUsers().then(()=>{ this.isDeletingUsersLoading = false } );
    this.fetchRoles();
  }
}
</script>
<style lang="scss" scoped>
.table-container{
  overflow: auto;
}
</style>

