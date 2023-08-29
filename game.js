function load_image(){
    //player,virus,gem
    enemy_image=new Image;
    enemy_image.src="photos/v1.png";
    
    player_image=new Image;
    player_image.src="photos/superhero.png";
    
    gem_image=new Image;
    gem_image.src="photos/gemm.png";
    
}
function init(){
    canvas=document.getElementById("mycanvas");
    console.log(canvas);
    W=700;
    H=400;
    
    canvas.width=W;
    canvas.height=H;
    
    //create a context
    
    pen=canvas.getContext('2d');
    console.log(pen);
    game_over=false;
    
     e1={
        x:150,
        y:50,
        w:60,
        h:60,
        speed:10 
    };
    e2={
        x:250,
        y:90,
        w:60,
        h:60,
        speed:20 
    }; 
    e3={
        x:350,
        y:60,
        w:60,
        h:60,
        speed:30 
    }; 
    
    enemy=[e1,e2,e3];
    
    player={
        x:20,
        y:H/2,
        w:60,
        h:60,
        speed:20,
        moving:false,
        health:100
    };
    
    gem={
        x:W-100,
        y:H/2,
        w:60,
        h:60
       
    }
    
    //listen to event ont the canvas
    
    canvas.addEventListener('mousedown',function()
                           {
        console.log("mouse Pressed");
        player.moving=true;
    });
    
    canvas.addEventListener('mouseup',function()
                           {
        console.log("mouse relesed");
        player.moving=false;
    });
    
}

function is_overlap(rect1,rect2)
{
    if(rect1.x<rect2.x+rect2.w 
       && rect1.x+rect1.w>rect2.x
       && rect1.y<rect2.y+rect2.h
       &&  rect1.y+rect1.h>rect2.y){
        return true;
    }
    return false;
}

function draw(){
    
     //move box downword
    pen.clearRect(0,0,W,H);

    
    //draw palyer
    
    pen.drawImage(player_image,player.x,player.y,player.w,player.h);
    
    
    
    //draw gem
    
    pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);
    
    
    
    //draw enemy
  
    
    for(let i=0;i<enemy.length;i++){
            pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
        }
    
    pen.fillStyle="white";
    pen.fillText("Score "+" "+player.health,10,10);
   
}


function update(){
   
    if(player.moving==true)
        {
            player.x+=player.speed;
            player.health+=20;
        }
    
    //for is overlap
    
    for(let i=0;i<enemy.length;i++)
        {
            if(is_overlap(enemy[i],player))
                {
                    player.health-=50;
                    if(player.health<0)
                        {
                            console.log(player.health);
                            game_over=true;
                            alert("!! Game Over !!" +player.health);
                            
                        }
                }
        }
    
    if(is_overlap(player,gem))
        {
            console.log("You Won");
            alert("You Won !!!!!"+"Left Energy is : "+player.health);
            game_over=true;
            return ;
        }
    
    for(let i=0;i<enemy.length;i++){
          enemy[i].y+=enemy[i].speed;
        if(enemy[i].y>H-enemy[i].h || enemy[i].y<0)
            {
                enemy[i].speed*=-1;
            }
        }
    
}
function gameloop(){
    
    if(game_over==true)
        {
            clearInterval(f);
        }
    
    
    draw();
    update();
    console.log("In game loop");
    
}
load_image();
init();
var f=setInterval(gameloop,100);
