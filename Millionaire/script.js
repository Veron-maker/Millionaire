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

let key = [3, 4, 4, 2, 4, 3, 4, 2, 1, 3, 3, 4, 1, 3, 3];

let level = 0;
let score = 0;

document.querySelector('.button-start').addEventListener('click', function() {
    document.querySelector('.answers').style.display = "block";
    document.querySelector('.home').style.display = "none";
    document.querySelector('.game').style.display = "block";
});

document.querySelector('.button-exit').addEventListener('click', function() {
    resetUserValues();
    document.querySelector('.answers').style.display = "block";
    document.querySelector('.home').style.display = "block";
    document.querySelector('.game').style.display = "none";
    show(level);
});

document.querySelector('.button-restart').addEventListener('click', function() {
    resetUserValues();
    document.querySelector('.answers').style.display = "block";
    show(level);
});

function show(level) {
    document.getElementById('question-points').textContent = "100";
    let answerBox = document.getElementsByClassName('answer');

    document.getElementById('question-line').textContent = questions[level];

    for (let i = 0; i < answerBox.length; i++) {
        answerBox[i].childNodes[1].textContent = answers[level * 4 + i];
    }
}

show(level);

let answerButtons = document.getElementsByClassName('button-answer');
for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].addEventListener('click', function() {
        returnRightForm(answerButtons[i], "url('resourses/buttons/game/answer/answer-wait.png') no-repeat");
        buttonLock(true);
        let pickedButton = answerButtons[i];
        let answerNum = parseInt(pickedButton.id[3]);
        let rightAnswer;
        let error = false;
        for (let j = 0; j < answerButtons.length; j++) {
            if (parseInt(answerButtons[j].id[3]) === key[level]){
                rightAnswer = answerButtons[j];
                break;
            }
        }

            if (answerNum === key[level]) {
                setTimeout(()=> {
                level++;
                setScore(score + 100);
                returnRightForm(pickedButton,"url('resourses/buttons/game/answer/answer-right.png') no-repeat");
                }
                    , 2000);
                setTimeout(()=>{
                if (level != 15) {
                    show(level);
                }
                else {
                    gameOver();
                }},4000);
            }
            else {
                setTimeout(()=> {
                returnRightForm(pickedButton, "url('resourses/buttons/game/answer/answer-error.png') no-repeat");
                returnRightForm(rightAnswer,"url('resourses/buttons/game/answer/answer-right.png') no-repeat");
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
    document.querySelector('.answers').style.display = "none";
    document.getElementById('question-line').textContent = "Ваш счет: " + score.toString();
}

function setScore(points) {
    score = points;
    document.getElementById('user-points').textContent = points;
}

function resetUserValues() {
    score = 0;
    level = 0;
    setScore(score);
}