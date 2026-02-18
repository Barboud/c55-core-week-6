import chalk from "chalk";
import fs from "node:fs";

// Place here the file operation functions for loading and saving books

export function loadBooks() {
  try {
    const jsonString = fs.readFileSync("books.json", "utf8");
    const books = JSON.parse(jsonString);
    return books;
  } catch (error) {
    if (error.code === "ENOENT") {
      const books = [];
      return books;
    } else if (error.name === "SyntaxError") {
      console.log("invalid JSON");
      const books = [];
      return books;
    }
  }
}

export function saveBooks(books) {
  try {
    fs.writeFileSync("books.json", JSON.stringify(books, null, 2));
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("File not exist");
    } else if (error.name === "SyntaxError") {
      console.log("invalid JSON");
    }
  }
  return true;
}

export function addBook(book) {
  const books = loadBooks();
  if (!book.id) {
    book.id = books.length + 1;
  }
  books.push(book);

  if (saveBooks(books)) {
    return true;
  }
  return false;
}

export function getUnreadBooks() {
  const books = loadBooks();
  const unreadBooks = books.filter((book) => book.read === false);

  return unreadBooks;
}

export function getReadBooks() {
  const books = loadBooks();
  const readBooks = books.filter((book) => book.read === true);

  return readBooks;
}

export function getBooksByGenre(genre) {
  const books = loadBooks();
  const booksByGenre = books.filter((book) => book.genre === genre);

  return booksByGenre;
}

export function markAsRead(id) {
  const books = loadBooks();
  const updateBooks = books.map(function (book) {
    if (book.id === id) {
      book.read = true;
    }
    return { ...book };
  });

  if (saveBooks(updateBooks)) {
    return true;
  }
  return false;
}

export function getTotalBooks() {
  const books = loadBooks();
  return books.length;
}

export function hasUnreadBooks() {
  const Books = loadBooks();
  const unreadBooks = Books.some((book) => book.read === false);

  return unreadBooks;
}

export function printAllBooks() {
  console.log(chalk.bold("📚 MY READING LIST 📚"));
  const books = loadBooks();
  for (const book of books) {
    const { id, title, author, genre, read } = book;

    let readStatus = null;
    if (read === true) {
      readStatus = chalk.green(`✓ Read`);
    } else {
      readStatus = chalk.yellow(`⚠ Unread`);
    }

    console.log(
      `${id}. ${chalk.cyan(title)} by ${author} (${genre}) ${readStatus}`,
    );
  }
}

export function printSummary() {
  console.log(chalk.bold("📊 SUMMARY 📊"));

  console.log(chalk.bold(`Total Books: ${loadBooks().length}`));
  console.log(chalk.green.bold(`Read: ${getReadBooks().length}`));
  console.log(chalk.yellow.bold(`Unread: ${getUnreadBooks().length}`));
}
