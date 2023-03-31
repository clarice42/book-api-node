import { library } from "./data";
import { IndexedObject } from "./definitions";

export class BookController {
  private bookValidator = new BookValidator();

  public async getBooks() {
    return new Promise((resolve, _) => resolve(library));
  }

  public async createBook(book: IndexedObject) {
    return new Promise((resolve, reject) => {
      const isBookValid = this.bookValidator.validate(book);

      if (isBookValid.isValid) {
        const bookObject = {
          id: library.length + 1,
          title: book.title,
          author: book.author,
          year: book.year,
          description: book.description,
        };

        library.push(bookObject);

        resolve(bookObject);
      } else {
        reject(isBookValid.message);
      }
    });
  }

  public async deleteBook(bookId: string) {
    return new Promise((resolve, reject): void => {
      const bookToBeDeleted = library.findIndex(
        (book) => book.id === Number(bookId)
      );

      if (this.bookValidator.bookExists(bookToBeDeleted)) {
        library.splice(bookToBeDeleted, 1);
        resolve(undefined);
      }

      reject("Invalid book id.");
    });
  }

  public async updateBook(bookId: string, bookInfo: IndexedObject) {
    return new Promise((resolve, reject): void => {
      const bookToBeUpdated = library.findIndex(
        (book) => book.id === Number(bookId)
      );
      const newBookValidation =
        this.bookValidator.validateBookUpdatedFields(bookInfo);

      if (
        this.bookValidator.bookExists(bookToBeUpdated) &&
        newBookValidation.isValid
      ) {
        let bookUpdated = library[bookToBeUpdated];

        bookUpdated = {
          id: bookUpdated.id,
          title: bookInfo.title || bookUpdated.title,
          author: bookInfo.author || bookUpdated.author,
          year: bookInfo.year || bookUpdated.year,
          description: bookInfo.description || bookUpdated.description,
        };

        library[bookToBeUpdated] = bookUpdated;

        resolve(library[bookToBeUpdated]);
      } else {
        reject(newBookValidation.message);
      }
    });
  }
}

class BookValidator {
  private validateBookFields(book: IndexedObject): string[] {
    const bookKeys = Object.keys(book);
    const bookFields = ["title", "author", "year", "description"];
    const missingFields: string[] = [];

    bookFields.map((field: string): void => {
      if (!bookKeys.includes(field)) {
        missingFields.push(`The mandatory field ${field} is missing.`);
      }
    });

    return missingFields;
  }

  private validateBookTypes(book: IndexedObject): string[] {
    const missingTypes: string[] = [];
    const bookFieldsMap: IndexedObject = {
      title: "string",
      author: "string",
      year: "number",
      description: "string",
    };

    Object.keys(book).map((property: string): void => {
      if (typeof book[property] !== bookFieldsMap[property]) {
        missingTypes.push(
          `The field ${property} has type ${typeof book[
            property
          ]} but should have type ${bookFieldsMap[property]}.`
        );
      }
    });

    return missingTypes;
  }

  public validate(book: IndexedObject): {
    isValid: boolean;
    message: string[];
  } {
    const bookFieldsError = this.validateBookFields(book);
    const bookTypesError = this.validateBookTypes(book);

    const bookHasAllProperties = bookFieldsError.length === 0;
    const bookHasCorrectTypes = bookTypesError.length === 0;

    if (!bookHasAllProperties) {
      return {
        isValid: false,
        message: bookFieldsError,
      };
    }

    if (!bookHasCorrectTypes) {
      return {
        isValid: false,
        message: bookTypesError,
      };
    }

    return {
      isValid: true,
      message: [],
    };
  }

  public bookExists(index: number) {
    return index !== -1;
  }

  public validateBookUpdatedFields(newBookFields: IndexedObject): {
    isValid: boolean;
    message: string[];
  } {
    const newBookFieldsError: string[] = [];

    Object.keys(newBookFields).forEach((newBookFieldsKey: string) => {
      if (!newBookFields[newBookFieldsKey]) {
        newBookFieldsError.push(
          `The mandatory field ${newBookFieldsKey} is missing.`
        );
      }
    });

    const newBookTypesError = this.validateBookTypes(newBookFields);

    const newBookHasAllProperties = newBookFieldsError.length === 0;
    const newBookHasCorrectTypes = newBookTypesError.length === 0;

    if (!newBookHasAllProperties) {
      return {
        isValid: false,
        message: newBookFieldsError,
      };
    }

    if (!newBookHasCorrectTypes) {
      return {
        isValid: false,
        message: newBookTypesError,
      };
    }

    return {
      isValid: true,
      message: [],
    };
  }
}
