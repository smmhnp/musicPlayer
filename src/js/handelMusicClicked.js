import { audioExists, setUpAudio, playAudio, getAudio, isAudioPlaying, pauseAudio } from "./audio";
import { setPlayPauseBtnAsPause, setPlayPauseBtnAsPlay } from "./seekbar";
import { setEqualizerImage, stopEqualizerImageRotation, rotateEqualizerImage } from "./equalizer/equalizerImage";

function handelMusicClicked (music){
    if (!audioExists()){                                                                                                // if click for first time
        setUpAudio(music.url);                                                                                          // set music and play
        playAudio();
        setEqualizerImage(music.cover_image);
        rotateEqualizerImage();
        setPlayPauseBtnAsPause();

    } else {                                                                                                            // if click for second time
        if (getAudio().attributes.src.value === music.url){                                                             // if click is repetitive
            if (isAudioPlaying()){                                                                                      // if audio is played
                pauseAudio();
                setPlayPauseBtnAsPlay();
                stopEqualizerImageRotation();

            } else {
                playAudio();
                setEqualizerImage(music.cover_image);
                setPlayPauseBtnAsPause();
                rotateEqualizerImage();
            }
        } else {
            pauseAudio();                                                                                               // pause last music 
            setUpAudio(music.url);                                                                                      // set new music and play it
            playAudio();
            setEqualizerImage(music.cover_image);
            setPlayPauseBtnAsPause();
            rotateEqualizerImage();
        }
    }
    
}

export default handelMusicClicked
