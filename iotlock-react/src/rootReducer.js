import {combineReducers} from 'redux';
import user from './reduces/user';
import devices from './reduces/devices'

export default combineReducers({
    user,
    devices
})