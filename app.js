let gameSeq=[];
let userSeq=[];
let highestscore = localStorage.getItem('highestscore') || 0;
let btns=["orange","red","purple","green"];
let started=false;
let level=0;
let h2=document.querySelector('h2');
let h3=document.querySelector('h3');
h3.innerText = `Highest Score : ${highestscore}`;
document.addEventListener("keypress",function(){
       if(started==false){
        console.log("game started");
        started=true;
        levelUp();
       }
});
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },100);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },100);
}
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText= `Level ${level}`;
    let randIdx=Math.floor(Math.random()*4);
    let randcolor=btns[randIdx];
    let randbtn=document.querySelector(`.${randcolor}`);
    gameSeq.push(randcolor);
    console.log(gameSeq);
    gameFlash(randbtn);
}
function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length===gameSeq.length){
           setTimeout(levelUp,500);
        }
    }else{
        h2.innerHTML=`Game Over ! Your score was <b>${level}</b> <br> Press any key to start again`;
        if(highestscore<level){
            highestscore=level;
            localStorage.setItem('highestscore', highestscore);
            h3.innerText=`Highest Score : ${highestscore}`;
        }
        let bd=document.querySelector("body");
        bd.style.backgroundColor="cyan";
        setTimeout(function(){
            bd.style.backgroundColor="white";
        },200);
        reset();
    }
}
function btnPress(){
    let btn=this;
    userFlash(btn);
    let usercolor=btn.getAttribute("id");
    userSeq.push(usercolor);
    checkAns(userSeq.length-1);
}
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    
    level=0;
}