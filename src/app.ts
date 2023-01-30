const http = require("http");
const PORT = process.env.PORT || 5000;

const data = require("./data.ts");

const server = http.createServer(async (req: any, res: any) => {
  if (req.url === "/books" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write("Sorry, no books are available yet...");
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
