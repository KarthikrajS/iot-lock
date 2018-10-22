import React from 'react';
import {Card,Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';



class AddItemPage extends React.Component{

    render(){
        return(
            <Card centered>
                <Card.Content textAlign="center">
                    <Card.Header>Add new Item</Card.Header>
                    <Link to="/files/item"><Icon name="plus circle" size="massive"/></Link>
                </Card.Content>
            </Card>
        )
    }
}


export default AddItemPage;