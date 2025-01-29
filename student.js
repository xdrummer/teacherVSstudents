export var students = []

class Student{
    constructor(field, cost, buyCooldown, healthPoints, attackCooldown, attackDamage){
        this.position = field; // Feld 
        this.cost = cost;  // Int 
        this.buyCooldown = buyCooldown;  // Int in Sekunden
        this.healthPoints = healthPoints; // Int 
        this.attackCooldown = attackCooldown; // Int
        this.attackDamage = attackDamage;// Int
        this.projectiles = []
        this.src1
        this.lastShot = Date.now() // TimeStamp

    }

    detectEnemy = function(){
        let row = position.getRow();
        
        for(let j = 0; j<row.length(); i++ ){
            if(row[j].hasEnemy == true){
                this.shoot()
            }
        }

    } // ruft evtl. Shoot auf
    shoot = function(){
        
    }

}

export class Projectile{
    constructor(
        src2,x,y,v,s
    ){
        this.src2 = src2// Pfad zum Schuss

        this.cork = new Image()
        this.cork.src = src2
        
        this.x = x
        this.y = y
        this.speed = v

        this.scale = s
        this.width
        this.height
        this.cork.onload = () => {
            this.width = this.bild.width * this.scale;
            this.height = this.bild.height * this.scale;
        };
    }

    updatePosition = function(){
        this.x = x + speed;
    }
}


export class Geniesser extends Student{
    constructor(field, cost, buyCooldown, healthPoints, attackCooldown, attackDamage){
        super(field, cost, buyCooldown, healthPoints, attackCooldown, attackDamage)
        this.src1 //Pfad zum Skin
        
        
    

    
    }

    shoot = function(){
        const now = Date.now();
        console.log("Shoot aufgerufen")
        console.log(now-this.lastShot)
        console.log(this.attackCooldown)
        if(now-this.lastShot >= this.attackCooldown){ 
            console.log("Shoot")
            this.projectiles.push(new Projectile("/assets/cork.png"),50,50,0.5,0.15)
            this.lastShot = now;
        }
    }


}


students.push(new Geniesser(1,1,1,1,1,1))


window.setInterval(()=>{
    students[0].shoot()
},5000)