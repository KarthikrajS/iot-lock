import React from 'react';
import {Menu,Dropdown,Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import gravatarUrl from 'gravatar-url';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as actions from "../../actions/auth";

const TopNavigation = ({user,logout,isAuthenticated, isAdmin}) => (
    <Menu secondary pointing>
        <Menu.Item as={Link} to="/dashboard">Dashboard</Menu.Item>
        {(isAdmin===0 || isAdmin ===3)  && <Menu.Item  as={Link} to={"/addDevice"}>Add Box</Menu.Item> }
        {(isAdmin===0) && <Menu.Item>Check Status</Menu.Item>}
        {(isAdmin===2) && <Menu.Item as={Link} to="/addItem">Add Item</Menu.Item>}
        <Menu.Menu position="right">
            <Dropdown trigger={<Image avatar src={gravatarUrl(user.email)} /> }>
                <Dropdown.Menu>
                 {(isAdmin===1) && <Dropdown.Item>Sell</Dropdown.Item>}
                <Dropdown.Item onClick={()=>logout()}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Menu>
        <Menu.Item as={Link} to="/cart">Cart</Menu.Item>
    </Menu>);

TopNavigation.propTypes ={
    user: PropTypes.shape({
        email:PropTypes.string.isRequired,
    }).isRequired,
    logout:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool.isRequired,
    isAdmin:PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return{
        user: state.user,
        isAuthenticated: !!state.user.email,
        isAdmin: state.user.userType
    }
}

export default connect(mapStateToProps,{logout:actions.logout})(TopNavigation);