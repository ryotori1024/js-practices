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
let dateFirst = new Date(argv.y, argv.m - 1, 1);
//月の最終日の情報を取得
let dateLast = new Date(argv.y, argv.m, 0);

dayFirstTemp = dateFirst.getDate();
dateFirstGetDayTemp = dateFirst.getDay();

let dates = [];
for(const d = dateFirst ; d <= dateLast ; d.setDate(d.getDate()+1)){
  dates.push(new Date(d));
}

//カレンダーを出力
process.stdout.write('      ' + dateFirst.getMonth() + '月 ' + dateFirst.getFullYear() + '\n');
process.stdout.write('日 月 火 水 木 金 土 \n');
//初日が日曜日以外の場合、そのまま出力すると曜日と日付が合わないので
//曜日番号が1増えるごとに前に空白を3つ追加して出力する位置をずらす
for(let i = 0; i < dates[0].getDay(); i++){
  process.stdout.write('   ');
}
let dateInput = 0;
for (let date of dates) {
  dateInput = String(date.getDate());
  dateInput = dateInput.padStart(2, ' ');
  process.stdout.write(dateInput + ' ');
  //土曜日まで出力したら改行
  if(date.getDay() === 6){
    process.stdout.write('\n');
  }
}
process.stdout.write('\n');
