import * as teach from "./teacher.js";
import * as main from "./main.js";

var flipchart = document.getElementById("Spielfeld");
var papier = flipchart.getContext("2d");



    






export class Spielfeld{ 
    constructor(){
        this.r1 = [];
        this.r2 = [];
        this.r3 = [];
        this.r4 = [];
        this.r5 = [];
    }
    getX(f, s) {
        let feld = this.getfelder(f);
        
       
    
        if (!feld || !feld[s]) {
            console.log("Error")
            return undefined;
        }
    
        return feld[s].x;
    }
    

    getY(f, s) {
        let feld = this.getfelder(f);
        return  feld[s].y;
    }

    getfelder(f) {
        switch (f) {
            case 1: return this.r1;
            case 2: return this.r2;
            case 3: return this.r3;
            case 4: return this.r4;
            case 5: return this.r5;
            default:
                console.error(`Fehler: Ungültiger Feld-Index f=${f}`);
                return [];
        }
    }
    
}






export class Auswahl{ 
    constructor(){
        this.schueler = [   ["Geniesser","/assets/geniesser.png", 300,30,100,100,new Image(),"/assets/geniesserSelected.png"],
                            ["Drucker","/assets/printer_frame1.png", 400,30,100,100,new Image(),"/assets/printer_frame1Selected.png"],
                            ["Rahdnut","/assets/rahdnut.png", 500,30,100,100,new Image(),"/assets/rahdnutSelected.png"]]


        this.schueler.forEach(sch =>{
            sch[6].src = sch[1]
        })
    }
    
    select = function(id){
        let schueler = this.schueler.find(sch => sch[0] === id);
        if(schueler){
            schueler[6].src = schueler[7]
        }
    }
    unselect = function(id){
        
        let schueler = this.schueler.find(sch => sch[0] === id);
        if(schueler){
            schueler[6].src = schueler[1]
        }
    }
    contains = function (mouseX, mouseY,ctx) {
        let returnValue 
        this.schueler.forEach(sch => {
            if(
                mouseX >= sch[2] &&
                mouseX <= sch[2] + sch[4] &&
                mouseY >= sch[3] &&
                mouseY <= sch[3] + sch[5]
            ){
            
                if(ctx=="b"){
                    returnValue =  true
                }
                if(ctx=="i"){
                    returnValue = sch[0]
                }

                
            }
        })
        
        return returnValue

    };

    getSrc = function(id){
        let schueler = this.schueler.find(sch => sch[0] === id);
        return schueler ? schueler[1] : undefined;
    }
    getX = function(id){
        let schueler = this.schueler.find(sch => sch[0] === id);
        return schueler ? schueler[2] : undefined;
    };
    
    getY = function(id){
        let schueler = this.schueler.find(sch => sch[0] === id);
        return schueler ? schueler[3] : undefined;
    }
    getW = function(id){
        let schueler = this.schueler.find(sch => sch[0] === id);
        return schueler ? schueler[4] : undefined;
    }
    getH = function(id){
        let schueler = this.schueler.find(sch => sch[0] === id);
        return schueler ? schueler[5] : undefined;
    }
    getImg = function(id){
        let schueler = this.schueler.find(sch => sch[0] === id);
        return schueler ? schueler[6] : undefined;
    }



    
}

export var auswahl = new Auswahl()
export var neuesfeld = new Spielfeld()

export class Feld{
    constructor(x,y,w,h,s,l){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.s = false;
        this.l = false;
    }
    getX = function(){
        return this.x
    }
  
    getL = function(){
        return this.l;
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
            if(neuesfeld.r5.length<9){
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
            
            //new Feld(j*100 + verschub, i*100 + verschub, 100, 100)}
        
        }
    
        else if(j % 2 != 0){
            papier.fillStyle = zwei
            papier.fillRect((j* 100+verschub), (i*100 + verschub),100,100)
            if(neuesfeld.r5.length<9){
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
            
        }
        
    


    papier.fillStyle = "black"
    papier.strokeRect(200,30,550,100)
    papier.strokeRect(300,30,0.1,100)
    papier.strokeRect(1000,1,100,50)
    papier.font = "bold 35px Arial";  // Hier können Sie die Schriftart und -größe definieren
    papier.fillText("Menü", 1004, 37)
    initDetection()

    papier.strokeRect(300, 130, 100, 30);
    papier.fillText("150", 318, 157);
    papier.strokeRect(400, 130, 100, 30);
    papier.fillText("350", 418, 157);
    papier.strokeRect(500, 130, 100, 30);
    papier.fillText("200", 518, 157);
    

}
}
/* for(let i=2; i < 6; i= i+2){
    for(let j=1;j<10; j=j+2){
    papier.fillStyle = "blue"
    papier.fillRect((j* 100), (i*100),100,100)
    }
}
// papier.fillStyle = "grey"
// papier.fillRect(100,100,100,100)

*/

}

export function spielfeldUpd(){ 



    for(let j = 1; j<=5;j++){
        let array = neuesfeld.getfelder(j)
        let temp = false
        teach.teachers.forEach((teach) => {
            let y = teach.getPositiony()
            if((y-100)/100 == j){
                temp = true;
            }
        })
        array[9] = temp
    }
    

}

function initDetection(){ 
    for(let i = 1; i<=5; i++){
        let array = neuesfeld.getfelder(i)
        if(array.length == 9){
            array.push(false)
        }
    }
}
