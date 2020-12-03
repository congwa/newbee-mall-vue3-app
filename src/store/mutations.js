
export default {
  setOpenId(state, openId) {
    state.openId = openId;
  },

  bindStatus(state, status) {
    if(!status) {
      throw new Error(`status not null:${status}`);
    }
    state.bindStatus = status;
  },

  roleId(state, roleId) {
    if(!roleId) {
      throw new Error('roleId not null');
    }
    state.roleId = roleId;
  },

  gameName(state, gameName) {
    state.gameName = gameName;
  },
  sign(state, sign) {
    state.sign = sign;
  }
}
