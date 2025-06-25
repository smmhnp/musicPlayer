import { setEqualizerImage } from "./equalizerImage";
import equalizerWidth from "./equalizerWidth";

const progressbar = document.querySelector('#circular-progressbar');
const progressbarColor = 'white';
const progressbarThickness = 5;

function listenToAudioTimeUpdate (){
    document.addEventListener('audioTimeUpdate', e => {
        let currentTime = e.detail.currentTime;
        let duration = e.detail.duration;

        let angle = currentTime / duration * 360;
        updateProgressbar(angle);
    });
}

function setProgressbarDimension () {
    progressbar.style.width = (equalizerWidth + 2 * progressbarThickness) + 'px';
    progressbar.style.height = (equalizerWidth + 2 * progressbarThickness) + 'px';
}


function updateProgressbar (angle) {
    progressbar.style.background = `conic-gradient(${progressbarColor} 0 ${angle}deg, transparent ${angle}deg 360deg)`;
}

listenToAudioTimeUpdate();
setProgressbarDimension();

export default progressbarThickness