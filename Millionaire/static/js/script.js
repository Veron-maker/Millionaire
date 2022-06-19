async function getData(url) {
    const response = await fetch(url);
    return response.json();
}

const allQuestionsData = await getData("../resourses/questions/questions.json");

let saveLevels = [5, 10, 15]
let levelScore = ['0', '1 000', '3 000', '5 000', '10 000', '20 000', '35 000', '50 000', '70 000', '100 000', '150 000',
'250 000', '400 000', '600 000', '1 000 000', '2 000 000']
var rightAnswer;
let level = 0;
var currentQuestion;
var kickedAnswer = [];
var useFifty = false;

document.querySelector('.button-restart').addEventListener('click', function() {
    resetUserValues();
    document.querySelector('.answers').style.display = "block";
    show(level);
});
document.querySelector('.but-skip').addEventListener('click', function (){
    document.querySelector('.call_screen').style.display = "none";
    document.querySelector('.game').style.display = "block";
});
document.querySelector('.but-skip2').addEventListener('click', function (){
    document.querySelector('.hall_screen').style.display = "none";
    document.querySelector('.game').style.display = "block";
    document.querySelector(".hall_text").textContent = "Ожидаем пока все проголосуют...";
    document.getElementById("barA").style.height = `0%`;
    document.getElementById("barB").style.height = `0%`;
    document.getElementById("barC").style.height = `0%`;
    document.getElementById("barD").style.height = `0%`;
})

function getCategoryQuestion(array) {
    const rand = Math.floor(Math.random() * array.length);
    const randomElement = array[rand];
    array.splice(rand, 1);
    return randomElement;
}

let curAns = ""
function getNewQuestion(level){
    if (level < 5){
        return getCategoryQuestion(allQuestionsData["Easy"])
    } else if (level < 10) {
        return getCategoryQuestion(allQuestionsData["Medium"])
    } else {
        return getCategoryQuestion(allQuestionsData["Hard"])
    }
}

function show(level) {
    useFifty = false;
    let answerBox = document.getElementsByClassName('answer');
    if (level > 0) {
        document.querySelector('.answers').style.display = "block";
        document.querySelector('.game').style.display = "none";
        document.querySelector('.score').style.display = "block";
    }
    currentQuestion = getNewQuestion(level);
    document.getElementById('question-line').textContent = currentQuestion["question"];
    curAns = currentQuestion["answer"]

    answerBox[0].childNodes[1].textContent = currentQuestion["variants"][0];
    answerBox[1].childNodes[1].textContent = currentQuestion["variants"][2];
    answerBox[2].childNodes[1].textContent = currentQuestion["variants"][1];
    answerBox[3].childNodes[1].textContent = currentQuestion["variants"][3];

    if (level > 0) {
        setTimeout(() => {
            document.querySelector('.answers').style.display = "block";
            document.querySelector('.game').style.display = "block";
            document.querySelector('.score').style.display = "none";
        }, 2500);
    }
    rightAnswer = findAnswer(level);
}


let answerButtons = document.getElementsByClassName('button-answer');

show(level);
reloadHints(false);

for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].addEventListener('click', function() {
        returnRightForm(answerButtons[i], "url('../resourses/buttons/game/answer/answer-wait.png') no-repeat");
        buttonLock(true);
        let pickedButton = answerButtons[i];
        let answerNum = parseInt(pickedButton.id[3]);
        let error = false;
            if (answerNum === curAns) {
                changeProgress(false, level)
                setTimeout(()=> {
                level++;
                returnRightForm(pickedButton,"url('../resourses/buttons/game/answer/answer-right.png') no-repeat");
                }
                    , 1000);
                setTimeout(()=>{
                    setScore();
                if (level !== 15) {
                    if (saveLevels.indexOf(level) !== -1)
                    {
                        document.getElementById('question-points').textContent = levelScore[level];
                    }
                    show(level);
                }
                else {
                    gameOver();
                }}, 2000);
            }
            else {
                setTimeout(()=> {
                returnRightForm(pickedButton, "url('../resourses/buttons/game/answer/answer-error.png') no-repeat");
                returnRightForm(rightAnswer,"url('../resourses/buttons/game/answer/answer-right.png') no-repeat");
                error = true;
                }, 1000)
                setTimeout(()=> {
                    gameOver()
                }, 2000)
            }

            setTimeout(()=>{
                buttonLock(false);
                returnOldForm(pickedButton)
                if (error)
                    returnOldForm(rightAnswer);
            }, 2000)
    })
}


