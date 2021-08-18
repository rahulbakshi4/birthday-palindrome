const dateInput =  document.querySelector('#date-input')
const checkBtn = document.querySelector('#check-btn')
const outputDiv = document.querySelector('#output-div')


function reverseString(str) {
    return str.split('').reverse().join('')
  }
  
  
  function checkPalindrome(str) {
    let reversed = reverseString(str)
    return str === reversed
  }
  
  
  function dateToString(date) {
    let dateStr = { day: "", month: "", year: 2020 }
  
  
    if (date.day < 10) {
      dateStr.day = '0' + date.day
    }
    else {
      dateStr.day = date.day.toString()
    }
  
    if (date.month < 10) {
      dateStr.month = '0' + date.month
    }
    else {
      dateStr.month = date.month.toString()
    }
  
    dateStr.year = date.year.toString()
  
    return dateStr
  }
  
  
  function dateInAllFormat(date) {
    let DDMMYYYY = date.day + date.month + date.year
    let MMDDYYYY = date.month + date.day + date.year
    let YYYYMMDD = date.year + date.month + date.day
    let DDMMYY = date.day + date.month + date.year.slice(-2)
    let MMDDYY = date.month + date.day + date.year.slice(-2)
    let YYMMDD = date.year.slice(-2) + date.month + date.day
  
    return [DDMMYYYY, MMDDYYYY, YYYYMMDD, DDMMYY, MMDDYY, YYMMDD]
  
  }
  
  function checkPalindromeAllFormat(date) {
  
    let dateStr = dateToString(date)
    let dateFormats = dateInAllFormat(dateStr)
    let isPalindrome = false;
  
    for (let i = 0; i < dateFormats.length; i++) {
      if (checkPalindrome(dateFormats[i])) {
        isPalindrome = true
        break;
      }
  
    }
    return isPalindrome;
  
  }
  
  
  function checkLeapYear(year) {
  
    if ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)) {
      return true
    } else {
      return false
    }
  }
  
  function findNextDate(date) {
    let day = date.day + 1
    let month = date.month
    let year = date.year
  
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  
    //check for leapyear
    if (month === 2) {
      if (checkLeapYear(year)) {
        if (day > 29) {
          day = 1
          month = 3
        }
      }
      else {
        if (day > 28) {
          day = 1
          month = 3
        }
      }
  
    }
    else {
      if (day > daysInMonth[month - 1]) {
        day = 1
        month++
      }
    }
  
    // for last day of year
    if (month > 12) {
      month = 1
      year++
    }
    return {
      day: day,
      month: month,
      year: year
    }
  }
  
  // console.log(findNextDate(date))
  
  
  
  function findNextPalindromeDate(date) {
    let count = 0
    let nextDate = findNextDate(date)
  
    while (1) {
      count++
      let nextPalindrome = checkPalindromeAllFormat(nextDate)
      if (nextPalindrome) {
        break;
      }
      nextDate = findNextDate(nextDate)
    }
  
    return [count, nextDate]
  }
  
  function findPreviousDate(date) {
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;
  
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (day === 0) {
      month--;
  
      if (month === 0) {
        month = 12;
        day = 31;
        year--;
      }
      else if (month === 2) {
        if (isLeapYear(year)) {
          day = 29;
        }
        else {
          day = 28;
        }
      }
      else {
        day = daysInMonth[month - 1];
      }
    }
  
    return {
      day: day,
      month: month,
      year: year
    }
  }
  
  function findPreviousPalindromeDate(date) {
    let count = 0
    let previousDate = findPreviousDate(date)
  
    while (1) {
      count++
      let previousPalindrome = checkPalindromeAllFormat(previousDate)
      if (previousPalindrome) {
        break;
      }
      previousDate = findNextDate(previousDate)
    }
  
    return [count, previousDate]
  }
  
const clickHandler = () =>{

    if(dateInput.value != ''){
    let dateList = dateInput.value.split('-')
    let date = {
        day: Number(dateList[2]),
        month:Number(dateList[1]),
        year: Number(dateList[0])
    }
    console.log(date)

   const isAPalindrome = checkPalindromeAllFormat(date)

   if(!isAPalindrome){
    let [count1,nextDate] = findNextPalindromeDate(date)
    let[count2,previousDate] = findPreviousPalindromeDate(date)
     
    if(count1<count2){
    outputDiv.style.border = "2px solid #F2F3AE"
    outputDiv.style.background = "#E7E2E2"
     outputDiv.innerText = `Nayyy!!! Your Birthdate is not a Palinedrome. The nearest Palindrome Date is ${nextDate.day}-${nextDate.month}-${nextDate.year}.You missed by just ${count1} days.`
    }
    else{
        outputDiv.style.border = "2px solid #F2F3AE"
    outputDiv.style.background = "#E7E2E2"
     outputDiv.innerText = `Nayyy!!! Your Birthdate is not a Palinedrome. The nearest Palindrome Date is ${previousDate.day}-${previousDate.month}-${previousDate.year}.You missed by just ${count2} days.`
    }
      
   }
   else{
    outputDiv.style.border = "2px solid #F2F3AE"
    outputDiv.style.background = "#E7E2E2"
    outputDiv.innerText = `wuhuuu!!!  Your Birthdate is a palindrome`
 }

    }
}
checkBtn.addEventListener('click',clickHandler)