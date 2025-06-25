import { seekAudioToTime, isAudioPlaying, playAudio, pauseAudio } from "./audio";
import { rotateEqualizerImage, stopEqualizerImageRotation } from "./equalizer/equalizerImage";

const seekbar = document.querySelector('#seekbar');
const playPauseBtn = document.querySelector('#play-pause-btn');
const forward = document.querySelector('#forward');
const back = document.querySelector('#back');

function listenToAudioTimeUpdate (){
    document.addEventListener('audioTimeUpdate', e => {
        let currentTime = e.detail.currentTime;
        let duration = e.detail.duration;

        updateSeekbar({currentTime, duration});
        updateAudioCurrentTimeAndDuration({currentTime, duration});
    });
}

function updateSeekbar ({currentTime, duration}){
    seekbar.max = duration;
    seekbar.value = currentTime;

    forward.addEventListener('click', () => {                                                                           // forward 10 second 
        seekAudioToTime(parseInt(seekbar.value) + 10);
    });

    back.addEventListener('click', () => {                                                                              // replay 10 second back
        seekAudioToTime(parseInt(seekbar.value) - 10);
    });
}

function updateAudioCurrentTimeAndDuration ({currentTime, duration}){
    document.querySelector("#current-time").innerHTML = convertSecondToMinutes(currentTime);
    document.querySelector("#music-duration").innerHTML = convertSecondToMinutes(duration);
}

function listenToSeekbarChange (){
    seekbar.addEventListener('input', () => {                                                                           // whit input event change seekbar value
        seekAudioToTime(seekbar.value);
    });
}

function convertSecondToMinutes (second){
    let minutes = Math.floor(second / 60);
    let remainingSecond = (second - minutes * 60).toFixed();

    if(remainingSecond < 10) {
        return minutes + ":0" + remainingSecond;
    }
    return minutes + ":" + remainingSecond;
}

function setClickEventOnPlayPauseBtn (){
    playPauseBtn.addEventListener('click', () => {
        if (isAudioPlaying()){
            pauseAudio();
            setPlayPauseBtnAsPlay();
            stopEqualizerImageRotation();

        } else {
            playAudio();
            setPlayPauseBtnAsPause();
            rotateEqualizerImage();
        }
    });
}

function setPlayPauseBtnAsPause (){
    playPauseBtn.style.backgroundImage = 'url("/images/pause.png")';
}

function setPlayPauseBtnAsPlay (){
    playPauseBtn.style.backgroundImage =' url("/images/play.png")';
}


listenToSeekbarChange(); 
listenToAudioTimeUpdate();
setClickEventOnPlayPauseBtn();

export { setPlayPauseBtnAsPause, setPlayPauseBtnAsPlay}