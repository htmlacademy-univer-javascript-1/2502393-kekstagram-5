function checkTheString (string, lenght){
  return string.length <= lenght;
}

checkTheString('сегоднятепло', 10);
// console.log(checkTheString('проверяемая строка', 20));
// console.log(checkTheString('проверяемая строка', 18));
// console.log(checkTheString('проверяемая строка', 10));

function thePalindrom (palindromString){
  const string = palindromString.replaceAll(' ','').toUpperCase();
  for (let i = 0; i < string.length / 2; i++){
    if (string.at(i) !== string.at(-i - 1)){
      return false;
    }
  }
  return true;
}

thePalindrom('шалаш');
// console.log(thePalindrom('топот'));
// console.log(thePalindrom('ДовОд'));
// console.log(thePalindrom('Кекс'));
// console.log(thePalindrom('Лёша на полке клопа нашёл '));


// Задание 5.16

function checkTheMeeting (workStart, workEnd, meetingStart, meetingTime) {
  function timeToMin (time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  const workStartMin = timeToMin(workStart);
  const workEndMin = timeToMin(workEnd);
  const meetingStartMin = timeToMin(meetingStart);
  const meetingEndMin = meetingStartMin + meetingTime;

  return meetingStartMin >= workStartMin && meetingEndMin <= workEndMin;
}

checkTheMeeting('08:00', '17:30', '14:00', 90);
checkTheMeeting('8:0', '10:0', '8:0', 120);
checkTheMeeting('08:00', '14:30', '14:00', 90);
checkTheMeeting('14:00', '17:30', '08:0', 90);
checkTheMeeting('8:00', '17:30', '08:00', 900);
