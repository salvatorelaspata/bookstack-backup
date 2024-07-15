import { config as dotenvConfig } from "dotenv";
import { request } from "undici";
import { exportType } from "./util.js";
import { createWriteStream } from 'fs';

dotenvConfig();

const { BOOKSTACK_URL, BOOKSTACK_TOKEN, BOOKSTACK_SECRET } = process.env;

// Crea l'istanza del client
export const config = {
  url: BOOKSTACK_URL,
  headers: {
    Authorization: `Token ${BOOKSTACK_TOKEN}:${BOOKSTACK_SECRET}`
  },
};

export const makeRequest = async ({
  url,
  method = "GET",
  headers = null,
  body = null,
  type = "json",
}) => {
  try {
    const h = { ...config.headers, ...headers };
    const response = await request(`${config.url}${url}`, {
      method,
      headers: h,
      body,
    });
    console.log('url:', url);
    console.log('type:', type);
    console.log('response.body[type]:', response.body[type]);
    return response.body[type]();
  } catch (error) {
    console.error(error);
  }
};

export const get = async ({ url }) => {
  try {
    const response = await makeRequest({ url });
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const exportFile = async ({ id, section, type, path }) => {
  try {
    const e = exportType[type];
    const url = `${config.url}/api/${section}/${id}/export/${e.endpoint}`
    console.log('url:', url);
    const response = await request(url, {
      method: 'GET',
      headers: config.headers
    });
    const fileStream = createWriteStream(path)
    response.body.pipe(fileStream)
    console.log('File saved:', path)
  } catch (error) {
    console.error("Error:", error);
  }
};
