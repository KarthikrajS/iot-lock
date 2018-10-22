import React from 'react';
import {Card,Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';



class AddDevicePage extends React.Component{

    render(){
        return(
            <Card centered>
                <Card.Content textAlign="center">
                    <Card.Header>Add new device</Card.Header>
                    <Link to="/files/device"><Icon name="plus circle" size="massive"/></Link>
                </Card.Content>
            </Card>
        )
    }
}


export default AddDevicePage;