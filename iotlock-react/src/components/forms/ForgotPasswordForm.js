import React from 'react';
import PropTypes from 'prop-types';
import {Form,Button,Message} from 'semantic-ui-react';
import InLineError from '../messages/InLineError';
import isEmail from 'validator/lib/isEmail';

class ForgotPasswordForm extends React.Component{
    state={
        data:{
            email:""
        },
        loading:false,
        errors:{}
    };
    onChange = e => this.setState({data:{...this.state.data, [e.target.name]:e.target.value}});
    onSubmit = () =>
    {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if(Object.keys(errors).length === 0){
            this.setState({loading: true});
            this.props.submit(this.state.data)
                .catch(err => this.setState({errors: err.response.data.errors,loading:false}));
        }
    }
    validate = (data) =>
    {
        const errors = {};
        if(!isEmail(data.email)) errors.email= "Invalid email";
        return errors;
    }
    render(){
        const {data,errors,loading} = this.state;
        return(
            <Form onSubmit = {this.onSubmit} loading={loading}>
                {!!errors.global && (<Message negative>{errors.global}</Message>)}
                <Form.Field error={!!errors.email}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="example@example.com" value={data.email} onChange={this.onChange}/>
                    {errors.email && <InLineError text={errors.email}/>}
                </Form.Field>
                <Button primary>Forgot Password</Button>
            </Form>
        );
    }
}

ForgotPasswordForm.propTypes = {
    submit: PropTypes.func.isRequired
}

export default ForgotPasswordForm