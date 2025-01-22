var flipchart = document.getElementById("Spielfeld");
    var papier = flipchart.getContext("2d");
Spielfeldzeichnen = function(){
    var verschub = 100;
    let eins 
    let zwei 
    for(let i=1; i < 6; i= i+1){
        if(i % 2 == 0){
            eins = "green"
            zwei = "lightgreen"
        }else{
            eins = "lightgreen"
            zwei = "green"  
        }
        for(let j=1;j<10; j=j+1){
            if(j % 2 == 0){
                papier.fillStyle = eins
                papier.fillRect((j* 100+verschub), (i*100 + verschub),100,100)
            }
            else if(j % 2 != 0){
                papier.fillStyle = zwei
                papier.fillRect((j* 100+verschub), (i*100 + verschub),100,100)
            }
            }
        }

        papier.fillStyle = "black"
        papier.strokeRect(200,30,350,100)
        papier.strokeRect(300,30,0.1,100)
        papier.strokeRect(1000,1,100,50)
        papier.font = "bold 35px Arial";  // Hier können Sie die Schriftart und -größe definieren
        papier.fillText("Menü", 1004, 37)

    }
   /* for(let i=2; i < 6; i= i+2){
        for(let j=1;j<10; j=j+2){
        papier.fillStyle = "blue"
        papier.fillRect((j* 100), (i*100),100,100)
        }
    }
   // papier.fillStyle = "grey"
   // papier.fillRect(100,100,100,100)*/

Spielfeldzeichnen()