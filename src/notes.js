import { getDB, insert, saveDB } from "./db.js";

// 1. Create
export async function newNote(note, tags) {
  const data = {
    tags: tags,
    content: note,
    id: Date.now(),
  };

  await insert(note);
  return data; // returns the newly created note
}

// 2. Read
export async function getAllNotes() {
  const data = await getDB();
  return data.notes; // retrieves all notes from db using getDB(), return array of all notes
}

// 3. Search
export async function findNotes(filter) {
  const notes = await getAllNotes();

  // "learn javascript".includes("java") => true
  return notes.filter((note) =>
    note.content.toLowerCase().includes(filter.toLowerCase()),
  );
}

// 4. Delete a note
export async function removeNote(id) {
  const notes = await getAllNotes();
  const match = notes.find((id) => note.id === id); // check if the note in db.json or not

  if (match) {
    const newNotes = notes.filter((note) => note.id !== id);
    await saveDB({ notes: newNotes });
    return id;
  }
}

// 5. Delete All Notes
export async function removeAllNotes() {
  await saveDB({ notes: [] });
}
