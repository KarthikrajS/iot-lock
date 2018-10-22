import React from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import HomePage from './components/pages/HomePage';
import SignupPage from './components/pages/SignupPage';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage'
import ConfirmationPage from './components/pages/ConfirmationPage';
import AddDevicePage from './components/pages/AddDevicePage';
import AddItemPage from './components/pages/AddItemPage';
import CartPage from './components/pages/CartPage';
import NewDevicePage from './components/pages/NewDevicePage';
import NewItemPage from './components/pages/NewItemPage';
import AccessPage from './components/pages/AccessPage'
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import TopNavigation from './components/navigation/TopNavigation';
import {connect} from "react-redux";

const App = ({location, isAuthenticated}) => (
    <div className="ui container">
        {isAuthenticated && <TopNavigation/>}
        <Route path="/"  location={location} exact component={HomePage}/>
        <Route path="/confirmation/:token" location={location} exact component={ConfirmationPage}/>
        <GuestRoute path="/login"  location={location} exact component={LoginPage}/>
        <GuestRoute path="/accessDevice"  location={location} exact component={AccessPage}/>
        <GuestRoute location={location} path="/signup" exact component={SignupPage}/>
        <GuestRoute location={location} path="/forgot_password" exact component={ForgotPasswordPage}/>
        <GuestRoute location={location} path="/reset_password/:token" exact component={ResetPasswordPage}/>
        <UserRoute  path="/dashboard"  location={location} exact component={DashboardPage}/>
        <UserRoute path="/addDevice" location={location} exact component={AddDevicePage}/>
        <UserRoute path="/addItem" location={location} exact component={AddItemPage}/>
        <UserRoute path="/cart" location={location} exact component={CartPage}/>
        <UserRoute location={location} path="/files/device" exact component={NewDevicePage}/>
        <UserRoute location={location} path="/files/item" exact component={NewItemPage}/>
    </div>);

App.propTypes ={
    location:PropTypes.shape({
        pathname:PropTypes.string.isRequired
    }).isRequired,
    isAuthenticated:PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isAuthenticated:!! state.user.email
    }
}

export default connect(mapStateToProps)(App);
