/** APIの使い方 
 * 1. LWAPIを使いたい Apps Script で、LWAPILib をライブラリに追加します(ライブラリ名は LWAPI にしてください）。
 * 　　スクリプトID: 1SEhvSN3z7vd8q0hOkjw95IMUNlQnxbjYL5NeuFmbloLzFqRy7-0bPHIw
 *    バージョン: HEAD
 * 
 * 2. 以下のコードをApps Script のコード内にペーストします。

const developperId = userId_takaesu;
let env = LWAPI.getEnv();
setLWAPI(env);

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

*/

/**  API 関数　*/
function enableExternalBrowser(env){
  // LINE WORKS 内でリンクをタップした際、外部ブラウザで開くようにする設定

  let apiUriPart = "security/external-browser/enable"; //API リクエスト URI　のbot以下の部分

  // APIリクエスト
  console.log("enable external browsing");
  payload = {
    "domainId": env.domain_ID
  }
  requestApi(apiUriPart,payload,env.accessToken);
}

function disableExternalBrowser(env){
  // LINE WORKS 内でリンクをタップした際、内部ブラウザで開くようにする設定

  let apiUriPart = "security/external-browser/disable"; //API リクエスト URI　のbot以下の部分

  // APIリクエスト
  console.log("enable external browsing");
  payload = {
    "domainId":  env.domain_ID
  }
  requestApi(apiUriPart,payload,env.accessToken);
}

