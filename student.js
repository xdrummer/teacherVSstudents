class Student{
    constructor(field, cost, buyCooldown, healthPoints, attackCooldown, attackDamage){
        var position = field; // Feld 
        var cost = cost;  // Int 
        var buyCooldown = buyCooldown;  // Int in Sekunden
        var healthPoints = healthPoints; // Int 
        var attackCooldown = attackCooldown; // Int
        var attackDamage = attackDamage;// Int

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
        const now = Date.now();

        if(now-this.lastShot > this.attackCooldown){
            console.log("Schuss")
            this.lastShot = now;
        }
    }

}

export class Mika extends Student{
    constructor(){
        this.img = //Pfad
    }
}