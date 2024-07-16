import { mkdir } from 'fs/promises';

export async function createDirectoryIfNotExists(dirPath) {
  try {
    await mkdir(dirPath, { recursive: true });
    // console.log(`Directory creata o già esistente: ${dirPath}`);
  } catch (error) {
    if (error.code !== 'EEXIST') {
      console.error(`Errore durante la creazione della directory: ${error.message}`);
      throw error; // Rilancia l'errore se non è dovuto all'esistenza della directory
    }
    // Se la directory esiste già, non facciamo nulla
    // console.log(`La directory esiste già: ${dirPath}`);
  }
}

export const exportType = {
  html: {
    endpoint: 'html',
    extension: 'html',
    contentType: 'text/html'
  },
  pdf: {
    endpoint: 'pdf',
    extension: 'pdf',
    contentType: 'application/pdf'
  },
  txt: {
    endpoint: 'plaintext',
    extension: 'txt',
    contentType: 'text/plain'
  },
  md: {
    endpoint: 'markdown',
    extension: 'md',
    contentType: 'text/markdown'
  }
};