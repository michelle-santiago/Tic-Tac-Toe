//Choosing theme
const normalBtn=document.getElementById('normalTheme');
const characterBtn=document.getElementById('characterTheme');
const body1=document.body;

normalBtn.addEventListener('click', normalTheme);
characterBtn.addEventListener('click', characterTheme);

let theme="";
function normalTheme(){
    theme="normal";
    message.innerHTML="";
    normalBtn.classList.add("selected")
    characterBtn.classList.remove("selected")
    Obtn.classList.add("normalO-img")
    Xbtn.classList.add("normalX-img")
    Obtn.classList.remove("characterO-img");
    Xbtn.classList.remove("characterX-img");
    body1.classList.remove("bg");
    //console.log(theme);
}
function characterTheme(){
    theme="character";
    Obtn.innerHTML="";
    Xbtn.innerHTML="";
    message.innerHTML="";
    characterBtn.classList.add("selected");
    normalBtn.classList.remove("selected");
    Obtn.classList.add("characterO-img");
    Xbtn.classList.add("characterX-img");
    Obtn.classList.remove("normalO-img")
    Xbtn.classList.remove("normalX-img")
    body1.classList.add("bg");
    //console.log(theme);
}
//Game Status
const icon=document.getElementById('icon');
let gameStatus=document.getElementById("gameStatus");
let gameOver=0;
//Choosing symbol
const Xbtn=document.getElementById('btnX');
const Obtn=document.getElementById('btnO');

const message=document.getElementById('message');

Xbtn.addEventListener('click', playerX);
Obtn.addEventListener('click', playerO);

let player="";

function playerX(){
    player="X";
    message.innerHTML="";
    Xbtn.classList.add("selected");
    Obtn.classList.remove("selected");
    Xbtn.classList.remove("charBtn");
    icon.classList.add(theme+"X-img");
    icon.classList.remove(theme+"O-img");
    gameStatus.innerHTML="'s Turn";
    //console.log(player);
}

function playerO(){
    player="O";
    message.innerHTML="";
    Obtn.classList.add("selected")
    Xbtn.classList.remove("selected")
    Obtn.classList.remove("charBtn");
    icon.classList.add(theme+"O-img")
    icon.classList.remove(theme+"X-img");
    gameStatus.innerHTML="'s Turn";
    //console.log(player);
}
//Start Game
const continueBtn=document.getElementById('continueBtn');
const startBtn=document.getElementById('startBtn');
const selectTheme=document.getElementById('selectTheme');
const pickChar=document.getElementById('pickChar');

const boardSection=document.getElementById('board');
continueBtn.addEventListener('click', showChar);  
startBtn.addEventListener('click', startGame);  

function showChar(){
    if(theme===""){
        message.innerHTML="Please select one";
    }else{
        message.innerHTML="";
        selectTheme.style.display="none";
        pickChar.style.display="block"
    }
}
function startGame(){
    if(player===""){
        message.innerHTML="Please select one";
    }else{
        message.innerHTML="";
        pickChar.style.display="none";
        boardSection.style.display="block";
    }
}

//Board cell
const board=document.getElementById('board-container');
board.addEventListener('click', play);
let row;
let col;
let rowCell;
let colCell;
let cellStyle;
let boardArr=[['','',''],['','',''],['','','']];
let moves=[['','',''],['','',''],['','','']];
let winnerCells=[['','',''],['','',''],['','','']];
let turn=0; 
let turnCount;

//Remove some border
function border(){
    for(i=0;i<3;i++){
        for(j=0;j<3;j++){
            rowCell=document.getElementById(`${i}`)
            colCell=rowCell.querySelector(`[data-index='${j}']`);
            if(i===0){
                colCell.classList.add("noTop");
            }
            if(i===2){
                colCell.classList.add("noBottom");
            }
            if(j===0){
                colCell.classList.add("noLeft");
            }
            if(j===2){
                colCell.classList.add("noRight");
            }
        }       
    }
}
window.addEventListener('load', border)

