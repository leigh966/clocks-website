var canvas = document.getElementById("clockCanvas");
var context = canvas.getContext("2d");
var face = document.getElementById("imgClockFace");
var radiansPerDegree = Math.PI / 180;
var minuteRadius = 75;
var hourRadius = 50;
var degreesPerHour = 30;
var secondRadius = 70;
var clockDiameter = 200;
var gap = 200;

function getPoint(originX, originY, degrees, radius) {
  let radians = degrees * radiansPerDegree;
  return [
    originX + radius * Math.cos(radians),
    originY + radius * Math.sin(radians),
  ];
}

function drawBlackHands(originX, originY, minuteX, minuteY, hourX, hourY) {
  context.beginPath();
  context.strokeStyle = "black";
  context.moveTo(originX, originY);
  context.lineTo(minuteX, minuteY);
  context.moveTo(originX, originY);
  context.lineTo(hourX, hourY);
  context.stroke();
}

function drawSecondHand(originX, originY, secondX, secondY) {
  context.beginPath();
  context.strokeStyle = "pink";
  context.moveTo(originX, originY);
  context.lineTo(secondX, secondY);
  context.stroke();
}

function drawClock(originX, originY, hour, minute, second) {
  context.drawImage(
    face,
    originX - 100,
    originY - 100,
    clockDiameter,
    clockDiameter
  );
  let minuteDegrees = (minute - 15) * 6;
  let [minuteX, minuteY] = getPoint(
    originX,
    originY,
    minuteDegrees,
    minuteRadius
  );
  let hourDegrees = (hour - 3 + minute / 60) * degreesPerHour;
  let [hourX, hourY] = getPoint(originX, originY, hourDegrees, hourRadius);

  let secondDegrees = (second - 15) * 6;
  let [secondX, secondY] = getPoint(
    originX,
    originY,
    secondDegrees,
    secondRadius
  );
  drawBlackHands(originX, originY, minuteX, minuteY, hourX, hourY);
  drawSecondHand(originX, originY, secondX, secondY);
}

var millisPerHour = 3600000;
var millisPerMinute = 60000;
function getTime(offset) {
  // create Date object for current location
  var d = new Date();

  // convert to msec
  // subtract local time zone offset
  // get UTC time in msec
  var utc = d.getTime() + d.getTimezoneOffset() * millisPerMinute;

  // create new Date object for different city
  // using supplied offset
  var nd = new Date(utc + millisPerHour * offset);

  return [nd.getHours(), nd.getMinutes()];
}

function drawClocks() {
  context.clearRect(0, 0, canvas.width, clockDiameter);
  var second = new Date().getSeconds();
  var [bstHour, bstMinute] = getTime(1);
  drawClock(100, 100, bstHour, bstMinute, second);
  var [sydneyHour, sydneyMinute] = getTime(10);
  drawClock(clockDiameter + gap, 100, sydneyHour, sydneyMinute, second);
}

setInterval(drawClocks, 100);
var uk = document.getElementById("imgUk");
context.drawImage(uk, 25, clockDiameter, 150, 90);
var sydney = document.getElementById("imgSydney");
context.drawImage(sydney, clockDiameter + gap - 80, clockDiameter, 160, 107);
