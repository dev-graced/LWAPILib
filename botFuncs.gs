function sendLinkMsgToRoom(text, linkText, url, channelId, env){
  //Bot からトークルームにリンクを送信する関数
  // env.accesToken でアクセストークンが、env.BOT_ID でBotIDが取得できることが前提

  let payload = {
      "content": {
      "type": "link",
      "contentText": text,
      "linkText": linkText,
      "link": url
    }
  }
  sendMsgToRoom(payload, channelId, env);
}

function sendTextMsgToRoom(msg, channelId, env) {
  //Bot からトークルームにテキストを送信する関数
  let payload = {"content": {"type": "text", "text": msg}};
  sendMsgToRoom(payload, channelId, env);
}

function sendImgCaroucelMsg(imageNum, imageId, senderId, receiverId, env){
  let payload;
    if (imageNum === 1){
      payload = {"content": {"type": "image", "fileId": imageId[0]}};
    }else if(imageNum === 2){
      payload = {"content": {"type": "image_carousel", "columns": [{"fileId": imageId[0]}, {"fileId": imageId[1]}]}};
    }else if(imageNum === 3){
      payload = {"content": {"type": "image_carousel", "columns": [{"fileId": imageId[0]}, {"fileId": imageId[1]}, {"fileId": imageId[2]}]}};
    }else if(imageNum === 4){
      payload = {"content": {"type": "image_carousel", "columns": [{"fileId": imageId[0]}, {"fileId": imageId[1]}, {"fileId": imageId[2]}, {"fileId": imageId[3]}]}};
    }else if(imageNum > 4){
      sendTextMsg("一度に送信できる画像は４枚までです。4枚目まで送信します。", senderId, env);
      payload = {"content": {"type": "image_carousel", "columns": [{"fileId": imageId[0]}, {"fileId": imageId[1]}, {"fileId": imageId[2]}, {"fileId": imageId[3]}]}};
    };

  sendMsg(payload, receiverId, env);
  console.log(receiverId, "に画像カルーセルを送信しました");
}

function send1ButtonMsg(msg, userId, env) {
  //Bot からユーザーにボタン1つのメッセージを送信する関数
  // msg配列の構造
  //  msg = [[タイトルメッセージ],[メッセージタイプ1,ボタンメッセージ1,text1]]
  //
  //メッセージタイプに合わせて、ボタンアクションの３番めの引数タイトルを postback か uri に設定する
  let action1;
  if(msg[1][0] == "message"){
    action1 = {
      "type": msg[1][0],
      "label": msg[1][1],
      "postback": msg[1][2]
    };
  }else if(msg[1][0] == "uri"){
    action1 = {
      "type": msg[1][0],
      "label": msg[1][1],
      "uri": msg[1][2]
    };
  }else{
    console.log("エラー: invalid message type in msg");
  }; 

  let payload = {
  "content": {
    "type": "button_template",
    "contentText": msg[0],
    "actions": [action1]
  }
  };

  sendMsg(payload, userId, env);
}

function send2ButtonMsg(msg, userId, env) {
//Bot からユーザーにボタン２つのメッセージを送信する関数
// msg配列の構造
//  msg = [[タイトルメッセージ],[メッセージタイプ1,ボタンメッセージ1,text1],[メッセージタイプ2,ボタンメッセージ2,text2]]
//
//メッセージタイプに合わせて、ボタンアクションの３番めの引数タイトルを postback か uri に設定する
  let action1, action2;
  if(msg[1][0] == "message"){
    action1 = {
      "type": msg[1][0],
      "label": msg[1][1],
      "postback": msg[1][2]
    };
  }else if(msg[1][0] == "uri"){
    action1 = {
      "type": msg[1][0],
      "label": msg[1][1],
      "uri": msg[1][2]
    };
  }else{
    console.log("エラー: invalid message type in msg");
  }; 
  if(msg[2][0] == "message"){
    action2 = {
      "type": msg[2][0],
      "label": msg[2][1],
      "postback": msg[2][2]
    };
  }else if(msg[2][0] == "uri"){
    action2 = {
      "type": msg[2][0],
      "label": msg[2][1],
      "uri": msg[2][2]
    };
  }else{
    console.log("エラー: invalid message type in msg");
  };

  let payload = {
  "content": {
    "type": "button_template",
    "contentText": msg[0],
    "actions": [action1, action2]
  }
};
  sendMsg(payload, userId, env);
}

