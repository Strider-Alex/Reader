const Sound = require('react-native-sound');
let musicObj; // Sound instance
export default class MusicPlayer{
    constructor(props){
        this.musicObj = undefined;
    }
    // the core function to play or resume a muisc, release when it's done
    _playSound(musicObj,callback){
         musicObj.play((success) => {
            if (success) {
                console.log('successfully finished playing');
                musicObj.release();
                callback(false); //sound stop playing, callback with false
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        })
    }
    // play/stop music/audio
    musicPlayAndStop(path,callback){
        if(musicObj!==undefined&&musicObj.isLoaded()){
            musicObj.stop();
            musicObj.release();
            musicObj=undefined;
            if(callback){
                callback(false); //callback with false, stop playing
            }
        }
        else{ //load song if it's not loaded
            musicObj = new Sound(path, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                } 
                // loaded successfully
                console.log('duration in seconds: ' + musicObj.getDuration() + 'number of channels: ' + musicObj.getNumberOfChannels());
                // Play the sound with an onEnd callback
                this._playSound(musicObj,callback);
                if(callback){
                    callback(true); //callback with true, start playing
                }
            });
        }
    }
}