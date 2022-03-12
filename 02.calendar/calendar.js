let today = new Date();
const argv = require('minimist')(process.argv.slice(2), {
    alias: {
      y: 'yaer', 
      m: 'month'
    },
    default: {
      y: today.getFullYear(),
      m: today.getMonth() + 1,
    }
  })

//コマンドラインで受け取った月と年を元にDateインスタンスを生成
//月の初日の情報を取得
let date_first = new Date(argv.y, argv.m - 1, 1);
//月の最終日の情報を取得
let date_last = new Date(argv.y, argv.m, 0);

let date_hash = {};

day_first_temp = date_first.getDate();
date_first_getDay_temp = date_first.getDay();

// 日付をキー、曜日の番号を値としたハッシュを作成
while (day_first_temp <= date_last.getDate()){
  date_hash[day_first_temp] = date_first_getDay_temp;
  day_first_temp++;
  date_first_getDay_temp++;
  if(date_first_getDay_temp > 6){
    date_first_getDay_temp = 0;
  }
}

//console.log('ハッシュの中身:', date_hash);

//カレンダーを出力
console.log('      ' + (date_first.getMonth() + 1) + '月 ' + date_first.getFullYear());
console.log('日' + ' 月 ' + '火' + ' 水 ' + '木' + ' 金 ' + '土');

for (let key in date_hash) {
  if(key.length === 1){
    //日付が一桁の場合は、整合をとるために前にも空白を付与する
    pre_branks = ' ';
    if(key === '1'){
      //初日が日曜日以外の場合、そのまま出力すると曜日と日付が合わないので
      //曜日番号に応じて前に付与する空白の数を変えて出力する位置をずらす
      for(let i = 0; i < date_hash[key]; i++){
        //曜日番号が1増えるごとに、空白を3つ増やす
        pre_branks += '   ';
      }
    }
    process.stdout.write(pre_branks + key + ' ');
  }else{
    process.stdout.write(key + ' ');
  }
  //土曜日まで出力したら改行
  if(date_hash[key] === 6){
    process.stdout.write('\n');
  }
}
process.stdout.write('\n');
