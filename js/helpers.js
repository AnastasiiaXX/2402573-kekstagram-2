const checkStringLength = (string = 'str', maxLength = 1) => string.length <= maxLength;

checkStringLength('string', 3);

const isPalindrome = (string = '') => {
  const newString = string.toLowerCase().replaceAll(' ', '');
  let result = '';

  for(let i = newString.length - 1; i >= 0; i -= 1) {
    const char = newString[i];
    result += char;
  }

  return newString === result;
};

isPalindrome('А роза упала на лапу азора');

const parseStringToInt = (string) => {
  string = string.toString();
  let res = '';
  for (let i = 0; i < string.length; i += 1) {
    const parsed = parseInt(string[i], 10);
    const isDigit = (!isNaN(parsed));
    if (isDigit) {
      res += parsed;
    }
  }

  return res ? +res : NaN;
};

parseStringToInt('78 dogs');

export const getRandomInteger = (num1, num2) => {
  const lower = Math.ceil(Math.min(num1, num2));
  const upper = Math.floor(Math.max(num1, num2));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const getRandomElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];

const stringToMinutes = (string) => {
  const [hours, minutes] = string.split(':').map((el) => parseInt(el, 10));
  return hours * 60 + minutes;
};

export const checkWorkingTime = (workDayStart, workDayEnd, meetingStartTime, meetingDuration) => {
  const workStart = stringToMinutes(workDayStart);
  const workEnd = stringToMinutes(workDayEnd);
  const meetingStart = stringToMinutes(meetingStartTime);
  const meetingEnd = meetingStart + meetingDuration;

  return meetingStart >= workStart && meetingEnd <= workEnd;
};
