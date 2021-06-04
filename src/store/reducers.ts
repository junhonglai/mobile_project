import { combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'


const initState = {}
function user(preState: any = initState, action: any) {
    switch (action.type) {
        default:
            return preState
    }
}

export default combineReducers({
    user,
})