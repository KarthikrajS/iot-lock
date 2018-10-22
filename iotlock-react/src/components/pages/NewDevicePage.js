import React from 'react';
import NewDeviceForm from '../forms/NewDeviceForm'
import PropTypes from 'prop-types';
import {addDevice} from '../../actions/devices';
import {connect} from 'react-redux';


class NewDevicePage extends React.Component{
    submit = (data) =>this.props.addDevice(data).then(()=>this.props.history.push("/dashboard"));

    render(){
        return(
            <div>
                <NewDeviceForm submit={this.submit}/>
            </div>
        )
    }
}

NewDevicePage.propTypes ={
    history:PropTypes.shape({
        push:PropTypes.func.isRequired
    }).isRequired,
    addDevice: PropTypes.func.isRequired

};

export default connect(null,{addDevice})(NewDevicePage);