// Assignment Code
var generateBtn = document.querySelector("#generate");

// all global variables
var lowerCaseString = "abcdefghijklmnopqrstuvwxyz";
var upperCaseString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numberString = "0123456789";
var symbolString = "@#$%!&*?.";
var passwordLength = null;

// obtain all info from user - length, what characters to include
var detailsPassword = function () {
    if (!passwordLength) {
        var passwordLength = prompt("How long do you want your password to be? Choose a number between 8 and 128.");
        if (isNaN(parseInt(passwordLength)) || passwordLength < 8 || passwordLength > 128) {
            passwordLength = null;
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
        detailsPassword();
    }
    var passwordDetails =
    {
        passwordLength, lowerCaseInc, upperCaseInc, numberInc, specialInc
    };
    return passwordDetails;
};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Write password to the #password input
function writePassword() {
    var password = generatePassword(detailsPassword());
    console.log(password);
    var passwordText = document.querySelector("#password");
    passwordText.value = password;
};

// random number generator function
var randomNumber = function (min, max) {
    // if we have a string of length 10, with indexes 0-9, then argument of (0,10) here
    // will only ever yield a maximum of 9, and a minimum of 0, which is what we want.
    return Math.floor((Math.random() * (max - min)) + min);
};

// generate password 
var generatePassword = function (passwordObj) {
    const { passwordLength, lowerCaseInc, upperCaseInc, numberInc, specialInc } = passwordObj;
    var allOptionsString = "";
    var minimumPassword = "";
    var finalPassword = "";
    var randomIndex;

    if (lowerCaseInc) {
        allOptionsString += lowerCaseString;
        randomIndex = randomNumber(0, lowerCaseString.length);
        minimumPassword += lowerCaseString[randomIndex];
    }
    if (upperCaseInc) {
        allOptionsString += upperCaseString;
        randomIndex = randomNumber(0, upperCaseString.length);
        minimumPassword += upperCaseString[randomIndex];
    }
    if (numberInc) {
        allOptionsString += numberString;
        randomIndex = randomNumber(0, numberString.length);
        minimumPassword += numberString[randomIndex];
    }
    if (specialInc) {
        allOptionsString += symbolString;
        randomIndex = randomNumber(0, symbolString.length);
        minimumPassword += symbolString[randomIndex];
    }
    
    while (minimumPassword.length < passwordLength) {
        randomIndex = randomNumber(0, allOptionsString.length);
        minimumPassword += allOptionsString[randomIndex];
    }
    
    while (finalPassword.length < passwordLength) {
        randomIndex = randomNumber(0, minimumPassword.length);
        var minRandomIndex = minimumPassword[randomIndex];
        finalPassword = finalPassword + minRandomIndex;
        minimumPassword = minimumPassword.slice(0, randomIndex) + minimumPassword.slice(randomIndex + 1);
    }

    return finalPassword;
};



