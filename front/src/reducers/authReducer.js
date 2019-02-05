const authReducer = (state = '', action) => {
  switch (action.type) {
    case 'CREATE_SESSION':
      return action.obj.token;
    case 'END_SESSION':
      return '';
    default:
      return state;
  }
}

export default authReducer;
