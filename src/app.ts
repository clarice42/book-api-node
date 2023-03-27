import http from "http";
import { BookController } from "./controller";
import { getReqData } from "./utils";

const PORT = process.env.PORT || 5000;
const BOOK_WITH_ID = /^\/books\/([0-9]+)$/;

const bookController = new BookController();

const server = http.createServer(async (req, res) => {
  if (req.url === "/books" && req.method === "GET") {
    const books = await bookController.getBooks();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(
      JSON.stringify({
        books: books,
      })
    );
    res.end();
  } else if (req.url === "/books" && req.method === "POST") {
    const dataString = await getReqData(req);
    const data = JSON.parse(dataString);

    await bookController
      .createBook(data)
      .then((bookResponse) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(
          JSON.stringify({
            book: bookResponse,
          })
        );
      })
      .catch((error) => {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.write(
          JSON.stringify({
            error: error,
          })
        );
      });

    res.end();
  } else if (req.url?.match(BOOK_WITH_ID) && req.method === "DELETE") {
    const bookId = BOOK_WITH_ID.exec(req.url)![1];
    await bookController
      .deleteBook(bookId)
      .then(() => {
        res.writeHead(200, { "Content-Type": "application/json" });
      })
      .catch((error) => {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.write(
          JSON.stringify({
            error: error,
          })
        );
      });

    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
