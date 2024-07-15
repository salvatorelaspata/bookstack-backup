import { config as dotenvConfig } from "dotenv";
import { request } from "undici";
import { exportType } from "./util.js";
import { createWriteStream } from 'fs';
import { writeFile } from "fs/promises";

dotenvConfig();

const { BOOKSTACK_URL, BOOKSTACK_TOKEN, BOOKSTACK_SECRET } = process.env;

// Crea l'istanza del client
export const config = {
  url: BOOKSTACK_URL,
  headers: {
    Authorization: `Token ${BOOKSTACK_TOKEN}:${BOOKSTACK_SECRET}`
  },
};

export const get = async ({ url, path }) => {
  try {
    const h ={...config.headers, 'Content-Type': 'application/json'}
    const response = await request(`${config.url}${url}`, {
      method: 'GET',
      headers: h
    });
    // write on disk
    const body = await response.body.json();
    await writeFile(path, JSON.stringify(body, null, 2));
    return body;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const exportFile = async ({ id, section, type, path }) => {
  try {
    const e = exportType[type];
    const url = `${config.url}/api/${section}/${id}/export/${e.endpoint}`
    const response = await request(url, {
      method: 'GET',
      headers: config.headers
    });
    const fileStream = createWriteStream(path)
    response.body.pipe(fileStream)
  } catch (error) {
    console.error("Error:", error);
  }
};
