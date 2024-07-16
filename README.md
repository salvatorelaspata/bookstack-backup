# Bookstack Backup API

This is a simple API to backup your Bookstack instance. It will backup all your books, chapters and pages using API.

# Pre-requisites

- Bookstack instance
- API key for the Bookstack instance (you can create one in the settings)
- Role with permissions to read all books, chapters and pages *

> * The Role mush have the following permissions:
> - Access system API
> - Export content

# Resources

API: https://demo.bookstackapp.com/api/docs

# How to use

1. Clone this repository
2. Install dependencies with `npm install` (`undici` is only dependencies)
3. Copy `.env.example` to `.env` and fill the required fields
4. Run the script with `npm start` to download all content from your Bookstack instance

If you want to backup only a specific book, you can execute specific commands:

- `npm run backup:books` to backup all books
- `npm run backup:pages` to backup all pages
- `npm run backup:chapters` to backup all chapters
- `npm run backup:shelves` to backup all shelves
- `npm run backup:attachments` to backup all attachments

The content will be saved in the `backup` folder. Each resource will be saved in a separated folder. The content will be saved in a JSON file and exported as a markdown file, txt file, html file and pdf file.