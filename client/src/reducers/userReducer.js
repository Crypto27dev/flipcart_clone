import * as actionType from "../action-type/userActionType";

const initialState = {
  isLogin: true,
  phoneNumber: "",
  popupLogin: true,
  OTPResult: {},
  isAuthenticate: false,
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_VERIFICATION_CODE:
      return { ...state, OTPResult: action.payload.confirmResult };
    case actionType.SET_IS_LOGIN:
      return { ...state, isLogin: action.payload.isLogin };
    case actionType.SET_MOBILE_NUMBER:
      return { ...state, phoneNumber: action.payload.phoneNumber };
    case actionType.SET_IS_AUTHENTICATE:
      return { ...state, isAuthenticate: action.payload.isAuthenticate };
    case actionType.SET_USER_INFO:
      return { ...state, user: action.payload.user };
    case actionType.SET_POPUP_LOGIN:
      return { ...state, popupLogin: action.payload.isPopup };
    case actionType.UPDATE_USER_INFO:
      return {
        ...state,
        user: {
          ...state.user,
          fname: action.payload.fname,
          lname: action.payload.lname,
          gender: action.payload.gender,
        },
      };
    case actionType.UPDATE_USER_EMAIL:
      return {
        ...state,
        user: {
          ...state.user,
          email: action.payload.email,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
