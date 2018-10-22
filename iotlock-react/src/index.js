import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import {createStore,applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import decode from 'jwt-decode'
import thunk from 'redux-thunk';
import {BrowserRouter, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';
import {userLoggedIn} from "./actions/auth";


const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk))
);

if(localStorage.iotJWT){
    const payload = decode(localStorage.iotJWT);
    const user = {token: localStorage.iotJWT, email:payload.email,userType:payload.userType, confirmed: payload.confirmed};
    store.dispatch(userLoggedIn(user));
}
ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route component={App} />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
