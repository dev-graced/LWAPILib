/**
 * LINE WORKS API の認証に関する実装部分
 * サービス認証に関する部分と、ユーザー認証に関する部分がある
 * 
 * 得られた accessToken, refreshToken は、発行日とともにスクリプトプロパティに保存するようになっている
 */

/** 
 * サービス認証 
 */

function getEnv() {
  // LINEWORKS API(東風会システム) の認証に必要な情報を設定する関数
  return {
    CLIENT_ID: "Ypeke8IZkJfaIERDLxA8",
    CLIENT_SECRET: "aSoSq5XDvk",
    SERVICE_ACCOUNT: "pbg4w.serviceaccount@tofukai",
    PRIVATE_KEY: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCBW23QskXEcB7h\nF62wsN+E8U+1wDA20D4poRswANGtm6CbG/K50srrYeIt7mNj9Oc6LfEp4dGS6o8D\nni5AikM56yKbL/pGGDM6QyL3gWvoUJVGB4VFvh1dpKLz1k3/cNPpF5t202f9YNPN\nC0e2nl9mhaAW2MZCtHzCqGTZgXuxO/0mMJVeruWhydcAudP/RcFiCEGggDXb6wzS\n/bFQQikpONc0L16+mf555rRSW4vo/1P7TEtY93r7pRkh/vv3qogRgpl/eHD2yCyl\nD9QYA4n3Ly0G6nBXeRQGacYB3sBDlGK50c6ll8jieGkvRCvR3PDpXph4yXT4rDCh\nvfeBy093AgMBAAECggEAKwdmuA0U+ArzupxNwoCTWX2LrkGHyDPs+ZwFlyoulTk3\na2EYlIdxyGp++hhaJ13HrKqrlerv85bii6mKaR2UzydQE58Z+UcDg1Xhw8LhSh3E\nCc9mnZRn4EZrjgCzYUz+sIKRzCz2YmpbCdG+wRhdU5UPc4oYKQgwl++73D4eDw4T\nlpZqvf4hkcEK3GLv6f1jT10eTHjmtt79d2r3HXAWeR9io3PD3AxslzYX1oB7iXQr\nLm+J1E2JHoG7Nx/o5GCWxAsNvwJsGsP1zNoGBukCWeoAO7kZFnSbl+PphLkE3MYG\n6UsrOHntGPbRPY5dIYKqNWT9w0AoVR53y/2dhtEnQQKBgQDK5d815TvC/IhJeXgw\nlX95qMrUNdOrmnMFFAz04u9VSLbiszsxFcsjq7Q4B79TxuuhC7s8WGeFo3B2oMtS\n1iWiJacROEZPr/q6UF94bA0GxmzDJvRmRl/Jpj5vzF+/HWMMNf1pIev/dsD+OXIr\n9WMzQJuaSBr304OWOf81Eff0ewKBgQCjNlYN+Ow8SznjnLOjEtAtFNTM2JlWfqdr\n6O2/PZve8sITSMsh6yE8p0XBYYdu+Wb5RR5ZRH3zgxrfpx5tzSOg0T/wQD3uNBtS\nARR4OFP5Dps2m420NNMu/B+ryQ3IPpWgvUyv4D2GH0sSydvVBhh20vPOprNtBML9\nrRtfFb92NQKBgQC5npsZ/2Ew/T7hmRLvv5Ujg9wrUCMZtu7LEpDX6FT0PNWziCz6\ntulk9MynBc9voWgnqUfd6TKr+94DaQ8Z9XfwY2n4QvdwJ5rFoIn27ULtk9Ikpxqo\nBnHTVReByANAIG5g2XPAHpx81fOxoHRm6tOaK90uxBCH8SVM5jooHwwsyQKBgQCG\nGD2Jy0ukmhXc2UGKKQnbEDNqfkc1lmfNtBmpt1+aRI+JspQasQmkwLYCFTRlzAl7\nofs2Upy89qmcuby5cALmvSUwKkf3rt4HeRWtVHJBvWtu6Uz6kzAzeTg4Nr7ZF/pt\njzozgiRqTsmqjSjNk+2Dqvxfe/0NBA2EyLYlYEPnRQKBgQC49NmBAhcJCXg3xfA8\n9QIm0PXJ2Y+5C/t1XQ5jMCwaXtW09n1KMXrBjWqEgACkitq5SscrX3Mt56l6Sp6E\nc3RG8MjiUtFtxezZdnMEuXpe1QtwXfS18c23GM/ZLQQ11q/RrrMsVKhWIq2ak3/q\nXudCjjshwn3erPvOrCz9PX2nWw==\n-----END PRIVATE KEY-----",
    DOMAIN_ID: 500040856,
    ADMIN_ID: "takaesu@tofukai",
    scopes: "bot,user.read,directory.read,orgunit.read,group.note,group.read"
  }
}

function getAccessToken(ENV,scopes) {
// LINEWORKS API のアクセストークンを発行する関数   
  const uri = "https://auth.worksmobile.com/oauth2/v2.0/token";
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
  return JSON.parse(UrlFetchApp.fetch(uri,options));
}

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
    

