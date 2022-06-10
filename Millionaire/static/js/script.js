let questions = ['Что из этого не является косметическим средством?',
'Кто, в конце концов, скушал Колобка?',
'Какой шахматной фигуры не существует?',
'Что означает буква «О» в аббревиатуре ОРТ?',
'Главный герой в романе Ф. И. Достоевского «Преступление и наказание»',
'В состав любого органического вещества входит…',
'Какое слово здесь лишнее?',
'Как назывался самый младший гражданский чин, присваивавшийся согласно Табели о рангах?',
'Кто изобрел громоотвод?',
'Как в России в 15-17вв. назывались феодально-зависимые люди, не имевшие своего хозяйства, жившие и работавшие во дворах крестьян или посадских людей?',
'В каком городе находится штаб-квартира Microsoft?',
'При каком правителе к России была присоединена территория Финляндии?',
'Ричард Львиное Сердце был пленен во время',
'Известно, что в кириллице многие буквы имели и цифровое значение. Чему равна буква К (како)?',
'Кто такой «молотоглав»?'];

let answers = ['Помада','Татуировка','Крем','Пудра',  
'Дед','Баба','Заяц','Лиса', 
'Пешка','Конь','Король','Дама', 
'Олигархическое','Объективное','Общественное','Однообразное', 
'Расторгуев','Чикатило','Тумбочкин','Раскольников', 
'кислород','углерод','водород','азот', 
'Автор','Товар ','Отвар','Ворот', 
'Синодский регистратор','Провинциальный секретарь','Коллежский регистратор','Кабинетский регистратор', 
'Франклин','Рузвельт','Вашингтон','Линкольн', 
'Дворовые','Захребетники','Нахлебники','Бестягольные', 
'Нью-Йорк','Ричмонд','Новый Орлеан','Сиэтл', 
'Петр I','Екатерина II','Павел I','Александр I', 
'крестового похода','столетней войны','войны алой и белой розы','войны за независимость', 
'10','20','70','90', 
'Рыба','Птица','Змея','Насекомое'];

let saveLevels = [5, 10, 15]
let levelScore = ['0', '1 000', '3 000', '5 000', '10 000', '20 000', '35 000', '50 000', '70 000', '100 000', '150 000',
'250 000', '400 000', '600 000', '1 000 000', '2 000 000']
let key = [3, 4, 4, 2, 4, 3, 4, 2, 1, 3, 3, 4, 1, 3, 3];
var rightAnswer;
let level = 0;




document.querySelector('.button-restart').addEventListener('click', function() {
    resetUserValues();
    document.querySelector('.answers').style.display = "block";
    show(level);
});


function show(level) {
    let answerBox = document.getElementsByClassName('answer');
    if (level > 0) {
        document.querySelector('.answers').style.display = "block";
        document.querySelector('.game').style.display = "none";
        document.querySelector('.score').style.display = "block";
    }
    document.getElementById('question-line').textContent = questions[level];

    for (let i = 0; i < answerBox.length; i++) {
        answerBox[i].childNodes[1].textContent = answers[level * 4 + i];
    }

    if (level > 0) {
        setTimeout(() => {
            document.querySelector('.answers').style.display = "block";
            document.querySelector('.game').style.display = "block";
            document.querySelector('.score').style.display = "none";
        }, 2000);
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
            if (answerNum === key[level]) {
                changeProgress(false, level)
                setTimeout(()=> {
                level++;
                returnRightForm(pickedButton,"url('../resourses/buttons/game/answer/answer-right.png') no-repeat");
                }
                    , 2000);
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
                }},4000);
            }
            else {
                setTimeout(()=> {
                returnRightForm(pickedButton, "url('../resourses/buttons/game/answer/answer-error.png') no-repeat");
                returnRightForm(rightAnswer,"url('../resourses/buttons/game/answer/answer-right.png') no-repeat");
                error = true;
                }
                    ,2000)
                setTimeout(()=> {
                    gameOver()
                },4000)
            }

            setTimeout(()=>{
                buttonLock(false);
                returnOldForm(pickedButton)
                if (error)
                    returnOldForm(rightAnswer);
            }, 4000)
    })
}


function deleteTwoIncorrectAnswer(){
    console.log(1)
    let rightNumber = parseInt(rightAnswer.id[3]);
    let lastNumber = -1;
    let counter = 0;
    while (true) {
        let number = Math.floor(Math.random() * 4) + 1;
        if (number !== rightNumber && lastNumber !== number){
            document.getElementById(`answer${number}`).textContent = "";
            counter++;
            lastNumber = number;
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
    addAnimationHints("hall", () => {console.log(3)}, reload);
    addAnimationHints("call", ()=>{console.log(2)}, reload);
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
        if (parseInt(answerButtons[i].id[3]) === key[level]) {
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
    document.getElementById('question-line').textContent = "Ваш счет: " + result;
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