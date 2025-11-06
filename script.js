const levelArr = document.getElementsByName("level");
let level, answer, score, temp, userName, startingTime, timePassed, stopped, userHints, messageTime;

const scoreArr = [];
const loseArr = [];
const totalArr = [];
const timeArr = [];

nameBtn.addEventListener("click", start);
playBtn.addEventListener("click", play);
playBtn.addEventListener("click", startTimer);
guessBtn.addEventListener("click", makeGuess);
giveUpBtn.addEventListener("click", iGaveUp);
hintBtn.addEventListener("click", giveHint);

setInterval(time, 500);

function time() {
    let date = new Date();
    let dom = date.getDate();
    let dow = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();
    let mins = date.getMinutes();
    let hour = date.getHours();
    let sec = date.getSeconds();
    let amPm = "AM";
    switch (dow) {
        case 0: dow = "Sunday"; break;case 1: dow = "Monday"; break;case 2: dow = "Tuesday"; break;case 3: dow = "Wednesday"; break;case 4: dow = "Thursday"; break;case 5: dow = "Friday"; break;case 6: dow = "Saturday"; break;
    } // next time use lists/dictionaries, too tedious.
    // like let monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // month = monthList[month]
    

    switch (month) {
        case 0: month = "January"; break;
        case 1: month = "February"; break;
        case 2: month = "March"; break;
        case 3: month = "April"; break;
        case 4: month = "May"; break;
        case 5: month = "June"; break;
        case 6: month = "July"; break;
        case 7: month = "August"; break;
        case 8: month = "September"; break;
        case 9: month = "October"; break;
        case 10: month = "November"; break;
        case 11: month = "December"; break;
    }
    switch (dom%10) {
        case 1: dom = dom+"st"; break;
        case 2: dom = dom+"nd"; break;
        case 3: dom = dom+"rd"; break;
        default: dom = dom+"th"; break;
    }
    if (userName == undefined){
    if (hour>=12) {hour = hour-12;amPm = "PM";}
    if (hour==0) {hour = 12;}
    if (mins<10) {mins = "0" + mins;}
    if (sec<10) {sec = "0" + sec;}
    document.getElementById("date").innerHTML = "The time is " + hour+":"+mins+":"+sec+" "+amPm+"<br> It is " +dow+", "+month+" "+dom+", "+year;
}// test
    else{
    if (hour < 3) {messageTime = "its wayyy too late for this "+ userName+ ". Go to sleep!";}
    else if (hour < 6) {messageTime = "Get the day, "+ userName+ ", you early bird! Or night owl, I suppose";}
    else if (hour < 11) {messageTime = "Nothing like a morning coffee, "+userName+ ". Or juice. Or breakfast.";}
    else if (hour < 14) {messageTime = "What did you have for lunch, " + userName + "?";}
    else if (hour < 17) {messageTime = "Did you see any birds on your way home," + userName + "?";}
    else if (hour < 21) {messageTime = "How was dinner, "+userName+"?";}
    else if (hour < 23) {messageTime = "wow, its getting late," +userName+". Getting closer and closer to midnight.";}
    else {messageTime = userName+"! It's almost midnight! How exciting!";}
    if (hour>=12) {hour = hour-12;amPm = "PM";}
    if (hour==0) {hour = 12;}
    if (mins<10) {mins = "0" + mins;}
    if (sec<10) {sec = "0" + sec;}
    document.getElementById("date").innerHTML = "The time is " + hour+":"+mins+":"+sec+" "+amPm+"<br> It is " +dow+", "+month+" "+dom+", "+year + "<br>" + messageTime; 
}

}

function start() {
    userName = document.getElementById("Name").value;
    userName = userName.toLowerCase();
    userName = userName.charAt(0).toUpperCase() + userName.slice(1);
    if (userName == "") {
        enterName.innerHTML = "What is your name >^-^<";
        return;
    }
    else {
        enterName.innerHTML = "Hello, " + userName;
        Name.disabled = true;
        nameBtn.disabled = true;
        playBtn.disabled = false;
        custom.disabled = false;
        msg1.style.display = "none";
        displayTime.style.display = "none";
        msg.innerHTML = "Select a Level, " + userName;
        for (let i=0; i<levelArr.length; i++) {
            levelArr[i].disabled = false;
        }
    }
}

