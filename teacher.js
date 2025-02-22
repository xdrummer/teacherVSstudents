import * as studi from "./student.js";
import * as spiel from "./Spielfeld.js";


// Speicherort aller momentan existierender Lehrer
export var teachers = [];

// Maximale Anzahl der Lehrer
export var spawn_limit = 1; 

export class Teacher{
    constructor(healthPoints, speed, attackCooldown, attackDamage){
        


        this.positionx = 1000;

        //zufällige horizontale Reihe als Laufbahn
        this.positiony = spiel.neuesfeld.getY(Math.floor(Math.random() * (6 - 1) + 1), 8)
        // Variable um den Lehrer zentrierter auf der Bahn schweben zu lassen
        this.center_gap = 10;
        //
        this.detectRange = 10;
        this.student_detected = false;
        this.healthPoints = healthPoints;
        this.attackCooldown = attackCooldown;
        this.attackDamage = attackDamage;
        this.walking = true;
        this.lastWalk = false;
        this.speed = speed;
        // zwischenspeicher 
        this.cache = attackCooldown;
        
        this.scale = 0.1;

        this.bild = new Image();
        this.bild.src = "assets/Jarre_zombie.png";

        this.bild.onload = () => {
            this.width = this.bild.width * this.scale;
            this.height = this.bild.height * this.scale;
        }
    }


    checkStudentStatus = function(){
        return this.student_detected;
    }    
    attack = function(){

        const now = Date.now();
        const nextField = Math.floor(this.positionx / 100)-2
        const row = (this.positiony-200)/100 + 1
        
        
        const indexOf = studi.students.indexOf(studi.students.find(sch=>sch.row==row && sch.fieldNumber == nextField))
        if (this.student_detected == true){
            
            if (now - this.cache >= this.attackCooldown) {
                studi.students[indexOf].setHealthPoints(studi.students[indexOf].getHealthPoints() - this.attackDamage)
    
                this.cache = now;
            }

        }

    }

    walk = function(){
        let fieldNumberNext = Math.floor(this.positionx / 100)-2
        
        
        if(fieldNumberNext<=0){
            fieldNumberNext = 0
        }
        if(spiel.neuesfeld.getfelder((this.positiony-200)/100 + 1)[fieldNumberNext].s == false ){
            this.walking = true
            this.lastWalk = false
            this.student_detected = false
        }else{
            this.walking = false
        }
        if(this.walking == true || this.lastWalk == true){
            this.positionx = this.positionx - this.speed;
            

        }
        if(this.walking == false){
            if((Math.floor(this.positionx / 100)-2)*100+220<this.positionx){
                this.lastWalk = true
            }else{
                this.student_detected = true
                this.lastWalk = false
            }
            
        }
        

    }

    hit = function(damage){

        // abziehen der Lebenspunkte (übergabe des Schadens)
        this.healthPoints = this.healthPoints - damage;

        // sind die Punkte 0 oder kleiner? => true: tot, splice
        if(this.healthPoints <= 0){
            this.die();
        }

    }


    die = function(){
        teachers.splice(teachers.indexOf(this), 1)
    }


    setPositionx = function(ctx){
        this.positionx = ctx;
    }

    setPositiony = function(ctx){
        this.positiony = ctx;
    }

    setHealthPoints = function(ctx){
        this.healthPoints = ctx;
    }

    setAttackCooldown = function(ctx){
        this.attackCooldown = ctx;
    }

    setAttackDamage = function(ctx){
        this.attackDamage = ctx;
    }

    changeWalking = function(){
        this.walking = !this.walking;
    }

    setSpeed = function(ctx){
        this.speed = ctx;
    }

    getPositionx = function(){
        return this.positionx;
    }

    getPositiony = function(){
        return this.positiony;
    }

    getCenterGap = function(){
        return this.center_gap;
    }

    getHeight = function(){
        return this.height;
    }

    getWidth = function(){
        return this.width;
    }

    getHealthPoints = function(){
        return this.healthPoints;
    }

    getHealthPoints = function(){
        return this.healthPoints;
    }

    getAttackCooldown = function(){
        return this.attackCooldown;
    }

    getAttackDamage = function(){
        return this.attackDamage;
    }

    getCache = function(){
        return this.cache;
    }


}


// despawn funktion, falls der Lehrer am ende der Bahn angekommen ist
export function teach_despawn(){
    teachers.forEach((teacher) => {
        if (teacher.positionx <= spiel.neuesfeld.getX(1,0) - teacher.width){
            teachers.splice(teachers.indexOf(teacher), 1)
        }
    })
}



export function teachUpd(){

    teachers.forEach((teacher) => {
        teacher.walk();
        if(teacher.checkStudentStatus()){
            teacher.attack();
        }
        

        /*if(teacher.getAttackCooldown() !== teacher.getCache()){
            teacher.setAttackCooldown(teacher.getAttackCooldown() - 1);
        }*/


    /*teachers[0].attack();*/

    });
    teach_despawn();
}


// erzeugen der Lehrer
export function teach_create(){

    // spawnlimit noch nicht erreicht (siehe oben)
    if(teachers.length < spawn_limit){
        // Parameter: healthPoints, Speed, AttackCooldown, AttackDamage
        teachers.push(new Teacher(100, 0.25, 1500, 50));                 
    }

    spiel.neuesfeld.getY(3,5);

}