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

function testCreateGroupNote() {
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
    const result = createGroupNote(groupId, title, content);
    
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