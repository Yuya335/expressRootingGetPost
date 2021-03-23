// ========================================================||
// 【sarverプログラム】
// ========================================================||
const http = require("http");
const fs = require("fs");
const url = require("url");
const ejs = require("ejs");
const qs = require("querystring");

// ページ（テンプレートファイル）の読み込み
const index_page = fs.readFileSync("./index.ejs", "utf-8");
const other_page = fs.readFileSync("./other.ejs", "utf-8");

// サーバーの起動
// 3000番ポートで待ち受け
const server = http.createServer(getFormClient);
server.listen(3000);
console.log("Server start!!");
// メインプログラムここまで=======================

// createServerに渡す関数
function getFormClient(req, res) {
  const url_parts = url.parse(req.url, true);
  switch (url_parts.pathname) {
    case "/":
      response_index(req, res);
      break;
    case "/other":
      response_other(req, res);
      break;
    default:
      res.writeHead(200, { "content-type": "text/plain" });
      res.end("no page...");
  }
}
// --------------------------------------------------------
// Indexへのアクセス時の処理
function response_index(req, res) {
  const msg = "これはIndexページです。";
  // ejsのレンダリング
  const content = ejs.render(index_page, {
    title: "Index",
    msg: msg,
  });
  // レスポンスヘッダーの書き込み
  res.writeHead(200, { "content-type": "text/html" });
  // レスポンスの中身を書き込み
  res.write(content);
  // クライアントへレスポンスを送信
  res.end();
}
// --------------------------------------------------------
// Otherへのアクセス時の処理
function response_other(req, res) {
  let msg = "これはOtherページです。";
  // データ受信回数カウント用
  let count = 0;

  // POSTアクセス時の処理------
  if (req.method == "POST") {
    let body = "";

    // データ受信イベントの処理（データを受信する度に繰り返し呼び出されるイベント）
    req.on("data", (data) => {
      count++;
      body += data;
    });

    // データ受信終了イベントの処理
    req.on("end", () => {
      const post_data = qs.parse(body);
      if (post_data.msg != "") {
        msg += `あなたは「${post_data.msg}」と書きました。`;
        msg += `（POSTでアクセスしています。※${count}回でデータをすべて受信しました。）`;
      } else {
        msg +=
          "あなたはPOSTでアクセスしましたが、msgテキストボックスが空でした。。。";
      }
      // ejsのレンダリング
      const content = ejs.render(other_page, {
        title: "Other",
        msg: msg,
      });
      // レスポンスヘッダーの書き込み
      res.writeHead(200, { "content-type": "text/html" });
      // レスポンスの中身を書き込み
      res.write(content);
      // クライアントへレスポンスを送信
      res.end();
    });
    // GETアクセス時の処理------
  } else {
    const msg = "ページがありません。(GETでアクセスしています。)";
    // ejsのレンダリング
    const content = ejs.render(other_page, {
      title: "Other",
      msg: msg,
    });
    // レスポンスヘッダーの書き込み
    res.writeHead(200, { "content-type": "text/html" });
    // レスポンスの中身を書き込み
    res.write(content);
    // クライアントへレスポンスを送信
    res.end();
  }
}
// --------------------------------------------------------
