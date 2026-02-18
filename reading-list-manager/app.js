import {
  loadBooks,
  saveBooks,
  addBook,
  getUnreadBooks,
  getBooksByGenre,
  markAsRead,
  getTotalBooks,
  hasUnreadBooks,
  printAllBooks,
  printSummary,
} from "./readingList.js";

const newBook = {
  id: 6,
  title: "Clean Code",
  author: "Robert C. Martin",
  genre: "Software Development",
  read: false,
};

addBook(newBook);

printAllBooks();
console.log("\n");
printSummary();