/** 
* ユーザー認証 
*/

// User Account認証用の設定
const USER_AUTH_CONFIG = {
  CLIENT_ID: "Ypeke8IZkJfaIERDLxA8",
  CLIENT_SECRET: "aSoSq5XDvk",
  AUTH_URL: "https://auth.worksmobile.com/oauth2/v2.0/authorize",
  TOKEN_URL: "https://auth.worksmobile.com/oauth2/v2.0/token",
  SCOPE: "group.note"
};
  
function getAuthUrl(redirectUri) {
// 認証URLを生成
  const params = {
    client_id: USER_AUTH_CONFIG.CLIENT_ID,
    redirect_uri: redirectUri,
    scope: USER_AUTH_CONFIG.SCOPE,
    response_type: 'code',
    state: Utilities.getUuid()
  };
    
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
      
  return `${USER_AUTH_CONFIG.AUTH_URL}?${queryString}`;
}
  
function getAccessTokenFromCode(code, redirectUri) {
// 認可コードを使用してアクセストークンとリフレッシュトークンを取得
  const payload = {
    grant_type: 'authorization_code',
    code: code,
    client_id: USER_AUTH_CONFIG.CLIENT_ID,
    client_secret: USER_AUTH_CONFIG.CLIENT_SECRET,
    redirect_uri: redirectUri
  };

  const options = {
    method: 'post',
    payload: payload,
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(USER_AUTH_CONFIG.TOKEN_URL, options);
  const json = JSON.parse(response.getContentText());

  // スクリプトプロパティにユーザー認証用トークンを保存
  PropertiesService.getScriptProperties().setProperty('userAccessToken', json.access_token);
  PropertiesService.getScriptProperties().setProperty('userRefreshToken', json.refresh_token);
  PropertiesService.getScriptProperties().setProperty('userTokenIssueDate', Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd'));

  return json.access_token;
}

function refreshUserAccessToken(refreshToken) {
// リフレッシュトークンを使用して新しいアクセストークンを取得
  const payload = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: USER_AUTH_CONFIG.CLIENT_ID,
    client_secret: USER_AUTH_CONFIG.CLIENT_SECRET
  };

  const options = {
    method: 'post',
    payload: payload,
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(USER_AUTH_CONFIG.TOKEN_URL, options);
    const json = JSON.parse(response.getContentText());
    
    // 新しいユーザー認証用トークンを保存
    PropertiesService.getScriptProperties().setProperty('userAccessToken', json.access_token);
    if (json.refresh_token) {
    PropertiesService.getScriptProperties().setProperty('userRefreshToken', json.refresh_token);
    }
    PropertiesService.getScriptProperties().setProperty('userTokenIssueDate', Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd'));
    
    return json.access_token;
  } catch (error) {
    console.error('リフレッシュトークンでの更新に失敗:', error);
    return null;
  }
}

function getUserAccessToken() {
// ユーザー認証用アクセストークンを取得する関数
  
  let accessToken = PropertiesService.getScriptProperties().getProperty('userAccessToken');
  let refreshToken = PropertiesService.getScriptProperties().getProperty('userRefreshToken');
  let tokenIssueDate = PropertiesService.getScriptProperties().getProperty('userTokenIssueDate');
  let todayFormatted = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy/MM/dd');

  // トークンの有効性チェック
  if (accessToken && tokenIssueDate === todayFormatted) {
    console.log("ユーザー認証のアクセストークンは有効です");
    return accessToken;
  }

  // リフレッシュトークンが存在する場合、それを使用してアクセストークンを更新
  if (refreshToken) {
    console.log("リフレッシュトークンを使用してアクセストークンを更新します");
    const newAccessToken = refreshUserAccessToken(refreshToken);
    if (newAccessToken) {
    return newAccessToken;
    }
  }

  console.error("有効なトークンがありません。再度認証が必要です。");
  return null;
}

function doGet(e) {
  /** LINE WORKS API のユーザー認証を行うAPI */

  const redirectUri = "https://script.google.com/macros/s/AKfycbzGqOAHKBaBe-HzYiryXC-Z2XlJSJK2PgsjUMvu_GrAMBt403xyd1JZ_TWiqSbpwuC5Ng/exec";
  // const redirectUri = ScriptApp.getService().getUrl(); //テスト用 webアプリURL

  /** 認可コードを受け取るためのコールバックハンドラ */
  if (e.parameter.code) {
    try{
      /** 認可コードを使用してアクセストークンを取得 */
      getAccessTokenFromCode(e.parameter.code,redirectUri);
      return HtmlService.createHtmlOutput('認証に成功しました。このページを閉じてください。');

    } catch (error){
      return HtmlService.createHtmlOutput('認証に失敗しました。このページを閉じてください。');
    }
  }

  /** 最初のアクセス時は認証ページにリダイレクト */
  return HtmlService.createHtmlOutput(`
    <script>
      window.open("${getAuthUrl(redirectUri)}", '_blank')
    </script>
  `);
}