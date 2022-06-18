
  export const state = ()=>({
    isUsersLoading: false,
    users: [],
    deletedUsers: [],
  });


  // el primer parámetro hace referencia al estado y el siguiente es un extra
export const mutations = {
  toggleUserLoading(state, value){
    if(value !== undefined){
      state.isUsersLoading = value
    }else{
      state.isUsersLoading = !state.isUsersLoading
    }
  },
  setUsers(state, { users }){
    state.users = users ;
  },
  setDeletedUsers(state, { deletedUsers }){
    state.deletedUsers = deletedUsers ;
  },
};

  // como los methods, puede ser asincrono. se pasa de parámetro ```{ commit }``` para usar los mutations
export const actions = { 

  async fetchUsers({state, commit}, dataConfig) {

    commit('toggleUserLoading',true)
    try {
      const resp = await this.$axios.get('/users', dataConfig);
      commit('setUsers', { users: resp.data.users});
    } catch (error) {
      console.log(error);
    }finally{
      commit('toggleUserLoading',false)
    }
  },

  async fetchUserRequests({state, commit}, dataConfig) {
    commit('toggleUserLoading',true)
    try {
      const resp = await this.$axios.get('/users/requests', dataConfig);
      commit('setUsers', { users: resp.data.users});
    } catch (error) {
      console.log(error);
    }finally{
      commit('toggleUserLoading',false)
    }
  },

  async fetchDeletedUsers({state, commit}, dataConfig) {
    commit('toggleUserLoading',true)
    try {
      const resp = await this.$axios.get('/users/deleted', dataConfig);
      commit('setDeletedUsers', { deletedUsers: resp.data.users});

    } catch (error) {
      console.log(error);
    }finally{
      commit('toggleUserLoading',false)
    }
  }

};

  // como los computed
// export const getters={};

