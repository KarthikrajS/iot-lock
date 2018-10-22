import React from 'react';
import {Form,Button,Message} from 'semantic-ui-react';

class AccessForm extends React.Component{
    render(){
        return(
            <Form action="https://api.particle.io/v1/devices/53ff6f066678505527292367/led?access_token=8eb7562f6078cb908071a4936c05dd02b31516a8" method="POST">
                    Tell your device what to do!<br />
                    <br />
                    <input type="radio" name="arg" value="on" />Turn the LED on.
                    <br />
                    <input type="radio" name="arg" value="off" />Turn the LED off.
                    <br />
                <Button type="submit" value="Do It!">Do It!</Button>

            </Form>
        )
    }
}

export default AccessForm