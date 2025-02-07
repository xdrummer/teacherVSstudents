
export var teachers = [];
export var spawn_limit = 5; 


export class Teacher{
    constructor(healthPoints, speed){
        this.positionx;
        this.positiony;
        this.healthPoints = healthPoints;
        this.attackCooldown;
        this.attackDamage;
        this.walking == true;
        this.speed = speed;
    }


    detectSchüler = function(){
        
    }

    attack = function(){

    }

    walk = function(){
        
        if(this.walking == true){

            this.positionx = this.positionx + this.speed;

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


}


export function teach_create(){

    if(teachers.length < limit){

    }

}