import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect}  from 'react-redux';
// import * as actions from "../../actions/auth";

const HomePage = ({isAuthenticated}) =>(
    <div>
        <h1>HomePage</h1>
        {isAuthenticated ? '' :<div><Link to="/login">Login</Link > or <Link to="/signup">Sign Up</Link></div>}
    </div>
);

HomePage.propTypes ={
    isAuthenticated: PropTypes.bool.isRequired
};
function mapStateToProps(state) {
    return{
        isAuthenticated: !!state.user.token
    }
}
export default connect(mapStateToProps)(HomePage);