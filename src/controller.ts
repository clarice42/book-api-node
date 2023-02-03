import { library } from "./data";

export class BookController {
  public async getBooks() {
    return new Promise((resolve, _) => resolve(library));
  }
}