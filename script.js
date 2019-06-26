var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var greenEnemy = []; //Массив травоядных
var food = []; //Массив еды
var maxEnemy = 0; //Максимальное количество животных когда-либо на карте
var maxFood = 0; //Максимальное количество еды когда-либо на карте
var age = 0; //Время существования мира. 1 - 10 милисекунд, 100 - 1 секунда
var createEnemyBottom = false; //Создание щелчком мышы травоядных
var createFoodBottom = false; //Создание щелчком мыши растений
var height = canvas.height - 150; //Максимальная высота
var width = canvas.width - 200; //Максимальная ширина
var indexEnemy = -1; //Статистику какого животного отразить на экране
var countLiveEnemy = 0; //Сумма когда-либо живущих животных     
var pause = false; //Пауза 
var speedDel = 500 //Скорость размножения растениц
var xPauseBottom = width+5;
var yPauseBottom = 420;
var xInstructionBottom = width+5;
var yInstructionBottom = 440;

let point = {  
    x: 0,
    y: 0
};

//Отрисвка всех элементов Canvas на карте
function drawBall() {
    //Рисуем зеленые шарики
    for (var i = 0; i < greenEnemy.length; i++) {
        ctx.beginPath();
        ctx.arc(greenEnemy[i].x, greenEnemy[i].y, greenEnemy[i].r, 0, Math.PI * 2);
        ctx.fillStyle = "#DEB887";
        ctx.fill();
        ctx.closePath();
    }
    //Рисуем еду
    for (var i = 0; i < food.length; i++) {
        ctx.beginPath();
        ctx.arc(food[i].x, food[i].y, food[i].r, 0, Math.PI * 2);
        ctx.fillStyle = "#006400";
        ctx.fill();
        ctx.closePath();
    }
    
    ctx.font = "italic 14pt Arial";
    ctx.fillStyle = "blue";
    ctx.fillText("Пауза", xPauseBottom, yPauseBottom);

    ctx.fillText("Инструкции", xInstructionBottom, yInstructionBottom);

    //Рисуем кнопку для животных
    ctx.font = "italic 11pt Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Создать животное ", width + 50, height + 40);
    if (!createEnemyBottom) {
        ctx.beginPath();
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(width + 50, height + 50, 100, 50);
        ctx.closePath();
    } else {
        ctx.beginPath();
        ctx.fillStyle = "#00ff00";
        ctx.fillRect(width + 50, height + 50, 100, 50);
        ctx.closePath();
    }

        if(pause){
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(width, 0, 2, height);
        ctx.fillRect(0, height, width, 2);
        } else {
            ctx.fillStyle = "#00ff00";
            ctx.fillRect(width, 0, 2, height);
            ctx.fillRect(0, height, width, 2);
        }

    //Кнопка растений
    ctx.font = "italic 11pt Arial";
    ctx.fillStyle = "#000000";  
    ctx.fillText("Создать растение ", width + 50, height - 40);
    if (!createFoodBottom) {
        ctx.beginPath();
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(width + 50, height - 30, 100, 50);
        ctx.closePath();
    } else {
        ctx.beginPath();
        ctx.fillStyle = "#00ff00";
        ctx.fillRect(width + 50, height - 30, 100, 50);
        ctx.closePath();
    }

    if (indexEnemy != -1) {
        ctx.fillStyle = "#00F";
        ctx.strokeStyle = "#F00";
        ctx.font = "italic 11pt Arial";

        for (var i = 0; i < greenEnemy.length; i++) {
            if (indexEnemy == greenEnemy[i].number) {
                ctx.fillText("Радиус: " + greenEnemy[i].r, width + 2, 30);
                ctx.fillText("Скорость:  " + greenEnemy[i].speed, width + 2, 60);
                ctx.fillText("Возраст: " + greenEnemy[i].age, width + 2, 90);
                ctx.fillText("Голод: " + greenEnemy[i].hungry, width + 2, 120);
                ctx.fillText("Здоровье: " + greenEnemy[i].xp, width + 2, 150);
                ctx.fillText("Поколение: " + greenEnemy[i].generation, width + 2, 180);
                ctx.fillText("Начальный голод: " + greenEnemy[i].maxHungry, width + 2, 210);
                ctx.fillText("Номер : " + greenEnemy[i].number, width + 2, 240);
                ctx.beginPath();
                ctx.arc(greenEnemy[i].x, greenEnemy[i].y, greenEnemy[i].r, 0, Math.PI * 2);
                ctx.fillStyle = "#ff0000";
                ctx.fill();
                ctx.closePath();
                //ctx.fillText(" радиус: " + greenEnemy[i].r , width+2, 270);
                /* document.getElementById('info').innerHTML="Зеленый " + " радиус: " + greenEnemy[i].r + " скорость:  "  
                 + greenEnemy[i].speed+ " возраст: " + greenEnemy[i].age + " голод: " + greenEnemy[i].hungry+ " здоровье: " + greenEnemy[i].xp 
                 + " поколение: " + greenEnemy[i].generation + " Начальный голод: " + greenEnemy[i].maxHungry;
                 break;*/
            }
        }
    }

    ctx.fillStyle = "#00F";
    ctx.strokeStyle = "#F00";
    ctx.font = "italic 14pt Arial";
    ctx.fillText("Количество животных: " + greenEnemy.length + " количество растений:  " + food.length + " Максимум животных: " +
        maxEnemy + " " + " Максимум растений: " + maxFood + "   Возраст: " + age, 0, height + 140);
}

