import { join } from "path";
import {
  getBooks,
  getBookById,
  getChapters,
  getShelves,
  getPages,
  getPageById,
  getShelfById,
  getAttachments,
  getDocs,
  getAttachmentById,
} from "./src/api.js";
import { createDirectoryIfNotExists, exportType } from "./src/util.js";
import { exportFile } from "./src/client.js";

const ts = new Date().toISOString().replace(/:/g, "-").replace(/\./g, "-");
let dir = join("backup", ts);

await createDirectoryIfNotExists(dir);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// delay(1000);

let bBooks = false,
  bChapters = false,
  bPages = false,
  bShelves = false,
  bAttachments = false;

// parse arguments
const args = process.argv.slice(2);
if (args.length > 0) {
  switch (args[0]) {
    case "books":
      bBooks = true;
      break;
    case "chapters":
      bChapters = true;
      break;
    case "pages":
      bPages = true;
      break;
    case "shelves":
      bShelves = true;
      break;
    case "attachments":
      bAttachments = true;
      break;
    default:
      break;
  }
} else {
  bBooks = true;
  bChapters = true;
  bPages = true;
  bShelves = true;
  bAttachments = true;
}

/* DOCS */
await getDocs(dir);
await delay(500)

/* BOOKS */
if (bBooks) {
  dir = join(dir, "books");
  await createDirectoryIfNotExists(dir);
  const books = await getBooks(dir);
  await delay(500)

  for (const book of books.data) {
    console.log(`Backup book ${book.id}`);
    const folder = join(dir, "book-" + book.id);
    await createDirectoryIfNotExists(folder);
    const filename = join(folder, "book-" + book.id + ".json");
    await getBookById({ id: book.id, path: filename });
    await delay(500)

    try {
      await exportFile({
        id: book.id,
        section: "books",
        type: "html",
        path: join(folder, `book-${book.id}.${exportType["html"].extension}`),
      });
      await delay(200)
      await exportFile({
        id: book.id,
        section: "books",
        type: "pdf",
        path: join(folder, `book-${book.id}.${exportType["pdf"].extension}`),
      });
      await delay(200)
      await exportFile({
        id: book.id,
        section: "books",
        type: "txt",
        path: join(folder, `book-${book.id}.${exportType["txt"].extension}`),
      });
      await delay(200)
      await exportFile({
        id: book.id,
        section: "books",
        type: "md",
        path: join(folder, `book-${book.id}.${exportType["md"].extension}`),
      });
      await delay(200)
    } catch (error) {
      console.error("Error exportFile:", error);
    }
  }
}
/* CHAPTERS */
if (bChapters) {
  dir = join("backup", ts, "chapters");
  await createDirectoryIfNotExists(dir);
  const chapters = await getChapters(dir);
  await delay(500)

  for (const chapter of chapters.data) {
    console.log(`Backup chapter ${chapter.id}`);
    const folder = join(dir, "chapter-" + chapter.id);
    await createDirectoryIfNotExists(folder);
    const filename = join(folder, "chapter-" + chapter.id + ".json");
    await getBookById({ id: chapter.id, path: filename });
    await delay(500)

    try {
      await exportFile({
        id: chapter.id,
        section: "chapters",
        type: "html",
        path: join(
          folder,
          `chapter-${chapter.id}.${exportType["html"].extension}`
        ),
      });
      await delay(200)
      await exportFile({
        id: chapter.id,
        section: "chapters",
        type: "pdf",
        path: join(
          folder,
          `chapter-${chapter.id}.${exportType["pdf"].extension}`
        ),
      });
      await delay(200)
      await exportFile({
        id: chapter.id,
        section: "chapters",
        type: "txt",
        path: join(
          folder,
          `chapter-${chapter.id}.${exportType["txt"].extension}`
        ),
      });
      await delay(200)
      await exportFile({
        id: chapter.id,
        section: "chapters",
        type: "md",
        path: join(
          folder,
          `chapter-${chapter.id}.${exportType["md"].extension}`
        ),
      });
      await delay(200)
    } catch (error) {
      console.error("Error exportFile:", error);
    }
  }
}
/* PAGES */
if (bPages) {
  dir = join("backup", ts, "pages");
  await createDirectoryIfNotExists(dir);
  const pages = await getPages(dir);
  await delay(500)

  for (const page of pages.data) {
    console.log(`Backup page ${page.id}`);
    const folder = join(dir, "page-" + page.id);
    await createDirectoryIfNotExists(folder);
    const filename = join(folder, "page-" + page.id + ".json");
    await getPageById({ id: page.id, path: filename });
    await delay(500)

    try {
      await exportFile({
        id: page.id,
        section: "pages",
        type: "html",
        path: join(folder, `page-${page.id}.${exportType["html"].extension}`),
      });
      await delay(200)
      await exportFile({
        id: page.id,
        section: "pages",
        type: "pdf",
        path: join(folder, `page-${page.id}.${exportType["pdf"].extension}`),
      });
      await delay(200)
      await exportFile({
        id: page.id,
        section: "pages",
        type: "txt",
        path: join(folder, `page-${page.id}.${exportType["txt"].extension}`),
      });
      await delay(200)
      await exportFile({
        id: page.id,
        section: "pages",
        type: "md",
        path: join(folder, `page-${page.id}.${exportType["md"].extension}`),
      });
      await delay(200)
    } catch (error) {
      console.error("Error exportFile:", error);
    }
  }
}
/* SHELVES */
if (bShelves) {
  dir = join("backup", ts, "shelves");
  await createDirectoryIfNotExists(dir);
  const shelves = await getShelves(dir);
  await delay(500)

  for (const shelf of shelves.data) {
    console.log(`Backup shelf ${shelf.id}`);
    const folder = join(dir, "shelf-" + shelf.id);
    await createDirectoryIfNotExists(folder);
    const filename = join(folder, "shelf-" + shelf.id + ".json");
    await getShelfById({ id: shelf.id, path: filename });
    await delay(500)
  }
}
/* ATTACHMENTS */
if (bAttachments) {
  dir = join("backup", ts, "attachments");
  await createDirectoryIfNotExists(dir);
  const attachments = await getAttachments(dir);
  await delay(500)
  for (const attachment of attachments.data) {
    console.log(`Backup attachment ${attachment.id}`);
    const folder = join(dir, "attachment-" + attachment.id);
    await createDirectoryIfNotExists(folder);
    const filename = join(folder, "attachment-" + attachment.id + ".json");
    await getAttachmentById({ id: attachment.id, path: filename });
    await delay(500)
  }
}

console.log("Backup completato!");
process.exit(0);
