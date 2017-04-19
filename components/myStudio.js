import React, { Component } from 'react';
import MyFooter from './myFooter';
import { Footer, FooterTab, Button, Container, Content, Card, CardItem, Text, Icon } from 'native-base';
const Sound = require('react-native-sound');
let music; // Sound instance
export default class MyStudio extends Component {
    // play or resume a muisc, release when it's done
    _playSound(music){
         music.play((success) => {
            if (success) {
                console.log('successfully finished playing');
                music.release();
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        })
    }
    // on press, play music
    _onPressStart(){
        if(music!==undefined&&music.isLoaded()){
            this._playSound(music);
        }
        else{ //load song if it's not loaded
            music = new Sound('whoosh.aac', Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                } 
                // loaded successfully
                console.log('duration in seconds: ' + music.getDuration() + 'number of channels: ' + music.getNumberOfChannels());
                // Play the sound with an onEnd callback
                this._playSound(music);
            });
        }
    }
    // on press, stop music
    _onPressStop(){
        music.stop();
        music.release();
        music=undefined;
    }
    // on press, pause music
    _onPressPause(){
        music.pause();
    }
    render() {
        return (
            /* jshint ignore: start */
            <Container>
                <Content>
                    <Button onPress = {()=>this._onPressStart()} title="play music" />
                    <Button onPress = {()=>this._onPressStop()} title="stop music"/>
                    <Button onPress = {()=>this._onPressPause()} title="pause music" />
                </Content>
                <MyFooter/>
            </Container>
            /* jshint ignore: end */
        );
    }
}