function send3ButtonMsg(msg, userId, env) {
//Bot からユーザーにボタン3つのメッセージを送信する関数
// msg配列の構造
//  msg = [[タイトルメッセージ],[メッセージタイプ1,ボタンメッセージ1,text1],[メッセージタイプ2,ボタンメッセージ2,text2],...]
//
  //メッセージタイプに合わせて、ボタンアクションの３番めの引数タイトルを postback か uri に設定する
  let action1, action2, action3;
  if(msg[1][0] == "message"){
    action1 = {
      "type": msg[1][0],
      "label": msg[1][1],
      "postback": msg[1][2]
    };
  }else if(msg[1][0] == "uri"){
    action1 = {
      "type": msg[1][0],
      "label": msg[1][1],
      "uri": msg[1][2]
    };
  }else{
    console.log("エラー: invalid message type in msg");
  }; 
  if(msg[2][0] == "message"){
    action2 = {
      "type": msg[2][0],
      "label": msg[2][1],
      "postback": msg[2][2]
    };
  }else if(msg[2][0] == "uri"){
    action2 = {
      "type": msg[2][0],
      "label": msg[2][1],
      "uri": msg[2][2]
    };
  }else{
    console.log("エラー: invalid message type in msg");
  };
  if(msg[3][0] == "message"){
    action3 = {
      "type": msg[3][0],
      "label": msg[3][1],
      "postback": msg[3][2]
    };
  }else if(msg[3][0] == "uri"){
    action3 = {
      "type": msg[3][0],
      "label": msg[3][1],
      "uri": msg[3][2]
    };
  }else{
    console.log("エラー: invalid message type in msg");
  };

  let payload = {
  "content": {
    "type": "button_template",
    "contentText": msg[0],
    "actions": [action1, action2, action3]
  }
};

  console.log("payload in send3ButtonMsg", payload);
  sendMsg(payload, userId, env);
}

function sendMsg(payload, userId, env){
  // Bot から LINE WORKS ユーザーへのメッセージ送信をAPIにリクエストする関数

  let apiUriPart = "bots/" + env.BOT_ID + "/users/" + userId + "/messages";

  console.log("send Bot message to user");
  requestApi(apiUriPart, payload, env.accessToken);
}

function sendFileMsg(fileURL, userId, env) {
// Bot からユーザーにファイルを送信する関数
  let payload = {"content": {"type": "file", "originalContentUrl": fileURL}};
  sendMsg(payload, userId, env);
}

function sendLinkMsg(text, linkText, url, userId, env) {
// Bot からユーザーにリンクを送信する関数
  let payload = {
    "content": {
      "type": "link",
      "contentText": text,
      "linkText": linkText,
      "link": url
   }
  }
  sendMsg(payload, userId, env);
}

function sendImageMsg(imageId, userId, env) {
// Bot からユーザーに画像を送信する関数
  let payload = {"content": {"type": "image", "fileId": imageId}};
  sendMsg(payload, userId, env);
}

function sendTextMsg(msg, userId, env) {
//Bot からユーザーにテキストを送信する関数
  let payload = {"content": {"type": "text", "text": msg}};
  console.log("メッセージ ", msg);
  sendMsg(payload, userId, env);
}

function sendMsgToRoom(payload, channelId, env){
// Bot からユーザーにメッセージを送信するAPIを使用する関数
  let apiUriPart = "bots/" + env.BOT_ID + "/channels/" + channelId + "/messages";

  console.log("payload in sendMsg", payload);
  requestApi(apiUriPart, payload, env.accessToken);
}

function sendMsg(payload, userId, env){
  // Bot から LINE WORKS ユーザーへのメッセージ送信をAPIにリクエストする関数

  let apiUriPart = "bots/" + env.BOT_ID + "/users/" + userId + "/messages";

  console.log("send Bot message to user");
  requestApi(apiUriPart, payload, env.accessToken);
}

function requestPersistentMenu(payload, env){
// Botに表示する固定メニューをAPIにリクエストする関数

  let apiUriPart = "bots/" + env.BOT_ID + "/persistentmenu"; //API リクエスト URI　のbot以下の部分

  // APIリクエスト
  console.log("set Bot persistent menu");
  requestApi(apiUriPart, payload, env.accessToken);
}