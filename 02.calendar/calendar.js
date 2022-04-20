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
preBranks = ' ';
switch(dates[0].getDay()){
  case 1:
    preBranks += '   ';
    break;
  case 2:
    preBranks += '      ';
    break;
  case 3:
    preBranks += '         ';
    break;
  case 4:
    preBranks += '            ';
    break;
  case 5:
    preBranks += '               ';
    break;
  case 6:
    preBranks += '                  ';
    break;
}

//カレンダーを出力
console.log('      ' + dateFirst.getMonth() + '月 ' + dateFirst.getFullYear());
console.log('日 月 火 水 木 金 土');
process.stdout.write(preBranks);
let dateInput = 0;
for (let date of dates) {
  dateInput = String(date.getDate());
  if(dateInput !== '1' ){
    dateInput = dateInput.padStart(2, ' ');
    process.stdout.write(dateInput + ' ');
  }else{
    process.stdout.write(dateInput + ' ');
  }
  //土曜日まで出力したら改行
  if(date.getDay() === 6){
    process.stdout.write('\n');
  }
}
process.stdout.write('\n');