function hallHelp(){
    let obj = FindAnswer();
    document.querySelector('.game').style.display = "none";
    document.querySelector('.hall_screen').style.display = "block";
    let text = document.querySelector(".hall_text");
    setTimeout(()=> {
        text.textContent = "Были получены такие результаты.";
        console.log(obj)
        document.getElementById("barA").style.height = `${obj["A"]}%`;
        document.getElementById("barB").style.height = `${obj["B"]}%`;
        document.getElementById("barC").style.height = `${obj["C"]}%`;
        document.getElementById("barD").style.height = `${obj["D"]}%`;
    },750);
}

function FindAnswer(){
    let obj = {1 : "A", 2 :"B", 3 : "C", 4: "D"};
    if (useFifty){
        delete obj[kickedAnswer[0]];
        delete obj[kickedAnswer[1]];
    }
    let countingObj = {};
    for (let i = 1; i < 5; i++){
        if (obj[i] !== undefined){
            countingObj[obj[i]] = 0;
        }
    }
    if (level <= 5){
        CountingVotes(obj, countingObj, 3)
    }
    else if (level > 5 && level <= 10){
        CountingVotes(obj, countingObj, 2)
    }
    else {
        CountingVotes(obj, countingObj, 1)
    }

    return countingObj;
}

function CountingVotes(obj, newObj, chance){
    let rightNumber = parseInt(rightAnswer.id[3]);
    for (let i = 0; i <= 100; i += 1){
        let vote = Math.floor(Math.random() * (4 * chance) + 1);
        if (vote > 4){
            newObj[obj[rightNumber]] += 1;
        }
        else {
            newObj[obj[vote]] += 3;
        }
    }
}

function callToFriend(){
    document.querySelector('.game').style.display = "none";
    document.querySelector('.call_screen').style.display = "block";
    let timeout = 250;
    let text = document.querySelector(".call_text");
    let obj = {1 : "A", 2 :"B", 3 : "C", 4: "D"};
    if (useFifty){
        delete obj[kickedAnswer[0]];
        delete obj[kickedAnswer[1]];
    }
    text.innerHTML = `-Привет! Помоги мне ответить на вопрос. ${currentQuestion["question"]} <br>`;
    for (let i = 0; i < 5; i++) {
        if (obj[i] !== undefined) {
            if (i !== 2 && i !== 3) {
                setTimeout(() => {
                    text.innerHTML += `${obj[i]}. ${currentQuestion["variants"][i-1]} <br>`
                }, timeout);
            } else if (i === 2) {
                setTimeout(() => {
                    text.innerHTML += `${obj[i]}. ${currentQuestion["variants"][1]} <br>`
                }, timeout);
            } else {
                setTimeout(() => {
                    text.innerHTML += `${obj[i]}. ${currentQuestion["variants"][2]} <br>`
                }, timeout);
            }
            timeout += 250;
        }
    }
    timeout+=250;
    setTimeout( () => {text.innerHTML += `-Xмммм.`}, timeout);
    timeout+= 500;
    setTimeout( () => {text.innerHTML += `Мне кажется ответ ${obj[parseInt(rightAnswer.id[3])]}`}, timeout);
}


