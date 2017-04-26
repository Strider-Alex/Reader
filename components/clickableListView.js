import React, { Component } from 'react';
import { Button,Container, Content, Card, CardItem, Text, Icon,Right,Spinner } from 'native-base';
export default class ClickableListView extends Component{
    render(){
        return(
            /*jshint ignore:start*/
            <Container style={{marginHorizontal:10}}>
                <Content>
                    {this.props.data.map((e,i)=>{
                        if(e){
                            return(
                            
                                <Card key={i}>
                                    <CardItem>
                                        <Text>{e.split(".")[0]}</Text>
                                        <Right>
                                            {
                                                (this.props.activeIconName==="spinner"&&i===this.props.active)?
                                                <Spinner color='#007AFF' style={{height:5,width:5}}/>:
                                                <Icon style={{color:"#007AFF"}} onPress={()=>this.props.click(e,i)} name={(i===this.props.active)?this.props.activeIconName:this.props.iconName}/>
                                            }
                                        </Right>
                                    </CardItem>
                                </Card>
                            )
                        }
                    })}
                </Content>
            </Container>
            /*jshint ignore:end*/
        )
    }
}