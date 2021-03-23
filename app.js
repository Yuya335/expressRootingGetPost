const http = require("http");
const fs = require("fs");
const ejs = require("ejs");

const index_page = fs.readFileSync("./index.ejs", "utf-8");

let server = http.createServer(getFormClient);

server.listen(3000);
console.log("Server start!!");

// メインプログラムここまで=======================
function getFormClient(request, response) {
  const content = ejs.render(index_page);
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(content);
  response.end();
}
