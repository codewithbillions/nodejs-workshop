const fs = require("fs");

var fetchNotes = () => {
  try {
    return JSON.parse(fs.readFileSync("notes.txt"));
  } catch (err) {
    return [];
  }
};

var addingNote = (title, body) => {
  var notes = fetchNotes();

  var note = {
    title,
    body,
  };

  notes.push(note);

  fs.writeFileSync("notes.txt", JSON.stringify(notes));

  logNote(note);

  var double = notes.filter((note) => note.title === title);

  if(double.length === 0) {
    notes.push(note);

    fs.writeFileSync("notes.txt", JSON.stringify(notes));

    logNote(note);
  } else {
    console.log("STOP: Title already exists.");
  }
};

var removeNote = (title) => {
  var notes = fetchNotes();

  var filteredNotes = notes.filter((note) => note.title !== title);

  logNote(filteredNotes[0]);
};

var readNote = (title) => {
  var notes = fetchNotes();

  var filteredNotes = notes.filter((note) => note.title !== title);

  logNote(filteredNotes[0]);
};

var getAllNotes = () => {
  var notes = fetchNotes();

  notes.forEach((note) => logNote(note));

  logNote(notes);
};

var logNote = (note) => {
  console.log("************************");
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addingNote,
  removeNote,
  readNote,
  getAllNotes,
  logNote,
};
