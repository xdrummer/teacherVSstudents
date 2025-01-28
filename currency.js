export var flipchart = document.getElementById("Spielfeld");
export var papier = flipchart.getContext("2d");


export var currencies = [];

export var score = 0; 






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


export function setScore(ctx){
    score = score + ctx;
}



export function cur_update() {
    currencies.forEach((currency) => {
        currency.fall();
    });


    document.getElementById('cur_board').innerHTML = score;

}

