//sidebar params
let thickness = 1
let color = 'rgba(0, 0, 0, 0.5)'
let hex = '#000000'
let opacity = 1

function changeThickness(newValue){
    thickness = newValue
}

function changeDrawingColor(newValue){
    hex = newValue
    color = convertHexadecimalToRgb({hex:newValue, opacity:opacity})
}

function changeDrawingOpacity(newValue){
    opacity = newValue
    color = convertHexadecimalToRgb({hex:hex, opacity:newValue})
}

function changeDrawingShape(newValue){
    shape = newValue
}

function clearCanvas(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    canvasVersions = [canvas.toDataURL()]
    deletedCanvasVersions = []
}

function exportDrawing(){
    // Create a temporal canvas
    let tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    let tempContext = tempCanvas.getContext('2d');

    // Draw a white background in the temporal canvas
    tempContext.fillStyle = 'white';
    tempContext.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Draw the original canvas content in the temporal canvas
    tempContext.drawImage(canvas, 0, 0);

    // Export the temporal canvas image
    let dataURL = tempCanvas.toDataURL("image/png", 1);
    let enlace = document.createElement('a');
    enlace.download = "Canvas como imagen.png";
    enlace.href = dataURL;
    enlace.click();
    enlace.remove();
}