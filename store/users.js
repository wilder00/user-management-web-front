
  export const state = ()=>({
    isUsersLoading: false,
    users: [],
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
  }
};

  // como los methods, puede ser asincrono. se pasa de parámetro ```{ commit }``` para usar los mutations
export const actions = { 

  async fetchUsers({state, commit}) {
    commit('toggleUserLoading',true)
    try {
      const resp = await this.$axios.get('/users');
      commit('setUsers', { users: resp.data.users});
    } catch (error) {
      console.log(error);
    }finally{
      commit('toggleUserLoading',false)
    }
  }

};

  // como los computed
// export const getters={};

