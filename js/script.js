
let list = [
   
    {1: 'Небольшая проверочка, в каком году ты родилась?',2: 4,  3: '1996', 4: '1997', 5: '1998'},

    {1: 'Ну хорошо, а кой день лучше всех на свете?',2: 3,  3: '11', 4: '12', 5: '13', 6:"14"},

    {1: 'Привет кот!', 2:5, 3: 'Привет!', 4: 'Что?', 5: 'Привет мяфт!'},

    {1: 'А когда ты познакомилась с котом?', 2:5, 3: '15 декабря', 4: '17 декабря', 5: '18 декабря', 6: '19 декабря'},

    {1: 'А где мы с тобой познакомились?', 2:5, 3: 'На улице', 4: 'В кафе', 5: 'На цетр инвесте'},

    {1: 'Так, а какое твое истинное имя? :)', 2:5, 3: 'Кот', 4: 'Шмяфт', 5: 'Мяфт'},

    {1: 'Как же оно появилось?', 2:4, 3: 'Был знакомый кот, которого звали Мяфтом', 4: 'Настя решила учить немецкий', 5: 'Случайно, как-то непонятно пришло', 6: "Увидела в интернетах"},

    {1: 'А помнишь нашу первую поездку?', 2:3, 3: 'Дааа, тогда поехали в Москву сдавать вступительные', 4: 'Конечно, мы же тогда на море поехали', 5: 'Да, помню'},
 
    {1: 'Любишь своего кота?)', 2:3, 3: 'Мяф мяф мяф '},
];

/*
let commentList = [
   
    {3: 'Подозрительно, очень подозрительно',4: "Мяф",  5: 'Так Настя, не завали первый вопрос'},

    {3: 'Мяф мяф', 4: "И с каких это пор",  5: 'Мне конечно приятно, но есть лучше', 6: 'Не пугай меня'},

    {3: 'Мяф мяф', 4: "И с каких это пор",  5: 'Мне конечно приятно, но есть лучше', 6: 'Не пугай меня'},

    {3: 'Мяф мяф', 4: "И с каких это пор",  5: 'Мне конечно приятно, но есть лучше', 6: 'Не пугай меня'},

    {3: 'Мяф мяф', 4: "И с каких это пор",  5: 'Мне конечно приятно, но есть лучше', 6: 'Не пугай меня'},

];
*/


let ans = document.querySelector('.answer');   
    comment = document.querySelector('.comment');   
    img = document.querySelector('.forImage');     
    tmpImg = document.querySelector('.imgFor');        //блок ответов
    question = document.querySelector('.question');             //вопрос
    nextBtn = document.querySelector('.next');                  //кнопка следующего вопроса
    endBtn = document.querySelector('.end');                    //кнопка окончания теста
    parentQuestion = document.getElementById('question');
    progresbar = document.getElementById('progressbar');        //прогресс бар
    startBlock = document.querySelector('.start-quiz');         //стартовый блок
    startBtn = document.querySelector('.start-btn');            //кнопка старта
    //checkbox = document.querySelector('.form-check-input');     //выбор выводить ответ стразу или только в конце теста
    countAnswer = 0;                                            //количесство ответов в текущем вопросе
    tmpTrueAnswer = 0;                                          //количество верных ответов в текущем вопросе
    arr = [];                                                   //массив верных ответов в текущем вопросе


    errorAnswer = 0;

    step = 100/list.length;
    count = 0;
    counter = 0;
    nextQuest = false;
    trueAnswer = 0;
    nextBtn.style.display = 'none';
    endBtn.style.display = 'none';
    checkboxValue = false;
    


startBtn.addEventListener('click', function(){
    checkboxValue = true;
    let bd = document.querySelector('.blockMain');  
    bd.removeChild(startBlock);
    //document.body.removeChild(startBlock);
    constructorQuestions();
   
    answer = document.querySelectorAll('.well');
    answerOnQuestion();

});

