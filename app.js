
const fs = require('fs');
const os = require('os');
const add = require('./armoury.js');
const _ = require('lodash');
const yargs = require('yargs');

var titleObj = {
  describe: "Title of the note",
  demand: true,
  alias: 't'
};
var bodyObj = {
  describe: 'Body of the note',
  demand: true,
  alias: 'b'
};
if(process.argv.length > 2){
  var command = process.argv[2];
  var inputArgs = yargs
  .command("add","Add a new note",{title:titleObj,body:bodyObj})                                   //Important implementation of .command
  .command("remove","Remove a note",{title:titleObj})
  .command("list","List all the notes")
  .command("read","View a note",{title:titleObj})
  .help()
  .argv;

  // ======================================================================================
  if(command.toLowerCase() === 'add'){

    add.append(inputArgs.title, inputArgs.body);

  } // ======================================================================================
  else if(command.toLowerCase() === 'list'){

    var allNotes = add.getAll();
    console.log(`The number of notes is: ${allNotes.length}`);
    allNotes.forEach(function(item){
      console.log(`Title: ${item.title} \n Content: ${item.body}`);
    })

  }// ======================================================================================
  else if(command.toLowerCase() === 'remove'){

    add.remove(inputArgs.title);

  }// ======================================================================================
  else if(command.toLowerCase() === 'read'){

    var note = add.fetch(inputArgs.title);
    debugger;
    if(note)
    {
      console.log("Node found!!!");
      console.log(`Title: ${note.title} \n Content: ${note.body}`);
    }
    else
    {
      console.log('No such note exists!');
    }

  }// ======================================================================================
  else {

    console.log('Unrecognised input.');

  }
} else {
  console.log("Please enter a command. Commands are: \n add  \n remove \n list \n read");
}
