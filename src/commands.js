#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  newNote,
  getAllNotes,
  findNotes,
  removeAllNotes,
  removeNote,
} from "./notes.js";

// TODO:
// 1. new <note>
// 2. all
// 3. remove <id>
// 4. find <filter>
// 5. clean
// 6. web [port] => display notes in web

// <note>, <id> and <filter> are positional

function listNotes(notes) {
  notes.forEach((note) => {
    console.log("ID:", note.id);
    console.log("tags:", note.tags.join(", "));
    console.log("Content:", note.content);
    console.log("\n");
  });
}

yargs(hideBin(process.argv))
  .command(
    "new <note>",
    "crete a new note",
    (yargs) => {
      return yargs.positional("note", {
        type: "string",
        description: "the content of the note to create.",
      });
    },
    async (argv) => {
      // logic
      const tags = argv.tags ? argv.tags.split(", ") : [];
      const note = await newNote(argv.note, tags);
      console.log("Note Added!", note);
    },
  )
  .options("tags", {
    alias: "t",
    type: "string",
    description: "tags to add to the notes",
  })
  .command(
    "all",
    "get all note",
    () => {},
    async (argv) => {
      const notes = await getAllNotes();
      // console.log(notes);

      if (!notes.length) {
        console.log("No notes in the db");
      } else {
        listNotes(notes);
      }
    },
  )
  .command(
    "find <filter>",
    "get matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        type: "string",
        description:
          "The search term to filter notes by, will be applied to note.content",
      });
    },
    async (argv) => {
      const notes = await findNotes(argv.filter);
      listNotes(notes);
    },
  )
  .command(
    "remove <id>",
    "remove a note by id",
    (yargs) => {
      return yargs.positional("id", {
        type: "number",
        description: "The id of the note you want to remove",
      });
    },
    async (argv) => {
      const id = await removeNote(argv.id);

      if (id) {
        console.log("Note removed: ", id);
      } else {
        console.log("Note not found");
      }
    },
  )
  .command(
    "clean",
    "remove all notes",
    () => {},
    async (argv) => {
      await removeAllNotes();
      console.log("All notes have been removed");
    },
  )
  .command("web [port]", "display notes on the browser", (yargs) => {
    return yargs.positional("port", {
      type: "number",
      default: 5000,
      description: "port number listening",
    });
  })

  .demandCommand(1)
  .parse();
