/** 
 * テストに用いる、LINE WORKS API のアクセストークン周りの処理 
 */

let env = getEnv();
setLWAPI(env);

function setLWAPI(env){
// LINE WORKS API の情報を env にセットする関数

  // LINE WORKS APIを実行するためのアクセストークンを取得して env に追加
  let accessToken = PropertiesService.getScriptProperties().getProperty('accessToken');
  let tokenIssueDate = PropertiesService.getScriptProperties().getProperty('tokenIssueDate');

  setAccessTokenToEnv(accessToken,tokenIssueDate,env);
  console.log("accessToken",env.accessToken);

  // 訪問BotのBotId を env に追加
  let botId = "1418596"; //訪問BotID
  env.BOT_ID = botId;

  //　アクセストークンの情報をスクリプトプロパティに記録する
  PropertiesService.getScriptProperties().setProperty('accessToken',env.accessToken);
  PropertiesService.getScriptProperties().setProperty('tokenIssueDate',env.tokenIssueDate);
}

/**
 *  テスト関数
 */

function test_postGroupNote() {
  // テスト用のパラメータ
  const groupId = "7e1c3a3e-9a16-417d-3f25-05dade92ac87"; // 「よろず相談所（テスト用）」のグループID
  const title = "テストノート";
  const content = `
    <h1>テストノート</h1>
    <p>これはテスト用のノートです。</p>
    <ul>
      <li>項目1</li>
      <li>項目2</li>
      <li>項目3</li>
    </ul>
    <p>作成日時: ${new Date().toLocaleString('ja-JP')}</p>
  `;
  
  try {

    // グループノートを作成
    const result = postGroupNote(groupId, title, content);
    
    // 結果をログに出力
    console.log("グループノート作成成功:", result);
    return "テスト成功: グループノートが作成されました";

  } catch (error) {
    console.error("グループノート作成エラー:", error);
    throw new Error("テスト失敗: " + error.message);

  }
}

function test_LWnotify(){

  const userId_takaesu = "d6adfeb2-a185-4490-14af-057a829ebbdb";
  const message = "#####################\n" + "　テスト送信です"
        + "\n#####################\n\n";
  sendTextMsg(message,userId_takaesu,env);
}

function test_auth(){
  console.log(getAuthUrl());
}

function test_getGroupInfo(){
  const targetGroupName = "よろず相談所（テスト用）";

  const response = getGroupInfo(env);

  //返信結果をパース
  const groupListJson = response.getContentText();
  const groupList = JSON.parse(groupListJson)["groups"];

  for(let i=0;i<groupList.length;i++){
    const groupName = groupList[i]["groupName"];

    if(groupName == targetGroupName){
      console.log("groupName:",groupName,"groupID:",groupList[i]["groupId"])
    }
  }
}

function showUserAccessToken(){
  console.log("userAccessToken",getUserAccessToken());
}

function test_getAtuthUrl(){
  const authUrl = getAuthUrl();
  console.log("authUrl",authUrl);
}

function test_getGroupNotePostId(){
  const groupId = "7e1c3a3e-9a16-417d-3f25-05dade92ac87"; // 「よろず相談所（テスト用）」のグループID
  const postName = "11/26(火)グレイス日報(訪問)";
  accessToken = getUserAccessToken();

  getGroupNotePostId(groupId,postName,accessToken);
}

function test_patchGroupNote(){
  const groupId = "7e1c3a3e-9a16-417d-3f25-05dade92ac87"; // 「よろず相談所（テスト用）」のグループID
  const postName = "11/26(火)グレイス日報(訪問)";

  const content = `
    訪問患者数: 100人
    新患: 人
    急患: 人
    キャンセル: 人

    訪問ポイント人数: 100P
    日室: P
    本間: P

    訪問ブラッシング数: 100人 
    日室: 人
    本間: 人

    休み: なし
  `;

  const result = patchGroupNote(groupId,postName,content);
  console.log(result.getContentText());
}

function test_uploadDriveFileToLineWorks(){
  const driveFileId = "1_SOdhskkkDfDe6z8jOsxs9d4vJfv31Mp"; //訪問部/ヘルシーちゃん体操/顎の体操.png
  const fileId = uploadDriveFileToLineWorks(driveFileId, env);
  console.log(fileId);
}

function test_getUploadUrl() {
  // テスト用のファイル名
  const fileName = "test_file.txt";

  try {
    // アップロードURL取得をテスト
    const result = getUploadUrl(fileName, env);
    
    // 必要なプロパティが存在するか確認
    if (!result.uploadUrl) {
      throw new Error("uploadUrlが取得できませんでした");
    }

    // 結果をログに出力
    console.log("アップロードURL取得成功:", {
      uploadUrl: result.uploadUrl,
    });

    // URLの形式を確認
    if (!result.uploadUrl.startsWith("https://")) {
      throw new Error("不正なuploadUrl形式です: " + result.uploadUrl);
    }

    return "テスト成功: アップロードURLが正しく取得できました";

  } catch (error) {
    console.error("アップロードURL取得エラー:", error);
    throw new Error("テスト失敗: " + error.message);
  }
}