//Жизненный цекл зеленых шариков
function liveGreenEnemy() {

    for (var i = 0; i < greenEnemy.length; i++) {
    
        if (greenEnemy[i].hungry < greenEnemy[i].maxHungry && food.length > 0) {
            var x, y, index, min = 10000;
            for (var j = 0; j < food.length; j++) {
                var c = greenEnemy[i].x - food[j].x;
                var a = greenEnemy[i].y - food[j].y;
                var b = Math.sqrt(c * c + a * a);
                if (min > b) {
                    min = b;
                    index = j;
                }
            }
            var dx = food[index].x - greenEnemy[i].x;
            var dy = food[index].y - greenEnemy[i].y;

            var u = Math.atan(dy / dx);

            if (dx >= 0) {
                greenEnemy[i].x += greenEnemy[i].speed * Math.cos(u);
                greenEnemy[i].y += greenEnemy[i].speed * Math.sin(u);
            } else {
                greenEnemy[i].x += -greenEnemy[i].speed * Math.cos(u);
                greenEnemy[i].y += -greenEnemy[i].speed * Math.sin(u);
            }

        } /*else if((point.x == 0 && point.y == 0) || (greenEnemy[i].x>point.x-1 && greenEnemy[i].x < point.x+1 && greenEnemy[i].y > point.y-1 && greenEnemy[i].y < point.y+1)){
                point = getRandomPoint();
                

        } else {
            console.log(111);
            var dx = point.x - greenEnemy[i].x;
            var dy = point.y - greenEnemy[i].y;

            var u = Math.atan(dy / dx);

            if (dx >= 0) {
                greenEnemy[i].x += greenEnemy[i].speed * Math.cos(u);
                greenEnemy[i].y += greenEnemy[i].speed * Math.sin(u);
            } else {
                greenEnemy[i].x += -greenEnemy[i].speed * Math.cos(u);
                greenEnemy[i].y += -greenEnemy[i].speed * Math.sin(u);
            } 
        }*/

        greenEnemy[i].age++;

        //Питание
        for (var j = 0; j < food.length; j++) {
            var c = greenEnemy[i].x - food[j].x;
            var a = greenEnemy[i].y - food[j].y;
            var b = c * c + a * a;
            if (greenEnemy[i].r + food[j].r >= Math.sqrt(b)) {
                if (greenEnemy[i].hungry < greenEnemy[i].maxHungry * 3) {
                    greenEnemy[i].hungry += food[j].food;
                }
                food.splice(j, 1);
            }
        }

        if (greenEnemy[i].hungry > 0) {
            greenEnemy[i].hungry--;
        }
        if (greenEnemy[i].hungry <= 0) {
            greenEnemy[i].xp--;
        }

        //Размножение
        if (greenEnemy[i].age % 1000 == 0 && greenEnemy.length < 1000 && greenEnemy[i].hungry > greenEnemy[i].maxHungry * 0.8 && (getRandomInt(1, 100) > 80)) {

            if (getRandomInt(1, 100) == 1) {
                r = getRandomInt(5, 15);
                createEnemy(greenEnemy[i].x + greenEnemy[i].r * 2.5 * Math.cos(Math.random() * 2 * 3.14), greenEnemy[i].y + greenEnemy[i].r * 2.5 * Math.sin(Math.random() * 2 * 3.14),
                r, getRandomInt(800, 1200), greenEnemy[i].generation + 1,getRandomFloat(0.3, 0.5)+ 4 / r - 0.3, 500 + r * 10);
            } else {
              
                createEnemy(greenEnemy[i].x + greenEnemy[i].r * 2.5 * Math.cos(Math.random() * 2 * 3.14), greenEnemy[i].y + greenEnemy[i].r * 2.5 * Math.sin(Math.random() * 2 * 3.14),
                greenEnemy[i].r, greenEnemy[i].maxHungry, greenEnemy[i].generation + 1, greenEnemy[i].speed, 500 + r * 10);

            }
        }
        //Смерть
        if (greenEnemy[i].xp < 0) {
            if (getRandomInt(1, 3) == 1) {
                var newFood = {
                    x: greenEnemy[i].x,
                    y: greenEnemy[i].y,
                    r: getRandomInt(1, 5),
                    food: 0,
                    age: 0,
                    generation: 0
                };
                newFood.food = newFood.r * 100 + getRandomInt(50, 100);
                food.push(newFood);
            }
            greenEnemy.splice(i, 1);
            if (greenEnemy.length == 1) {
                greenEnemy[0].xp += 3000;
            }
        }
    }
   
}