function play() {
    score = 0;
    temp = 100;
    userHints = 0;
    let customDiff = custom.value;
    if (customDiff == "" || isNaN(customDiff) || customDiff <= 1) {
        for (let i=0; i<levelArr.length; i++) {
            if (levelArr[i].checked) {
                level = levelArr[i].value;
            }
            levelArr[i].disabled = true;
        }
    }
    else {
        level = parseInt(custom.value);
        for (let i=0; i<levelArr.length; i++) {
            levelArr[i].disabled = true;
            levelArr[i].checked = false;
        }
    }
    playBtn.disabled = true;
    custom.disabled = true;
    guess.disabled = false;
    guessBtn.disabled = false;
    giveUpBtn.disabled = false;

    scoreDisplay.style.display = "none";
    msg1.style.display = "block";
    msg1.innerHTML = "Temperature:"
    displayTime.style.display = "block";

    answer = Math.floor(Math.random()*level) + 1;
    msg.innerHTML = userName + ", Guess an integer 1-" + level;
}

function startTimer() {
    let d = new Date();
    stopped = false;
    startingTime = d.getTime();
    setInterval(timerGoing, 50);
}

function stopTimer() {
    stopped = true;
}

function timerGoing() {
    let d = new Date();
    if (!stopped) {
        timePassed = d.getTime() - startingTime;
    }

    let mins = Math.floor(timePassed/60000);
    let secs = Math.floor((timePassed % 60000)/1000);
    let ms = (timePassed % 60000) % 1000;

    if (mins<10) {mins = "0" + mins;}
    if (secs<10) {secs = "0" + secs;}
    if (ms<10) {ms = "00" + ms;}
    else if (ms<100) {ms = "0" + ms;}
    displayTime.innerHTML = "Time: " + mins + ":" + secs + "." + ms;
}

function makeGuess() {
    let userGuess = parseInt(guess.value);
    temp = Math.abs(answer-userGuess);
    if (temp == 0) {
        msg1.innerHTML = "Temperature: YOU'RE THERE ITS BURNING MY SKIN OFF";
    }
    else if (temp <= 0.05*level) {
        msg1.innerHTML = "Temperature: Almost theree! Hot like a ghost pepper!"
    }
    else if (temp <= 0.1*level) {
        msg1.innerHTML = "Temperature: Hot, but like black pepper sprinkled on your eggs";
    }
    else if (temp <= 0.2*level) {
        msg1.innerHTML = "Temperature: warm! feels like a warm bath";
    }
    else if (temp <= 0.5*level) {
        msg1.innerHTML = "Temperature: mmmm,, cool like a fridge";
    }
    else {
        msg1.innerHTML = "Temperature: brrrrrrr! I'm freezing!";
        userHints = userHints + 1;
        hintNumbers.innerHTML = "Hints: " + userHints;
        hintBtn.disabled = false;
    }
    if (userGuess == 0) {
        msg.innerHTML = "Too low. Guess an integer 1-" + level + ", " + userName;
        return;
    }
    else if (isNaN(userGuess) || userGuess == "") {
        msg.innerHTML = "You need to enter a number >^-^<. Guess an integer 1-" + level + ", " + userName;
        return;
    }
    score++;
    if (userGuess<answer) {
        msg.innerHTML = "Too low. guess an integer 1-" + level + ", " + userName;
    }
    else if (userGuess>answer) {
        msg.innerHTML = "Too high. guess an integer 1-" + level + ", " + userName;
    }
    else {
        if (score == 1) {
            msg.innerHTML = "Correct! You won in " + score + " try, " + userName;
        }
        else {
            msg.innerHTML = "Correct! You won in " + score + " tries, " + userName;
        }
        timeArr.push(timePassed);
        stopTimer();
        scoreArr.push(score);
        totalArr.push(score);
        updateScore();
        reset();
    }
}

