import { fetchCart, fetchUser } from '../utils/fetchLocalStorageData';

const userInfo = fetchUser()
const cartInfo = fetchCart()

export const initialState = {
    cartShow: false,
    loginShow : false,
    registerShow : false,
    footerShow: false,
    searchfieldShow: false,
    adminmenuShow: true,
    cartItems: cartInfo,
    user: userInfo,
    isActive: false,
    AvatarImage: ""
    // login: false,
}