
  export const state = ()=>({
    isRolesLoading: false,
    roles: [],
  });


  // el primer parámetro hace referencia al estado y el siguiente es un extra
export const mutations = {
  toggleRolesLoading(state, value){
    if(value !== undefined){
      state.isRolesLoading = value
    }else{
      state.isRolesLoading = !state.isRolesLoading
    }
  },
  setRoles(state, { roles }){
    state.roles = roles ;
  }
};

  // como los methods, puede ser asincrono. se pasa de parámetro ```{ commit }``` para usar los mutations
export const actions = { 

  async fetchRoles({state, commit}) {
    commit('toggleRolesLoading',true)
    try {
      const resp = await this.$axios.get('/roles');
      commit('setRoles', { roles: resp.data.roles});
    } catch (error) {
      console.log(error);
    }finally{
      commit('toggleRolesLoading',false)
    }
  }

};

  // como los computed
// export const getters={};

