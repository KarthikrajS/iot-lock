import React from 'react';
import {Form,Button} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import InlineError  from '../messages/InLineError';
import {getLocation} from "../../actions/locations";
import {connect} from 'react-redux';

class NewDeviceForm extends React.Component {

    state={
        data:{
            deviceId:"",
            accessToken:"",
            locations:{}
        },
        loading:false,
        errors:{}
    };
    componentWillMount(){
        this.setState({loading:true});
        this.props.getLocation().then(locations => {
            this.setState({locations:this.loadSelect(locations.locations),loading:false})
        }).catch(this.setState({loading:true}))
    }
    loadSelect(locations){
        const items = [];
        console.log(locations);
        for(var i=0;i<locations.length;i++){
            items.push(<option value={locations[i].locationName} key={locations[i].locationId}>{locations[i].locationName}</option>)
        }
        return items;

    }
    onSubmit = e =>
    {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if(Object.keys(errors).length === 0){
            this.setState({loading: true});
            this.props.submit(this.state.data)
                .catch(err => this.setState({errors: err.response.data.errors,loading:false}));
        }
    };
    validate =data =>{
        const errors={};
        if(!data.deviceId) errors.deviceId = "cant't be blank";
        if(!data.accessToken) errors.password = "cant't be blank";
        return errors;
    };
    onChange = e => this.setState({data:{...this.state.data, [e.target.name]:e.target.value}});
    render() {
        const {data,loading,errors,locations} = this.state;
        return (
            <Form onSubmit={this.onSubmit} loading={loading}>
                <Form.Field error={errors.deviceId}>
                    <label htmlFor="deviceId">Device ID</label>
                    <input type="text"
                           id="deviceId"
                           name="deviceId"
                           placeholder="Enter your device ID"
                           value={data.deviceId}
                           onChange={this.onChange}
                    />
                    {errors.deviceId && <InlineError text={errors.deviceId}/>}
                </Form.Field>
                <Form.Field error={errors.accessToken}>
                    <label htmlFor="accessToken">Access Token</label>
                    <input type="text"
                           id="accessToken"
                           name="accessToken"
                           placeholder="Enter your Access Token"
                           value={data.accessToken}
                           onChange={this.onChange}
                    />
                    {errors.accessToken && <InlineError text={errors.accessToken}/>}
                </Form.Field>
                <Form.Field error={errors.locations}>
                    <label htmlFor="location">Location</label>
                    <select
                        id="locations"
                        name="locations"
                        // placeholder="--Select--"
                        value={data.locations}
                        onChange={this.onChange}>
                        <option value="selectOne">--Select One--</option>
                        {!loading && locations}
                    </select>
                </Form.Field>
                <Button primary>Submit</Button>
            </Form>)
    }
}

NewDeviceForm.propTypes ={
    submit: PropTypes.func.isRequired,
    getLocation: PropTypes.func.isRequired,
};

export default connect(null,{getLocation})(NewDeviceForm);