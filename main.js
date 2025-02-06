import * as cur from "./currency.js";
import * as spielF from "./Spielfeld.js";
import * as teach from "./teacher.js";
import * as student from "./student.js";


var flipchart = document.getElementById("Spielfeld");
var papier = flipchart.getContext("2d");



var drawID;
var cur_updateID;
var createID;
var cur_DespawnID;
var student_updateID;
var teach_updID;

window.addEventListener("load", () => {
    onload();                                                                   // Einfaches onload im body funktioniert warum auch immer nicht
                                                                                // habe daher einfach nen event listener mit load genutzt das funktioniert
});



function onload() {
    cur_updateID = window.setInterval(() => {
        cur.cur_update();
    }, 10);                                                            


    createID = window.setInterval(()=>{
        cur.create();
    }, 3000);

    cur_DespawnID = window.setInterval(()=>{
        cur.age_upd();
    }, 1000);

    teach_updID = window.setInterval(()=>{
        teach.teachUpd();
    },10)

    student_updateID =  window.setInterval(()=>{
        student.studentUp();
    },10)

    


    drawID = draw();

    flipchart.addEventListener("click", (e) => {
        const rect = flipchart.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;


        for (let i = cur.currencies.length - 1; i >= 0; i--) {
            if (cur.currencies[i].contains(mouseX, mouseY)) {
                cur.setScore(50);
                console.log(`Score: ${cur.score}`); 
                cur.currencies.splice(i, 1);
                break;
            }
        }
    });
}


function draw() {
    papier.clearRect(0, 0, flipchart.width, flipchart.height);
    spielF.Spielfeldzeichnen();
    cur.currencies.forEach((currency) => {                                                                  

        papier.drawImage(currency.bild, currency.x, currency.y, currency.width, currency.height);
        
    });

    student.students.forEach((stu) => {
        stu.projectiles.forEach((proj) => {
            if (proj.cork && proj.cork.complete) {  
                papier.drawImage(proj.cork, proj.x, proj.y, proj.width, proj.height);
            }
        });
    });
    


    
    drawID = window.requestAnimationFrame(draw);
}
