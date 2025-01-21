var flipchart = document.getElementById("Canvas");
var papier = flipchart.getContext("2d");

var currencies = [];
var drawID;
var updateID;
var createID;
var score = 0; 

class Currency {
    constructor() {
        this.x = Math.random() * flipchart.width; 
        this.y = 0;
        this.bild = new Image();
        this.bild.src = "sun_test.png";
        this.scale = 0.2;

        this.bild.onload = () => {
            this.width = this.bild.width * this.scale;
            this.height = this.bild.height * this.scale;
        };
    }

    fall = function () {
        if (this.y < flipchart.height - this.height) {
            this.y = this.y + 1;
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

function onload() {
    updateID = window.setInterval(() => {
        update();
    }, 10);

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

function update() {
    currencies.forEach((currency) => {
        currency.fall();
    });
}

function draw() {
    papier.clearRect(0, 0, flipchart.width, flipchart.height);
    currencies.forEach((currency) => {
        if (currency.width && currency.height) {
            papier.drawImage(currency.bild, currency.x, currency.y, currency.width, currency.height);
        }
    });

    drawID = window.requestAnimationFrame(draw);
}
