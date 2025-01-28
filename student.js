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
        this.lastShot // TimeStamp

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
        this.src2 = src// Pfad zum Schuss

        this.cork = new Image()
        this.cork.src = src2
        
        this.x = x
        this.y = y
        this.speed = v

        this.scale = s

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
    constructor(){
        this.src1 //Pfad zum Skin
        
        
    

    
    }

    shoot = function(){
        const now = Date.now();

        if(now-this.lastShot > this.attackCooldown){ 
            this.projectiles.push(new Projectile("/assets/cork.png"))
            this.lastShot = now;
        }
    }


}