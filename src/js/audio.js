let audio = null;
let audioContext;
let source;
let analyser;
let frequencyData;


function setUpAudio (url){
    audioContext = new AudioContext();
    audio = new Audio(url);
    listenToTimeUpdate();

    source = audioContext.createMediaElementSource(audio);                                                              // create element source for audio
    analyser = audioContext.createAnalyser();                                                                           // make analysor for audio source
    frequencyData = new Uint8Array(analyser.frequencyBinCount)                                                          // create array whit 512 cell (for first time all cells is 0)        

    source.connect(analyser);                                                                                           // connect source to analyser file
    analyser.connect(audioContext.destination)                                                                          // and connect to output audioContext
}

function getFrequencyData (){
    analyser.getByteFrequencyData(frequencyData);                                                                         // get input frequency and save in frequencyData (second by second)
    return frequencyData;
}

function playAudio (){
    audio.play();
}

function audioExists (){
    if (audio)  
        return true;

    return false;
}

function getAudio (){
    return audio;
}

function isAudioPlaying (){
    return audio.paused ? false : true;
}

function pauseAudio (){
    audio.pause();
}

function listenToTimeUpdate (){
    audio.addEventListener('timeupdate', () => {
        let currentTime = audio.currentTime;
        let duration = audio.duration;
          
        let event = new CustomEvent('audioTimeUpdate', {                                                                    // create custome event to send data for seekbar 
            detail: {
                currentTime,
                duration
            }
        });

        document.dispatchEvent(event);
    });
}

function seekAudioToTime (time){                                                                                            // set seekbar value equal by entered time
    audio.currentTime = time;
}

export { setUpAudio, playAudio, audioExists, getAudio, isAudioPlaying, pauseAudio, seekAudioToTime, getFrequencyData }