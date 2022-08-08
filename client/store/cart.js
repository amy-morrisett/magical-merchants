//add to combinereducers
import axios from 'axios'

const TOKEN = 'token'

// action type:
const SET_CART = 'SET_CART'

// action creators:
const setCart = (cart) => ({type: SET_CART, cart})
// const removedFromCart = (cart) => ({type: SET_CART, cart})
// const addedToCart = (cart) => ({type: SET_CART, cart})

// thunk creators:
export const fetchCart = () => {
  const token = window.localStorage.getItem(TOKEN)
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/cart', {
        headers: {
          authorization: token,
        },
      })
      dispatch(setCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addToCart = (product) => {
  const token = window.localStorage.getItem(TOKEN)
  return async (dispatch) => {
    try {
      const {data} = await axios.post('/api/cart/addToCart', product, {
        headers: {
          authorization: token,
        },
      })
      //console.log(data)
      dispatch(setCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const removeFromCart = (product) => {
  const token = window.localStorage.getItem(TOKEN)
  return async (dispatch) => {
    try {
      const {data} = await axios.post('/api/cart/removeFromCart', product, {
        headers: {
          authorization: token,
        },
      })
      dispatch(setCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// const initalState = {cart: { lineItems: [] }}
// reducer:
export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart
    // case ADD_TO_CART:
    //   return {...state, allProducts: action.products}
    // case REMOVE_FROM_CART:
    //   return {...state, allProducts: action.products}
    default:
      return state
  }
}
