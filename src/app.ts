import http from "http";
import { BookController } from "./controller";

const PORT = process.env.PORT || 5000;

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
    const books = await bookController.getBooks();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(
      JSON.stringify({
        books: books,
      })
    );
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
