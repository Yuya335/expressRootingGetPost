// ========================================================||
// 【sarverプログラム】
// ========================================================||
const http = require("http");
const fs = require("fs");
const url = require("url");
const ejs = require("ejs");

// ページ（テンプレートファイル）の読み込み
const index_page = fs.readFileSync("./index.ejs", "utf-8");
const other_page = fs.readFileSync("./other.ejs", "utf-8");

// サーバーの起動
// 3000番ポートで待ち受け
let server = http.createServer(getFormClient);
server.listen(3000);
console.log("Server start!!");

// メインプログラムここまで=======================
function getFormClient(request, response) {
  const url_parts = url.parse(request.url);
  // コンテンツ格納用変数
  let content;
  switch (url_parts.pathname) {
    case "/":
      // contentのレンダリング
      // ejs.render(レンダリングデータ, オブジェクト);
      content = ejs.render(index_page, {
        title: "Indexページです。",
        content: "これはテンプレートを使ったIndexページです。",
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(content);
      response.end();
      break;
    case "/other":
      content = ejs.render(other_page, {
        title: "Otherページです。",
        content: "これは追加したOtherページです。",
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(content);
      response.end();
      break;
    default:
      response.writeHead(200, { "content-type": "text/plain" });
      response.end("no page...");
  }
}