//Создает форму вопроса
function constructorQuestions(){
    //document.body.style.background = 'url(img/' + count + '.jpg)';
    for (var key in list[count]) {

        if(counter == 0){
            question.innerHTML = list[count][key];
        }
        if(counter > 1){
            let div = document.createElement('div');
            div.classList.add('well');
            div.id = counter;
            div.innerHTML = list[count][key];
            ans.appendChild(div);
        }
     
        counter++;
      }

     


      img.removeChild(tmpImg);

      tmpImg = document.createElement('img');

      if(count == 0){
        tmpImg.src = "\img\\1.jpg";
      } else if (count == 1){
        tmpImg.src = "\img\\2.jpg";
      }else if (count == 2){
        tmpImg.src = "\img\\3.jpg";
      }else if (count == 3){
        tmpImg.src = "\img\\4.jpg";
      }else if (count == 4){
        tmpImg.src = "\img\\5.jpg";
      }else if (count == 5){
        tmpImg.src = "\img\\6.jpg";
      }else if (count == 6){
        tmpImg.src = "\img\\7.jpg";
      }else if (count == 7){
        tmpImg.src = "\img\\8.jpg";
      }else if (count == 8){
        tmpImg.src = "\img\\9.jpg";
      }else if (count == 9){
        tmpImg.src = "\img\\10.jpg";
      }

      tmpImg.width = "400";
      tmpImg.height = "400";
      img.appendChild(tmpImg);


      comment.innerHTML = "";
      nextQuest = false;
      countAnswer = list[count][2].toString().length;
       arr = list[count][2].toString().split('');
}
   

let answer = document.querySelectorAll('.well');
answerOnQuestion();


function answerOnQuestion(){

answer.forEach(function(item) {

    item.addEventListener('click', function(e){
        console.log(nextQuest)
        let target = e.target;

        if(!nextQuest && (target.style.background == '')){

            if(checkboxValue){
        for(let elem = 0; elem < arr.length; elem++){

            console.log(target.id)
            console.log(arr[elem])

            if(target.id == (arr[elem]-1)){ 
                target.style.background = '#008000';
               // comment.innerHTML = commentList[count][target.id-0+1];
                tmpTrueAnswer++;
                countAnswer--;
                break;
            } else {
                target.style.background = '#ff0000';
               // comment.innerHTML = commentList[count][target.id-0+1]
                errorAnswer++;
               

            }
        }
       
        //console.log(countAnswer);
        
    if(countAnswer == 0){
        nextQuest = true;
        touchElem = 0;
        if(tmpTrueAnswer == list[count][2].toString().length){
            trueAnswer++;
            tmpTrueAnswer = 0;
        }
        if(count == list.length-1){
            endBtn.style.display = '';
        } else {
            nextBtn.style.display = '';
        }
    }

        } else {
            
        for(let elem = 0; elem < arr.length; elem++){
            if(target.id == arr[elem]-1){ 
                target.style.background = '#0000ff';
                tmpTrueAnswer++;
                touchElem = arr[elem]-1;
                break;
            } else {
                target.style.background = '#0000ff';
                console.log(target);  
            }
        }
       
        //console.log(countAnswer);
        countAnswer--;
    if(countAnswer == 0){
        nextQuest = true;
        touchElem = 0;
        if(tmpTrueAnswer == list[count][2].toString().length){
            trueAnswer++;
            tmpTrueAnswer = 0;
        }
        if(count == list.length-1){
            endBtn.style.display = '';
        } else {
            nextBtn.style.display = '';
        }
    }
         
        }}
    });
});
}
 nextBtn.addEventListener('click', function(){
    count++;
    counter = 0;
    answer.forEach(function(item) {
        ans.removeChild(item);
    })


    constructorQuestions();
    answer = document.querySelectorAll('.well');
    answerOnQuestion();
    nextBtn.style.display = 'none';
    nextQuest = false;
    progresbar.style.width = step*count + "%";
 });

 endBtn.addEventListener('click', function(){
    answer.forEach(function(item) {
        ans.removeChild(item);
    });

    parentQuestion.removeChild(question);

    div = document.createElement('div');
    div.classList.add('well');
    div.id = counter;
    div.innerHTML = "Мяф мф Люблю тебя мой мчфт. Ты самая лучшая! С Днем рождения! " +  "<iframe width='560' height='315' src='https://youtu.be/6T9_gVIiW14' frameborder='0' allowfullscreen> </iframe>"
    ans.appendChild(div);
    endBtn.style.display = 'none';
    progresbar.style.width = step*(count+1) + "%";
 })

 




