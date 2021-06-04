import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducers'

let middelware = applyMiddleware(thunk)
if (process.env.NODE_ENV === 'development') {
    middelware = composeWithDevTools(middelware)
}
export default createStore(reducers, middelware)