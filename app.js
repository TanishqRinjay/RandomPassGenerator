//  DOM Elements
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const upperCaseEl = document.getElementById("upperCase");
const lowerCaseEl = document.getElementById("lowerCase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbols,
};

generateEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasLower = lowerCaseEl.checked;
  const hasUpper = upperCaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

//  Copy password to Clipboard
clipboardEl.addEventListener("click", () => {
  const textArea = document.createElement("textarea");
  const password = resultEl.innerText;
  if (!password) {
    return;
  }
  textArea.value = password;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
  alert("Password copied to clipboard");
});

//Funtions to generate password
function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  console.log(typesCount);
  const typeArray = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );
  console.log(typeArray);
  if (typesCount == 0) {
    return "";
  }
  for (let i = 0; i < length; i += typesCount) {
    typeArray.forEach((type) => {
      const funcName = Object.keys(type)[0];
      //   console.log("funcName: " + funcName);
      generatedPassword += randomFunc[funcName]();
    });
  }
  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

//  Funtions to generate values

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbols() {
  const symbols = "~!@#$%^&*()_+-=";
  return symbols[Math.floor(Math.random() * symbols.length)];
  //   console.log(symbols[Math.floor(Math.random() * symbols.length)]);
}
// console.log(getRandomLower());
// console.log(getRandomUpper());
// console.log(getRandomNumber());
// console.log(getRandomSymbols());
