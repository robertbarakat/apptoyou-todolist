const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_SESSION':
      return action.obj.user;
    case 'END_SESSION':
      return {};
    default:
      return state;
  }
}

export default userReducer;
