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

// createServerに渡す関数
function getFormClient(request, response) {
  // コンテンツ格納用変数
  let content = "";
  // URLを取得
  const url_parts = url.parse(request.url, true);
  // query格納用変数
  let query = url_parts.query;
  // queryのmsg格納用変数
  let qs = "";
  // query文字列が存在する場合代入
  if (query.msg != undefined) {
    qs += `あなたは${query.msg}と送りました。`;
  }

  switch (url_parts.pathname) {
    case "/":
      content = ejs.render(index_page, {
        title: "Indexページです。",
        msg: qs, //query文字列を渡す。
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(content);
      response.end();
      break;
    case "/other":
      content = ejs.render(other_page, {
        title: "Otherページです。",
        msg: qs, //query文字列を渡す。
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
