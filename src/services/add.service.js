import { rootAxios } from 'shared/constants/endPoint'
import authHeader from 'services/auth-header'

const addCartForDefault = (recipeId) =>
  rootAxios.get(`/cart/default/add/${recipeId}`, {
    headers: authHeader(),
  })

const addCartForCustomization = (cartData) =>
  rootAxios.post('/cart/customize/add', cartData, { headers: authHeader() })

const createOrder = (orderData) =>
  rootAxios.post('/order/create', orderData, { headers: authHeader() })

const addFavorite = (id) =>
  rootAxios.get(`/myFavorite/add/${id}`, { headers: authHeader() })

export default {
  addCartForDefault,
  addCartForCustomization,
  createOrder,
  addFavorite,
}
