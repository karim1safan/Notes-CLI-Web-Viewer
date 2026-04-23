import { expect, jest } from "@jest/globals";

// mock for the db (fake db)
jest.unstable_mockModule("../src/db.js", () => ({
  insertDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { insertDB, getDB, saveDB } = await import("../src/db.js");
const { newNote, getAllNotes, removeNote } = await import("../src/notes.js");

// clean db before testing
beforeEach(() => {
  insertDB.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
});

describe("cli app", () => {
  test("newNote inserts data and returns it", async () => {
    const note = {
      id: 1,
      content: "note",
      tags: ["tag1", "tag2"],
    };

    insertDB.mockResolvedValue(note);

    const results = await newNote(note.content, note.tags);

    expect(results.content).toEqual(note.content);
    expect(results.tags).toEqual(note.tags);
  });

  test("getAllNotes returns all notes", async () => {
    const db = {
      notes: ["note1", "note2", "note3"],
    };
    getDB.mockResolvedValue(db);

    const result = await getAllNotes();
    expect(result).toEqual(db.notes);
  });

  test("removeNote does nothing if id is not found", async () => {
    const notes = [
      { id: 1, content: "note 1" },
      { id: 2, content: "note 2" },
      { id: 3, content: "note 3" },
    ];
    saveDB.mockResolvedValue(notes);

    const idToRemove = 4;
    const result = await removeNote(idToRemove);
    expect(result).toBeUndefined();
  });
});

// const add = (num1, num2) => num1 + num2;

// test("add takes two numbers and returns a sum", () => {
//   const results = add(1, 2);
//   expect(results).toBe(3);
// });

// toBe() => check the strick for equality (same obj in memory)
// toEqual() => perform a deep comparison, checking obj properties

// toEqual() checks object properties, while toBe() checks object reference

// two ways of testing:
// test("", () => {})
// it("should do something", () => {})
