import { mkdir, writeFile } from 'fs/promises';

export async function createDirectoryIfNotExists(dirPath) {
  try {
    await mkdir(dirPath, { recursive: true });
    console.log(`Directory creata o già esistente: ${dirPath}`);
  } catch (error) {
    if (error.code !== 'EEXIST') {
      console.error(`Errore durante la creazione della directory: ${error.message}`);
      throw error; // Rilancia l'errore se non è dovuto all'esistenza della directory
    }
    // Se la directory esiste già, non facciamo nulla
    console.log(`La directory esiste già: ${dirPath}`);
  }
}

export async function writeFileIfNotExists(filePath, data, encoding = 'utf-8') {
  try {
    await writeFile(filePath, data.toString(), { encoding: encoding });
    console.log(`File creato: ${filePath}`);
  } catch (error) {
    if(error.code !== 'EEXIST') {
      console.error(`Errore durante la creazione del file: ${error.message}`);
      throw error;
    }
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