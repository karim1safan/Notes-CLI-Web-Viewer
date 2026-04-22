#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// TODO:
// 1. new <note>
// 2. all
// 3. remove <id>
// 4. find <filter>
// 5. clean
// 6. web [port] => display notes in web

// <note>, <id> and <filter> are positional
yargs(hideBin(process.argv))
  .command("new <note>", "crete a new note", (yargs) => {
    return (
      yargs.positional("note", {
        type: "string",
        description: "the content of the note to create.",
      }),
      async (argv) => {
        // logic 
      }
    );
  })
  .options("tags", {
    alias: "t",
    type: "string",
    description: "tags to add to the notes",
  })
  .command("all", "display all note")
  .command("remove <id>", "remove a specific note", (yargs) => {
    return (
      yargs.positional("id", {
        type: "number",
        description: "the id of the note to remove it.",
      }),
      async (argv) => {}
    );
  })
  .command("find <filter>", "filter the notes", (yargs) => {
    return (
      yargs.positional("filter", {
        type: "string",
        description: "filter value to filter notes",
      }),
      async (argv) => {}
    );
  })
  .command("clean", "remove all notes")
  .command("web [port]", "display notes on the browser", (yargs) => {
    return yargs.positional("port", {
      type: "number",
      default: 5000,
      description: "port number listening",
    });
  })

  .demandCommand(1)
  .parse();
