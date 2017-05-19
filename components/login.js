import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import ShareAudio from './shareAudio';
import ShareMusic from './shareMusic';
import ShareDoc from './shareDoc';
import NewFab from './newFab';
import { Container, Content,Header,  Button, Left, Right,  Icon, Text,Item,Tab,Tabs,TabHeading,Input} from 'native-base';
export default class Share extends Component{
    constructor(props){
        super(props);
        this.state={
            active:false
        };
    }
    componentWillMount(){
        //check if user has login, go to share page
        AsyncStorage.getItem('user',(user)=>{
            if(user){
                Actions.share();
            }
        });
    }
    render(){
        return(
            /*jshint ignore:start*/
            <Container>
                <Tabs>
                    <Tab heading={ <TabHeading style={styles.tabs} ><Text>作品</Text></TabHeading>}>
                        <ShareAudio />
                    </Tab>
                    <Tab heading={ <TabHeading style={styles.tabs}><Text>文本</Text></TabHeading>}>
                        <ShareDoc />
                    </Tab>
                </Tabs>
                
                <NewFab/>
            </Container>
            /*jshint ignore:end*/
        )
    }
}
const styles = {
    tabs:{
        backgroundColor:'#00AA8D'
    },
    searchContainer:{
        top:0,
        backgroundColor:'#008F9A',
        height:40
    },
    searchBar:{
        height:30
    },
    searchFont:{
        fontSize:14
    }
}
