import React, { Component } from 'react';
import { Footer, FooterTab, Button, Container, Content, Card, CardItem, Text, Icon } from 'native-base';
import {Actions} from 'react-native-router-flux';
export default class MyFooter extends Component {
   
    render() {
        return (
            /* jshint ignore: start */
             <Footer >
                <FooterTab>
                    <Button onPress={Actions.createNew}>
                        <Text>New+</Text>
                    </Button>
                    <Button onPress={Actions.myStudio}>
                        <Text>Studio</Text>
                    </Button>
                    <Button onPress={()=>{}}>
                        <Text>Settings</Text>
                    </Button>
                </FooterTab>
            </Footer>
            
            /* jshint ignore: end */
        );
    }
}