function deleteTwoIncorrectAnswer(){
    useFifty = true;
    let rightNumber = parseInt(rightAnswer.id[3]);
    let lastNumber = -1;
    let counter = 0;
    while (true) {
        let number = Math.floor(Math.random() * 4) + 1;
        if (number !== rightNumber && lastNumber !== number){
            document.getElementById(`answer${number}`).textContent = "";
            document.getElementById(`answer${number}`).parentNode.parentNode.parentNode.parentNode.parentNode.disabled = true;
            counter++;
            lastNumber = number;
            kickedAnswer.push(number);
        }
        if (counter === 2){
            break;
        }
    }
}


function addAnimationHints(s, func, reload) {
    let button = document.querySelector(`.${s}`);
    button.disabled = false;
    button.classList.remove(`${s}_used`);
    button.classList.remove(`${s}_hover`);
    button.addEventListener('mouseover', function () {
        this.classList.add(`${s}_hover`);
    });
    button.addEventListener('mouseout', function () {
        this.classList.remove(`${s}_hover`);
    });
    if (!reload) {
        button.addEventListener('click', function () {
            this.classList.add(`${s}_used`);
            func();
            this.addEventListener('mouseover', () => {
            });
            this.addEventListener('mouseout', () => {
            });
            this.disabled = true;
        });
    }
}


function reloadHints(reload) {
    addAnimationHints("hall", hallHelp, reload);
    addAnimationHints("call", callToFriend, reload);
    addAnimationHints("fifty", deleteTwoIncorrectAnswer, reload);
}

function changeProgress(restart, level){
    level++;
    if (!restart) {
        let str = '.tr' + level;
        let tr = document.querySelector(str);
        tr.style.background = "url('../resourses/buttons/score/button-sum.png') no-repeat";
        tr.style.backgroundSize = "contain";
        tr.style.backgroundPosition = "5px";
        tr.style.borderWidth = "0px";
        tr.style.padding = "5px";
    }
    else{
        for (let i = 1; i < level; i++){
            let str = '.tr' + i
            let tr = document.querySelector(str);
            tr.style.background = "";
            tr.style.backgroundSize = "";
            tr.style.backgroundPosition = "";
            tr.style.borderWidth = "";
            tr.style.padding = "";
        }
    }
}


function findAnswer(level){
    for (let i = 0; i < answerButtons.length; i++) {
        if (parseInt(answerButtons[i].id[3]) === curAns) {
            return answerButtons[i];
        }
    }
}

function returnOldForm(button){
    button.style.background = "";
    button.style.backgroundSize = "";
    button.style.position = "";
    button.style.width = "";
    button.style.height =  "";
    button.style.borderWidth = "";
    button.style.padding = "";
}


function returnRightForm(button , url){
    button.style.background = url;
    button.style.backgroundSize = "cover";
    button.style.position = "relative";
    button.style.width = "100%";
    button.style.height =  "75%";
    button.style.borderWidth = "0px";
    button.style.padding = "5px";
}

function buttonLock(lock){
    for (let j = 0; j < answerButtons.length; j++) {
        answerButtons[j].disabled = lock;
    }
}

function gameOver() {
    console.log("game over");
    changeProgress(true, level)
    document.querySelector('.answers').style.display = "none";
    let result;
    if (level >= saveLevels[0] && level !== 15){
        for (let i = 0; i < saveLevels.length; i++){
            if (level < saveLevels[i]){
                result = levelScore[saveLevels[i-1]]
                break;
            }
            if (level === saveLevels[i]){
                result = levelScore[saveLevels[i]]
                break;
            }
        }
    }
    else if (level === 15){
        result = levelScore[level];
    }
    else {
        result = "0"
    }
    let text = document.getElementById('question-line');
    text.setAttribute('style', 'white-space: pre;');
    text.textContent = "Игра закончена! Вы победили!\r\n";
    text.textContent += "Ваш счет: " + result;
}

function setScore() {
    document.getElementById('user-points').textContent = levelScore[level];
}

function resetUserValues() {
    changeProgress(true, level)
    document.getElementById('question-points').textContent = 0;
    level = 0;
    reloadHints(true);
    setScore();
}