function play(event){  
    row=event.target.parentElement.getAttribute('id');
    col=event.target.getAttribute('data-index');
    //console.log('row'+row);
    //console.log('col'+col);
    if(col!==null){
        boardArr[row].splice(col,1,player);
        //console.log("V board array V");
        //console.log(boardArr);
        rowCell=document.getElementById(`${row}`)
        colCell=rowCell.querySelector(`[data-index='${col}']`);
        cellStyle = colCell.classList;
        cellStyle.add(theme+player);  
        colCell.classList.remove("enable"); 
        colCell.classList.add("disable");     
        gameResult(player)     
        playerTurn()
        IsgameOver(gameOver);       
        moves[row].splice(col,1,turn);
        //console.log("V moves V");
        //console.log(moves)
        turn++;
        turnCount=turn;
    }
}
 //switch Player
function playerTurn(){
    if(player==='X'){
        player='O';
        icon.classList.add(theme+'O'+"-img")
        icon.classList.remove(theme+'X'+"-img")
    }else{
        player='X';
        icon.classList.add(theme+'X'+"-img")
        icon.classList.remove(theme+'O'+"-img")
    }
    gameStatus.innerHTML="'s Turn";
    //console.log(player);
}

//Game Result-Check if there's a winner
let winnerCellRow="";
let winnerSymbol;
function gameResult(player){
    let winScenario;
    for(i=0;i<boardArr.length;i++){
        if(boardArr[i][0]===player&&boardArr[i][1]===player&&boardArr[i][2]===player){
            gameOver=1;
            winScenario="horizontal";
            winnerSymbol=player;
            animateWin(winScenario,i);            
        }
        if(boardArr[0][i]===player&&boardArr[1][i]===player&&boardArr[2][i]===player){
            gameOver=1;
            winScenario="vertical";
            winnerSymbol=player;
            animateWin(winScenario,i);   
        }
    }
    if(boardArr[0][0]===player&&boardArr[1][1]===player&&boardArr[2][2]===player){
        gameOver=1;
        winScenario="toBottomRight";
        winnerSymbol=player;
        animateWin(winScenario,i);      
    }
    if(boardArr[2][0]===player&&boardArr[1][1]===player&&boardArr[0][2]===player){
        gameOver=1;
        winScenario="toTopRight";
        winnerSymbol=player;
        animateWin(winScenario,i);       
    }       
}
//Animate the winning combo
function animateWin(winScenario,newRow){
    let updateRow;
    let updateCol;
    let diagonalRowBottom=0;
    let diagonalColBottom=0;
    let diagonalRowTop=2;
    let diagonalColTop=0;
    for(j=0;j<3;j++){
        if(winScenario==="horizontal"){
            updateRow=newRow;
            updateCol=j;  
        }
        if(winScenario==="vertical"){
            //switch
            updateRow=j;
            updateCol=newRow;
        } 
        if(winScenario==="toBottomRight"){
            updateRow=diagonalRowBottom;
            updateCol=diagonalColBottom;  
        }
        if(winScenario==="toTopRight"){
            updateRow=diagonalRowTop;
            updateCol=diagonalColTop;  
        }
        rowCell=document.getElementById(`${updateRow}`)
        colCell=rowCell.querySelector(`[data-index='${updateCol}']`);
        colCell.classList.remove(theme+player);
        colCell.classList.add(theme+player+"win");  
        diagonalRowBottom++;
        diagonalColBottom++;
        diagonalRowTop--;
        diagonalColTop++;
        /*Save to array for next animation*/
        winnerCells[updateRow].splice(updateCol,1,"W");
        //console.log("V test V");
        //console.log(winnerCells)
    }
}
function IsgameOver(result){
    if(result!==1&&turn===8){
        //console.log("turn "+turn);
        icon.style.display="none";
        gameStatus.innerHTML="It's a Draw";
        showHistorybtn(); 
    }
    if(result===1){
        icon.classList.remove(theme+"O-img");
        icon.classList.remove(theme+"X-img")
        icon.classList.add(theme+winnerSymbol+"-img");
        gameStatus.innerHTML=" Wins";
        for(i=0;i<3;i++){
            for(j=0;j<3;j++){
                rowCell=document.getElementById(`${i}`)
                colCell=rowCell.querySelector(`[data-index='${j}']`);
                /*Disable click if game over */
                colCell.classList.remove("enable"); 
                colCell.classList.add("disable");
            }
        }
        showHistorybtn(); 
    } 
}