//Жизненный цикл растения
function liveFood() {
    for (var i = 0; i < food.length; i++) {
        food[i].age++;
        if (food[i].age % speedDel == 0) {

            createFood(food[i].x + food[i].r * 2.5 * Math.cos(Math.random() * 2 * 3.14),food[i].y + food[i].r * 2.5 * Math.sin(Math.random() * 2 * 3.14), food[i].r, food[i].food,0,food[i].generation + 1);
            
        }
    }
    //Случайное создание обычного растения
    if (getRandomInt(1, 1000) == 1) {
        r = getRandomInt(3, 5);
        createFood(~~(Math.random() * width), ~~(Math.random() * height), r, r * 100 + getRandomInt(50, 100));
    }
    
//Случайное создание большого растения
    if (getRandomInt(1, 5000) == 1) {
        r = getRandomInt(6, 15)
        createFood(~~(Math.random() * width), ~~(Math.random() * height), r, r * 100 + getRandomInt(50, 100));
    }
    
}

//Начальные травоядные
function getGreenEnemy() {
    for (var i = 0; i < 3; i++) {
      let r = getRandomInt(5, 15);
      createEnemy(~~(Math.random() * width), ~~(Math.random() * height), r, getRandomInt(800, 1200), 0, getRandomFloat(0.3, 0.5) + 4 / r- 0.3,500 + r * 10);
    }
}

//Начальные растения
function getFood() {
    for (var i = 0; i < 25; i++) {
        let r = getRandomInt(3, 5);
        createFood(~~(Math.random() * width), ~~(Math.random() * height), r, r * 100 + getRandomInt(50, 100), 0 , 0);
    }
}

function createFood(_x, _y, _r, _food, _age = 0, _generation = 0){
    if( _x > 0 && _y > 0 &&  _x < width && _y < height){
    var newFood = {
        x: _x,
        y: _y,
        r: _r,
        food:  _food,
        age: _age,
        generation: _generation
    };
    let coord = true; 
    for(j = 0; j < food.length;j++){
        if(newFood.x > food[j].x -(food[j].r*1.1+newFood.r) && newFood.x < food[j].x + food[j].r*1.1+newFood.r && newFood.y > food[j].y - (food[j].r*1.1+newFood.r) && newFood.y < food[j].y + food[j].r*1.1+newFood.r){

             coord = false;   
        }
    }
        if(coord){
        food.push(newFood);
       }}}

