import React, { Component } from 'react';
import {Button, Left, Right,Icon, Text,Fab} from 'native-base';
import { Actions } from 'react-native-router-flux';
export default class NewFab extends Component{
    constructor(props){
        super(props);
        this.state={
            active:false
        };
    }
    _onPress(){
        this.setState({ active: !this.state.active });
        Actions.createNew();
    }
    render(){
        return(
            /*jshint ignore:start*/
            <Fab
                active={this.state.active}
                direction="up"
                containerStyle={styles.container}
                style={styles.fab}
                
                onPress={() => this._onPress()}>
                <Icon name="md-add"/>
            </Fab>
            /*jshint ignore:end*/
        )
    }
}
const styles={
    container:{
        marginLeft: 10,
        bottom:65
    },
    fab:{
        backgroundColor:'#FF80AB'
    }
}

