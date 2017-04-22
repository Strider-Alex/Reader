import {AudioRecorder, AudioUtils} from 'react-native-audio';

/**
 * @class MyAudioRecorder
 * deal with audio related stuff
 * however do not include obtaining microphone permission
 */
export default class MyAudioRecorder{
    //prepare recording configs
    _prepareRecordingPath(audioPath){
        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: "Low",
            AudioEncoding: "aac",
            AudioEncodingBitRate: 32000
      });
    }
    recordStartAndStop(path,recording,callback){
        //stop recording
        if(recording){
            AudioRecorder.stopRecording()
                .then(()=>{
                    if(callback){
                        //recording stop, callback with false
                        callback(false);
                    }
                })
                .catch((err)=>{
                    if(err) console.log(err);
                });
        }
        else{
            this._prepareRecordingPath(path);
            AudioRecorder.startRecording()
                .then(()=>{
                    if(callback){
                        //recording start, callback with true
                        callback(true);
                    }
                })
                .catch((err)=>{
                    if(err) console.log(err);
                });
        }
    }
}