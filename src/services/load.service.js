import { rootAxios } from 'shared/constants/endPoint'
import authHeader from './auth-header'

const loadRecipes = () => rootAxios.get('/recipe/overview')

const loadRecipeById = (id) => rootAxios.get(`/recipe/version/${id}`)

const loadRecipeImagesById = (id) => rootAxios.get(`/recipe/images/all/${id}`)

const loadCart = (token = authHeader()) =>
  rootAxios.get('/cart/all', { headers: token })

const loadCartById = (id, token = authHeader()) =>
  rootAxios.get(`/cart/get/${id}`, { headers: token })

const loadAllOrders = (token = authHeader()) =>
  rootAxios.get('/order/all', { headers: token })

const loadOrderById = (id, token = authHeader()) =>
  rootAxios.get(`/order/id/${id}`, { headers: token })

const loadFavorite = (token = authHeader()) =>
  rootAxios.get('/myFavorite/all', { headers: token })

export default {
  loadRecipes,
  loadRecipeById,
  loadRecipeImagesById,
  loadCart,
  loadCartById,
  loadAllOrders,
  loadOrderById,
  loadFavorite,
}
