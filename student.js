export var students = [];

class Student {
    constructor(field, cost, buyCooldown, healthPoints, attackCooldown, attackDamage) {
        this.position = field; // Feld
        this.cost = cost; // Int
        this.buyCooldown = buyCooldown; // Int in Sekunden
        this.healthPoints = healthPoints; // Int
        this.attackCooldown = attackCooldown; // Int
        this.attackDamage = attackDamage; // Int
        this.projectiles = [];
        this.src1 = ""; // Initialisiere als leerer String
        this.lastShot = Date.now(); // Timestamp
    }

    detectEnemy() {
        let row = this.position.getRow(); // `this.` hinzugefügt

        for (let j = 0; j < row.length; j++) { // `i++` zu `j++` korrigiert
            if (row[j].hasEnemy) {
                this.shoot();
            }
        }
    }

    shoot() {
        // Wird in Unterklassen implementiert
    }
}

export class Projectile {
    constructor(src2, x, y, v, s) {
        this.src2 = src2;
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
        this.x += this.speed;
    }
}

export class Geniesser extends Student {
    constructor(field, cost, buyCooldown, healthPoints, attackCooldown, attackDamage) {
        super(field, cost, buyCooldown, healthPoints, attackCooldown, attackDamage);
        this.src1 = ""; // Pfad zum Skin initialisieren
    }

    shoot() {
        const now = Date.now();
        console.log("Shoot aufgerufen");
        console.log(now - this.lastShot);
        console.log(this.attackCooldown);

        if (now - this.lastShot >= this.attackCooldown) {
            console.log("Shoot");

            // **Fix**: `new Projectile` richtig aufrufen
            this.projectiles.push(new Projectile("/assets/cork.png", 50, 50, 0.5, 0.15));

            this.lastShot = now;
        }
    }
}

export function studentUp(){
    this.students.forEach((student)=>{
        student.projectiles.forEach((proji) =>{
            proji.selfUpdatePosition();
        })
    })
}


// **Student hinzufügen**
students.push(new Geniesser(1, 1, 1, 1, 1000, 1)); // `attackCooldown` realistisch gesetzt

// **Schießen alle 5 Sekunden**
window.setInterval(() => {
    students[0].shoot();
}, 5000);