function createEnemy(_x, _y, _r, _maxHungry, _generation, _speed, _xp){
    if( _x > 0 && _y > 0 &&  _x < width && _y < height){
    var newGreenEnemy = {
        x: _x,
        y: _y,
        number: countLiveEnemy,
        r: _r,
        hungry: 0,
        maxHungry: _maxHungry,
        xp: _xp,
        generation: _generation,
        speed: _speed,
        age: 0
    };
    countLiveEnemy++;
    newGreenEnemy.hungry = newGreenEnemy.maxHungry;;
    greenEnemy.push(newGreenEnemy);
}
}

//Получить рандомную точку холста
function getRandomPoint(){
    return newPoint = {
        x:getRandomInt(0, width),
        y:getRandomInt(0, height)
    }
}
//Создать рандомное целое число от и до включительно
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Создать рандомное дробное число от и до
function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

//Обработка нажатий на элемент Canvas: животные, растения, кнопки
canvas.addEventListener('mouseup', function (e) {

   

    var x = e.pageX - e.target.offsetLeft,
        y = e.pageY - e.target.offsetTop;


         //Паузка
    if (x > xPauseBottom && x < xPauseBottom+40 && y > yPauseBottom-15 && y < yPauseBottom+10){
 
     console.log(x + '  ' + y);
        pause = !pause;
   
     }

     if (x > xInstructionBottom && x < xInstructionBottom+100 && y > yInstructionBottom-10 && y < yInstructionBottom+20){
 
        alert("Чтобы получить статистику по существу нажмите на существо            Пауза - поставить игру на паузу                                                 "+
        "   Красные кнопки создать - создают соответсвенно животное или растение нажатием левой кнопки мыши по карте");
      
        }
      
    // width+50, height+50, 100, 50
    //Обработка нажатия на кнопку создания новых существ
    if (x > width + 50 && x < width + 150 && y > height + 50 && y < height + 100) {
        createEnemyBottom = !createEnemyBottom;
        createFoodBottom = false;
        return;
    }
    //width+50, height-30, 100, 50
    if (x > width + 50 && x < width + 150 && y > height - 30 && y < height + 20) {
        createFoodBottom = !createFoodBottom;
        createEnemyBottom = false;
        return;
    }


    if (createEnemyBottom) {
        r = getRandomInt(5, 15);
        createEnemy(x, y,r,getRandomInt(800, 1200),0,getRandomFloat(0.3, 0.5) + 4 / r - 0.3, 500+r*10)
       

    } else if (createFoodBottom) {
        r = getRandomInt(3, 5);
        createFood(x, y, r, r* 100 + getRandomInt(50, 100),0,0)
    } else {
        var x = e.pageX - e.target.offsetLeft,
            y = e.pageY - e.target.offsetTop;

        for (var i = 0; i < greenEnemy.length; i++) {
            if ((x - greenEnemy[i].x) * (x - greenEnemy[i].x) + (y - greenEnemy[i].y) * (y - greenEnemy[i].y) <= greenEnemy[i].r * greenEnemy[i].r + greenEnemy[i].r * 5) {
                indexEnemy = greenEnemy[i].number;
                break;
            }
        }
    }
});

function Statistic() {
    age++;
    if (maxEnemy < greenEnemy.length) {
        maxEnemy = greenEnemy.length;
    }
    if (maxFood < food.length) {
        maxFood = food.length;
    }
}

function LifeLand(){
     //Случайное появление шарика
     if(getRandomInt(1,13000) == 1 && greenEnemy.length == 0){
        let r = getRandomInt(5, 15);
        createEnemy(~~(Math.random() * width), ~~(Math.random() * height), r, getRandomInt(800, 1200), 0, getRandomFloat(0.3, 0.5) + 4 / r- 0.3,500 + r * 10);
    }
}
//Повторяющаяся функция для работы игрыы
function draw() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    if(!pause){
        if(greenEnemy.length != 0){
            liveGreenEnemy();
        }
     LifeLand();
    liveFood(); 
    Statistic();
}
    console.log(indexEnemy);
}

getGreenEnemy();
getFood();
setInterval(draw, 5); //Повторяет функцию draw каждые 10 милисекунд