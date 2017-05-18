import React, { Component } from 'react';
import {Button, Body,Container, Content, Text, Textarea, Icon, Input, InputGroup,Spinner,List,ListItem,Left,Right,Thumbnail } from 'native-base';
import {Actions} from 'react-native-router-flux';
import NewFab from './newFab';

export default class MyStudio extends Component {
    constructor(props){
        super(props);
        this.state={
            
        };
    }
    //did mount, load my work from storage
     componentDidMount(){   
        
    }
    
    _goToList(item){
        
        Actions.simpleList({
            itemType:item
        });
        console.log('hello');
    }
    render() {
        let items=['我的创作','本地文本','本地伴奏','收藏作品'];
        return (
            /* jshint ignore: start */
            <Container style={styles.container}>
                <List dataArray={items} renderRow={(item)=>
                    <ListItem button onPress={()=>this._goToList(item)}>
                        <Left>
                           <Thumbnail source={require('../image/ic_launcher.png')} style={styles.audioImage}/>
                           <Text style={styles.audioTitle}>{`${item}(0)`}</Text>
                        </Left>                             
                        <Right>
                            <Icon style={styles.icon} name="md-arrow-forward"/>
                        </Right>
                    </ListItem>
                }>
                </List>
                <NewFab/>
            </Container>         
            /* jshint ignore: end */
        );
    }
}

const styles={
    container:{
        marginTop:55
    },
    audioImage:{
        height:40,
        width:40
    },
    icon:{
        color:'#FF4081',
        fontSize:20
    }
};