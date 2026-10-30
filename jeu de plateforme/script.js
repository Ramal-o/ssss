const game = document.getElementById("game");
const ctx = game.getContext("2d");
let x = 50;
let y = 20;
let vy = 0;
const coinSize = 20;
const keys = {};
const gravity = 0.5;
let onGround = false;
const platforms = [{x : 0, y : 400, w : 2400, h : 50}, {x : 300, y : 250, w : 200, h : 50}, {x : 850, y : 250, w : 200, h : 50}]
const coins = [{x : 300, y : 230 - coinSize}, {x : 330, y : 230 - coinSize}, {x : 360, y : 230 - coinSize}, {x : 390, y : 230 - coinSize}, {x : 420, y : 230 - coinSize}, {x : 450, y : 230 - coinSize}, {x : 480, y : 230 - coinSize}, {x : 550, y : 380 - coinSize}, {x : 580, y : 380 - coinSize}]
let cameraX = 0;
let worldWidth = 2400;
let score = 0;

function draw(){
    ctx.clearRect(0, 0, game.width, game.height)
    ctx.fillStyle = "#000"
    ctx.fillRect(x - cameraX , y, 40, 40)
    ctx.fillStyle = "#215"
    for(let i = 0; i < platforms.length; i++) {
        ctx.fillRect(platforms[i].x - cameraX, platforms[i].y, platforms[i].w, platforms[i].h)

    }
    for (let i = 0; i < coins.length; i++) {
        ctx.fillStyle = "rgb(242, 210, 0)"
        ctx.fillRect(coins[i].x - cameraX , coins[i].y , coinSize, coinSize)
        //ctx.beginPath(ctx.arc(coins[i].x - cameraX, coins[i].y, coins[i].w, coins[i].h))
    }
    ctx.font = "20px Press Start 2P"
    ctx.fillStyle = "#000"
    ctx.fillText("Piece " + score , 20, 30)
}

document.addEventListener("keydown", function(e) {
    keys[e.code] = true 
})
document.addEventListener("keyup", function(e) {
    keys[e.code] = false 
})    


function update() {
    if (keys["ArrowRight"] === true){
        x += 4
    }
    if (keys["ArrowLeft"] === true){
        x -= 4
    }
    for(let i = 0; i < platforms.length; i++){
        if (x < platforms[i].x + platforms[i].w && x + 40 > platforms[i].x && y < platforms[i].y + platforms[i].h && y + 40 > platforms[i].y)  {
            if(keys["ArrowRight"] === true) {
                x = platforms[i].x - 40
            }
            if(keys["ArrowLeft"] === true) {
                x = platforms[i].x + platforms[i].w
            }
        }
    }
    onGround = false
    vy += gravity;
    y += vy
    
    for(let i = 0; i < platforms.length; i++ ){
    if (y + 40 >= platforms[i].y && x < platforms[i].x + platforms[i].w && x + 40 > platforms[i].x && y + 40 - vy <= platforms[i].y) {
        y = platforms[i].y - 40 
        vy = 0 
        onGround = true
    }
    if (y < platforms[i].y + platforms[i].h && x < platforms[i].x + platforms[i].w && x + 40 > platforms[i].x && y - vy >= platforms[i].y + platforms[i].h ) {
        y = platforms[i].y + platforms[i].h
        vy = 0;
    }
    }
    if (onGround === true && (keys["ArrowUp"] || keys["Space"] === true)) {
        vy = -15
    }
    x = Math.min(worldWidth - 40 , Math.max(x , 0) )
    cameraX = x  - game.width / 2 + 20
    cameraX =  Math.min(worldWidth - game.width , Math.max(0 , cameraX));
    console.log(cameraX);
    for(let i = coins.length - 1;i >= 0;i--){
        if (x < coins[i].x + coinSize && x + 40 > coins[i].x && y < coins[i].y + coinSize && y + 40 > coins[i].y) {
        score += 1;     
        coins.splice(i, 1)
        } 
    }
}


function loop() {
    update()
    draw()
    requestAnimationFrame(loop)
}

loop()
