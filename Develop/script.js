// Assignment Code
var generateBtn = document.querySelector("#generate");

var lowerCaseString = "abcdefghijklmnopqrstuvwxyz";
var upperCaseString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numberString = "0123456789";
var symbolString = "@#$%!&*?.";
var passwordLength = "";

var detailsPassword = function () {
  if (!passwordLength) {
    var passwordLength = prompt("How long do you want your password to be? Choose a number between 8 and 128.");
    if (isNaN(parseInt(passwordLength)) || passwordLength < 8 || passwordLength > 128) {
      passwordLength = "";
      alert("You need to choose a number between 8 and 128. Try again.");
      detailsPassword();
    }
  }
  var lowerCaseInc = confirm("Do you want lower case letters?");
  var upperCaseInc = confirm("Do you want upper case letters?");
  var numberInc = confirm("Do you want numbers?");
  var specialInc = confirm("Do you want special symbols?");
  if (!lowerCaseInc && !upperCaseInc && !numberInc && !specialInc) {
    alert("You must choose to include at least one of the following: lower case letters, upper case letters, numbers, or special symbols. Try again.");
    detailsPassword;
  }
  var passwordDetails = [passwordLength, lowerCaseInc, upperCaseInc, numberInc, specialInc];
  return passwordDetails;
}
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Write password to the #password input
function writePassword() {
  // var password = generatePassword(detailsPassword());
  var password = generatePassword(128,false,false,true,false);

  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

var randomNumber = function(min, max){
  // if we have a string of length 10, with indexes 0-9, then argument of (0,10) here
  // will only ever yield a maximum of 9, and a minimum of 0, which is what we want.
  return Math.floor((Math.random()*(max-min)) +min);
}


var generatePassword = function (length, lowerInc, upperInc, numInc, symbolInc) {
  // console.log("line 46")
  // console.log(lowerInc);
  // console.log(typeof(lowerInc));
  var allOptionsString = "";
  var minimumPassword = "";
  var finalPassword="";
  var randomIndex=0; 
  // can I declare without initializing?
  if(lowerInc){
    allOptionsString+=lowerCaseString;
    randomIndex = randomNumber(0, lowerCaseString.length);
    minimumPassword+=lowerCaseString[randomIndex];
  }
  if(upperInc){
    allOptionsString+=upperCaseString;
    randomIndex = randomNumber(0, upperCaseString.length);
    minimumPassword+=upperCaseString[randomIndex];
  }
  if(numInc){
    allOptionsString+=numberString;
    randomIndex = randomNumber(0, numberString.length);
    minimumPassword+=numberString[randomIndex];
  }
  if(symbolInc){
    allOptionsString+=symbolString;
    randomIndex = randomNumber(0, symbolString.length);
    minimumPassword+=symbolString[randomIndex];
  }

  while(minimumPassword.length<length){
    randomIndex=randomNumber(0, allOptionsString.length);
    minimumPassword+=allOptionsString[randomIndex];
  }
  // can either shuffle the entire password, randomly indexing and moving around
  // or else can switch spots within password only as many times as minPwLength -- THIS DID NOT WORK BECAUSE U CAN'T REPLACE AN INDEX 

  // for(i=0;i<minPwLength;i++){
  //   randomIndex=randomNumber(0, minimumPassword.length);
  //   console.log(randomIndex);
  //   var replaceWith1 = minimumPassword[randomIndex];
  //   console.log(replaceWith1);
  //   minimumPassword[randomIndex]= minimumPassword[i];
  //   console.log(minimumPassword);
  //   minimumPassword[i]=replaceWith1;
  //   console.log(minimumPassword);
  //   console.log("done" +i);
  // }

  while(finalPassword.length<length){
    randomIndex=randomNumber(0, minimumPassword.length);
    var minRandomIndex=minimumPassword[randomIndex];
    finalPassword=finalPassword+minRandomIndex;
    minimumPassword=minimumPassword.slice(0, randomIndex)+minimumPassword.slice(randomIndex+1);
  }

  return finalPassword;
}