function getExternalBrowserSetting(env){
  // LINE WORKS 内でリンクをタップした際のブラウザ設定を取得する関数

  let apiUriPart = "security/external-browser"; //API リクエスト URI　のbot以下の部分

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

function getUserInfo(userId,env){
// userId から LINEWORKS のユーザー情報を取得する関数

  let lwUserUri = "https://www.worksapis.com/v1.0/users/"+userId;
  let headers = {"authorization": "Bearer " + env.accessToken };
  let options = {"headers": headers,"method": "get"};
  return UrlFetchApp.fetch(lwUserUri,options);
}

function requestApiGet(apiUriPart,accessToken){
  //LINE WORKS API をPOSTリクエストする関数

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
  UrlFetchApp.fetch(sendApiUri,options);
}

function setAccessTokenToEnv(accessToken,issueDate,env){
// アクセストークンの発行日を確認し、必要ならアクセストークンを発行し、envに設定する関数
  let todayFormatted = Utilities.formatDate(new Date(),'Asia/Tokyo','yyyy/MM/dd');

  let tokenIssueFlag = 1;
  if(accessToken){
    if(issueDate == todayFormatted){
    tokenIssueFlag = 0;
    console.log("アクセストークンは有効です");
    }
  }

  if(tokenIssueFlag == 1){
    let token = getAccessToken(env,env.scopes);
    accessToken = token.access_token;
    console.log("accessToken",accessToken);
  }

  // env に accessToken を設定する
  env.accessToken = accessToken;
  env.tokenIssueDate = todayFormatted;  
}

// function wrapSetTokenToEnv(scopes,env,updateFlag){
// // setTokenToEnv の wrap関数
// // updateFlag: 0: 有効な accessToken が存在していればそれを使う, 1: 有効な accessToken が存在していても accessToken を再発行する

//   let today = new Date();

//   //アクセストークンの情報を記録しているスプレッドシート
//   const sheetToken = SpreadsheetApp.openById(env.tokenSheetId).getSheetByName("token");

//   if(updateFlag == 0){
//     setTokenToEnv(today,sheetToken,scopes,env)
//   }else if(updateFlag == 1){
//     let token = getAccessToken(env,scopes);
//     console.log("token",token);
//     let accessToken = token.access_token;
//     console.log("accessToken",accessToken);

//     //　アクセストークンの情報をスプレッドシートに記録する
//     let todayFormatted = Utilities.formatDate(today, 'Asia/Tokyo', 'yyyy/MM/dd');
//     sheetToken.getRange(2,1,1,2).setValues([[todayFormatted,accessToken]]);
//     env.accessToken = accessToken;
//   }
// }

function setTokenToEnv(today,sheetToken,scopes,env){
  // APIを実行するためのアクセストークンの取得
  let todayFormatted = Utilities.formatDate(today, 'Asia/Tokyo', 'yyyy/MM/dd');
  console.log("アクセス日",todayFormatted);

  // 過去に発行したアクセストークンの発行日を取得する
  let issuedDate = sheetToken.getRange(2,1).getValue();
  let issuedDateFormatted;
  if(issuedDate){
    issuedDateFormatted = Utilities.formatDate(issuedDate, 'Asia/Tokyo', 'yyyy/MM/dd');
    console.log("発行日",issuedDateFormatted);
  }else{//過去のアクセストークン発行日がない場合
    issuedDateFormatted = "2000/01/01";
  }

  let accessToken;
  if (issuedDateFormatted != todayFormatted){
  // 現在日が過去に取得したアクセストークンの発行日と異なる場合、アクセストークンを発行する
    console.log("有効なアクセストークンがありません。アクセストークンを発行します。");
    let token = getAccessToken(env,scopes);
    console.log("token",token);
    accessToken = token.access_token;
    console.log("accessToken",accessToken);

    //　アクセストークンの情報をスプレッドシートに記録する
    sheetToken.getRange(2,1,1,2).setValues([[todayFormatted,accessToken]]);
  }else{
  //現在日が発行日と同じ場合は、スプレッドシートからアクセストークンを取得する
    console.log("アクセストークンは有効です。");
    accessToken = sheetToken.getRange(2,2).getValue();
  }
  env.accessToken = accessToken;
}

function getAccessToken(ENV,scopes) {
// LINEWORKS API のアクセストークンを発行する関数
  const uri = "https://auth.worksmobile.com/oauth2/v2.0/token";
/*
  console.log("JWT",getJwt(ENV));
  console.log("client_id",ENV.CLIENT_ID);
  console.log("client_secret",ENV.CLIENT_SECRET);
  console.log("scope",scopes);
  */

  const payload = {
    "assertion": getJwt(ENV),
    "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
    "client_id": ENV.CLIENT_ID,
    "client_secret": ENV.CLIENT_SECRET,
    "scope": scopes    
  };

  const options = {
    "method": "post",
    "headers": {"Content-Type" : "application/x-www-form-urlencoded"},
    "payload": payload
  };
  console.log("response:", JSON.parse(UrlFetchApp.fetch(uri,options)));
  return JSON.parse(UrlFetchApp.fetch(uri,options));
}

// getAccessTokenとgetJwtはTokenを取得するためのファンクション
function getJwt(ENV){
// アクセストークンを発行するための情報をまとめてエンコードする関数

  const header = Utilities.base64Encode(JSON.stringify({"alg":"RS256","typ":"JWT"}));
  const claimSet = JSON.stringify({
    "iss": ENV.CLIENT_ID,
    "sub": ENV.SERVICE_ACCOUNT,
    "iat": Math.floor(Date.now() / 1000),
    "exp": Math.floor(Date.now() / 1000 + 2000)
  });
  const encodeText = header + "." + Utilities.base64Encode(claimSet);
  const signature = Utilities.computeRsaSha256Signature(encodeText,ENV.PRIVATE_KEY);
  return encodeText + "." + Utilities.base64Encode(signature);
}

function getEnv() {
// LINEWORKS API(東風会システム) の環境変数を設定する
  return {
    CLIENT_ID: "Ypeke8IZkJfaIERDLxA8",
    CLIENT_SECRET: "aSoSq5XDvk",
    SERVICE_ACCOUNT: "pbg4w.serviceaccount@tofukai",
    PRIVATE_KEY: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCBW23QskXEcB7h\nF62wsN+E8U+1wDA20D4poRswANGtm6CbG/K50srrYeIt7mNj9Oc6LfEp4dGS6o8D\nni5AikM56yKbL/pGGDM6QyL3gWvoUJVGB4VFvh1dpKLz1k3/cNPpF5t202f9YNPN\nC0e2nl9mhaAW2MZCtHzCqGTZgXuxO/0mMJVeruWhydcAudP/RcFiCEGggDXb6wzS\n/bFQQikpONc0L16+mf555rRSW4vo/1P7TEtY93r7pRkh/vv3qogRgpl/eHD2yCyl\nD9QYA4n3Ly0G6nBXeRQGacYB3sBDlGK50c6ll8jieGkvRCvR3PDpXph4yXT4rDCh\nvfeBy093AgMBAAECggEAKwdmuA0U+ArzupxNwoCTWX2LrkGHyDPs+ZwFlyoulTk3\na2EYlIdxyGp++hhaJ13HrKqrlerv85bii6mKaR2UzydQE58Z+UcDg1Xhw8LhSh3E\nCc9mnZRn4EZrjgCzYUz+sIKRzCz2YmpbCdG+wRhdU5UPc4oYKQgwl++73D4eDw4T\nlpZqvf4hkcEK3GLv6f1jT10eTHjmtt79d2r3HXAWeR9io3PD3AxslzYX1oB7iXQr\nLm+J1E2JHoG7Nx/o5GCWxAsNvwJsGsP1zNoGBukCWeoAO7kZFnSbl+PphLkE3MYG\n6UsrOHntGPbRPY5dIYKqNWT9w0AoVR53y/2dhtEnQQKBgQDK5d815TvC/IhJeXgw\nlX95qMrUNdOrmnMFFAz04u9VSLbiszsxFcsjq7Q4B79TxuuhC7s8WGeFo3B2oMtS\n1iWiJacROEZPr/q6UF94bA0GxmzDJvRmRl/Jpj5vzF+/HWMMNf1pIev/dsD+OXIr\n9WMzQJuaSBr304OWOf81Eff0ewKBgQCjNlYN+Ow8SznjnLOjEtAtFNTM2JlWfqdr\n6O2/PZve8sITSMsh6yE8p0XBYYdu+Wb5RR5ZRH3zgxrfpx5tzSOg0T/wBQD3uNBtS\nARR4OFP5Dps2m420NNMu/B+ryQ3IPpWgvUyv4D2GH0sSydvVBhh20vPOprNtBML9\nrRtfFb92NQKBgQC5npsZ/2Ew/T7hmRLvv5Ujg9wrUCMZtu7LEpDX6FT0PNWziCz6\ntulk9MynBc9voWgnqUfd6TKr+94DaQ8Z9XfwY2n4QvdwJ5rFoIn27ULtk9Ikpxqo\nBnHTVReByANAIG5g2XPAHpx81fOxoHRm6tOaK90uxBCH8SVM5jooHwwsyQKBgQCG\nGD2Jy0ukmhXc2UGKKQnbEDNqfkc1lmfNtBmpt1+aRI+JspQasQmkwLYCFTRlzAl7\nofs2Upy89qmcuby5cALmvSUwKkf3rt4HeRWtVHJBvWtu6Uz6kzAzeTg4Nr7ZF/pt\njzozgiRqTsmqjSjNk+2Dqvxfe/0NBA2EyLYlYEPnRQKBgQC49NmBAhcJCXg3xfA8\n9QIm0PXJ2Y+5C/t1XQ5jMCwaXtW09n1KMXrBjWqEgACkitq5SscrX3Mt56l6Sp6E\nc3RG8MjiUtFtxezZdnMEuXpe1QtwXfS18c23GM/ZLQQ11q/RrrMsVKhWIq2ak3/q\nxudCjjshwn3erPvOrCz9PX2nWw==\n-----END PRIVATE KEY-----",
    DOMAIN_ID: 500040856,
    ADMIN_ID: "takaesu@tofukai",
    scopes: "bot,user.read,directory.read,orgunit.read",
    tokenSheetId: "1PQQ1OLzNnqc5z_JnY0YlRqs4WS-DDXbV-cHXntBDxY0"
  }
}