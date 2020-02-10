import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { productReducer } from './reducers/productReducer'

const singleReducer = combineReducers({
    productReducer,
})

// Create an epmty store object
const store = createStore(
    singleReducer,
    applyMiddleware(logger)
)

console.log(store.getState())

export default store