// 1. Drawing lines with mousemove


/* const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

const lineColors = [
"#55efc4",
"#81ecec",
"#74b9ff",
"#a29bfe",
"#dfe6e9",
"#00b894",
];

function onClick(Event) {
    ctx.beginPath();
    ctx.moveTo(400, 400);
    const color = lineColors[Math.floor(Math.random() * lineColors.length)];
    ctx.strokeStyle = color;
    ctx.lineTo(Event.offsetX, Event.offsetY);
    ctx.stroke();
}

canvas.addEventListener("mousemove", onClick); */



// 2. Drawing lines with click and dragging

const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file") ;
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;


canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;

function onMove(Event) {
    if(isPainting){
        ctx.lineTo(Event.offsetX, Event.offsetY);
        ctx.stroke();
        return;
    } 
    ctx.beginPath();
    ctx.moveTo(Event.offsetX, Event.offsetY);
}

function startPainting() {
    isPainting = true;
}
function cancelPainting() {
    isPainting = false;
}
function onLineWidthChange(Event) {
    ctx.lineWidth = Event.target.value;
}
function onColorChange(Event) {
    ctx.strokeStyle = Event.target.value;
    ctx.fillStyle = Event.target.value;
}
function onColorClick(Event) {
    const colorValue = Event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}
function onModeClick(Event) {
    if(isFilling){
        isFilling = false
        modeBtn.innerText = "Fill"
    } else {
        isFilling = true
        modeBtn.innerText = "Draw"
    }
}
function onCanvasClick() {
    if(isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}
function onDestroyClick() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
function onEraserClick() {
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}
function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function() {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    };
}
function onDoubleClick (event) {
    const text = textInput.value;
    if(text !== "") {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = "68px serif"
        ctx.fillText(text, event.offsetX, event.offsetY );
        ctx.restore();
    }
}
function onSaveClick() {
    const url = canvas.toDataURL(); 
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png"
    a.click();
}
function onDestroyAlert() {
    alert("Are you sure?")
}


canvas.addEventListener("dblclick", onDoubleClick)
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

canvas.addEventListener("click", onCanvasClick)
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);