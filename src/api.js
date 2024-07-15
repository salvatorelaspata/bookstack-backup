import { get } from "./client.js";

/* DOCS */
export async function getDocs() {
  return await get({ url: "/api/docs" });
}

/* BOOKS */
export async function getBooks() {
  return await get({ url: "/api/books" });
}

export async function getBookById(id) {
  await get({ url: `/api/books/${id}` });
}

/* CHAPTERS */
export const getChapters = async () => {
  return await get({ url: "/api/chapters" });
};

/* PAGES */
export const getPages = async () => {
  return await get({ url: "/api/pages" });
};

export const getPageById = async (id) => {
  return await get({ url: `/api/pages/${id}` });
};


/* SHELVES */
export const getShelves = async () => {
  return await get({ url: "/api/shelves" });
};

export const getShelfById = async (id) => {
  return await get({ url: `/api/shelves/${id}` });
};

/* IMAGE GALLERY */
export const getImages = async () => {
  return await get({ url: "/api/images-gallery" });
};

export const getImageById = async (id) => {
  return await get({ url: `/api/images-gallery/${id}` });
};

/* ATTACHMENTS */
export const getAttachments = async () => {
  return await get({ url: "/api/attachments" });
};

export const getAttachmentById = async (id) => {
  return await get({ url: `/api/attachments/${id}` });
};
