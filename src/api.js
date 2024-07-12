import { makeRequest } from "./client.js";

export async function books() {
  try {
    const response = await makeRequest('/api/books');
    return response;
  } catch (error) {
    console.error('Errore:', error);
  }
}