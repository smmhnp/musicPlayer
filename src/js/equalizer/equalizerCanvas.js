import { getFrequencyData } from "../audio";
import equalizerWidth from "./equalizerWidth";
import progressbarThickness from "./progressbar";

const canvas = document.querySelector('#equalizer-canvas');
const context = canvas.getContext('2d');

function listenToAudioTimeUpdate() {
    document.addEventListener('audioTimeUpdate', async (e) => {
        try {
            const frequencyData = await getFrequencyData();
            clearCanvas();
            drawEqualizer(frequencyData);
        } catch (error) {
            console.error("Error in equalizer:", error);
        }
    });
}

function drawEqualizer(frequencyData) {
    let slideCount = 100;
    let redius = equalizerWidth / 2 + progressbarThickness + 8;
    let maxHeight = 60;
    let maxFrequency = 255;

    frequencyData.slice(0, slideCount).map(frequency => Math.pow(frequency / maxFrequency, 4) * maxFrequency).forEach((frequency, index) => {
        let angle = (2 * Math.PI / slideCount) * index;
        let x1 = canvas.width / 2 + redius * Math.cos(angle);
        let y1 = canvas.height / 2 + redius * Math.sin(angle);

        let lineHeight = (frequency / maxFrequency) * maxHeight;
        let x2 = canvas.width / 2 + (redius + lineHeight) * Math.cos(angle);
        let y2 = canvas.height / 2 + (redius + lineHeight) * Math.sin(angle);

        let percent = angle / (Math.PI * 2);

        drawLine({ x1, y1, x2, y2, percent });
    });
}

function drawLine({ x1, y1, x2, y2, percent }) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = interpolateColor(percent );
    context.lineWidth = 8;
    context.lineCap = 'round';
    context.stroke();
}

function setCanvasDimention (){
    canvas.width = equalizerWidth * 1.7;
    canvas.height = equalizerWidth * 1.7;
}

function clearCanvas (){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function interpolateColor (percent) {
    const colors = [
        [0, 255, 204],
        [255, 102, 102],
        [255, 204, 0],
        [102, 255, 102],
        [102, 178, 255],
        [0, 255, 204]
    ];
    percent = Math.max(0, Math.min(1, percent));

    let index = Math.floor(percent * (colors.length - 1));
    let factor = (percent * (colors.length - 1)) - index;

    let color1 = colors[index];
    let color2 = colors[index + 1] || colors[index];

    const result = color1.map((c, i) => Math.round(c + factor * (color2[i] - c)));
    return `rgb(${result.join(",")})`;
}

setCanvasDimention();
listenToAudioTimeUpdate();