function giveHint() {
    let maxVal = answer*1.2;
    let minVal = answer*0.8;
    let hintVal = Math.floor(Math.random()*(maxVal-minVal)+ minVal);
    while (hintVal == answer) {
        hintVal = Math.floor(Math.random()*(maxVal-minVal)+ minVal);
    }
    hints.innerHTML = hintVal + " is close to your number!";
    userHints = userHints - 1;
    hintNumbers.innerHTML = "Hints: " + userHints;
    if (userHints <= 0) {
        hintBtn.disabled = true;
    }
}

function iGaveUp() {
    if (isNaN(temp)) {
        score = 100;
    }
    else {
        score = score + temp;
    }

    timeArr.push(timePassed);
    stopTimer();
    loseArr.push(score);
    totalArr.push(score);
    updateScore();
    reset();
}

function updateScore() {
    wins.innerHTML = "Total wins: " + scoreArr.length;
    losses.innerHTML = "Total losses: " + loseArr.length;
    let lb = document.getElementsByName("leaderboard");
    totalArr.sort((a,b) => a-b);
    let sum = 0;
    let timeSum = 0;
    scoreDisplay.style.display = "block";
    if (score <= Math.ceil(0.1*level)) {
        scoreDisplay.innerHTML = "Your score is very good!";
    }
    else if (score <= Math.ceil(0.2*level)) {
        scoreDisplay.innerHTML = "Your score is good!";
    }
    else if (score <= Math.ceil(0.5*level)) {
        scoreDisplay.innerHTML = "Your score is okay.";
    }
    else if (score <=Math.ceil(0.7*level)) {
        scoreDisplay.innerHTML = "Your score is not good.";
    }
    else {
        scoreDisplay.innerHTML = "Your score is bad.";
    }
    
    for (let i=0; i<totalArr.length; i++) {
        if (i<lb.length) {
            lb[i].innerHTML = userName + ": " + totalArr[i];
        }
        sum += totalArr[i];
    }
    let avg = sum/totalArr.length;
    avgScore.innerHTML = "Average Score: " + avg.toFixed(2);

    for (let i=0; i<timeArr.length; i++) {
        timeSum += timeArr[i];
    }
    let averageTime = (timeSum/timeArr.length).toFixed(0);
    let mins = Math.floor(averageTime/60000);
    let secs = Math.floor((averageTime % 60000)/1000);
    let ms = (averageTime % 60000) % 1000;

    if (mins<10) {
        mins = "0" + mins;
    }
    if (secs<10) {
        secs = "0" + secs;
    }
    if (ms<10) {
        ms = "00" + ms;
    }
    else if (ms<100) {
        ms = "0" + ms;
    }

    avgTime.innerHTML = "Average Time: " + mins + ":" + secs + "." + ms;

    timeArr.sort((a,b) => a-b);
    fastestTime = timeArr[0]
    let fastMins = Math.floor(fastestTime/60000);
    let fastSecs = Math.floor((fastestTime % 60000)/1000);
    let fastMs = Math.floor((fastestTime % 60000) % 1000);
    if (fastMins<10) {
        fastMins = "0" + fastMins;
    }
    if (fastSecs<10) {
        fastSecs = "0" + fastSecs;
    }
    if (fastMs<10) {
        fastMs = "00" + fastMs;
    }
    else if (ms<100) {
        fastMs = "0" + fastMs;
    }

    fastestGame.innerHTML = "Fastest Game Played: " + fastMins + ":" + fastSecs + "." + fastMs;
}

function reset() {
    guess.disabled = true;
    guessBtn.disabled = true;
    playBtn.disabled = true;
    for (let i=0; i<levelArr.length; i++) {
        levelArr[i].disabled = true;
    }
    nameBtn.disabled = false;
    Name.disabled = false;
    guess.value = "";
    guess.placeholder = "";
    custom.placeholder = "";
    custom.value = "";
    enterName.innerHTML = "Enter a name";
    giveUpBtn.disabled = true;
    hintBtn.disabled = true;
    hints.innerHTML = "";
    hintNumbers.innerHTML = "Hints: 0";
}