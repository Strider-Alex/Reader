import React, { Component } from 'react';
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
    render(){
        return(
            /*jshint ignore:start*/
            <Container>
                <Header searchBar rounded style={styles.searchContainer}>
                    <Item style={styles.searchBar}>
                        <Icon name="md-search" />
                        <Input style={styles.searchFont}placeholder="Search" />
                    </Item>
                </Header>
                
                <Tabs>
                    <Tab heading={ <TabHeading style={styles.tabs} ><Text>作品</Text></TabHeading>}>
                        <ShareAudio />
                    </Tab>
                    <Tab heading={ <TabHeading style={styles.tabs}><Text>文本</Text></TabHeading>}>
                        <ShareDoc />
                    </Tab>

                    {/*<Tab heading={ <TabHeading style={styles.tabs}><Text>伴奏</Text></TabHeading>}>
                        <ShareMusic />
                    </Tab>*/}
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
