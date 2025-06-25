import fetchData from "./js/fetchData";
import { passDataToSliderModule } from "./js/slider";
import passDataToSearchModule from "./js/searchMusic";
import './js/equalizer/equalizer';
import './js/seekbar';
import './js/searchMusic';



let musics;

async function getData(){
    musics = await fetchData();
    passDataToSliderModule(musics);
    passDataToSearchModule(musics);
}

getData();

export default musics;