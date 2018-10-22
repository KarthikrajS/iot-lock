import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import decode from 'jwt-decode';
import {getItems} from '../../actions/items';
import {Card,Icon,Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import "../CSS/Dashboard.css";
import SelectItemForm from '../forms/SelectItemForm';

class DashboardPage extends React.Component {
    state={
        data:{
            itemsToLoad:{},
            loading:false
        }
    }
    componentWillMount(){
        this.setState({loading:true});
        this.props.getItems().then(items => {
            this.setState({itemsToLoad:this.loadItems(items)})
        }).catch(this.setState({loading:true}))
    }
    loadItems(items){
        if (this.props.userType ===1) {
            const itemsToLoad =[];
            console.log(items)
                for(var i=0;i<items.length;i++){
                    itemsToLoad.push(
                        <span>
                        <Card  id={i}>
                            <Card.Content textAlign="center" class="card">
                                <Link to={"/files/item/"+items[i]._id} id={items[i]._id}>
                                <Card.Header id={items[i]._id}>Product : {items[i].itemName}</Card.Header>
                                <Card.Header email={items[i].email}>Seller :{items[i].email}</Card.Header>
                                <Card.Header email={items[i].unitNumber} locaion={items[i].locations}>Metric :{items[i].unitNumber+" "+items[i].unit}</Card.Header>
                                </Link>
                             </Card.Content>
                             <Button secondary >Add to Cart</Button>
                        </Card>
                        </span>
                    )
                    }
                    this.setState({loading:false});
                    return itemsToLoad;
                }
    }
    render() {
        const{itemsToLoad,loading} = this.state;
        const {isConfirmed,userType} = this.props;
        console.log(itemsToLoad)
        return (
            <div class ="outline">
                {!isConfirmed && <ConfirmEmailMessage/>}
                {(userType === 1) && !loading && <div class="flex" >{itemsToLoad}</div> }
            </div>

        );
    }
}


DashboardPage.propTypes = {
    isConfirmed: PropTypes.bool.isRequired,
    userType: PropTypes.number.isRequired,
    getItems: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        isConfirmed: !!state.user.confirmed,
        userType:decode(localStorage.iotJWT).userType
    }
}

export default connect(mapStateToProps,{getItems})(DashboardPage);