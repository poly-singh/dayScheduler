var DaysofWeek = {
  "8 AM": "",
  "9 AM": "",
  "10 AM": "",
  "11 AM": "",
  "12 PM": "",
  "1 PM": "",
  "2 PM": "",
  "3 PM": "",
  "4 PM": "",
  "5 PM": "",
};

$(document).ready(function(){
  if(!localStorage.getItem('DaysofWeek')) {
    updateTasks(DaysofWeek);
  } else {
    updateTasks(JSON.parse(localStorage.getItem('DaysofWeek')));
  }
})

$('#currentDay').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));
var count = 1;
for(const item in DaysofWeek) {
  var Entry = "#entry" + count;
  $(Entry).text(DaysofWeek[item]);
  var timeId = "#time" + count;
  var presentTime = moment().hour();
  var timeString = $(timeId).text();
  var timeNumber = hourFromTime(timeString);  
  if(timeNumber < presentTime) {
    $(Entry).addClass("past");
  } else if (timeNumber > presentTime) {
    $(Entry).addClass("future");
  } else {
    $(Entry).addClass("present");
  }
  count ++;
}

$("button").click(function() {
  value = $(this).siblings("textarea").val();
  hourString = $(this).siblings("div").text();
  
  saveTasks(hourString, value);
});

function hourFromTime(hourString) {
  switch(hourString) {
    case "8 AM": return 8;
    case "9 AM": return 9;
    case "10 AM": return 10;
    case "11 AM": return 11;
    case "12 PM": return 12;
    case "1 PM": return 13;
    case "2 PM": return 14;
    case "3 PM": return 15;
    case "4 PM": return 16;
    case "5 PM": return 17;
  }
}

function renderTasks() {
  result = localStorage.getItem('DaysofWeek')
  return (result ? result : DaysofWeek);
}

function initializeData() {
  localStorage.setItem('DaysofWeek', JSON.stringify(DaysofWeek));
};

function saveData(dayObj) {
  localStorage.setItem('DaysofWeek', JSON.stringify(dayObj));
}

function saveTasks(hourString, val) {
  if(!localStorage.getItem('DaysofWeek')) {
    initializeData();
  }

  var workHours = JSON.parse(localStorage.getItem('DaysofWeek'));
  workHours[hourString] = val

  saveData(workHours);
}

function updateTasks(dayObject) {
  $(".time-block").each(function(index) {
    let res = $(this).children("div");
    $(this).children("textarea").text(dayObject[res.text()]);
  })
}