//Game Buttons
const prev=document.getElementById('prev');
const next=document.getElementById('next');
const restart=document.getElementById('restart');

function showHistorybtn(){   
    prev.style.display="block"; 
    next.style.display="block";  
    next.classList.add("disableBtn");
}
//Previous
prev.addEventListener('click', prevHistory);
function prevHistory(){
    //console.log("V prevvvv V"); 
    next.classList.remove("disableBtn");
    next.classList.add("enable");
    //console.log("turn="+turn);
    for(i=0;i<moves.length;i++){
        for(j=0;j<3;j++){
            if(moves[i][j]===turn-1){
                //console.log("i="+i)
                //console.log("j="+j)
                let symbol=boardArr[i][j];
                rowCell=document.getElementById(`${i}`)
                colCell=rowCell.querySelector(`[data-index='${j}']`);
                cellStyle = colCell.classList;
                if(theme==="character"){
                    cellStyle.add("poof");
                }
                cellStyle.remove(theme+symbol);
                cellStyle.remove(theme+symbol+"win");  
                cellStyle.remove(theme+symbol+"-w");
            }
        }
    }  
    turn--;
    if(turn===0){
        prev.classList.add("disableBtn");
    }
}
//Next
next.addEventListener('click', nextHistory);
function nextHistory(){
    //console.log("V nexttt V"); 
    //console.log("turn="+turn);
    //console.log("moves="+moves.length);
    let symbol;
    for(i=0;i<moves.length;i++){
        for(j=0;j<3;j++){
            if(moves[i][j]===turn){
                //console.log("i="+i)
                //console.log("j="+j)
                symbol=boardArr[i][j];
                rowCell=document.getElementById(`${i}`)
                colCell=rowCell.querySelector(`[data-index='${j}']`);
                cellStyle = colCell.classList; 
                //Check if winner cells
                if(winnerCells[i][j]==="W"){
                    cellStyle.remove("poof");
                    cellStyle.add(theme+symbol+"-w"); 
                }
                else{
                    cellStyle.add(theme+symbol); 
                }                 
            }   
        }       
    }
    turn++;  
    if(turn===turnCount){
        next.classList.remove("enable");
        next.classList.add("disableBtn");
        prev.classList.remove("disableBtn");
        prev.classList.add("enable");
    }
}
//Reset
restart.addEventListener('click', restartGame);
function restartGame(){
    for(i=0;i<3;i++){
        for(j=0;j<3;j++){
            let symbol=boardArr[i][j];
            rowCell=document.getElementById(`${i}`)
            colCell=rowCell.querySelector(`[data-index='${j}']`);
            colCell.innerHTML="";
            gameStatus.innerHTML="";
            cellStyle = colCell.classList;
            cellStyle.remove(theme+symbol);
            cellStyle.remove(theme+symbol+"win");
            cellStyle.remove(theme+symbol+"-w");
            cellStyle.remove("poof");
            colCell.classList.remove("disable"); 
            colCell.classList.add("enable"); 
            turn=0;
        }       
    }
    gameOver=0;
    boardArr=[['','',''],['','',''],['','','']];
    moves=[['','',''],['','',''],['','','']];
    winnerCells=[['','',''],['','',''],['','','']];
    if(winnerSymbol==="X"){
        icon.classList.remove(theme+"X-img"); 
        icon.classList.add(theme+"O-img"); 
    }else{
        icon.classList.remove(theme+"O-img"); 
        icon.classList.add(theme+"X-img"); 
    }
    gameStatus.innerHTML="'s Turn"
    prev.style.display="none";
    prev.classList.remove("disableBtn");
    next.style.display="none";  
    icon.style.display="block";    
}



