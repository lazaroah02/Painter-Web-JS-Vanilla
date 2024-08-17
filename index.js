//with of the canvas is the 70% of the windows
let CANVAS_WIDTH = 70/100 * window.innerWidth 
let CANVAS_HEIGHT="730"

const canvas = document.querySelector('canvas')
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
const ctx = canvas.getContext('2d')

//global variables
let isDrawing = false
let canvasVersions = [canvas.toDataURL()] 
let deletedCanvasVersions = [] 
let x_start = 0
let y_start = 0

//adjust the with of the canvas respect the with of the window
window.addEventListener("resize", () => {
    CANVAS_WIDTH = 70/100*window.innerWidth
    canvas.width = CANVAS_WIDTH
})

//start drawing 
canvas.addEventListener('mousedown', (event) => {
    isDrawing = true
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;

    //save the starting cursor position and adjust it respect the canvas position in the windows
    const rect = canvas.getBoundingClientRect();
    x_start = event.clientX - rect.left/2
    y_start = event.clientY - rect.top/2
    
})

//stop drawing
canvas.addEventListener('mouseup', (event) => {
    isDrawing = false
    //save the current canvas state data 
    canvasVersions.push(canvas.toDataURL())
})

//draw a line in the path left by the cursor if the user is drawing
canvas.addEventListener('mousemove', (event) =>{
    if(isDrawing){        
        const rect = canvas.getBoundingClientRect();
        
        let x = event.clientX - rect.left/2
        let y = event.clientY - rect.top/2
        
        ctx.beginPath();
        ctx.moveTo(x_start,y_start);
        ctx.lineTo(x, y);
        ctx.stroke(); 
	    ctx.closePath();
        
        x_start = x
        y_start = y
    }
})

//Ctrl+Z for remove the drawing
document.addEventListener('keydown', (event) => {
    if(canvasVersions.length > 0 && event.ctrlKey && event.key == "z"){
        let lastCanvasVersion = canvasVersions.pop()

        const img = new Image();
        img.src = lastCanvasVersion
        img.onload = () => {
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
            ctx.drawImage(img, 0, 0)
        }

        deletedCanvasVersions.push(lastCanvasVersion)
        //never delete the first blank canvas state
        canvasVersions.length === 0? canvasVersions.push(lastCanvasVersion):null
    }
})

//Ctrl+Y for undo the deleted drawings
document.addEventListener('keydown', (event) => {
    if(deletedCanvasVersions.length > 0 && event.ctrlKey && event.key == "y"){
        let lastDeletedCanvasVersion = deletedCanvasVersions.pop()
        
        const img = new Image();
        img.src = lastDeletedCanvasVersion
        img.onload = () => {
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
            ctx.drawImage(img, 0, 0)
        }
        
        canvasVersions.push(lastDeletedCanvasVersion)
    }
})
