import React, { Component } from 'react';
import {Body, Button,Container, Content, Card, CardItem, Title,Text, Icon,Left,Spinner,Right } from 'native-base';
//props:
//data - an array contain audio data
//downloading - index of downloading audio
//downloadClick - callback of audio download button
export default class AudioDownloadView extends Component{
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
                                        <Text note>{e.author}</Text>
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
                                    <Body>
                                        <Text>{e.comment}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem>
                                    <Icon style={{color:"#007AFF"}} active name="md-thumbs-up" />
                                    <Text style={{marginRight:20}}>{e.vote} Likes</Text>
                                     {(i===this.props.downloading)?
                                    <Spinner color='#007AFF' style={{height:5,width:5}}/>:
                                    <Icon style={{color:"#007AFF"}} onPress={()=>this.props.downloadClick(e.title,i)} name="md-download"/>}
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