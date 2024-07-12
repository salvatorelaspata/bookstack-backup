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
4. Run the script with `npm start` TODO: create terminal command

