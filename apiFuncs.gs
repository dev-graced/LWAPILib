/** APIの使い方 
 * 1. LWAPIを使いたい Apps Script で、LWAPILib をライブラリに追加します(ライブラリ名は LWAPI にしてください）。
 * 　　スクリプトID: 1SEhvSN3z7vd8q0hOkjw95IMUNlQnxbjYL5NeuFmbloLzFqRy7-0bPHIw
 *    バージョン: HEAD
 * 
 * 2. 以下のコードをApps Script のコード内にペーストします。
 * 
let env = LWAPI.getEnv();
LWAPI.setLWAPI(env);

function setLWAPI(env){
// LINE WORKS API の情報を env にセットする関数

  // LINE WORKS APIを実行するためのアクセストークンを取得して env に追加
  let accessToken = PropertiesService.getScriptProperties().getProperty('accessToken');
  let tokenIssueDate = PropertiesService.getScriptProperties().getProperty('tokenIssueDate');

  LWAPI.setAccessTokenToEnv(accessToken,tokenIssueDate,env);
  console.log("accessToken",env.accessToken);

  // 訪問BotのBotId を env に追加
  let botId = "1418596"; //訪問BotID
  env.BOT_ID = botId;

  //　アクセストークンの情報をスクリプトプロパティに記録する
  PropertiesService.getScriptProperties().setProperty('accessToken',env.accessToken);
  PropertiesService.getScriptProperties().setProperty('tokenIssueDate',env.tokenIssueDate);
}
 * 
*/



function postGroupNote(groupId, title, content, accessToken) {
  // LINE WORKS の既存のグループにグループノートを新規投稿する関数
  // const accessToken = getUserAccessToken();
  // if (!accessToken) {
  //   throw new Error("有効なアクセストークンがありません。再度認証を行ってください。");
  // }
  
  const apiUriPart = "groups/" + groupId + "/note/posts";
  
  // APIリクエストのペイロードを作成
  const payload = {
    "title": title,
    "body": content,
    "enableCollaboration": true,
    "isNotice": false,
    "sendNotifications": true
  };
  
  // APIリクエストを実行
  return requestApi(apiUriPart, payload, accessToken);
}

function enableExternalBrowser(env){
  // LINE WORKS 内でリンクをタップした際、外部ブラウザで開くようにする設定
  let apiUriPart = "security/external-browser/enable";

  // APIリクエスト
  console.log("enable external browsing");
  payload = {
    "domainId": env.domain_ID
  }
  requestApi(apiUriPart,payload,env.accessToken);
}

function disableExternalBrowser(env){
  // LINE WORKS 内でリンクをタップした際、内部ブラウザで開くようにする設定
  let apiUriPart = "security/external-browser/disable";

  // APIリクエスト
  console.log("enable external browsing");
  payload = {
    "domainId":  env.domain_ID
  }
  requestApi(apiUriPart,payload,env.accessToken);
}

function getExternalBrowserSetting(env){
  // LINE WORKS 内でリンクをタップした際のブラウザ設定を取得する関数
  let apiUriPart = "security/external-browser";

  // APIリクエスト
  console.log("get external browser setting");

  let lwUserUri = "https://www.worksapis.com/v1.0/"+apiUriPart;
  let headers = {"authorization": "Bearer " + env.accessToken };
  let options = {"headers": headers,"method": "get"};
  return UrlFetchApp.fetch(lwUserUri,options);
}

function downloadFile(fileId,env){
  let downloadUri = "https://www.worksapis.com/v1.0/bots/"+env.BOT_ID+"/attachments/"+fileId;
  options = {   
    "headers": {"authorization": "Bearer "+env.accessToken},
    "method": "get"
  };
  return UrlFetchApp.fetch(downloadUri,options); 
}

function getGroupInfo(env){
  const apiUriPart = "groups";
  return requestApiGet(apiUriPart,env.accessToken)
}

function getUserInfo(userId,env){
  // userId から LINEWORKS のユーザー情報を取得する関数
  let lwUserUri = "https://www.worksapis.com/v1.0/users/"+userId;
  let headers = {"authorization": "Bearer " + env.accessToken };
  let options = {"headers": headers,"method": "get"};
  return UrlFetchApp.fetch(lwUserUri,options);
}

function requestApiGet(apiUriPart,accessToken){
  //LINE WORKS API をGETリクエストする関数
  let sendApiUri = "https://www.worksapis.com/v1.0/" + apiUriPart;
  let options = {   
    "headers": {"authorization": "Bearer "+ accessToken, "Content-Type" : "application/json"},
    "method": "get"
  };
  return UrlFetchApp.fetch(sendApiUri,options);
}

function requestApi(apiUriPart,payload,accessToken){
  //LINE WORKS API をPOSTリクエストする関数
  let sendApiUri = "https://www.worksapis.com/v1.0/" + apiUriPart;
  let options = {   
    "headers": {"authorization": "Bearer "+ accessToken, "Content-Type" : "application/json"},
    "method": "post",
    "payload": JSON.stringify(payload)
  };
  console.log("payload for API request",payload);
  return UrlFetchApp.fetch(sendApiUri,options);
}