import React from 'react';
import {Form,Button,Dropdown} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import InlineError  from '../messages/InLineError';
import user from "../../reduces/user";
import {connect} from 'react-redux';
import decode from "jwt-decode";
import {getLocation} from "../../actions/locations";
import _ from 'lodash';
class NewItemForm extends React.Component{

    state={
        data:{
            itemName:"",
            unit:"",
            unitNumber:"",
            email:decode(localStorage.iotJWT).email,
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
        if(!data.itemName) errors.itemName = "cant't be blank";
        if(!data.unit) errors.unit = "select one";
        if(!data.unitNumber) errors.unitNumber = "cant't be blank";
        if(!data.locations) errors.locations = "select one";
        return errors;
    };

    // onDropdownSelected = e=> this.setState({})
    onChange = e => this.setState({data:{...this.state.data, [e.target.name]:e.target.value}});
    render() {
        const {data,loading,errors,locations} = this.state;
        return (
            <Form onSubmit={this.onSubmit} loading={loading}>
                <Form.Field error={errors.itemName}>
                    <label htmlFor="itemName">Item Name</label>
                    <input type="text"
                           id="itemName"
                           name="itemName"
                           placeholder="Enter your Item Name"
                           value={data.itemName}
                           onChange={this.onChange}
                    />
                    {errors.itemName && <InlineError text={errors.itemName}/>}
                </Form.Field>
                <Form.Field error={errors.unit}>
                    <label htmlFor="unit">Units</label>
                     <select  id="unit"
                             name="unit"
                             value={data.unit}
                             onChange={this.onChange}>
                        <option value="selectOne">--Select One--</option>
                        <option value="count">Count</option>
                        <option value="weight-kgs">Kilograms</option>
                        <option value="weight-metric-tons">Metric Tons</option>
                    </select>
                    {errors.unit && <InlineError text={errors.unit}/>}
                </Form.Field>
                <Form.Field error={errors.unitNumber}>
                    <label htmlFor="unitNumber">unitNumber</label>
                    <input type="number"
                           id="unitNumber"
                           name="unitNumber"
                           placeholder="Enter the number of Units"
                           value={data.unitNumber}
                           onChange={this.onChange}
                    />
                    {errors.unitNumber && <InlineError text={errors.unitNumber}/>}
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

NewItemForm.propTypes ={
    submit: PropTypes.func.isRequired,
    getLocation: PropTypes.func.isRequired,
};

export default  connect(null,{getLocation})(NewItemForm);