var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var bots = []; //Массив травоядных
var age = 0; //Время существования мира. 1 - 10 милисекунд, 100 - 1 секунда
var height = canvas.height; //Максимальная высота
var width = canvas.width; //Максимальная ширина
var countLiveEnemy = 0; // количество существующих ботов
var breedingEnergy = 2000; //количество энергии для размноженияы
var season = 0; // время года 0 - лето, 1 - осень, 2 - зима, 3 - весна

let point = {  
    x: 0,
    y: 0
};

//Отрисвка всех элементов Canvas на карте
function drawBall() {
    //Рисуем зеленые шарики
    for (var i = 0; i < bots.length; i++) {
        
        //боты
        ctx.beginPath();
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(bots[i].x, bots[i].y, 5, 5);
        ctx.closePath();

        //время года
        ctx.beginPath();
        
       
        switch (season){
            case 0: 
            ctx.fillStyle = "#ff0000";
            break;
            case 1:
            ctx.fillStyle = "#FFD700"; 
            break;
            case 2: 
            ctx.fillStyle = "#00FFFF";
            break;
            case 3:
            ctx.fillStyle = "#7FFF00"; 
            break;  
        }
        ctx.fillRect(1450, 650, 50, 50);
        ctx.closePath();

    }
}

//циклы мира
function world(){
    age++;

    if(age % 2000 == 0){
        if(season != 3){
            season++;
        } else {
            season = 0;
        }
    }
}


//Жизненный цекл зеленых шариков
function liveGreenEnemy() {

    for (var i = 0; i < bots.length; i++) {

        bots[i].age++;
        photosynthesis(bots[i]);


        //Количество энергии отнимаемое каждый ход
        if (bots[i].energy > 0) {
            bots[i].energy -= 3;
        }

        if(bots[i].energy  >= breedingEnergy){
            bots[i].energy -=1000;
            breeding(bots[i]);
        }

        //bots[i].x +=5;
        //Смерть
        if (bots[i].energy <= 0) {
            bots.splice(i, 1);
        }
    }
   
}

//Начальные травоядные
function getGreenEnemy() {
    for (var i = 0; i < 13; i++) {
      let r = getRandomInt(5, 15);
      createEnemy(~~(Math.trunc(Math.random() * width/5)*5), ~~(Math.trunc(Math.random() * height/5)*5),  0);
    }
}


function createEnemy(_x, _y, _generation,){
    if( _x > 0 && _y > 0 &&  _x < width && _y < height){
    var newGreenEnemy = {
        x: _x,
        y: _y,
        number: countLiveEnemy,
        generation: _generation,
        age: 0,
        energy: 0
    };
    countLiveEnemy++;
    newGreenEnemy.energy = 1000;
    bots.push(newGreenEnemy);
}
}

function photosynthesis(a){
    let photosynthesis = 0;
    switch (season){
        case 0: 
        photosynthesis = 2;
        break;
        case 1:
        photosynthesis = 0;  
        break;
        case 2: 
        photosynthesis = -2;
        break;
        case 3:
        photosynthesis = 1;  
        break;  
    }
    a.energy += Math.trunc((700 - a.y)/50) + photosynthesis;

}

function breeding(a){
    let x = a.x;
        y = a.y;
        r = getRandomInt(1,8);
        b = true;

        switch (r) {
            case 1:
              y -= 5;
              break;
            case 2:
              y -= 5;
              x += 5;
                break;
            case 3:
              x+=5;
              break;
            case 4:
                x+=5;
                y+=5;
                break;
            case 5:
              y+=5;
              break;
            case 6:
              x-=5;
              y+=5;
              break;
            case 7:
              x-=5;
              break;
            case 8:
                x-=5;
                y+=5;
                break;
          }
          
        for (var i = 0; i < bots.length; i++) {
            if(bots[i].x == x && bots[i].y == y){
                b = false;
                break;
            }
        }

        if(b){
            createEnemy(x, y,  a.generation+1);
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
        //здесь код нажатия 
    }
);


//Повторяющаяся функция для работы игрыы
function draw() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    liveGreenEnemy();
    world();
    drawBall();


}

getGreenEnemy();
setInterval(draw, 1); //Повторяет функцию draw каждые 10 милисекунд