import { exportFiles, get } from "./client.js";

/* DOCS */
export async function getDocs() {
  return await get('/api/docs');
}

/* BOOKS */
export async function getBooks() {
  return await get('/api/books');
}

export async function getBookById(id) {
   await get(`/api/books/${id}`);
}

export async function exportBook(id, type) {
  return exportFiles(id, type);
}

/* CHAPTERS */
export const getChapters = async () => {
  return await get('/api/chapters');
}

/* PAGES */
export const getPages = async () => {
  return await get('/api/pages');
}

export const getPageById = async (id) => {
  return await get(`/api/pages/${id}`);
}

export const exportPage = async (id, type) => {
  return exportFiles(id, type);
}

/* SHELVES */
export const getShelves = async () => {
  return await get('/api/shelves');
}

export const getShelfById = async (id) => {
  return await get(`/api/shelves/${id}`);
}

/* IMAGE GALLERY */
export const getImages = async () => {
  return await get('/api/images-gallery');
}

export const getImageById = async (id) => {
  return await get(`/api/images-gallery/${id}`);
}

/* ATTACHMENTS */
export const getAttachments = async () => {
  return await get('/api/attachments');
}

export const getAttachmentById = async (id) => {
  return await get(`/api/attachments/${id}`);
}
