import api from '../api';
import {userLoggedIn} from "./auth";

export const signup = data => dispatch =>api.user.signup(data).then(user=> {
    localStorage.midoJWT= user.token;
    dispatch(userLoggedIn(user));
});
