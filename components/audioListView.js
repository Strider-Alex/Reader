import React, { Component } from 'react';
import {Body, Button,Container, Content, Card, CardItem, Title,Text, Icon,Left,Spinner } from 'native-base';
export default class AudioListView extends Component{
    render(){
        return(
            /*jshint ignore:start*/
            <Container style={{marginHorizontal:10}}>
                <Content>
                    {this.props.data.map((e,i)=>{
                        return(
                        
                            <Card key={i}>
                                <CardItem style={{backgroundColor:"#EFEFF2"}}>
                                    <Body>
                                        <Text style={{fontWeight:"bold",fontSize:20}}>{e.title}</Text>
                                        <Text note>您的杰作</Text>
                                    </Body>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <Text note>文段：{e.doc.title}</Text>
                                        <Text note>出处：{e.doc.book}</Text>
                                        <Text note>作者：{e.doc.author}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem>
                                        <Icon style={{color:"#007AFF"}} onPress={()=>this.props.playClick(e.title,i)} 
                                                name={(i===this.props.playing)?"md-pause":"md-play"}/>
                                        {
                                            (i===this.props.share)?
                                            <Spinner/>:
                                            <Icon style={{color:"#007AFF"}} onPress={()=>this.props.shareClick(e.title,i)} 
                                                name="md-share"/>
                                        }
                                </CardItem>
                            </Card>
                        )
                    })}
                </Content>
            </Container>
            /*jshint ignore:end*/
        )
    }
}