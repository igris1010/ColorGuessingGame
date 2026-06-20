
function randomnum(min, max){
    let x = Math.floor(Math.random()*(max - min) + min);
    return x;
}

function changecol(){
    const r = randomnum(0,255);
    const g = randomnum(0,255);
    const b = randomnum(0,255);
    return `rgb(${r}, ${g}, ${b})`;
}


function generateOpt(){
    for(let i=1;i<=6;i++){
        let col2 = changecol();
        const inpbox = document.getElementById(`box${i}`);
        inpbox.style.backgroundColor = col2;
    }
}


const box = document.getElementById("colorbox");

function outcome(come){
    let out = document.getElementById("outcome");
    out.innerText = come;
}

function startgame(){
    let col = changecol();
    box.innerText = col;
    generateOpt();
    const ans = randomnum(1,6);
    const ansbox = document.getElementById(`box${ans}`);
    ansbox.style.backgroundColor = col;

    const remote = new AbortController();
    const {signal} = remote;

    for(let i =1;i<=6;i++){
        let varbox = document.getElementById(`box${i}`);
        varbox.addEventListener('click', ()=>{
            if(i==ans){
                outcome("Correct Answer!!")
                remote.abort();
                const tryagain = document.createElement("div");
                tryagain.style.padding = "5px";
                tryagain.innerText = "Play Again";
                tryagain.style.backgroundColor = "rgb(240, 248, 255)";
                document.getElementById("main").appendChild(tryagain);
                tryagain.addEventListener('click',()=>{
                    window.location.reload();
                });
                tryagain.style.borderRadius = "5px";
                
                tryagain.addEventListener("mouseenter", ()=>{
                    tryagain.style.animationName = "glow";
                    tryagain.style.animationDuration = "500ms";
                    tryagain.style.animationFillMode = "forwards";
                });
                tryagain.addEventListener("mouseleave", ()=>{
                    tryagain.style.animationName = "glowback";
                    tryagain.style.animationDuration = "500ms";
                    tryagain.style.animationFillMode = "forwards";
                })
            }
            else{
                outcome("Try Again :(");
            }
            
        }, {signal});
    }
    
}

window.addEventListener("load", () => startgame());