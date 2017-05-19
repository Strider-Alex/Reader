import React, { Component } from 'react';
import {AsyncStorage,Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import ShareAudio from './shareAudio';
import ShareMusic from './shareMusic';
import ShareDoc from './shareDoc';
import NewFab from './newFab';
import RNFetchBlob from 'react-native-fetch-blob';
import {Form,Label,Container, Content,Header,  Body,Button, Left, Right,  Icon, Text,Item,Tab,Tabs,TabHeading,Input,Toast} from 'native-base';
const apiUrl = 'http://120.77.250.109';
class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state={
            username:null,
            pwd:null
        };
    }
    _login(){
        console.log(this.state.username);
        console.log(this.state.pwd)
        //post data
        RNFetchBlob.fetch('POST', `${apiUrl}/login`, {
            'Content-Type' : 'multipart/form-data',
        }, [
            { name : 'account', data: this.state.username},
            { name : 'passwd', data : this.state.pwd}
        ])
        .then((res)=>{
            const data = res.json();
            if(data.error){
                Toast.show({
                    text:data.error,
                    buttonText:'好',
                    position:'bottom'
                });
            }
            else{
                AsyncStorage.setItem('user','login_user',(err)=>{
                    if(err){
                        console.log(err);
                    }else{
                        Actions.main();
                    }   
                }); 
            }
        });   
    }
    render(){
        return(
            /*jshint ignore:start*/
            <Container>
                    <Image style={{height:300,width:420}}source={require('../image/tree.jpg')}/>
                    <Content  style={{marginHorizontal:10}}>
                    <Form>
                        <Item floatingLabel>
                            <Label>用户名</Label>
                            <Input  maxLength={20} onChangeText={(data)=>this.setState({username:data})} value={this.state.username}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>密码</Label>
                            <Input secureTextEntry maxLength={20} onChangeText={(data)=>this.setState({pwd:data})} value={this.state.pwd}/>
                        </Item>
                            
                    </Form>
                    <Button style={{backgroundColor:'#00BF9A'}} rounded block onPress={()=>this._login()}><Text>现在登录</Text></Button>
                </Content>
            </Container>
            /*jshint ignore:end*/
        )
    }
}

class SigninPage extends Component{
    constructor(props){
        super(props);
        this.state={
            username:null,
            pwd:null,
            nickname:null
        };
    }
    _signin(){
        //post data
        RNFetchBlob.fetch('POST', `${apiUrl}/signup`, {
            'Content-Type' : 'multipart/form-data',
        }, [
            { name : 'account', data: this.state.username},
            { name : 'passwd', data : this.state.pwd},
            { name : 'name', data : this.state.nickname}
        ])
        .then((res)=>{
            const data = res.json();
            if(data.error){
                Toast.show({
                    text:data.error,
                    buttonText:'好',
                    position:'bottom'
                });
            }
            else{
                Toast.show({
                    text:'注册成功',
                    buttonText:'好',
                    position:'bottom'
                });
            }
        });
    }
    render(){
        return(
            /*jshint ignore:start*/
            <Container>
                    <Image style={{height:250,width:420}}source={require('../image/tree.jpg')}/>
                    <Content  style={{marginHorizontal:10}}>
                    <Form>
                        <Item floatingLabel>
                            <Label>用户名</Label>
                            <Input  maxLength={20} onChangeText={(data)=>this.setState({username:data})} value={this.state.username}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>密码</Label>
                            <Input  maxLength={20} onChangeText={(data)=>this.setState({pwd:data})} value={this.state.pwd}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>昵称</Label>
                            <Input  maxLength={20} onChangeText={(data)=>this.setState({nickname:data})} value={this.state.nickname}/>
                        </Item>
                    </Form>
                    <Button style={{backgroundColor:'#00BF9A'}} rounded block onPress={()=>this._signin()}><Text>注册颂客</Text></Button>
                </Content>
            </Container>
            /*jshint ignore:end*/
        )
    }
}

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            loaded:false
        }
    }
    componentDidMount(){
        //check if user has login, go to share page
        AsyncStorage.getItem('user',(err,user)=>{
            if(err){
                console.log(err);
            }
            if(user){
                Actions.main();
            }
            else{
                this.setState({
                    loaded:true
                })
            }     
        });
    }
    render(){
        return(
            /*jshint ignore:start*/
            <Container>
                {this.state.loaded?
                <Tabs>
                    <Tab heading={ <TabHeading style={styles.tabs} ><Text>登录</Text></TabHeading>}>
                        <LoginPage/>
                    </Tab>
                    <Tab heading={ <TabHeading style={styles.tabs}><Text>注册</Text></TabHeading>}>
                        <SigninPage />
                    </Tab>
                </Tabs>
                :null}
            </Container>
            /*jshint ignore:end*/
        )
    }
}
const styles = {
    tabs:{
        backgroundColor:'#00AA8D'
    }
};
