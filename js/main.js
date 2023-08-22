'use strict'
let gElCanvas
let gCtx
let gCurrShape = 'rect'
var gColor
var pos = { x: 0, y: 0 };
function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    console.log('gCtx', gCtx)
    addEventListeners()
    resizeCanvas()

}

function addEventListeners() {
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('mousedown', setPosition);
    document.addEventListener('mouseenter', setPosition);

}

function drawLine(x, y, xEnd = 250, yEnd = 250) {
    gCtx.beginPath()
    gCtx.moveTo(x, y)
    gCtx.lineTo(xEnd, yEnd)
    gCtx.lineWidth = 3
    gCtx.strokeStyle = gColor
    gCtx.stroke()
}

function drawTriangle(x, y) {
    gCtx.beginPath()
    gCtx.moveTo(x, y)
    gCtx.lineTo(x + 40, y + 80)
    gCtx.lineTo(x - 40, y + 80)
    gCtx.closePath()
    gCtx.fillStyle = gColor
    gCtx.fill()
}

function drawRect(x, y) {
    gCtx.fillStyle = gColor
    gCtx.fillRect(x, y, 120, 120)
    
}

function drawArc(x, y) {
    gCtx.beginPath()
    gCtx.arc(x, y, 20, 0, 2 * Math.PI)
    gCtx.fillStyle = gColor
    gCtx.fill()
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.fillStyle = gColor
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}


function onClearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)

}

function onSetShape(shape) {
    gCurrShape = shape
    if (shape === 'pencil') {
        document.addEventListener('mousemove', drawPencil);
    } else {
        document.removeEventListener('mousemove', drawPencil);
    }
}

function onDrawingColorChange(color) {
    gColor = color
}

function onDraw(ev) {
    const { offsetX, offsetY } = ev
    console.log('offsetX, offsetY:', offsetX, offsetY)

    switch (gCurrShape) {
        case 'line':
            drawLine(offsetX, offsetY)
            break
        case 'triangle':
            drawTriangle(offsetX, offsetY)
            break
        case 'rect':
            drawRect(offsetX, offsetY)
            break
        case 'circle':
            drawArc(offsetX, offsetY)
            break
        case 'text':
            const userText = prompt('Text?')
            if (!userText) return
            drawText(userText, offsetX, offsetY)
            break
        case 'pencil':
            drawPencil(offsetX, offsetY)
            break
    }
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth - 2
}

function setPosition(ev) {
    pos.x = ev.offsetX;
    pos.y = ev.offsetY;
}

function drawPencil(ev) {
    // mouse left button must be pressed
    if (ev.buttons !== 1) return;

    gCtx.beginPath(); // begin

    gCtx.lineWidth = 3;
    gCtx.lineCap = 'round';
    gCtx.strokeStyle = gColor;

    gCtx.moveTo(pos.x, pos.y); // from
    setPosition(ev);
    gCtx.lineTo(pos.x, pos.y); // to

    gCtx.stroke(); // draw it!
}
