export var kosten = new Map()
kosten.set("Geniesser", 150)
kosten.set("Drucker", 350)
kosten.set("Rahdnut", 200)
export var students = [];
import * as spielF from "./Spielfeld.js";
import * as teach from "./teacher.js";
import * as cur from "./currency.js";

export class Student {
    constructor(x,y, buyCooldown, healthPoints, attackCooldown, attackDamage) {
        this.x = x
        this.y = y
        this.row = Math.round((this.y-200)/100 + 1)
        this.fieldNumber = Math.floor(this.x / 100)-2
        this.buyCooldown = buyCooldown; 
        this.healthPoints = healthPoints; 
        this.attackCooldown = attackCooldown; 
        this.attackDamage = attackDamage; 
        this.projectiles = [];
        this.src1
        this.lastShot = Date.now(); 
        
        
    }

    detectEnemy = function(){
        console.log("Detect aufgerufen")
        
        if(spielF.neuesfeld.getfelder(this.row)[9]==true){
            this.shoot()
        }
      
    } 

    shoot() {
        // Wird in Unterklassen implementiert
    }

    switch_frames(){

    }

    generate(){

    }

    setHealthPoints = function(ctx){
        this.healthPoints = ctx;
    }


    getHealthPoints = function(){
        return this.healthPoints;
    }

    despawn = function(){
        let rowArray = spielF.neuesfeld.getfelder(this.row)
        students.splice(students.indexOf(this),1)
        
        rowArray[this.fieldNumber].s = false;
    }

    getProjectiles = function(){
        return this.projectiles;
    }

    getAttackDamage = function(){
        return this.attackDamage;
    }
}

export class Projectile {
    constructor(src2, x, y, v, s, student) {
        this.src2 = src2;
        this.student = student
        this.x = x;
        this.y = y;
        this.speed = v;
        this.scale = s;
        this.width = 0;
        this.height = 0;
        this.cork = new Image();
        this.cork.src = this.src2;

        this.cork.onload = () => {
            this.width = this.cork.width * this.scale;
            this.height = this.cork.height * this.scale;
        };
    }

    selfUpdatePosition() {
        if(this.x<=1100){
            this.x += this.speed;
            this.speed = this.speed * 1.002
            this.y = this.y - 0.05
        }else{
            this.delete()
        }
        
    }

    delete = function(){
        this.student.projectiles.splice(this.student.projectiles.indexOf(this),1)
    } //ToDo Sich selbst aus dem Array entfernen


    getParent = function(){
        let return_value;
        students.forEach((student) => {
            if(student.getProjectiles().includes(this)){
                return_value = student;
            }
        })

        return return_value;
    }


    check_hit = function(){
        teach.teachers.forEach((teacher) => {
            if((this.x + (this.width - 30) >= teacher.getPositionx() && this.x + (this.width - 30) <= teacher.getPositionx() + teacher.getWidth()) && (this.y >= teacher.getPositiony() && this.y <= teacher.getPositiony() + teacher.getHeight())){
                teacher.hit(this.getParent().getAttackDamage());
                this.delete();

            }
        });
    }


}

export class Geniesser extends Student {
    constructor(x,y,  buyCooldown, healthPoints, attackCooldown, attackDamage) {
        super(x,y, buyCooldown, healthPoints, attackCooldown, attackDamage);
        this.src1 = "/assets/geniesser.png"; //ToDo Komplettes Design muss ergänzt werden 
        // ToDo Animation etc. 
        this.skin = new Image()
        this.skin.src = this.src1;


        
    }

    shoot() {
        const now = Date.now();
        /*console.log("Shoot aufgerufen");
        console.log(now - this.lastShot);
        console.log(this.attackCooldown);*/

        if (now - this.lastShot >= this.attackCooldown) {
            

            
            this.projectiles.push(new Projectile("/assets/cork.png", this.x+50, this.y+45, 1, 0.15,this)); // ToDo Übergabe Parameter müssen abhängig von der Position des Towers sein.

            this.lastShot = now;
        }
    }
}
export class Rahdnut extends Student {
    constructor(x,y,  buyCooldown, healthPoints, attackCooldown, attackDamage) {
        super(x,y, buyCooldown, healthPoints, attackCooldown, attackDamage);
        this.src1 = "/assets/rahdnut.png"; //ToDo Komplettes Design muss ergänzt werden 
        // ToDo Animation etc. 
        this.skin = new Image()
        this.skin.src = this.src1;


        
    }
}


export class Drucker extends Student {
    constructor(x,y,  buyCooldown, healthPoints, attackCooldown){
        super(x,y, buyCooldown, healthPoints, attackCooldown);
        this.src1 = "/assets/printer_frame1.png";
        this.src2 = "/assets/printer_frame2.png";

        this.skin = new Image();
        this.skin.src = this.src1;

        this.lastPrint = Date.now();

        this.frameswitched = false;

    }

    switch_frames = function(){
        
        if(this.frameswitched == false){
            this.skin.src = this.src2;

        }else{
            this.skin.src = this.src1;

        }
        console.log(this.frameswitched)
        this.frameswitched =!(this.frameswitched);

    }


    generate = function(){

        let now = Date.now();

        if(now - this.lastPrint >= this.attackCooldown){

            console.log("printed");
            cur.currencies.push(new cur.Currency(this.x, this.y+20));

            this.lastPrint = now;

            this.switch_frames();
        }

        

    }

}

export function studentUp(){
    this.students.forEach((student)=>{
        student.projectiles.forEach((proji) =>{
            proji.selfUpdatePosition();
            proji.check_hit();
        })
        student.detectEnemy()
        if(student.getHealthPoints()<=0){
            student.despawn()
        }
    })

    this.students.forEach((printer) =>{
        printer.generate();
    })
}

export function spawnGeniesser(x,y){
    // x, y, buyCooldown, healthPoints, attackCooldown, attackDamage
    students.push(new Geniesser(x,y, 1, 250, 2000, 20));
}
export function spawnDrucker(x,y){
    // x, y, buyCooldown, healthPoints, attackCooldown / Printcooldown, attackDamage
    students.push(new Drucker(x,y, 1, 150, 5000, 0));
}
export function spawnRahdnut(x,y){
    // x, y, buyCooldown, healthPoints, attackCooldown / Printcooldown, attackDamage
    students.push(new Rahdnut(x,y, 1, 500, 5000, 0));
}






