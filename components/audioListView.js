import React, { Component } from 'react';
import {Body, Button,Container, Content, Card, CardItem, Title,Text, Icon,Left,Spinner } from 'native-base';

//props:
//data - an array contain audio data
//playing - index of playing audio
//share - whether share button is needed
//playClick - callback of audio play button
//shareClick - callback of audio share button

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
                                        <Text note>{(e.author)?e.author:"您的杰作"}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <Text note>文段：{e.doc.title}</Text>
                                        <Text note>出处：{e.doc.book}</Text>
                                        <Text note>作者：{e.doc.author}</Text>
                                    </Body>
                                </CardItem>
                                {
                                    (e.comment)?<CardItem><Text>{e.comment}</Text></CardItem>:undefined
                                }
                                <CardItem>
                                        <Icon style={{color:"#007AFF"}} onPress={()=>this.props.playClick(e.title,i)} 
                                                name={(i===this.props.playing)?"md-pause":"md-play"}/>
                                        {   (this.props.share)?(
                                                (i===this.props.share)?
                                                <Spinner color='#007AFF' style={{height:5,width:5}}/>:
                                                <Icon style={{color:"#007AFF"}} onPress={()=>this.props.shareClick(e.title,i)} 
                                                    name="md-share"/>
                                            ):undefined
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