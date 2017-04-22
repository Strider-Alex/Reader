import React, { Component } from 'react';
import { Footer, FooterTab, Button, Container, Content, Card, CardItem, Text, Icon,Right } from 'native-base';
export default class ClickableListView extends Component{
    render(){
        return(
            /*jshint ignore:start*/
            <Container style={{marginHorizontal:10}}>
                <Content>
                    {this.props.data.map((e,i)=>{
                        return(
                            <Card key={i}>
                                <CardItem>
                                    <Text>{e.split(".")[0]}</Text>
                                    <Right>
                                        <Icon onPress={()=>this.props.click(e)} name={this.props.iconName}/>
                                    </Right>
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