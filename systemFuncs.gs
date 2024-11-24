function createNippou() {
  const date = new Date();
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  const day = date.getDate();
  const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
  
  const title = `${month}/${day}(${dayOfWeek})グレイス日報(訪問)`
  const content = `
    訪問患者数:30人
    新患:人
    急患:人
    キャンセル:人

    訪問ポイント人数:10P
    日室:5P
    本間:5P

    訪問ブラッシング数:5人 
    日室:人
    本間:5人

    休み:なし
  `;
  
  return {"title": title, "content": content};
}
