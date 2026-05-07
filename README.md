# Notes CLI with Yargs

A simple Node.js notes app powered by `yargs`.

You can:

- Add notes with tags
- List all notes
- Search notes by content
- Remove one note or clean all notes
- Open a web dashboard to view notes

## Features

- CLI commands using `yargs`
- JSON file database (`db.json`)
- Lightweight web view (`note web`)
- Unit tests with Jest

## Tech Stack

- Node.js (ES Modules)
- yargs
- open
- Jest

## Project Structure

```text
.
├── db.json
├── index.js
├── package.json
├── src
│   ├── commands.js
│   ├── db.js
│   ├── notes.js
│   ├── server.js
│   └── template.html
└── test
    └── notes.test.js
```

## Installation

```bash
npm install
```

## Run Tests

```bash
npm test
```

## Using the CLI

You have two ways to run commands:

1. Direct with Node:

```bash
node index.js <command>
```

2. As the `note` command (recommended for local development):

```bash
npm link
note <command>
```

## Commands

### 1) Add a note

```bash
note new "Buy milk"
```

Add tags:

```bash
note new "Study Node.js" --tags "study, work"
```

Alias:

```bash
note new "Workout" -t "health, daily"
```

Note: tags are currently split by `", "` (comma + space), so use a space after each comma.

### 2) Get all notes

```bash
note all
```

### 3) Find notes by text

```bash
note find "study"
```

### 4) Remove a note by id

```bash
note remove 1776973747971
```

### 5) Remove all notes

```bash
note clean
```

### 6) Open web interface

Default port `5000`:

```bash
note web
```

Custom port:

```bash
note web 3000
```

## Example Workflow

```bash
note new "Build yargs notes app" -t "study, node"
note new "Go for a walk" -t "health"
note all
note find "yargs"
note web
```

## Notes Database

All notes are saved in `db.json` in this format:

```json
{
  "notes": [
    {
      "tags": ["study", "node"],
      "content": "Build yargs notes app",
      "id": 1776973771362
    }
  ]
}
```

## Course Credit

This application was built while following the Frontend Masters course:
[Node.js v3](https://frontendmasters.com/courses/node-js-v3/)

## Author

Karim Safan

## License

ISC
