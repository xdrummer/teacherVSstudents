import * as cur from "./currency.js";
import * as spielF from "./Spielfeld.js";
import * as teach from "./teacher.js";
import * as student from "./student.js";


var flipchart = document.getElementById("Spielfeld");
var papier = flipchart.getContext("2d");

var selectedStudent = null;

var teach_spawnrate = 20000;

var gameover = false;
var gameoverImg = new Image();
gameoverImg.src = "assets/gameover2.jpg";

// Zeit in ms wie lange der Spieler zeit hat sich vorzubereiten bevor der erste Lehrer kommt
// 1 sek = 1000
var preparetime = 1000//15000;

// Spawnlimit der Lehrer, ab dem gewonnen ist
var winValue = 5;

var gameUpdateID;
var drawID;
var cur_updateID;
var cur_createID;
var cur_DespawnID;
var student_updateID;
var teach_updID;
var teach_createID;
var spielF_UpdID;
var printer_framesID;
var teach_spawnlimitID;


window.addEventListener("load", () => {
    // Einfaches onload im body funktioniert warum auch immer nicht
    // habe daher einfach nen event listener mit load genutzt das funktioniert
    gameStart();                                                                   
                                                                                
});

function gameUpdate(){

    if(!gameover){
        checkGameover();
    }

}

function checkGameover(){
    if(gameover) {
        return;
    }

    for(let i=0; i<teach.teachers.length; i++){
        if(teach.teachers[i].positionx <= 165){
            gameover = true;
            stopGame();
            showGameOverScreen();
            enableRestartListener(); 
            return;
        }
    }
}

function enableRestartListener(){
    flipchart.addEventListener("click", restartGameListener);
}

function restartGameListener(e) {
    const rect = flipchart.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (mouseX >= 0 && mouseX <= flipchart.width && mouseY >= 0 && mouseY <= flipchart.height) {
        restartGame();
    }
}

function showGameOverScreen() {
    document.getElementById('cur_board').style.visibility = "hidden";
    papier.clearRect(0, 0, flipchart.width, flipchart.height); // Leert den Canvas
    papier.drawImage(gameoverImg, 0, 0, flipchart.width, flipchart.height); // Zeichnet das Game Over Bild
}

function restartGame() {
    gameover = false;
    document.getElementById('cur_board').style.visibility = "visible";
    cur.setScore(-cur.getScore())
    teach.teachers.length = 0;
    student.students.length = 0;
    cur.currencies.length = 0;

    cancelAnimationFrame(drawID)

    papier.clearRect(0, 0, flipchart.width, flipchart.height); 

    gameStart();

    flipchart.removeEventListener("click", restartGameListener);

}

function stopGame() {
    clearInterval(gameUpdateID);
    cancelAnimationFrame(drawID);
    clearInterval(cur_updateID);
    clearInterval(cur_createID);
    clearInterval(cur_DespawnID);
    clearInterval(student_updateID);
    clearInterval(teach_updID);
    clearInterval(teach_createID);
    clearInterval(spielF_UpdID);
    clearInterval(teach_spawnlimitID);

    console.log("Game Over!");
};

function gameStart() {

    
    

    spielF.Spielfeldzeichnen();

    // alle Update Methoden der verschiedenen Objekte

    gameUpdateID = window.setInterval(() => {
        gameUpdate();
    },10)

    cur_updateID = window.setInterval(() => {
        cur.cur_update();
    }, 10);                                                            

    cur.create()
    cur_createID = window.setInterval(()=> {
        cur.create();
    },10000);

    cur_DespawnID = window.setInterval(()=> {
        cur.age_upd();
    }, 1000);

    teach_updID = window.setInterval(()=> {
        teach.teachUpd();
    },10);

    student_updateID =  window.setInterval(()=> {
        student.studentUp();
    },10);


    spielF_UpdID = window.setInterval(() => {
        spielF.spielfeldUpd();
    },10);

    // erzeugen der Lehrer wartet einen Moment 
    window.setTimeout(() => {
        teach_createID = window.setInterval(()=>{
            teach.teach_create();
        }, 20000);
    }, preparetime); 
    
    teach_spawnlimitID = window.setInterval (()=> {
        teach.incr_spawnlimit();
    }, 10000);




    


    drawID = draw();

    flipchart.addEventListener("click", (e) => {
        const rect = flipchart.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        var id;


        for (let i = cur.currencies.length - 1; i >= 0; i--) {
            if (cur.currencies[i].contains(mouseX, mouseY)) {
                cur.setScore(50);
                
                cur.currencies.splice(i, 1);
                break;
            }
        }
        if(spielF.auswahl.contains(mouseX,mouseY,"b")){ // ab hier Jan Gerdes
            id = spielF.auswahl.contains(mouseX,mouseY,"i");
            
            
            if(selectedStudent){
                spielF.auswahl.unselect(selectedStudent);
                selectedStudent = null;
            }else{
                selectedStudent = id;
            
                spielF.auswahl.select(selectedStudent);
                
                
            }
            

            
        }
        if(selectedStudent){
            
            for(let i = 1;i<=5;i++){
                
                
                for(let j = 0;j<9;j++){
                    
                    
                    if(

                        mouseX >= spielF.neuesfeld.getX(i,j) &&
                        mouseX <= spielF.neuesfeld.getX(i,j) + 100 &&
                        mouseY >= spielF.neuesfeld.getY(i,j) &&
                        mouseY <= spielF.neuesfeld.getY(i,j) + 100

                    ){
                        spawnStudent(selectedStudent,i,j);
                        spielF.auswahl.unselect(selectedStudent);
                        selectedStudent = null;
                        
                    }
                }
            }
        }

        
    });
}



