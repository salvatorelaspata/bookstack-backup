import { writeFile } from "fs/promises";
import { join } from 'path'
import { getDocs, getBooks, getBookById, exportBook, getChapters, exportPage, getShelves } from "./src/api.js";
import { createDirectoryIfNotExists, exportType } from "./src/util.js";

await createDirectoryIfNotExists("backup");

/* DOCS */
const docs = await getDocs();
await writeFile("backup/docs.json", JSON.stringify(docs, null, 2));

/* BOOKS */
const books = await getBooks();
await writeFile("backup/books.json", JSON.stringify(books, null, 2));

for (const book of books.data) {
  console.log(`Backup book ${book.id}`);
  const b = await getBookById(book.id);
  const folder = join("backup", "book-" + book.id);
  await createDirectoryIfNotExists(folder);
  const filename = join(folder, "book-" + book.id + ".json");
  await writeFile(filename, JSON.stringify(b, null, 2));

  const [ html, pdf, plaintext, markdown ] = await exportBook(book.id);
  try {
    await writeFile(join(folder, `book-${book.id}.${exportType['html'].extension}`), html);
    await writeFile(join(folder, `book-${book.id}.${exportType['pdf'].extension}`), pdf);
    await writeFile(join(folder, `book-${book.id}.${exportType['txt'].extension}`), plaintext);
    await writeFile(join(folder, `book-${book.id}.${exportType['md'].extension}`), markdown);
  } catch (error) {
    console.error('Error writeFile:', error);
  }
}
/* CHAPTERS */
const chapters = await getChapters();
await writeFile("backup/chapters.json", JSON.stringify(chapters, null, 2));
/* PAGES */
const pages = await getPages();
await writeFile("backup/pages.json", JSON.stringify(pages, null, 2));

for (const page of pages.data) {
  console.log(`Backup page ${page.id}`);
  const p = await getPageById(page.id);
  const folder = join("backup", "page-" + page.id);
  await createDirectoryIfNotExists(folder);
  const filename = join(folder, "page-" + page.id + ".json");
  await writeFile(filename, JSON.stringify(p, null, 2));

  const [ html, pdf, plaintext, markdown ] = await exportPage(page.id);
  try {
    await writeFile(join(folder, `page-${page.id}.${exportType['html'].extension}`), html);
    await writeFile(join(folder, `page-${page.id}.${exportType['pdf'].extension}`), pdf);
    await writeFile(join(folder, `page-${page.id}.${exportType['txt'].extension}`), plaintext);
    await writeFile(join(folder, `page-${page.id}.${exportType['md'].extension}`), markdown);
  } catch (error) {
    console.error('Error writeFile:', error);
  }
}
/* SHELVES */
const shelves = await getShelves();
await writeFile("backup/shelves.json", JSON.stringify(shelves, null, 2));

for (const shelf of shelves.data) {
  console.log(`Backup shelf ${shelf.id}`);
  const s = await getShelfById(shelf.id);
  const folder = join("backup", "shelf-" + shelf.id);
  await createDirectoryIfNotExists(folder);
  const filename = join(folder, "shelf-" + shelf.id + ".json");
  await writeFile(filename, JSON.stringify(s, null, 2));
}

const images = await getImages();
await writeFile("backup/images.json", JSON.stringify(images, null, 2));

const attachments = await getAttachments();
await writeFile("backup/attachments.json", JSON.stringify(attachments, null, 2));

console.log('Backup completato!');