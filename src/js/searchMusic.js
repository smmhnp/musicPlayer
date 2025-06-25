import { setMusicInfoInDOM } from "./slider";
import handelMusicClicked from "./handelMusicClicked";

const searchInput = document.querySelector('#search-input');
const searchMusicsDiv = document.querySelector('#search-musics');
let musics = [];

function listenToKeyUpEvent (){
    searchInput.addEventListener('keyup', e => {
       let keyWord = e.target.value?.toLowerCase(); 
       let searchedMusic = searchMusic(keyWord);
       clearSearchMusics();
       showSearchedMusic(searchedMusic).then(() => setClickListenerOnSearchedMusics() );
    });
}

function setClickListenerOnSearchedMusics (){
    document.querySelectorAll('.searched-music').forEach(musicDiv => {
        musicDiv.addEventListener('click', () => {
            let uuid = musicDiv.getAttribute('data-uuid');
            let foundMusic = musics.find(music => music.uuid === uuid);
            setMusicInfoInDOM(foundMusic);
            handelMusicClicked(foundMusic);
        });
    });
}

function clearSearchMusics (){
    searchMusicsDiv.innerHTML = ''; 
}

function searchMusic (keyword) {
    if (!keyword) return [];

    let filteredMusics = musics.filter(music => {
        let title = music.title?.toLowerCase();
        let artist = music.artist?.toLowerCase();
        let genre = music.genre?.toLowerCase();

        if (title.indexOf(keyword) !== -1 || artist.indexOf(keyword) !== -1 || genre.indexOf(keyword) !== -1) {
            return true;
            
        } else {
            return false;
        }
    })
    return filteredMusics;
}

function showSearchedMusic (musics){
    return new Promise (resolve => {
        musics.forEach(music => {
            let musicHTML = `<div class="searched-music" data-uuid="${music.uuid}" >
                                <div>
                                    <div>${music.title}</div>
                                    <div>${music.artist}</div>
                                </div>

                                <img src="${music.cover_image}" />
                            </div>`;


            searchMusicsDiv.innerHTML += musicHTML;
        });

        resolve();
    })
}

function passDataToSearchModule (musicsData){
    musics = musicsData;
}


listenToKeyUpEvent();

export default passDataToSearchModule