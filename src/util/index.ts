//时间戳转换日期

export function timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y + M + D + h + m + s;
}

//数值取万

export function tenThousand(props){
  if(props>1000){
    return (props/10000).toFixed(1) + '万'
  }else{
    return props
  }
}

//10进制颜色转rgba

export  function getColor(number) {
  const alpha = number >> 24 & 0xff;
  const red = number >> 16 & 0xff;
  const green = number >> 8 & 0xff;
  const blue = number & 0xff;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}