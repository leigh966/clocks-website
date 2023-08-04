var canvas = document.getElementById("clockCanvas");
var context = canvas.getContext("2d");
var face = document.getElementById("imgClockFace");

var clockDiameter = 300;
const secondRadius = clockDiameter / 3;
const minuteRadius = secondRadius;
const hourRadius = clockDiameter / 4;

var gap = 200;
const radiansPerHour = 0.52359878;
const radiansPerSecond = 0.10471976;

function getPoint(originX, originY, radians, radius) {
  return {
    x: originX + radius * Math.cos(radians),
    y: originY + radius * Math.sin(radians),
  };
}

function drawBlackHands(originX, originY, minutePosition, hourPosition) {
  context.beginPath();
  context.strokeStyle = "black";
  context.moveTo(originX, originY);
  context.lineTo(minutePosition.x, minutePosition.y);
  context.moveTo(originX, originY);
  context.lineTo(hourPosition.x, hourPosition.y);
  context.stroke();
}

function drawSecondHand(originX, originY, secondPosition) {
  context.beginPath();
  context.strokeStyle = "pink";
  context.moveTo(originX, originY);
  context.lineTo(secondPosition.x, secondPosition.y);
  context.stroke();
}

function getMinuteRadians(minute, second) {
  return (minute - 15 + second / 60) * radiansPerSecond;
}

function getHourRadians(hour, minute) {
  return (hour - 3 + minute / 60) * radiansPerHour;
}

function getSecondRadians(second) {
  return (second - 15) * radiansPerSecond;
}

function drawClock(originX, originY, hour, minute, second) {
  context.drawImage(
    face,
    originX - clockDiameter / 2,
    originY - clockDiameter / 2,
    clockDiameter,
    clockDiameter
  );

  let minutePosition = getPoint(
    originX,
    originY,
    getMinuteRadians(minute, second),
    minuteRadius
  );
  let hourPosition = getPoint(
    originX,
    originY,
    getHourRadians(hour, minute),
    hourRadius
  );

  let secondPosition = getPoint(
    originX,
    originY,
    getSecondRadians(second),
    secondRadius
  );
  drawBlackHands(originX, originY, minutePosition, hourPosition);
  drawSecondHand(originX, originY, secondPosition);
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

var bstOffset = 1;
var sydneyOffset = 10;
function drawClocks() {
  const clockRadius = clockDiameter / 2;
  context.clearRect(0, 0, canvas.width, clockDiameter);
  var second = new Date().getSeconds();
  var [bstHour, bstMinute] = getTime(bstOffset);
  drawClock(clockRadius, clockRadius, bstHour, bstMinute, second);
  var [sydneyHour, sydneyMinute] = getTime(sydneyOffset);
  drawClock(clockDiameter + gap, clockRadius, sydneyHour, sydneyMinute, second);
}

function drawFlags() {
  var uk = document.getElementById("imgUk");
  context.drawImage(uk, (clockDiameter - 150) / 2, clockDiameter, 150, 90);
  var sydney = document.getElementById("imgSydney");
  context.drawImage(sydney, clockDiameter + gap - 80, clockDiameter, 160, 107);
}

setInterval(drawClocks, 100);
setTimeout(drawFlags, 500);
