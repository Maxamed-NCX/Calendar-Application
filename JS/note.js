// Container and Button
const noteContainer = document.getElementById("app");
const addNoteButton = noteContainer.querySelector(".add-note");

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  noteContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

// Create note
function createNoteElement(id, content) {
  const element = document.createElement("textarea");

  element.classList.add("note");
  element.value = content;
  element.placeholder = "add text";

  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    const doDelete = confirm("OK to Delete Note");

    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}

// Add note
function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };
  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  noteContainer.insertBefore(noteElement, addNoteButton);

  notes.push(noteObject);
  saveNotes(notes);
}

// Update Note
function updateNote(id, newContent) {
  // console.log("Updating Note...");
  // console.log(id, newContent);
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}

// Delete Note
function deleteNote(id, element) {
  //   console.log("Deleting Note...");
  //   console.log(id);

  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  noteContainer.removeChild(element);
}