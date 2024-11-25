function createNippou() {
  const date = new Date();
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  const day = date.getDate();
  const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
  
  // スプレッドシートから日報データを取得
  const spreadsheet = SpreadsheetApp.openById('1S6J-Xk6GwKb53lAhnutRflzfPAJ-Ndsuj_PNZ5N47Nw');
  const sheet = spreadsheet.getSheetByName('日報回答');
  const data = sheet.getDataRange().getValues();
  
  // ヘッダー行を取得して列のインデックスを特定
  const headers = data[0];
  const timestampCol = headers.indexOf('タイムスタンプ');
  const drPatientsCol = headers.indexOf('Dr 訪問患者数');
  const dhPatientsCol = headers.indexOf('DH 訪問患者数');
  const overlappedPatientsCol = headers.indexOf('被った患者数');
  const newPatientsCol = headers.indexOf('新患数');
  const emergencyPatientsCol = headers.indexOf('急患数');
  const cancelledPatientsCol = headers.indexOf('キャンセル数');
  const nisshitsuPointsCol = headers.indexOf('訪問ポイント（日室）');
  const honmaPointsCol = headers.indexOf('訪問ポイント（本間）');
  const nisshitsuBrushingCol = headers.indexOf('ブラッシング数（日室）');
  const honmaBrushingCol = headers.indexOf('ブラッシング数（本間）');
  const fullDayOffCol = headers.indexOf('休み [1日休み]');
  const morningOffCol = headers.indexOf('休み [半日（午前）休み]');
  const afternoonOffCol = headers.indexOf('休み [半日（午後）休み]');
  const quarterDayOffCol = headers.indexOf('休み [0.25日休み]');
  const threeQuartersDayOffCol = headers.indexOf('休み [0.75日休み]');
  
  // 指定された日付のデータを検索（最新のタイムスタンプを使用）
  let latestRow = null;
  let latestTimestamp = null;
  
  for (let i = 1; i < data.length; i++) {
    const timestamp = new Date(data[i][timestampCol]);
    if (timestamp.getDate() === date.getDate() &&
        timestamp.getMonth() === date.getMonth() &&
        timestamp.getFullYear() === date.getFullYear()) {
      if (!latestTimestamp || timestamp > latestTimestamp) {
        latestTimestamp = timestamp;
        latestRow = data[i];
      }
    }
  }
  
  if (!latestRow) {
    throw new Error('指定された日付のデータが見つかりません');
  }
  
  // データを変数に格納
  const totalPatients = (latestRow[drPatientsCol] || 0) + (latestRow[dhPatientsCol] || 0) - (latestRow[overlappedPatientsCol] || 0);
  const newPatients = latestRow[newPatientsCol] || 0;
  const emergencyPatients = latestRow[emergencyPatientsCol] || 0;
  const cancelledPatients = latestRow[cancelledPatientsCol] || 0;
  const nisshitsuPoints = latestRow[nisshitsuPointsCol] || 0;
  const honmaPoints = latestRow[honmaPointsCol] || 0;
  const totalPoints = nisshitsuPoints + honmaPoints;
  const nisshitsuBrushing = latestRow[nisshitsuBrushingCol] || 0;
  const honmaBrushing = latestRow[honmaBrushingCol] || 0;
  const totalBrushing = nisshitsuBrushing + honmaBrushing;
  
  // 休みの状態を確認
  let dayOff = '無し';
  if (latestRow[fullDayOffCol]) dayOff = '1日';
  else if (latestRow[morningOffCol]) dayOff = '午前半日';
  else if (latestRow[afternoonOffCol]) dayOff = '午後半日';
  else if (latestRow[quarterDayOffCol]) dayOff = '0.25日';
  else if (latestRow[threeQuartersDayOffCol]) dayOff = '0.75日';
  
  const title = `${month}/${day}(${dayOfWeek})グレイス日報(訪問)`;
  const content = `
    訪問患者数:${totalPatients}人
    新患:${newPatients}人
    急患:${emergencyPatients}人
    キャンセル:${cancelledPatients}人

    訪問ポイント人数:${totalPoints}P
    日室:${nisshitsuPoints}P
    本間:${honmaPoints}P

    訪問ブラッシング数:${totalBrushing}人 
    日室:${nisshitsuBrushing}人
    本間:${honmaBrushing}人

    休み:${dayOff}
  `;
  
  return {"title": title, "content": content};
}
