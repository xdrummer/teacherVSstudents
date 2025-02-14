
export var teachers = [];
export var spawn_limit = 5; 


export class Teacher{
    constructor(healthPoints, speed){
        this.positionx = 1000;
        this.positiony = 200;
        this.detectRange = 10;
        this.healthPoints = healthPoints;
        this.attackCooldown;
        this.attackDamage;
        this.walking = true;
        this.speed = speed;


        this.bild = new Image();
        this.bild.src = "assets/test_teach.jpg";
    }


    detectSchüler = function(){
        
    }

    attack = function(){

    }

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



}



export function teachUpd(){

    teachers.forEach((teacher) => {
        teacher.walk();
    })


    console.log(teachers.length);
    console.log(teachers[0].positionx);


}


export function teach_create(){

    if(teachers.length < spawn_limit){
        teachers.push(new Teacher(100, 1));
    }

}