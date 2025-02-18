import * as studi from "./student.js";
import * as spiel from "./Spielfeld.js";



export var teachers = [];
export var spawn_limit = 5; 

export class Teacher{
    constructor(healthPoints, speed, attackCooldown, attackDamage){
        


        this.positionx = 1000;
        this.positiony = spiel.neuesfeld.getY(Math.floor(Math.random() * (5 - 1) + 1), 8)
        this.detectRange = 10;
        this.student_detected = false;
        this.field = 
        this.healthPoints = healthPoints;
        this.attackCooldown = attackCooldown;
        this.attackDamage = attackDamage;
        this.walking = true;
        this.speed = speed;
        this.cache = attackCooldown;
    
        this.scale = 0.1;

        this.bild = new Image();
        this.bild.src = "assets/teacher-jarre.png";

        this.bild.onload = () => {
            this.width = this.bild.width * this.scale;
            this.height = this.bild.height * this.scale;
        }
    }


    /*detectSchüler = function(){
        teachers.forEach((teacher) => {
            
        })
    }

    attack = function(){

        if (this.student_detected == true){

            if (this.attackCooldown == 0){

                studi.students[0].setHealthPoints(studi.students[0].getHealthPoints() - this.attackDamage);

                this.attackCooldown = cache;

            }

        }

    }*/

    walk = function(){
        
        if(this.walking == true){

            this.positionx = this.positionx - this.speed;

        }

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



export function teachUpd(){

    teachers.forEach((teacher) => {
        teacher.walk();
        console.log(teacher.positionx);

        /*if(teacher.getAttackCooldown() !== teacher.getCache()){
            teacher.setAttackCooldown(teacher.getAttackCooldown() - 1);
        }*/
    })

    /*teachers[0].attack();*/


}


export function teach_create(){

    if(teachers.length < spawn_limit){
        teachers.push(new Teacher(100, 1, 150, 50));
    }

    spiel.neuesfeld.getY(3,5);

}