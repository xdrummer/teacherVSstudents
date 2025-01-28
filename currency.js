import { Spielfeldzeichnen } from "./Spielfeld.js";

var flipchart = document.getElementById("Spielfeld");
var papier = flipchart.getContext("2d");

var currencies = [];
var drawID;
var cur_updateID;
var createID;
var score = 0; 



window.addEventListener("load", () => {
    onload();                                                                   // muss in main.js
});


export class Currency {
    constructor() {
        this.bild = new Image();
        this.bild.src = "assets/coupon_currency.png";
        this.x = Math.random() * (1000 - 200) + 200
        this.y = 200;
        this.speed = 0.5;

        this.scale = 0.15;

        this.bild.onload = () => {
            this.width = this.bild.width * this.scale;
            this.height = this.bild.height * this.scale;
        };
    }

    fall = function () {
        if (this.y < flipchart.height - 350 - this.height) {
            this.y = this.y + this.speed;
        }
    };

    contains = function (mouseX, mouseY) {
        return (
            mouseX >= this.x &&
            mouseX <= this.x + this.width &&
            mouseY >= this.y &&
            mouseY <= this.y + this.height
        );
    };
}

export function onload() {
    cur_updateID = window.setInterval(() => {
        cur_update();
    }, 10);                                                             // muss in main.js

    createID = window.setInterval(() => {
        currencies.push(new Currency());
    }, 3000);

    drawID = draw();

    flipchart.addEventListener("click", (e) => {
        const rect = flipchart.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;


        for (let i = currencies.length - 1; i >= 0; i--) {
            if (currencies[i].contains(mouseX, mouseY)) {
                score += 50;
                console.log(`Score: ${score}`); 
                currencies.splice(i, 1);
                break;
            }
        }
    });
}

export function cur_update() {
    currencies.forEach((currency) => {
        currency.fall();
    });


    document.getElementById('cur_board').innerHTML = score;

}

export function draw() {
    papier.clearRect(0, 0, flipchart.width, flipchart.height);
    Spielfeldzeichnen();
    currencies.forEach((currency) => {                                                                  // muss in main.js
        if (currency.width && currency.height) {
            papier.drawImage(currency.bild, currency.x, currency.y, currency.width, currency.height);
        }
    });


    
    drawID = window.requestAnimationFrame(draw);
}
