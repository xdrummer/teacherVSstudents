export var students = [];

export class Student {
    constructor(field, cost, buyCooldown, healthPoints, attackCooldown, attackDamage) {
        this.position = field; 
        this.cost = cost;
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
        }else{
            this.delete()
        }
        
    }

    delete = function(){
        this.student.projectiles.splice(this.student.projectiles.indexOf(this),1)
    } //ToDo Sich selbst aus dem Array entfernen
}

export class Geniesser extends Student {
    constructor(field, cost, buyCooldown, healthPoints, attackCooldown, attackDamage) {
        super(field, cost, buyCooldown, healthPoints, attackCooldown, attackDamage);
        this.src1 = "/assets/geniesser.png"; //ToDo Komplettes Design muss ergänzt werden 
        // ToDo Animation etc. 
    }

    shoot() {
        const now = Date.now();
        console.log("Shoot aufgerufen");
        console.log(now - this.lastShot);
        console.log(this.attackCooldown);

        if (now - this.lastShot >= this.attackCooldown) {
            console.log("Shoot");

            
            this.projectiles.push(new Projectile("/assets/cork.png", this.x, this.y+25, 1, 0.15,this)); // ToDo Übergabe Parameter müssen abhängig von der Position des Towers sein.

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



students.push(new Geniesser(1, 1, 1, 1, 1000, 1)); // ToDo: --> das muss ihm später gesagt werden, wo er hin gesetzt wird. 




