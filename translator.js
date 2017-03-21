//translator.js
var fs = require('fs');
var MIDIFile = require('./node_modules/midifile/dist/MIDIFile.js');
var path = "./midis/"
var file = "Intro"

if(process.argv[2])
file = process.argv[2];

var inFile = path + file;

var midiFile = new MIDIFile(toArrayBuffer(fs.readFileSync(`${inFile}.mid`)));

//console.log(midiFile.header.getFormat());
//console.log(midiFile.header.getTicksPerBeat());

var events = midiFile.getMidiEvents();

fs.writeFile(`${inFile}.js`, "var notes = " + JSON.stringify(events), function(err){});

// events.forEach(function(element) {
// 	console.log(element.subtype);
// 	console.log(element.playTime);
// 	console.log(element.param1);
// 	console.log(element.param2);
// 	console.log(" ");
//});










function toArrayBuffer(buffer) {
  var ab = new ArrayBuffer(buffer.length);
  var view = new Uint8Array(ab);
  var i;

  for(i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return ab;
}