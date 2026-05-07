import fs from "node:fs/promises";
import http from "node:http";
import open from "open";

export const interpolate = (html, data) => {
  return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) => {
    return data[placeholder] || "";
  });
};

export const formatNotes = (notes) => {
  if (!notes.length) {
    return `
      <article class="note note-empty">
        <h2>No notes yet</h2>
        <p>Add your first note from the terminal to see it here.</p>
      </article>
    `;
  }

  return notes
    .map((note) => {
      return `
      <article class="note">
        <p class="note-content">${note.content}</p>
        <div class="tags">
          ${note.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
      </article>
    `;
    })
    .join("\n");
};

export const createServer = (notes) => {
  return http.createServer(async (req, res) => {
    const HTML_PATH = new URL("./template.html", import.meta.url).pathname;
    const template = await fs.readFile(HTML_PATH, "utf-8");
    const html = interpolate(template, {
      notes: formatNotes(notes),
      count: String(notes.length),
    });

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  });
};

export function start(notes, port) {
  const server = createServer(notes);

  server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
  open(`http://localhost:${port}`);
}
