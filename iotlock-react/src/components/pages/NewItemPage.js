import React from 'react';
import NewItemForm from '../forms/NewItemForm'
import PropTypes from 'prop-types';
import {addItem} from '../../actions/items';
import {connect} from 'react-redux';


//remove addItem

class NewItemPage extends React.Component{
    submit = (data) =>this.props.addItem(data).then(()=>this.props.history.push("/dashboard"));

    render(){
        return(
            <div>
                <NewItemForm submit={this.submit}/>
            </div>
        )
    }
}

NewItemPage.propTypes ={
    // getLocation:PropTypes.func.isRequired,
    history:PropTypes.shape({
        push:PropTypes.func.isRequired
    }).isRequired,
    addItem: PropTypes.func.isRequired

};

export default connect(null,{addItem})(NewItemPage);