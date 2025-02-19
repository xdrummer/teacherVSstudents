export var flipchart = document.getElementById("Spielfeld");
export var papier = flipchart.getContext("2d");


export var currencies = [];

export var score = 0; 

export var despawn_timer = 15;





export class Currency {
    constructor() {
        this.bild = new Image();
        this.bild.src = "assets/coupon_currency.png";
        this.x = Math.random() * (1000 - 200) + 200
        this.y = 200;
        this.speed = 0.5;
        this.age = 0;

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


    setAge = function(){
        this.age++;
    }


}


export function setScore(ctx){
    score = score + ctx;
}

export function getScore(ctx){
    return score
}

export function create(){
    if(currencies.length < 4){
        currencies.push(new Currency);
    }
}


export function age_upd(){
    currencies.forEach((element) => {
        element.setAge();
    })
}


export function despawn(){
    currencies.forEach((element) => {
        if(element.age == despawn_timer){
            currencies.splice(currencies.indexOf(element),1);
        }
    })
}



export function cur_update() {
    currencies.forEach((currency) => {
        currency.fall();
    });
    
    despawn();




    document.getElementById('cur_board').innerHTML = score;

}

