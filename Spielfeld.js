export var flipchart = document.getElementById("Spielfeld");
export var papier = flipchart.getContext("2d");

export class Spielfeld{
    constructor(){
        this.r1 = [];
        this.r2 = [];
        this.r3 = [];
        this.r4 = [];
        this.r5 = [];


    }
}
export var neuesfeld = new Spielfeld()
export class Feld{
    constructor(x,y,w,h,s,l){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.s = false;
        this.l = false
    }
}
export function Spielfeldzeichnen(){
    var verschub = 100;
    let eins 
    let zwei 

    for(let i=1; i < 6; i= i+1){
        if(i % 2 == 0){
            eins = "green"
            zwei = "lightgreen"
        }else{
            eins = "lightgreen"
            zwei = "green"  
        }
        for(let j=1;j<10; j=j+1){
            if(j % 2 == 0){
                papier.fillStyle = eins
                papier.fillRect((j* 100+verschub), (i*100 + verschub),100,100)
                
                switch(i){
                    case 1 : neuesfeld.r1.push(new Feld(j*100 + verschub, i*100 + verschub, 100, 100))
                    break;

                    case 2 : neuesfeld.r2.push(new Feld(j*100 + verschub, i*100 + verschub, 100, 100))
                    break;

                    case 3 : neuesfeld.r3.push(new Feld(j*100 + verschub, i*100 + verschub, 100, 100))
                    break;

                    case 4 : neuesfeld.r4.push(new Feld(j*100 + verschub, i*100 + verschub, 100, 100))
                    break;

                    case 5 : neuesfeld.r5.push(new Feld(j*100 + verschub, i*100 + verschub, 100, 100))
                    break;
                }
                //new Feld(j*100 + verschub, i*100 + verschub, 100, 100)}
            
            }
        
            else if(j % 2 != 0){
                papier.fillStyle = zwei
                papier.fillRect((j* 100+verschub), (i*100 + verschub),100,100)
                switch(i){
                    case 1 : neuesfeld.r1.push(new Feld(j*100 + verschub, i*100 + verschub, 100, 100))
                    
                    break;

                    case 2 : neuesfeld.r2.push(new Feld(j*100 + verschub, i*100 + verschub, 100, 100))
                    break;

                    case 3 : neuesfeld.r3.push(new Feld(j*100 + verschub, i*100 + verschub, 100, 100))
                    break;

                    case 4 : neuesfeld.r4.push(new Feld(j*100 + verschub, i*100 + verschub, 100, 100))
                    break;

                    case 5 : neuesfeld.r5.push(new Feld(j*100 + verschub, i*100 + verschub, 100, 100))
                    break;
                }
            }
            
        


        papier.fillStyle = "black"
        papier.strokeRect(200,30,350,100)
        papier.strokeRect(300,30,0.1,100)
        papier.strokeRect(1000,1,100,50)
        papier.font = "bold 35px Arial";  // Hier können Sie die Schriftart und -größe definieren
        papier.fillText("Menü", 1004, 37)

    }
    }
/* for(let i=2; i < 6; i= i+2){
    for(let j=1;j<10; j=j+2){
    papier.fillStyle = "blue"
    papier.fillRect((j* 100), (i*100),100,100)
    }
}
// papier.fillStyle = "grey"
// papier.fillRect(100,100,100,100)*/


}
Spielfeldzeichnen();
