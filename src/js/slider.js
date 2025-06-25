import Swiper from "swiper";
import 'swiper/css';
import { Manipulation, FreeMode } from "swiper/modules";
import handelMusicClicked from "./handelMusicClicked";


const previous = document.querySelector('#previous-track');
const next = document.querySelector('#next-track');
let musicsData;                                                                                                         // set global var for save all musics list

function createSlider (musics){
    const swiper = new Swiper('.swiper', {                                                                              // create swiper object
        modules: [Manipulation, FreeMode],
        // slidesPerView: 10,                                                                                              // show 10 slide in page
        freeMode: true,                                                                                                 // to smooth slider
        loop: true,                                                                                                     // create loop for slider
        direction: 'vertical',
        slidesPerView: 'auto',
    });

    musics.forEach(music => {                                                                                           // create slider for each music
        let slideHTML = `<div class="swiper-slide" data-uuid="${music.uuid}">
                            <img class="music-image" src="${music.cover_image}" />

                            <div>
                                <div class="music-title">${music.title}</div>
                                <div class="music-artist">${music.artist}</div>
                            </div>

                        </div>`;

        swiper.appendSlide(slideHTML);
    })
}

function setClickListenerOnSliderItems (){                                                                              // find music by click on it
    let slides = document.querySelectorAll('.swiper-slide');                                                            // get all slide of slider                 
    slides.forEach(slide => {
        slide.addEventListener('click', () => {                                                                         // set click event
            let uuid = slide.getAttribute('data-uuid');                                                                 // get uuid from data-uuid Attribute
            let foundMusic = musicsData.find(music => music.uuid === uuid);                                             // find by uuid from all nusics at musicsData global var
            setMusicInfoInDOM(foundMusic);                                                                              // show music info to client
            handelMusicClicked(foundMusic);
        })
    });
}

function setMusicInfoInDOM (music){
    document.querySelector('#music-info #title').innerHTML = "عنوان: " + music.title;
    document.querySelector('#music-info #artist').innerHTML = "خواننده: " + music.artist;
    document.querySelector('#music-info #genre').innerHTML = "سبک: : " + music.genre;
    document.querySelector('#music-info #content').innerHTML = "<b>متن:</b> <br>" + music.lyric.split('\n').join('<br>');

    // ...............................next.music.value...................................

    if (music.index === "22")
        next.value = 1;
    else
        next.value = parseInt(music.index) + 1;


    // ...............................previous.music.value...............................

    if (music.index === "1")
        previous.value = 22;
    else
        previous.value = parseInt(music.index) - 1;


    // ...............................selected. music.list...............................

    let slides = document.querySelectorAll('.swiper-slide');
    slides.forEach(slide => {
        if (slide.getAttribute('data-uuid') === music.uuid){
            slide.style.background = "#6b6b6ba4";
            return 1;
        }
        slide.style.background = "";
    })
}

function passDataToSliderModule (musics){
    musicsData = musics;
    createSlider(musics);
    setClickListenerOnSliderItems();

    document.querySelectorAll('#next-track').forEach(next => {
        next.addEventListener('click', () => {
            let index = next.getAttribute('value');
            let foundMusic = musics.find(music => music.index === index);
      
            setMusicInfoInDOM(foundMusic);
            handelMusicClicked(foundMusic);
        });
    });

    document.querySelectorAll('#previous-track').forEach(previous => {
        previous.addEventListener('click', () => {
            let index = previous.getAttribute('value');
            let foundMusic = musics.find(music => music.index === index);
      
            setMusicInfoInDOM(foundMusic);
            handelMusicClicked(foundMusic);
        });
    });
}

export {passDataToSliderModule, setMusicInfoInDOM} 