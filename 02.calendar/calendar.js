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

//初日が日曜日以外の場合、そのまま出力すると曜日と日付が合わないので
//曜日番号に応じて前に付与する空白の数を変えて出力する位置をずらす
pre_branks = ' ';
if(String(dates[0].getDate()).length === 1){
  pre_branks = pre_branks.padStart((dates[0].getDay() + 1)  * 3 - 2,'   ');
}

//カレンダーを出力
console.log('      ' + dateFirst.getMonth() + '月 ' + dateFirst.getFullYear());
console.log('日 月 火 水 木 金 土');
for (let date of dates) {
  if(date.getDate() === 1){
    process.stdout.write(pre_branks + date.getDate() + ' ');
  }else{
    //日付が一桁の場合は、整合をとるために前にも空白を付与する
    if(String(date.getDate()).length === 1){
      process.stdout.write(' ' + date.getDate() + ' ');
    }else{
      process.stdout.write(date.getDate() + ' ');
    }
  }
  //土曜日まで出力したら改行
  if(date.getDay() === 6){
    process.stdout.write('\n');
  }
}
process.stdout.write('\n');
