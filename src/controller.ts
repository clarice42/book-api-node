import { library } from "./data";
import { IndexedObject } from "./definitions";

export class BookController {
  public async getBooks() {
    return new Promise((resolve, _) => resolve(library));
  }

  public async createBook(book: IndexedObject) {
    return new Promise((resolve, _) => {
      const bookValidator = new BookValidator();
      const isBookValid = bookValidator.validate(book);

      if (isBookValid) {
        const bookObject = {
          id: library.length + 1,
          title: book.title,
          author: book.author,
          year: book.year,
          description: book.description,
        };

        library.push(bookObject);

        resolve(bookObject);
      }
    });
  }
}

class BookValidator {
  public validate(book: IndexedObject): boolean {
    return (
      book.hasOwnProperty("title") &&
      book.hasOwnProperty("author") &&
      book.hasOwnProperty("year") &&
      book.hasOwnProperty("description")
    );
  }
}
