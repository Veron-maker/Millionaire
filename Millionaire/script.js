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
        let answerNum = parseInt(answerButtons[i].id[3]);

        if (answerNum == key[level]) {
            level++;
            setScore(score + 100);
            if (level != 15) {
                show(level);
            } else {
                gameOver();
            }
        } else {
            gameOver();
        }
    });
}

function gameOver() {
    console.log("game over");
    document.querySelector('.answers').style.display = "none";
    document.getElementById('question-line').textContent = "Ваш счет: " + score.toString();
}

function setScore(points) {
    score = points;
    document.getElementById('points').textContent = points;
}

function resetUserValues() {
    score = 0;
    level = 0;
    setScore(score);
}