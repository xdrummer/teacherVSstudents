import * as cur from "./currency.js";
import * as spielF from "./Spielfeld.js";
import * as teach from "./teacher.js";
import * as student from "./student.js";


var flipchart = document.getElementById("Spielfeld");
var papier = flipchart.getContext("2d");

var selectedStudent;


// Zeit in ms wie lange der Spieler zeit hat sich vorzubereiten bevor der erste Lehrer kommt
// 1 sek = 1000
var preparetime = 15000;


var drawID;
var cur_updateID;
var cur_createID;
var cur_DespawnID;
var student_updateID;
var teach_updID;
var teach_createID;

window.addEventListener("load", () => {
    // Einfaches onload im body funktioniert warum auch immer nicht
    // habe daher einfach nen event listener mit load genutzt das funktioniert
    onload();                                                                   
                                                                                
});



function onload() {
    spielF.Spielfeldzeichnen();

    cur_updateID = window.setInterval(() => {
        cur.cur_update();
    }, 10);                                                            

    cur.create()
    cur_createID = window.setInterval(()=>{
        cur.create();
    },10000);

    cur_DespawnID = window.setInterval(()=>{
        cur.age_upd();
    }, 1000);

    teach_updID = window.setInterval(()=>{
        teach.teachUpd();
    },10);

    student_updateID =  window.setInterval(()=>{
        student.studentUp();
    },10);

    // erzeugen der Lehrer wartet einen Moment 
    window.setTimeout(() => {
        teach_createID = window.setInterval(()=>{
            teach.teach_create();
        }, 5000);
    }, preparetime); 

    


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
        if(spielF.auswahl.contains(mouseX,mouseY,"b")){
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


function spawnStudent(kind,row,coloumn){
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
}

async function currencyAnimation(ctx){
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
    papier.clearRect(0, 0, flipchart.width, flipchart.height);
    spielF.Spielfeldzeichnen();
    
    cur.currencies.forEach((currency) => {                                                                  

        papier.drawImage(currency.bild, currency.x, currency.y, currency.width, currency.height);
        
    });

    student.students.forEach((stu) => {
        papier.drawImage(stu.skin, stu.x, stu.y);
        stu.projectiles.forEach((proj) => {
            if (proj.cork && proj.cork.complete) {  
                papier.drawImage(proj.cork, proj.x, proj.y, proj.width, proj.height);
            }
        });
    });
    

    teach.teachers.forEach((tea) => {
        papier.drawImage(tea.bild, tea.positionx, tea.positiony + tea.getCenterGap(), tea.width, tea.height);
    });

    
    
    
    papier.drawImage(spielF.auswahl.schueler[0][6],spielF.auswahl.getX("Geniesser"),spielF.auswahl.getY("Geniesser"),spielF.auswahl.getW("Geniesser"),spielF.auswahl.getH("Geniesser"));

    
    drawID = window.requestAnimationFrame(draw);
}

