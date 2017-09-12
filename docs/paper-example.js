var canvas = document.getElementById('canvas');
paper.setup(canvas);
var path = new paper.Path();
path.strokeColor = 'black';
var start = new paper.Point(100, 100)
path.moveTo(start);
path.lineTo(start.add([ 200, -50 ]))
paper.view.draw()

var tool = new paper.Tool()
var path

// Define a mousedown and mousedrag handler
tool.onMouseDown = function(event) {
  path = new paper.Path();
  path.strokeColor = 'black';
  path.add(event.point);
}

tool.onMouseMove = function(event) {
  path.add(event.point);
}
