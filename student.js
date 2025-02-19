
export var kosten = new Map()
kosten.set("Geniesser", 150)
export var students = [];

export class Student {
    constructor(x,y, buyCooldown, healthPoints, attackCooldown, attackDamage) {
        this.x = x//field.getx()
        this.y = y //field.gety()
        
        this.buyCooldown = buyCooldown; 
        this.healthPoints = healthPoints; 
        this.attackCooldown = attackCooldown; 
        this.attackDamage = attackDamage; 
        this.projectiles = [];
        this.src1
        this.lastShot = Date.now(); 
    }

    detectEnemy = function(){
        /*let row = this.position.getRow(); 

        for (let j = 0; j < row.length; j++) { 
            if (row[j].hasEnemy) {
                this.shoot();
            }
        }*/
       this.shoot()
    } 

    shoot() {
        // Wird in Unterklassen implementiert
    }

    setHealthPoints = function(ctx){
        this.healthPoints = ctx;
    }


    getHealthPoints = function(){
        return this.healthPoints;
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
            console.log("Shoot");

            
            this.projectiles.push(new Projectile("/assets/cork.png", this.x+50, this.y+45, 1, 0.15,this)); // ToDo Übergabe Parameter müssen abhängig von der Position des Towers sein.

            this.lastShot = now;
        }
    }
}
var checkEnemy = 0;
export function studentUp(){
    this.students.forEach((student)=>{
        student.projectiles.forEach((proji) =>{
            proji.selfUpdatePosition();
        })
        if(checkEnemy >= 50){ // Nicht auf jeden Pixel überprüfen
            student.detectEnemy();
            checkEnemy = 0
        }else{
            checkEnemy ++
        }
        
    })
}

export function spawnGeniesser(x,y){
    students.push(new Geniesser(x,y, 1, 1, 1000, 1));
}






