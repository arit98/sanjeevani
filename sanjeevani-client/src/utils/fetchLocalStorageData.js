export const fetchUser = () => {
  const userInfo = localStorage.getItem('token') !== 'undefined' ? (localStorage.getItem('token')) : localStorage.clear();

  return userInfo
}

export const fetchCart = () => {
  const cartInfo = localStorage.getItem('cartItems') !== 'undefined' ? JSON.parse(localStorage.getItem('cartItems')) : localStorage.clear();
  
  return cartInfo ? cartInfo : [];
}