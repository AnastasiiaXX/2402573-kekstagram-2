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
