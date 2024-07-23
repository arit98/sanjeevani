export const actionType = {
  SET_USER: 'SET_USER',
  SET_USER_IMAGE: 'SET_USER_IMAGE',
  SET_CART_SHOW: "SET_CART_SHOW",
  SET_CARTITEMS: 'SET_CARTITEMS',
  SET_LOGIN_SHOW: "SET_LOGIN_SHOW",
  SET_REGISTER_SHOW: "SET_REGISTER_SHOW",
  SET_FOOTER_SHOW: "SET_FOOTER_SHOW",
  SET_SEARCHFIELD_SHOW: "SET_SEARCHFIELD_SHOW",
  SET_ADMINMENU_SHOW: "SET_ADMINMENU_SHOW",
  SET_ISACTIVE: "SET_ISACTIVE",
  SET_AvatarImage: "SET_AvatarImage"
  // SET_FOOD_ITEMS: 'SET_FOOD_ITEMS',
};

const reducer = (state, action) => {
  switch (action.type) {
    
    case actionType.SET_USER:
        return {
            ...state,
            user: action.user,
        }

    // case actionType.SET_FOOD_ITEMS:
    //     return {
    //         ...state,
    //         mediList: action.mediList,
    //     }

        case actionType.SET_Login:
        return {
            ...state,
            cartItems: action.login,
        }

        case actionType.SET_AvatarImage:
        return {
            ...state,
            AvatarImage: action.AvatarImage,
        }

        case actionType.SET_ISACTIVE:
        return {
            ...state,
            isActive: action.isActive,
        }

    case actionType.SET_CART_SHOW:
      return {
        ...state,
        cartShow: action.cartShow,
      };

    case actionType.SET_CARTITEMS:
      return {
        ...state,
        cartItems: action.cartItems,
      };

    case actionType.SET_LOGIN_SHOW:
      return {
        ...state,
        loginShow: action.loginShow,
      };

    case actionType.SET_REGISTER_SHOW:
      return {
        ...state,
        registerShow: action.registerShow,
      };

    case actionType.SET_FOOTER_SHOW:
      return {
        ...state,
        footerShow: action.footerShow,
      };

    case actionType.SET_SEARCHFIELD_SHOW:
      return {
        ...state,
        searchfieldShow: action.searchfieldShow,
      };

    case actionType.SET_ADMINMENU_SHOW:
      return {
        ...state,
        adminmenuShow: action.adminmenuShow,
      };

    default:
      return state;
  }
};

export default reducer;