import * as cur from "./currency.js";
import * as spielF from "./Spielfeld.js";


export var flipchart = document.getElementById("Spielfeld");
export var papier = flipchart.getContext("2d");



export var drawID;
export var cur_updateID;
export var createID;


window.addEventListener("load", () => {
    onload();                                                                   // Einfaches onload im body funktioniert warum auch immer nicht
                                                                                // habe daher einfach nen event listener mit load genutzt das funktioniert
});



export function onload() {
    cur_updateID = window.setInterval(() => {
        cur.cur_update();
    }, 10);                                                            

    createID = window.setInterval(() => {
        cur.currencies.push(new cur.Currency());
    }, 3000);

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


export function draw() {
    papier.clearRect(0, 0, flipchart.width, flipchart.height);
    spielF.Spielfeldzeichnen();
    cur.currencies.forEach((currency) => {                                                                  

        papier.drawImage(currency.bild, currency.x, currency.y, currency.width, currency.height);
        
    });


    
    drawID = window.requestAnimationFrame(draw);
}
