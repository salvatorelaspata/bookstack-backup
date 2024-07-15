
import { join } from 'path'
import { getBooks, getBookById, getChapters, getShelves, getPages, getPageById, getShelfById, getAttachments, getImages } from "./src/api.js";
import { createDirectoryIfNotExists, exportType, writeFileIfNotExists } from "./src/util.js";
import { exportFile } from './src/client.js';

const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-');
const dir = join('backup', timestamp);

await createDirectoryIfNotExists(dir);

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* DOCS */
// const docs = await getDocs();
// await writeFileIfNotExists(`${dir}/docs.json`, docs);
// delay(1000);

/* BOOKS */
const books = await getBooks();
await writeFileIfNotExists(`${dir}/books.json`, books);
for (const book of books.data) {
  console.log(`Backup book ${book.id}`);
  const b = await getBookById(book.id);

  const folder = join(dir, "book-" + book.id);
  await createDirectoryIfNotExists(folder);
  const filename = join(folder, "book-" + book.id + ".json");
  if (b)
    await writeFileIfNotExists(filename, b);

  // const [ html, pdf, plaintext, markdown ] = await exportBook(book.id);
  try {
    // await writeFileIfNotExists(join(folder, `book-${book.id}.${exportType['html'].extension}`), html);
    // await writeFileIfNotExists(join(folder, `book-${book.id}.${exportType['pdf'].extension}`), pdf, 'binary');
    // await writeFileIfNotExists(join(folder, `book-${book.id}.${exportType['txt'].extension}`), plaintext);
    // await writeFileIfNotExists(join(folder, `book-${book.id}.${exportType['md'].extension}`), markdown);
    await exportFile({ id: book.id, section: 'books', type: 'html', path: join(folder, `book-${book.id}.${exportType['html'].extension}`)});
    await exportFile({ id: book.id, section: 'books', type: 'pdf', path: join(folder, `book-${book.id}.${exportType['pdf'].extension}`)});
    await exportFile({ id: book.id, section: 'books', type: 'txt', path: join(folder, `book-${book.id}.${exportType['txt'].extension}`)});
    await exportFile({ id: book.id, section: 'books', type: 'md', path: join(folder, `book-${book.id}.${exportType['md'].extension}`)});
  } catch (error) {
    console.error('Error writeFileIfNotExists:', error);
  }
}

/* CHAPTERS */
const chapters = await getChapters();
await writeFileIfNotExists(`${dir}/chapters.json`, chapters);
/* PAGES */
const pages = await getPages();
await writeFileIfNotExists(`${dir}/pages.json`, pages);

for (const page of pages.data) {
  console.log(`Backup page ${page.id}`);
  const p = await getPageById(page.id);
  const folder = join(dir, "page-" + page.id);
  await createDirectoryIfNotExists(folder);
  const filename = join(folder, "page-" + page.id + ".json");
  await writeFileIfNotExists(filename, p);

  // const [ html, pdf, plaintext, markdown ] = await exportPage(page.id);
  try {
    // await writeFileIfNotExists(join(folder, `page-${page.id}.${exportType['html'].extension}`), html);
    // await writeFileIfNotExists(join(folder, `page-${page.id}.${exportType['pdf'].extension}`), pdf);
    // await writeFileIfNotExists(join(folder, `page-${page.id}.${exportType['txt'].extension}`), plaintext);
    // await writeFileIfNotExists(join(folder, `page-${page.id}.${exportType['md'].extension}`), markdown);

    await exportFile({ id: page.id, section: 'pages', type: 'html', path: join(folder, `page-${page.id}.${exportType['html'].extension}`)});
    await exportFile({ id: page.id, section: 'pages', type: 'pdf', path: join(folder, `page-${page.id}.${exportType['pdf'].extension}`)});
    await exportFile({ id: page.id, section: 'pages', type: 'txt', path: join(folder, `page-${page.id}.${exportType['txt'].extension}`)});
    await exportFile({ id: page.id, section: 'pages', type: 'md', path: join(folder, `page-${page.id}.${exportType['md'].extension}`)});
  } catch (error) {
    console.error('Error writeFileIfNotExists:', error);
  }
}
/* SHELVES */
const shelves = await getShelves();
await writeFileIfNotExists(`${dir}/shelves.json`, shelves);

for (const shelf of shelves.data) {
  console.log(`Backup shelf ${shelf.id}`);
  const s = await getShelfById(shelf.id);
  const folder = join(dir, "shelf-" + shelf.id);
  await createDirectoryIfNotExists(folder);
  const filename = join(folder, "shelf-" + shelf.id + ".json");
  await writeFileIfNotExists(filename, s);
}

const images = await getImages();
await writeFileIfNotExists(`${div}/images.json`, images);

const attachments = await getAttachments();
await writeFileIfNotExists(`${dir}/attachments.json`, attachments);

console.log('Backup completato!');