export var flipchart = document.getElementById("Spielfeld");
export var papier = flipchart.getContext("2d");

// Speicherort aller momentan existierender Währungseinheiten
export var currencies = [];

// aktueller Währungsstand des Spielers
export var score = 0;

export var despawn_timer = 25;





export class Currency {
    constructor(x, y) {
        this.bild = new Image();
        this.bild.src = "assets/coupon_currency.png";

        // Random um pseudo zufällige Spawnpunkte auf der X Achse im Feld zu bekommen
        this.x = x;                                              
        this.y = y;

        // Geschwindigkeit mit der die Einheit fällt
        this.speed = 0.25;

        // "alter" der Einheit (für despawn)
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


    // Funktion die checkt, ob die Maus momentan in der Fläche der Einheit liegt
    contains = function (mouseX, mouseY) {
        return (
            mouseX >= this.x &&
            mouseX <= this.x + this.width &&
            mouseY >= this.y &&
            mouseY <= this.y + this.height
        );
    };

    // erhöhen des Alters
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
    // < für die Anzahl der maximalen Einheiten auf einmal
    if(currencies.length < 4){
        currencies.push(new Currency(Math.random() * (1000 - 200) + 200, 200));
    }
}

// update funktion um das Alter zu erhöhen bei jeder Einheit
export function age_upd(){
    currencies.forEach((currency) => {
        currency.setAge();
    })
}

// despawn funktion, um die Einheiten nach der festgelegten Zeit despawnen zu lassen (15 sek)
export function despawn(){
    currencies.forEach((currency) => {
        if(currency.age == despawn_timer){
            currencies.splice(currencies.indexOf(currency),1);
        }
    })
}


// update funktion der Währung
export function cur_update() {
    currencies.forEach((currency) => {
        currency.fall();
    });
    
    despawn();



    // zeigt den Score im div an
    document.getElementById('cur_board').innerHTML = score;

}

