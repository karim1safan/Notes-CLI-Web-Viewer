import fs from "fs/promises";

const DB_PATH = decodeURIComponent(
  new URL("../db.json", import.meta.url).pathname,
);

export async function getDB() {
  const db = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(db); // convert json to js object
}

export async function saveDB(db) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  return db;
}

export async function insert(note) {
  const db = await getDB();

  db.notes.push(note);
  await saveDB(db);
  return note;
}
