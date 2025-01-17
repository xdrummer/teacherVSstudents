var flipchart = document.getElementById("Canvas");
var papier = flipchart.getContext("2d");

var currencys = [];

class Currency{
    constructor(){
        this.x = Math.random()*flipchart.height;
        this.y = 0;
        this.bild = new Image();
        this.bild.src = "Bilder/ufo.png";


 
    }

    fall = function(){
        this.y = this.y + 1;
    }

}


for(let i=0;i<currencys.length;i=i+1){
    papier.drawImage(currencys[i].bild, currencys[i].x, currencys[i].y);
}
