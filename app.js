const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const DEFAULT_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = DEFAULT_COLOR;
ctx.fillStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;


const stopPainting = () => {
    painting = false;
}

const onMouseMove = (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
        
    }
}

const startPainting = () => {
    painting = true;
}

const handleColorClick = (event) => {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

const handleRangeChange = (event) => {
    const size = event.target.value;
    ctx.lineWidth = size;
}

const handleModeClick = () => {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling =true;
        mode.innerText = "Paint";
    }
}

const handleCanvasClick = () => {
    if(filling){
        ctx.fillRect( 0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}


if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
}

Array.from(colors).forEach( color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}