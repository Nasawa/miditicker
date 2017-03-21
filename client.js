//client.js

function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    notes.forEach(function(note) {
    	var a = note.param1 * 12;
    	var b = note.playTime / 12;

    	ctx.fillRect(a, b, 10, 10);

    });
  }
}