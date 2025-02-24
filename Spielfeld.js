import * as teach from "./teacher.js";

var flipchart = document.getElementById("Spielfeld");
var papier = flipchart.getContext("2d");

var modal = document.getElementById("menu_modal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

var spawn_slide = document.getElementById("spawnrate_cur");
var out_spawn_cur = document.getElementById("out_spawn_cur");



btn.onclick = function(){
    modal.style.display = "block";
}

span.onclick = function(){
    modal.style.display = "none";
}


// spawnrate slider 

out_spawn_cur.innerHTML = spawn_slide.value;


spawn_slide.oninput = function() {

    out_spawn_cur.innerHTML = this.value;



}




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
        this.schueler = [["Geniesser","/assets/geniesser.png", 300,30,100,100,new Image(),"/assets/geniesserSelected.png"]]


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

    checkTeacher = function(){

        teach.teachers.forEach((teacher) => {
            // if X-Hitbox des Lehrers in X-Hitbox des Feldes liegt
            if( (teacher.getPositionx() >= this.x && ( (teacher.getPositionx() + teacher.getWidth()) <= (this.x + this.w) ) ) && (teacher.getPositiony() - 10 == this.y) ){          
                this.l = true;
            }else{
                this.l = false;
            }
        })
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
// papier.fillRect(100,100,100,100)

*/

}

export function spielfeldUpd(){

    neuesfeld.r1.forEach((feld) => {
        feld.checkTeacher();
    });
    neuesfeld.r2.forEach((feld) => {
        feld.checkTeacher();
    });
    neuesfeld.r3.forEach((feld) => {
        feld.checkTeacher();
    });
    neuesfeld.r4.forEach((feld) => {
        feld.checkTeacher();
    });
    neuesfeld.r5.forEach((feld) => {
        feld.checkTeacher();
    });

}

