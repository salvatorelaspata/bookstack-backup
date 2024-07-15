
import { join } from 'path'
import { getBooks, getBookById, getChapters, getShelves, getPages, getPageById, getShelfById, getAttachments, getImages, getDocs } from "./src/api.js";
import { createDirectoryIfNotExists, exportType } from "./src/util.js";
import { exportFile } from './src/client.js';

const ts = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-');
let dir = join('backup', ts);

await createDirectoryIfNotExists(dir);

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* DOCS */
// await getDocs();
// await writeFileIfNotExists(`${dir}/docs.json`, docs);
// delay(1000);

/* BOOKS */
dir = join(dir, 'books');
await createDirectoryIfNotExists(dir);
const books = await getBooks(dir);
// await writeFileIfNotExists(`${dir}/books.json`, books);
for (const book of books.data) {
  console.log(`Backup book ${book.id}`);
  const folder = join(dir, "book-" + book.id);
  await createDirectoryIfNotExists(folder);
  const filename = join(folder, "book-" + book.id + ".json");
  await getBookById({id: book.id, path: filename});
  

  try {
    await exportFile({ id: book.id, section: 'books', type: 'html', path: join(folder, `book-${book.id}.${exportType['html'].extension}`)});
    await exportFile({ id: book.id, section: 'books', type: 'pdf', path: join(folder, `book-${book.id}.${exportType['pdf'].extension}`)});
    await exportFile({ id: book.id, section: 'books', type: 'txt', path: join(folder, `book-${book.id}.${exportType['txt'].extension}`)});
    await exportFile({ id: book.id, section: 'books', type: 'md', path: join(folder, `book-${book.id}.${exportType['md'].extension}`)});
  } catch (error) {
    console.error('Error writeFileIfNotExists:', error);
  }
}

/* CHAPTERS */
// const chapters = await getChapters();

/* PAGES */
dir = join('backup', ts, 'pages');
const pages = await getPages(dir);
// await writeFileIfNotExists(`${dir}/pages.json`, pages);

for (const page of pages.data) {
  console.log(`Backup page ${page.id}`);
  const folder = join(dir, "page-" + page.id);
  await createDirectoryIfNotExists(folder);
  const filename = join(folder, "page-" + page.id + ".json");
  await getPageById({id: page.id, path: filename});


  try {
    await exportFile({ id: page.id, section: 'pages', type: 'html', path: join(folder, `page-${page.id}.${exportType['html'].extension}`)});
    await exportFile({ id: page.id, section: 'pages', type: 'pdf', path: join(folder, `page-${page.id}.${exportType['pdf'].extension}`)});
    await exportFile({ id: page.id, section: 'pages', type: 'txt', path: join(folder, `page-${page.id}.${exportType['txt'].extension}`)});
    await exportFile({ id: page.id, section: 'pages', type: 'md', path: join(folder, `page-${page.id}.${exportType['md'].extension}`)});
  } catch (error) {
    console.error('Error writeFileIfNotExists:', error);
  }
}
/* SHELVES */
dir = join('backup', ts, 'shelves');
const shelves = await getShelves(dir);
// await writeFileIfNotExists(`${dir}/shelves.json`, shelves);

for (const shelf of shelves.data) {
  console.log(`Backup shelf ${shelf.id}`);
  const filename = join(folder, "shelf-" + shelf.id + ".json");
  await getShelfById({id: shelf.id, path: filename});
  const folder = join(dir, "shelf-" + shelf.id);
  await createDirectoryIfNotExists(folder);
  // await writeFileIfNotExists(filename, s);
}

await getImages();
// await writeFileIfNotExists(`${div}/images.json`, images);

await getAttachments();
// await writeFileIfNotExists(`${dir}/attachments.json`, attachments);

console.log('Backup completato!');