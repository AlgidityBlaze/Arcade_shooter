// ---------------------Змінні---------------------
startW = document.querySelector("#start");
gameW = document.querySelector("#game");
h2 = document.querySelector("#start h2");
startBtn = document.querySelector("#sButton");
lifes = document.querySelector("#lifes");
score = document.querySelector("#score");
audioPlayer = document.querySelector("audio");
soundButton = document.querySelector("#sound img");
gamer = document.querySelector("#player");
// enemy1 = document.querySelector(".enemy.type-1");
// enemy2 = document.querySelector(".enemy.type-2");
// bullet = document.querySelector(".bullet");
// -------------------------------------------------

gamerSkin = "skin_1";

selectSkin1 = document.querySelector("#skin_1");
selectSkin1.onclick = function () {
    selectSkin1.className = "selected";
    selectSkin2.className = "";
    gamerSkin = "skin_1";
}
selectSkin2 = document.querySelector("#skin_2");
selectSkin2.onclick = function () {
    selectSkin1.className = "";
    selectSkin2.className = "selected";
    gamerSkin = "skin_2";
}


// ---------------------Оформлення кнопок-----------
// h2.style.color = "green";
// h2.style.background = "violet";
startBtn.style.background = "green";

// -------------------------------------------------
var lifesCount = 5;
score = document.querySelector("#score span");

//Початок гри за натиском кнопки та присвоєння очків здоров'я
startBtn.onclick = function () {
    startGame();
    
}
// -------------------------------------------------


// -------------Вмикання\Вимикання музики-----------
sound = "off";//"on"
soundButton.onclick = function () {
    if (sound == "off") {
        soundButton.src = "images/sound_on.png";
        audioPlayer.play();
        sound = "on";
    } else {
        soundButton.src = "images/mute_sound.png";
        audioPlayer.pause();
        sound = "off";
    }
}
// -------------------------------------------------

// ------Пересування персонажу вверх або вниз-------
document.onkeydown = function (event) {
    //Перевірка на натиск клавіші W або стрілки вгору та умова при якій гравець не мже вилетіти за верхні межі поля
    if (event.keyCode == 87 || event.keyCode == 38) {
        if (gamer.offsetTop < 50) {
            gamer.style.top = document.querySelector("body").clientHeight + 49 + "px";
        } else {
           gamer.style.top = gamer.offsetTop - 50 + "px"; 
        }
    } 
    //Перевірка на натиск клавіші S або стрілки вниз та умова при якій гравець не мже вилетіти за нижні межі поля
    if (event.keyCode == 83 || event.keyCode == 40) {
        if (gamer.offsetTop > document.querySelector("#app").clientHeight -240) {
        gamer.style.top = document.querySelector("#app").clientHeight - 239 + "px";
        } else {
          gamer.style.top = gamer.offsetTop + 50 + "px";   
        }
    }
       //Перевірка на натиск пробілу для виконання пострілу
    if (event.keyCode == 32) {
        createBullet();
    }
    
}
// -------------------------------------------------


function startGame () {
    gameW.style.display = ("block");
    startW.style.display = ("none");
    gamer.className = gamerSkin; 
    createEnemy();
    // createEnemy2();
    createLifes();
    
}

// --------------------- куля ----------------------
    function createBullet() {
    let bullet = document.createElement("div");
        bullet.className = "bullet";
        bullet.style.top = gamer.offsetTop + 140 + "px";
        bullet.style.left = gamer.offsetLeft + 140 + "px";
        gameW.appendChild(bullet);

        moveBullet(bullet);
}
    
    function moveBullet(bullet) {
        let timerID = setInterval(function () { // let - внутрішня змінна
           // інтервал з функцією польоту кулі та її видаленням за межами поля
           bullet.style.left = bullet.offsetLeft + 10 + "px";
           if (bullet.offsetLeft > document.querySelector("body").clientWidth) { 
               bullet.remove();
               clearInterval(timerID);//очистка таймера
           }
            isBoom1(); 
            
        }, 10) 
    }
// -------------------------------------------------


// ---------------Робота з ворогами-------------
  
    // position = 100;

    function createEnemy() {
        //створення комірки нашого ворога
        let enemy = document.createElement("div"); 
        // присвоєння классу нашій комірці
        enemy.className = "enemy " + typeEnemy(); 
        enemy.style.top = random(100, document.querySelector("#app").clientHeight - 240) + "px";
        // присвоєння дочірнього елементу нашому полю
        gameW.appendChild(enemy); 
        // виклик функції пересування ворога
        moveEnemy(enemy);
}

    function typeEnemy() {
        if (random(1, 2) == 1) {
            return "type-1"
        }
        else {
            return"type-2"
        }
    }

    function moveEnemy(enemy) {
        let timerID = setInterval(function () {
        //лінійне переміщення ворога вліво
          enemy.style.left = enemy.offsetLeft - 10 + "px";
        // якщо ворог вийде за рамки поля то він видаляється і створюється знову
        // та віднімає одне життя
           if (enemy.offsetLeft < -100) {
               enemy.remove();
               die();
               createEnemy();
               clearInterval(timerID);//очистка таймера
          }
          
        }, 50) 
}
  
function isBoom1() {
    let bullet = document.querySelector(".bullet");
    let enemy = document.querySelector(".enemy");

    if (//перевірка зіткнення
        bullet.offsetTop > enemy.offsetTop &&
        bullet.offsetTop < enemy.offsetTop + enemy.clientHeight &&
        bullet.offsetLeft > enemy.offsetLeft) {
        console.dir(enemy)
        createBoom(bullet.offsetTop, bullet.offsetLeft);
        score.innerText = Number(score.innerText) + 1;
        //видалення кулі та ворога при зіткненні
        bullet.remove();
        enemy.remove();
        createEnemy();
        
    }
}

function die() {
    lifesCount = lifesCount - 1;
    if (lifesCount <= 0) {
        endGame();
    }
    createLifes();
}

// -------------------------------------------------

// ---------------Створення вибуху------------------
function createBoom(top, left) {
    let boom = document.createElement("div");
        boom.className = "boom";
        boom.style.top = top -100 + "px";
        boom.style.left = left -100 + "px";

    gameW.appendChild(boom);
    setTimeout ( function() { boom.remove() }, 1000 );

}
// -------------------------------------------------

// ---------------Створення життів------------------
function createLifes() {
    let lifesBlock = document.querySelector("#lifes");
    lifesBlock.innerHTML = "";
    let count = 0
    while (count < lifesCount) {
        let span = document.createElement("span");
        lifesBlock.appendChild(span);
        count = count + 1;
    }
}
// -------------------------------------------------

function random(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function endGame() {
     let scoreBlock = document.querySelector("#end h3 span");
    scoreBlock.innerText = score.innerText;

    gameW.innerHTML = "";
    let endW = document.querySelector("#end");
    endW.style.display = "block";
    let restartButton = document.querySelector("#end button");
    restartButton.onclick = restart;

}

function restart() {
    location.reload();
}

console.dir(lifes);
console.dir(startBtn);
console.dir(score);