import { createStore, applyMiddleware } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"

import rootReducer from "./reducers"
import handleError from 'middlewares/handleError'

const middleware = [thunk, logger, handleError]

const store = createStore(rootReducer, applyMiddleware(...middleware))

export default store
