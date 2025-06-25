import equalizerWidth from "./equalizerWidth";

const equalizerImage = document.querySelector('#equalizer-section img');

function setEqualizerImage (imageURL){
    equalizerImage.src = imageURL;
}

function setEqualizerImageDimension (){
    equalizerImage.style.width = equalizerWidth + "px";
    equalizerImage.style.height = equalizerWidth + "px";
    equalizerImage.src = 'covers/default.jpg';
}

function rotateEqualizerImage (){
    equalizerImage.classList.add('rotate');
}

function stopEqualizerImageRotation (){
    equalizerImage.classList.remove('rotate');
}

setEqualizerImageDimension();

export {setEqualizerImage, rotateEqualizerImage, stopEqualizerImageRotation}