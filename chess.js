var l = 70;
var x = 8*l;
let grabbed = false;
let img;
let imgs=[];
let imgloaded=[];
let xpos=0;
let ypos = 0;
let droppable = false;
let turn = true;



function preload(){
    for(let i=0;i<letters.length;i++){
        imgs.push('img/w'+letters[i]+'.png');
        imgs.push('img/b'+letters[i]+'.png');
    }
    for(let i=0;i<imgs.length;i++){
        imgloaded.push(loadImage(imgs[i]));
    }
}

function setup() {
    createCanvas(x, x);
    setboard(); //Lecture du fen + création des pièces
}

function draw(){ // fonction salement définie mais respecte les ordres d'affichage (surlignage puis pièce puis règles puis ombre)
    initializeBoard(); //Echiquier
    if(grabbed){
        hovered(mouseX, mouseY);
    }
    for(var i=0;i<pieces.length;i++){
        if(grabbed){
            pieces[i].selected(mouseX, mouseY);
        }
        pieces[i].show(); //affichage des pièces
    }
    for(var i=0; i<pieces.length;i++){
        if(grabbed){
            pieces[i].rules(); // règles de déplacement
            pieces[i].shadow(mouseX,mouseY); //création d'une ombre pour le d&d
        }
    }
}


function mousePressed(){
    if (mouseButton === LEFT){
        for(var i=0; i<pieces.length; i++){
            pieces[i].clicked(mouseX, mouseY);
        }
        xpos=mouseX;
        ypos=mouseY; 
    }
}
function mouseReleased(){
    if(mouseButton === LEFT){
        grabbed = false;
        for(var i=0;i<pieces.length;i++){
            pieces[i].release(mouseX,mouseY);
        }
    }
}
