let canvas = document.getElementById("snake")
let context = canvas.getContext("2d")
let box = 32    //cada quadrado com 32px

// variável para criar a cobrinha
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

//variável para movimento da cobrinha
let direction = "right"

//variável para comida
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,    //Math.floor (retira a parte flutuante do número)
    y: Math.floor(Math.random() * 15 + 1) * box     //Math.random (informa um número real aleatório de 0 a 1)
}

function criarBG(){
    context.fillStyle = "gray";
    context.fillRect(0,0,16*box,16*box);    //posição x, y, altura, largura
}

function criarCobrinha(){
    for(i=0; i<snake.length; ++i){
        context.fillStyle = "darkred";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//desenhar comida
function drawFood(){
    context.fillStyle ="darkorange";
    context.fillRect(food.x, food.y, box, box);
}

//quando clicar em algo esse addEventListener irá chamar a função update
document.addEventListener('keydown', update);

//a cobra não pode voltar para a posição imediatamente oposta pois teria duas cabeças
function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";

}

//função que vai atualizar o jogo de tempos em tempos para criar movimento 
function iniciarJogo(){

//lógica com plano cartesiano. Se a cobra atinge uma borda ela é jogada pra oposta
/*    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 * box && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 * box && direction == "up") snake[0].y = 16 * box; */
    if(snake[0].x > 15 * box){
        clearInterval(jogo); //parando a função jogo
            alert("Game Over");
    }if(snake[0].x < 0 * box){
        clearInterval(jogo); //parando a função jogo
            alert("Game Over");
    }if(snake[0].y > 15 * box){
        clearInterval(jogo); //parando a função jogo
            alert("Game Over");
    }if(snake[0].y < 0 * box){
        clearInterval(jogo); //parando a função jogo
            alert("Game Over");
    }

//criando for para definir fim do jogo ao colidir no corpo da cobra
    for(i=1; i<snake.length; ++i){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo); //parando a função jogo
            alert("Game Over");
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();
    //setando posição x, y para um ponto de partida
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    //mudando a comida de lugar depois que pegamos ela e aumentando o tamanho da cobra
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();    //retirar último elemento do array
    }
    else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }

    

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100); //passando intervalo de 100ms para a função iniciar jogo
//                                         que será renovada sem deixar o jogo travar.
