// create a simple test to download file from 192.168.1.x:3000/api/section/id/export/pdf and save it in a folder
import { config as dotenvConfig } from "dotenv";
import fs from 'fs';
import { request } from "undici";
dotenvConfig();
const { BOOKSTACK_URL, BOOKSTACK_TOKEN, BOOKSTACK_SECRET } = process.env;
const config = {
  url: BOOKSTACK_URL,
  headers: {
    Authorization: `Token ${BOOKSTACK_TOKEN}:${BOOKSTACK_SECRET}`,
    "Content-Type": "application/json",
  },
};

// fetch pdf file from url
const fetchPdf = async (url, filename) => {
  try {
    const response = await request(url, {
      method: 'GET',
      headers: config.headers
    });
    const fileStream = fs.createWriteStream(filename)
    response.body.pipe(fileStream)
    console.log('File saved:', filename)
  }
  catch (error) {
    console.error('Error:', error)
  }
}

// test
const url = `${config.url}/api/books/2/export/pdf`
const filename = 'book-2.pdf'
fetchPdf(url, filename)