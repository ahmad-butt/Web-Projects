import { SET_USER } from "../actions/userActions";

const initialState = {
  username: '',
  email: ''
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return { ...state, username: action.username, email: action.email };
    }
    default:
      return state;
  }
};

export default userReducer;
