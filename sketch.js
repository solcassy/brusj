let strokes = [];
let undoneStrokes = [];
let currentStroke;
let brushColor = '#000000';
let brushSize = 5;

function setup() {
  let canvas = createCanvas(windowWidth * 0.9, windowHeight * 0.7);
  canvas.parent('canvasContainer');
  background(255);

  select('#undoBtn').mousePressed(undoStroke);
  select('#redoBtn').mousePressed(redoStroke);
  select('#clearBtn').mousePressed(clearCanvas);
  select('#saveBtn').mousePressed(() => saveCanvas('drawing', 'png'));
  select('#colorPicker').input(() => {
    brushColor = select('#colorPicker').value();
  });
  select('#sizePicker').input(() => {
    brushSize = select('#sizePicker').value();
  });
}

function draw() {
  if (mouseIsPressed) {
    if (!currentStroke) {
      currentStroke = new Stroke(brushColor, brushSize);
      strokes.push(currentStroke);
    }
    currentStroke.addPoint(mouseX, mouseY);
  } else {
    currentStroke = null;
  }

  background(255);
  for (let s of strokes) {
    s.display();
  }
}

function undoStroke() {
  if (strokes.length > 0) {
    undoneStrokes.push(strokes.pop());
  }
}

function redoStroke() {
  if (undoneStrokes.length > 0) {
    strokes.push(undoneStrokes.pop());
  }
}

function clearCanvas() {
  strokes = [];
  undoneStrokes = [];
}

class Stroke {
  constructor(color, size) {
    this.color = color;
    this.size = size;
    this.points = [];
  }

  addPoint(x, y) {
    this.points.push(createVector(x, y));
  }

  display() {
    stroke(this.color);
    strokeWeight(this.size);
    noFill();
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth * 0.9, windowHeight * 0.7);
}
