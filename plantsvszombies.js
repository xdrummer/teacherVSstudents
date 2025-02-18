var flipchart = document.getElementById("Canvas");
var papier = flipchart.getContext("2d");

class Lehrer{
    constructor(){
        this.x = 300;
        this.y = 200;
        this.quellen = [
                        "jarres_wahres_ich.png"
        ];
        this.bild = new Image();
        this.width;
        this.height;
    
        this.scale = 0.33;
        this.bild.src = this.quellen[0];

        this.bild.onload = () => {
            console.log("Bild geladen:", lehrer.width, lehrer.height);

            this.width = this.bild.width * this.scale;
            this.height = this.bild.height * this.scale;
            zeichnen();
        };
    }
}

class Schüler{
    constructor(){
        this.x = 50;
        this.y = 50;
        this.bild1 = new Image();
        this.bild1.src = "tower_pvsz.png";

        this.bild1.onload = () => {
            zeichnen();
        };
    }
}

var i = 0;
//var laufen = true;
var lehrer = new Lehrer();
var schüler = new Schüler();

function switchen(){
    lehrer.bild.src = lehrer.quellen[i];
    i++;

    if(i >= lehrer.quellen.length){
            i = 0;
    }

    lehrer.bild.onload = () => {
        zeichnen();
    };

}
     
function starteSpiel(){
    setInterval(switchen, 500);
}

function zeichnen(){
    papier.clearRect(0, 0, flipchart.width, flipchart.height);
    papier.drawImage(lehrer.bild, lehrer.x, lehrer.y, lehrer.width, lehrer.height);

    papier.drawImage(schüler.bild1, schüler.x, schüler.y);
}

