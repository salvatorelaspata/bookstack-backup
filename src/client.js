import { config as  dotenvConfig } from 'dotenv';
import { request } from 'undici';
import { exportType } from './util.js';

dotenvConfig();

const {BOOKSTACK_URL,BOOKSTACK_TOKEN,BOOKSTACK_SECRET} = process.env;

// Crea l'istanza del client
export const config = {
  url: BOOKSTACK_URL,
  headers: {
    'Authorization': `Token ${BOOKSTACK_TOKEN}:${BOOKSTACK_SECRET}`,
    'Content-Type': 'application/json'
  }
}

export const makeRequest = async (url, method = 'GET', headers = {}, body = null, type = 'json') => {
  try {
    console.log('Request url:', url);
    const response = await request(`${config.url}${url}`, {
      method,
      headers: {...config.headers, ...headers},
      body
    });
    
    console.log('Response:', response.statusCode, await response.body.text());
    if(response.statusCode !== 200 && response.statusCode !== 302) {
      throw new Error(`Request failed with status code ${response.statusCode}`);
    }

    if(type === 'json') {
      const json = await response.body.json();
      return json;
    } 

    const text = await response.body.text();
    return text;

  } catch (error) {
    console.error(error);
  }
}

export const get = async (url) => {
  try {
    const response = await makeRequest(url);
    return response;
  } catch (error) {
    console.error('Error:', error);
  }
}

export const exportFiles = async (id, type) => {
  try {
    const exports = !type ? Object.values(exportType) : [exportType[type]];

    const files = []
    for (const e of exports) {
      const file = await makeRequest(`/api/books/${id}/export/${e.endpoint}`, 'GET', {
        'Content-Type': e.contentType
      }, null, 'text');
      files.push(file);
    }

    return files;
  } catch (error) {
    console.error('Error:', error);
  }
}