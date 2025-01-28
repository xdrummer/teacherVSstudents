class Student{
    constructor(field, cost, buyCooldown, healthPoints, attackCooldown, attackDamage){
        var position = field; // Feld 
        var cost = cost;  // Int 
        var buyCooldown = buyCooldown;  // Int in Sekunden
        var healthPoints = healthPoints; // Int 
        var attackCooldown = attackCooldown; // Int
        var attackDamage = attackDamage;// Int

        var src1
        var lastShot // TimeStamp

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

export class Geniesser extends Student{
    constructor(){
        this.src1 //Pfad zum Skin
        this.src2 = "/assets/cork.png"// Pfad zum Schuss

        this.cork = new Image()
        this.cork.src = src2
        
        this.x = Math.random() * (1000 - 200) + 200
        this.y = 200;
        this.speed = 0.5;

        this.scale = 0.15;

        this.cork.onload = () => {
            this.width = this.bild.width * this.scale;
            this.height = this.bild.height * this.scale;
        };
    

    
    }

    shoot = function(){
        const now = Date.now();

        if(now-this.lastShot > this.attackCooldown){ //TODO Hitboxen
            
            //TODO Move


            this.lastShot = now;
        }
    }


}