function spawnStudent(kind,row,coloumn){ // Jan Gerdes
    let x = spielF.neuesfeld.getX(row,coloumn);
    let y = spielF.neuesfeld.getY(row,coloumn);

    if(kind == "Geniesser"){
        if(cur.getScore()>=student.kosten.get("Geniesser") && spielF.neuesfeld.getfelder(row)[coloumn].s == false ){
            student.spawnGeniesser(x,y-1);
            
            cur.setScore(-student.kosten.get("Geniesser"));
            spielF.neuesfeld.getfelder(row)[coloumn].s = true;
        }else{
            if(cur.getScore()<student.kosten.get("Geniesser")){
                currencyAnimation(15);
            }else{
                console.log("Da ist schon wer");
            }
            
        }
        
    }
    if(kind == "Drucker"){
        if(cur.getScore()>=student.kosten.get("Drucker") && spielF.neuesfeld.getfelder(row)[coloumn].s == false ){
            student.spawnDrucker(x,y-1);
            
            cur.setScore(-student.kosten.get("Drucker"));
            spielF.neuesfeld.getfelder(row)[coloumn].s = true;
        }else{
            if(cur.getScore()<student.kosten.get("Drucker")){
                currencyAnimation(15);
            }else{
                console.log("Da ist schon wer");
            }
            
        }
        
    }
    if(kind == "Rahdnut"){
        if(cur.getScore()>=student.kosten.get("Rahdnut") && spielF.neuesfeld.getfelder(row)[coloumn].s == false ){
            student.spawnRahdnut(x,y-1);
            
            cur.setScore(-student.kosten.get("Rahdnut"));
            spielF.neuesfeld.getfelder(row)[coloumn].s = true;
        }else{
            if(cur.getScore()<student.kosten.get("Rahdnut")){
                currencyAnimation(15);
            }else{
                console.log("Da ist schon wer");
            }
            
        }
        
    }
}

async function currencyAnimation(ctx){ // Jan Gerdes
    let red = '#f00';
    let black = '#000';
    for(let i=0; i<ctx;i++){
        if(i%2==0){
            document.getElementById('cur_board').style.color = red;
        }else{
            document.getElementById('cur_board').style.color = black;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    document.getElementById('cur_board').style.color = black;
    
    
}

function draw() {
    if(gameover){
        showGameOverScreen();
        return;
    }

    papier.clearRect(0, 0, flipchart.width, flipchart.height);
    spielF.Spielfeldzeichnen();
    


    student.students.forEach((stu) => {
        papier.drawImage(stu.skin, stu.x, stu.y);
        stu.projectiles.forEach((proj) => {
            if (proj.cork && proj.cork.complete) {  
                papier.drawImage(proj.cork, proj.x, proj.y, proj.width, proj.height);
            }
        });
    });

    student.students.forEach((printer) => {
        papier.drawImage(printer.skin, printer.x, printer.y);
    })
    

    teach.teachers.forEach((tea) => {
        papier.drawImage(tea.bild, tea.positionx, tea.positiony + tea.getCenterGap(), tea.width, tea.height);
    });


    cur.currencies.forEach((currency) => {                                                                  

        papier.drawImage(currency.bild, currency.x, currency.y, currency.width, currency.height);
        
    });

    
    
    
    papier.drawImage(spielF.auswahl.getImg("Geniesser"),spielF.auswahl.getX("Geniesser"),spielF.auswahl.getY("Geniesser"),spielF.auswahl.getW("Geniesser"),spielF.auswahl.getH("Geniesser"));
    papier.drawImage(spielF.auswahl.getImg("Drucker"),spielF.auswahl.getX("Drucker"),spielF.auswahl.getY("Drucker"),spielF.auswahl.getW("Drucker"),spielF.auswahl.getH("Drucker"));
    papier.drawImage(spielF.auswahl.getImg("Rahdnut"),spielF.auswahl.getX("Rahdnut"),spielF.auswahl.getY("Rahdnut"),spielF.auswahl.getW("Rahdnut"),spielF.auswahl.getH("Rahdnut"));
    drawID = window.requestAnimationFrame(draw);
}