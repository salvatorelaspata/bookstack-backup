import { get } from "./client.js";


/* DOCS */
export async function getDocs() {
  return await get({ url: "/api/docs" });
}

/* BOOKS */
export async function getBooks(dir) {
  return await get({ url: "/api/books", path: `${dir}/books.json` });
}

export async function getBookById({id, path}) {
  await get({ url: `/api/books/${id}`, path });
}

/* CHAPTERS */
export const getChapters = async (dir) => {
  return await get({ url: "/api/chapters", path: `${dir}/chapters.json` });
};

/* PAGES */
export const getPages = async (dir) => {
  return await get({ url: "/api/pages", path: `${dir}/pages.json` });
};

export const getPageById = async ({id, path}) => {
  return await get({ url: `/api/pages/${id}`, path });
};


/* SHELVES */
export const getShelves = async (dir) => {
  return await get({ url: "/api/shelves", path: `${dir}/shelves.json` });
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
