console.log('armoury.js is now connected');

const fs = require('fs');

var fetchNotes = function(){
  try{
    var notes = JSON.parse(fs.readFileSync('notes-file.json'));
    return notes;
  } catch(e){
    return [];
  }
};

var saveNotes = function(notes){
  fs.writeFileSync('notes-file.json',JSON.stringify(notes));
};
// ============================================================================================
var append = function (title,body){
  var notes = fetchNotes();
  var note = {
    title,
    body
  };

  var repeatedNotes = notes.filter(function (item){
    return (item.title === note.title);
  });

  if(repeatedNotes.length!=0){
    console.log("A note of this title already exists");
  }
  else {
    notes.push(note);
    saveNotes(notes);
  }
}
//==============================================================================================
var getAll = function() {
  return fetchNotes();
}
// ==============================================================================================
var remove = function(title) {
  var notes = fetchNotes();
  var afterDeletion = notes.filter(function(item){ return (item.title!==title)});
  saveNotes(afterDeletion);
  if(notes.length>afterDeletion.length)
    console.log('Repeated notes are deleted');
  else {
    console.log('The title does not exist in the notes');
  }
}
// ==============================================================================================
var fetch = function(title) {
  var notes = fetchNotes();
  var filteredNotes = notes.filter(function(item){
    return (item.title === title)
  });
  if(filteredNotes.length == 1)
    return filteredNotes[0];
}

module.exports = {
  append,
  getAll,
  remove,
  fetch
};
