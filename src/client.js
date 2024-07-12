import { config as  dotenvConfig } from 'dotenv';
import { request } from 'undici';

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

export const makeRequest = async (url, method = 'GET', body = null) => {
  try {
    const response = await request(`${config.url}${url}`, {
      method,
      headers: config.headers,
      body
    });

    const json = await response.body.json();
    
    return json;
  } catch (error) {
    console.error('Errore:', error);
  }
}