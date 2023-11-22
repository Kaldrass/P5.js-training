let pieces=[];
let moves=[];
let xabs = 'abcdefgh';
let letters=['p','k','q','b','n','r'];
let fen='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
let board=[];
let column = 0;
let line = 0;
let score = 0;
let wcheck = false;
let ep = [[NaN,NaN,false]];
let bcheck = false;
let eatenpieces=[];
let piecesvalues=[['p',-1],['n',-3],['b',-3],['r',-5],['q',-9],['k',-Infinity]];
class piece {
    constructor(color,letter,x,y,value) {
        this.color = color;
        this.letter = letter;
        this.x = x;
        this.y = y;
        this.value = value;
    }
    show(){
        image(imgloaded[imgs.indexOf('img/'+this.color+this.letter+'.png')], l*this.x,l*this.y,l,l);
    }

    clicked(px, py){ 
        let dx = abs((this.x+0.5)*l-px);
        let dy = abs((this.y+0.5)*l-py);
        // turn == true ==> aux blancs de jouer
        // turn == false ==> aux noirs de jouer
        if((dx<(l/2))&&(dy<(l/2))){
            if(turn==true && this.color == 'w'){
                grabbed=true;
            }
            else if(turn == false && this.color == 'b'){
                grabbed=true;
            }
        } 
    }
    selected(){
        let selectedcolor = color(243,255,51,128);
        let cx = abs((this.x+0.5)*l-xpos);
        let cy = abs((this.y+0.5)*l-ypos);
        if((cx<(l/2))&&(cy<(l/2))){
            noStroke();
            fill(selectedcolor);
            rect(this.x*l,this.y*l,l,l);
        }
        
    }
    shadow(px,py){
        let dx = abs((this.x+0.5)*l-xpos);
        let dy = abs((this.y+0.5)*l-ypos);
        px = constrain(mouseX, l/2, x-l/2);
        py = constrain(mouseY, l/2, x-l/2);
        if((dx<(l/2))&&(dy<(l/2))){ // Une pièce est sélectionnée
            image(imgloaded[imgs.indexOf('img/'+this.color+this.letter+'.png')],px-l/2,py-l/2,l,l);
        }
    }
    rules(){
        let dx = abs((this.x+0.5)*l-xpos);
        let dy = abs((this.y+0.5)*l-ypos);
        if((dx<(l/2))&&(dy<(l/2))){ // Si on a bien sélectionné une seule pièce
// ---------------------------------------------------------------------------- *Black Pawn
            if((this.letter=='p')&&(this.color == 'b')){ // Pion Noir
                let leftx=constrain(this.x-1,0,7);
                let rightx=constrain(this.x+1,0,7);
                if(this.y==1){
                    fill('#Adadad');
                    for(let j=2;j<4;j++){
                        if(board[j][this.x][0]!=0){  // Si on rencontre une pièce
                            break;                   // On stoppe la boucle
                        }
                        else{
                            fill('#Adadad'); 
                            ellipse((this.x+0.5)*l,(j+0.5)*l,l/4);
                            board[j][this.x][1]=true;
                        }
                    }
                    if(leftx>=0 && rightx<=7){
                        if(Math.sign(board[this.y+1][leftx][0])==-Math.sign(this.value)){
                            fill('#Adadad'); 
                            ellipse((leftx+0.5)*l,(this.y+1.5)*l,l/4);
                            board[this.y+1][leftx][1]=true;
                        }
                        if(Math.sign(board[this.y+1][rightx][0])==-Math.sign(this.value)){
                            fill('#Adadad');
                            ellipse((rightx+0.5)*l,(this.y+1.5)*l,l/4);
                            board[this.y+1][rightx][1]=true;
                        }
                    }
                    else if(leftx < 0){
                        if(Math.sign(board[this.y+1][rightx][0])==-Math.sign(this.value)){
                            fill('#Adadad');
                            ellipse((rightx+0.5)*l,(this.y+1.5)*l,l/4);
                            board[this.y+1][rightx][1]=true;
                        }
                    }
                    else if(rightx > 7){
                        if(Math.sign(board[this.y+1][leftx][0])==-Math.sign(this.value)){
                            fill('#Adadad');
                            ellipse((leftx+0.5)*l,(this.y+1.5)*l,l/4);
                            board[this.y+1][leftx][1]=true;
                        }
                    }
                }
                else if(this.y<7){
                    if(board[this.y+1][this.x][0]==0){  // Si on ne rencontre pas de  pièce
                        fill('#Adadad'); 
                        ellipse((this.x+0.5)*l,(this.y+1.5)*l,l/4);
                        board[this.y+1][this.x][1]=true;
                    }
                    //On fait ici la prise *en passant
                    if(this.y==4 && board[this.y][rightx][0]==1){ // si un pion est à droite de la pièce et qu'il est susceptible de se faire prendre en passant
                        if (ep[ep.length-1][0] == rightx && ep[ep.length-1][1] == this.y && ep[ep.length-1][2] == true){
                            fill('#Adadad'); 
                            ellipse((rightx+0.5)*l,(this.y+1.5)*l,l/4);
                            board[this.y+1][rightx][1]=true;
                        } 
                    }
                    if(this.y==4 && board[this.y][leftx][0]==1){ // si un pion est à gauche de la pièce et qu'il est susceptible de se faire prendre en passant
                        if (ep[ep.length-1][0] == leftx && ep[ep.length-1][1] == this.y && ep[ep.length-1][2] == true){
                            fill('#Adadad'); 
                            ellipse((leftx+0.5)*l,(this.y+1.5)*l,l/4);
                            board[this.y+1][leftx][1]=true;
                        } 
                    }
                    if(leftx>=0 && rightx<=7){
                        if(Math.sign(board[this.y+1][leftx][0])==-Math.sign(this.value)){
                            fill('#Adadad'); 
                            ellipse((leftx+0.5)*l,(this.y+1.5)*l,l/4);
                            board[this.y+1][leftx][1]=true;
                        }
                        if(Math.sign(board[this.y+1][rightx][0])==-Math.sign(this.value)){
                            fill('#Adadad');
                            ellipse((rightx+0.5)*l,(this.y+1.5)*l,l/4);
                            board[this.y+1][rightx][1]=true;
                        }
                    }
                    else if(leftx < 0){
                        if(Math.sign(board[this.y+1][rightx][0])==-Math.sign(this.value)){
                            fill('#Adadad');
                            ellipse((rightx+0.5)*l,(this.y+1.5)*l,l/4);
                            board[this.y+1][rightx][1]=true;
                        }
                    }
                    else if(rightx > 7){
                        if(Math.sign(board[this.y+1][leftx][0])==-Math.sign(this.value)){
                            fill('#Adadad');
                            ellipse((leftx+0.5)*l,(this.y+1.5)*l,l/4);
                            board[this.y+1][leftx][1]=true;
                        }
                    }
                }
            }
// ---------------------------------------------------------------------------- *White Pawn

            else if((this.letter=='p')&&(this.color == 'w')){ // Pion Blanc
                let leftx=constrain(this.x-1,0,7);
                let rightx=constrain(this.x+1,0,7);
                if(this.y==6){
                    fill('#Adadad');
                    for(let j=1;j<3;j++){
                        if(board[this.y-j][this.x][0]!=0){  // Si on rencontre une pièce
                            break;                   // On stoppe la boucle
                        }
                        else{
                            fill('#Adadad'); 
                            ellipse((this.x+0.5)*l,(this.y-j+0.5)*l,l/4);
                            board[this.y-j][this.x][1]=true;
                        }
                    }
                    if(leftx>=0 && rightx<=7){
                        if(Math.sign(board[this.y-1][leftx][0])==-Math.sign(this.value)){
                            fill('#Adadad'); 
                            ellipse((leftx+0.5)*l,(this.y-0.5)*l,l/4);
                            board[this.y-1][leftx][1]=true;
                        }
                        if(Math.sign(board[this.y-1][rightx][0])==-Math.sign(this.value)){
                            fill('#Adadad');
                            ellipse((rightx+0.5)*l,(this.y-0.5)*l,l/4);
                            board[this.y-1][rightx][1]=true;
                        }
                    }
                    else if(leftx < 0){
                        if(Math.sign(board[this.y-1][rightx][0])==-Math.sign(this.value)){
                            fill('#Adadad');
                            ellipse((rightx+0.5)*l,(this.y-0.5)*l,l/4);
                            board[this.y-1][rightx][1]=true;
                        }
                    }
                    else if(rightx > 7){
                        if(Math.sign(board[this.y-1][leftx][0])==-Math.sign(this.value)){
                            fill('#Adadad');
                            ellipse((leftx+0.5)*l,(this.y-0.5)*l,l/4);
                            board[this.y-1][leftx][1]=true;
                        }
                    }
                }
                else if(this.y>0){
                    if(board[this.y-1][this.x][0]==0){  // Si on ne rencontre pas de  pièce
                        fill('#Adadad'); 
                        ellipse((this.x+0.5)*l,(this.y-0.5)*l,l/4);
                        board[this.y-1][this.x][1]=true;
                    }
                     //On fait ici la prise *en passant
                     if(this.y==3 && board[this.y][rightx][0]==-1){ // si un pion est à droite de la pièce et qu'il est susceptible de se faire prendre en passant
                        if (ep[ep.length-1][0] == rightx && ep[ep.length-1][1] == this.y && ep[ep.length-1][2] == true){
                            fill('#Adadad'); 
                            ellipse((rightx+0.5)*l,(this.y-0.5)*l,l/4);
                            board[this.y-1][rightx][1]=true;
                        } 
                    }
                    if(this.y==3 && board[this.y][leftx][0]==-1){ // si un pion est à gauche de la pièce et qu'il est susceptible de se faire prendre en passant
                        if (ep[ep.length-1][0] == leftx && ep[ep.length-1][1] == this.y && ep[ep.length-1][2] == true){
                            fill('#Adadad'); 
                            ellipse((leftx+0.5)*l,(this.y-0.5)*l,l/4);
                            board[this.y-1][leftx][1]=true;
                        } 
                    }
                    if(leftx>=0 && rightx<=7){
                        if(Math.sign(board[this.y-1][leftx][0])==-Math.sign(this.value)){
                            fill('#Adadad'); 
                            ellipse((leftx+0.5)*l,(this.y-0.5)*l,l/4);
                            board[this.y-1][leftx][1]=true;
                        }
                        if(Math.sign(board[this.y-1][rightx][0])==-Math.sign(this.value)){
                            fill('#Adadad');
                            ellipse((rightx+0.5)*l,(this.y-0.5)*l,l/4);
                            board[this.y-1][rightx][1]=true;
                        }
                    }
                    else if(leftx < 0){
                        if(Math.sign(board[this.y-1][rightx][0])==-Math.sign(this.value)){
                            fill('#Adadad');
                            ellipse((rightx+0.5)*l,(this.y-0.5)*l,l/4);
                            board[this.y-1][rightx][1]=true;
                        }
                    }
                    else if(rightx > 7){
                        if(Math.sign(board[this.y-1][leftx][0])==-Math.sign(this.value)){
                            fill('#Adadad');
                            ellipse((leftx+0.5)*l,(this.y-0.5)*l,l/4);
                            board[this.y-1][leftx][1]=true;
                        }
                    }
                }
            }
// ---------------------------------------------------------------------------- *Rook
            else if(this.letter == 'r'){
                for(let i=this.x-1;i>=0;i--){ //recherche par lignes depuis l'objet vers la gauche
                    if(Math.sign(board[this.y][i][0])==-Math.sign(this.value)){//si la pièce est de couleur différente
                        fill('#Adadad'); 
                        ellipse((i+0.5)*l,(this.y+0.5)*l,l/4);
                        board[this.y][i][1]=true;
                        break;    
                    }
                    else if(board[this.y][i][0]!=0){  // Si on rencontre une pièce
                        break;
                    }
                    else{
                        fill('#Adadad'); 
                        ellipse((i+0.5)*l,(this.y+0.5)*l,l/4);
                        board[this.y][i][1]=true;
                    }
                }
                for(let i=this.x+1;i<board.length;i++){ //recherche par lignes depuis l'objet vers la droite
                    if(Math.sign(board[this.y][i][0])==-Math.sign(this.value)){ //si la pièce est de couleur différente
                        fill('#Adadad'); 
                        ellipse((i+0.5)*l,(this.y+0.5)*l,l/4);
                        board[this.y][i][1]=true;
                        break;    
                    }
                    else if(board[this.y][i][0]!=0){  // Si on rencontre une pièce
                        break;
                    }
                    else{
                        fill('#Adadad'); 
                        ellipse((i+0.5)*l,(this.y+0.5)*l,l/4);
                        board[this.y][i][1]=true;
                    }
                }
                for(let j=this.y+1;j<board.length;j++){ // recherche par colonnes depuis l'objet vers le bas
                    if(Math.sign(board[j][this.x][0])==-Math.sign(this.value)){ //si la pièce est de couleur différente
                        fill('#Adadad'); 
                        ellipse((this.x+0.5)*l,(j+0.5)*l,l/4);
                        board[j][this.x][1]=true;
                        break;
                    }
                    else if(board[j][this.x][0]!=0){ //On rencontre une pièce
                        break;
                    }
                    else{
                        fill('#Adadad'); 
                        ellipse((this.x+0.5)*l,(j+0.5)*l,l/4);
                        board[j][this.x][1]=true;
                    }
                }
                for(let j=this.y-1;j>=0;j--){ // recherche par colonnes depuis l'objet vers le haut
                    if(Math.sign(board[j][this.x][0])==-Math.sign(this.value)){//si la pièce est de couleur différente
                        fill('#Adadad'); 
                        ellipse((this.x+0.5)*l,(j+0.5)*l,l/4);
                        board[j][this.x][1]=true;
                        break;
                    }
                    else if(board[j][this.x][0]!=0){ //On rencontre une pièce
                        break;
                    }
                    else{
                        fill('#Adadad'); 
                        ellipse((this.x+0.5)*l,(j+0.5)*l,l/4);
                        board[j][this.x][1]=true;
                    }
                }
            } 
// ---------------------------------------------------------------------------- *Bishop
            else if(this.letter == 'b'){
                let ndiag = this.x - this.y;
                let pdiag = this.x + this.y
                ddp:
                for(let i=this.x+1; i<board.length; i++){  // diagonale droite   /
                    for(let j=this.y-1; j>=0; j--){        // positive          
                        if(i+j == pdiag){
                            if(Math.sign(board[j][i][0])==-Math.sign(this.value)){//si la pièce est de couleur différente
                                fill('#Adadad'); 
                                ellipse((i+0.5)*l,(j+0.5)*l,l/4);
                                board[j][i][1]=true;
                                break ddp;
                            }
                            else if(board[j][i][0]!=0){ //On rencontre une pièce
                                break ddp;
                            }
                            else{
                                fill('#Adadad'); 
                                ellipse((i+0.5)*l,(j+0.5)*l,l/4);
                                board[j][i][1]=true;
                            }
                        }
                    }
                }
                ddn:
                for(let i=this.x+1; i<board.length; i++){            // diagonale droite   
                    for(let j=this.y+1; j<board.length; j++){        // negative           \
                        if(i-j == ndiag){
                            if(Math.sign(board[j][i][0])==-Math.sign(this.value)){//si la pièce est de couleur différente
                                fill('#Adadad'); 
                                ellipse((i+0.5)*l,(j+0.5)*l,l/4);
                                board[j][i][1]=true;
                                break ddn;
                            }
                            else if(board[j][i][0]!=0){ //On rencontre une pièce

                                break ddn;
                            }
                            else{
                                fill('#Adadad'); 
                                ellipse((i+0.5)*l,(j+0.5)*l,l/4);
                                board[j][i][1]=true;
                            }
                        }
                    }
                }
                dgp:
                for(let i=this.x-1; i>=0; i--){                      // diagonale gauche   
                    for(let j=this.y+1; j<board.length; j++){        // positive          /
                        if(i+j == pdiag){
                            if(Math.sign(board[j][i][0])==-Math.sign(this.value)){//si la pièce est de couleur différente
                                fill('#Adadad'); 
                                ellipse((i+0.5)*l,(j+0.5)*l,l/4);
                                board[j][i][1]=true;
                                break dgp;
                            }
                            else if(board[j][i][0]!=0){ //On rencontre une pièce
                                break dgp;
                            }
                            else{
                                fill('#Adadad'); 
                                ellipse((i+0.5)*l,(j+0.5)*l,l/4);
                                board[j][i][1]=true;
                            }
                        }
                    }
                }
                dgn:
                for(let i=this.x-1; i>=0; i--){            // diagonale gauche   \
                    for(let j=this.y-1; j>=0; j--){        // négative          
                        if(i-j == ndiag){
                            if(Math.sign(board[j][i][0])==-Math.sign(this.value)){//si la pièce est de couleur différente
                                fill('#Adadad'); 
                                ellipse((i+0.5)*l,(j+0.5)*l,l/4);
                                board[j][i][1]=true;
                                break dgn;
                            }
                            else if(board[j][i][0]!=0){ //On rencontre une pièce
                                break dgn;
                            }
                            else{
                                fill('#Adadad'); 
                                ellipse((i+0.5)*l,(j+0.5)*l,l/4);
                                board[j][i][1]=true;
                            }
                        }
                    }
                }
            }
// ---------------------------------------------------------------------------- *Queen
            else if(this.letter == 'q'){
                let ndiag = this.x - this.y;
                let pdiag = this.x + this.y
                for(let i=this.x-1;i>=0;i--){ //recherche par lignes depuis l'objet vers la gauche
                    if(Math.sign(board[this.y][i][0])==-Math.sign(this.value)){//si la pièce est de couleur différente
                        fill('#Adadad'); 
                        ellipse((i+0.5)*l,(this.y+0.5)*l,l/4);
                        board[this.y][i][1]=true;
                        break;    
                    }
                    else if(board[this.y][i][0]!=0){  // Si on rencontre une pièce
                        break;
                    }
                    else{
                        fill('#Adadad'); 
                        ellipse((i+0.5)*l,(this.y+0.5)*l,l/4);
                        board[this.y][i][1]=true;
                    }
                }
                for(let i=this.x+1;i<board.length;i++){ //recherche par lignes depuis l'objet vers la droite
                    if(Math.sign(board[this.y][i][0])==-Math.sign(this.value)){ //si la pièce est de couleur différente
                        fill('#Adadad'); 
                        ellipse((i+0.5)*l,(this.y+0.5)*l,l/4);
                        board[this.y][i][1]=true;
                        break;    
                    }
                    else if(board[this.y][i][0]!=0){  // Si on rencontre une pièce
                        break;
                    }
                    else{
                        fill('#Adadad'); 
                        ellipse((i+0.5)*l,(this.y+0.5)*l,l/4);
                        board[this.y][i][1]=true;
                    }
                }
                for(let j=this.y+1;j<board.length;j++){ // recherche par colonnes depuis l'objet vers le bas
                    if(Math.sign(board[j][this.x][0])==-Math.sign(this.value)){ //si la pièce est de couleur différente
                        fill('#Adadad'); 
                        ellipse((this.x+0.5)*l,(j+0.5)*l,l/4);
                        board[j][this.x][1]=true;
                        break;
                    }
                    else if(board[j][this.x][0]!=0){ //On rencontre une pièce
                        break;
                    }
                    else{
                        fill('#Adadad'); 
                        ellipse((this.x+0.5)*l,(j+0.5)*l,l/4);
                        board[j][this.x][1]=true;
                    }
                }
                for(let j=this.y-1;j>=0;j--){ // recherche par colonnes depuis l'objet vers le haut
                    if(Math.sign(board[j][this.x][0])==-Math.sign(this.value)){//si la pièce est de couleur différente
                        fill('#Adadad'); 
                        ellipse((this.x+0.5)*l,(j+0.5)*l,l/4);
                        board[j][this.x][1]=true;
                        break;
                    }
                    else if(board[j][this.x][0]!=0){ //On rencontre une pièce
                        break;
                    }
                    else{
                        fill('#Adadad'); 
                        ellipse((this.x+0.5)*l,(j+0.5)*l,l/4);
                        board[j][this.x][1]=true;
                    }
                }
                ddp:
                for(let i=this.x+1; i<board.length; i++){  // diagonale droite   /
                    for(let j=this.y-1; j>=0; j--){        // positive          
                        if(i+j == pdiag){
                            if(Math.sign(board[j][i][0])==-Math.sign(this.value)){//si la pièce est de couleur différente
                                fill('#Adadad'); 
                                ellipse((i+0.5)*l,(j+0.5)*l,l/4);
                                board[j][i][1]=true;
                                break ddp;
                            }
                            else if(board[j][i][0]!=0){ //On rencontre une pièce
                                break ddp;
                            }
                            else{
                                fill('#Adadad'); 
                                ellipse((i+0.5)*l,(j+0.5)*l,l/4);
                                board[j][i][1]=true;
                            }
                        }
                    }
                }
                ddn:
                for(let i=this.x+1; i<board.length; i++){            // diagonale droite   
                    for(let j=this.y+1; j<board.length; j++){        // negative           \
                        if(i-j == ndiag){
                            if(Math.sign(board[j][i][0])==-Math.sign(this.value)){//si la pièce est de couleur différente
                                fill('#Adadad'); 
                                ellipse((i+0.5)*l,(j+0.5)*l,l/4);
                                board[j][i][1]=true;
                                break ddn;
                            }
                            else if(board[j][i][0]!=0){ //On rencontre une pièce

                                break ddn;
                            }
                            else{
                                fill('#Adadad'); 
                                ellipse((i+0.5)*l,(j+0.5)*l,l/4);
                                board[j][i][1]=true;
                            }
                        }
                    }
                }
                dgp:
                for(let i=this.x-1; i>=0; i--){                      // diagonale gauche   
                    for(let j=this.y+1; j<board.length; j++){        // positive          /
                        if(i+j == pdiag){
                            if(Math.sign(board[j][i][0])==-Math.sign(this.value)){//si la pièce est de couleur différente
                                fill('#Adadad'); 
                                ellipse((i+0.5)*l,(j+0.5)*l,l/4);
                                board[j][i][1]=true;
                                break dgp;
                            }
                            else if(board[j][i][0]!=0){ //On rencontre une pièce
                                break dgp;
                            }
                            else{
                                fill('#Adadad'); 
                                ellipse((i+0.5)*l,(j+0.5)*l,l/4);
                                board[j][i][1]=true;
                            }
                        }
                    }
                }
                dgn:
                for(let i=this.x-1; i>=0; i--){            // diagonale gauche   \
                    for(let j=this.y-1; j>=0; j--){        // négative          
                        if(i-j == ndiag){
                            if(Math.sign(board[j][i][0])==-Math.sign(this.value)){//si la pièce est de couleur différente
                                fill('#Adadad'); 
                                ellipse((i+0.5)*l,(j+0.5)*l,l/4);
                                board[j][i][1]=true;
                                break dgn;
                            }
                            else if(board[j][i][0]!=0){ //On rencontre une pièce
                                break dgn;
                            }
                            else{
                                fill('#Adadad'); 
                                ellipse((i+0.5)*l,(j+0.5)*l,l/4);
                                board[j][i][1]=true;
                            }
                        }
                    }
                }
            }
// ---------------------------------------------------------------------------- *Knight
            else if(this.letter == 'n'){
                for(let i=constrain(this.x-2,0,board.length-1);i<=this.x+2;i++){
                    for(let j=constrain(this.y-2,0,board.length-1);j<=this.y+2;j++){
                        if(i<board.length && j<board.length){
                            if((abs(i-this.x)==2 && abs(j-this.y)==1) || (abs(i-this.x)==1 && abs(j-this.y)==2)){
                                if(Math.sign(board[j][i][0])==-Math.sign(this.value)){//si la pièce est de couleur différente
                                    fill('#Adadad'); 
                                    ellipse((i+0.5)*l,(j+0.5)*l,l/4);
                                    board[j][i][1]=true;
                                }
                                else if(board[j][i][0]==0){ //On ne rencontre pas de pièce
                                    fill('#Adadad'); 
                                    ellipse((i+0.5)*l,(j+0.5)*l,l/4);
                                    board[j][i][1]=true;
                                }
                            }
                        }
                    }
                }
                // for(let i=0;i<8;i++){
                //     for(let j=0;j<8;j++){
                //         if((abs(i-this.x)==2 && abs(j-this.y)==1) || (abs(i-this.x)==1 && abs(j-this.y)==2)){ // +2 et +1
                //             fill('#Adadad');
                //             ellipse((i+0.5)*l,(j+0.5)*l,l/4);
                //             board[j][i][1]=true;
                //         }
                //     }
                // }
            }
// ---------------------------------------------------------------------------- *King
            else{
                for(let i=constrain(this.x-1,0,board.length-1);i<=this.x+1;i++){
                    for(let j=constrain(this.y-1,0,board.length-1);j<=this.y+1;j++){
                        if(((i!=this.x) || (j!=this.y)) && (j<=board.length-1 && i<= board.length-1)){
                            if(Math.sign(board[j][i][0])==-Math.sign(this.value)){//si la pièce est de couleur différente
                                fill('#Adadad'); 
                                ellipse((i+0.5)*l,(j+0.5)*l,l/4);
                                board[j][i][1]=true;
                            }
                            else if(board[j][i][0]==0){ //On ne rencontre pas de pièce
                                fill('#Adadad'); 
                                ellipse((i+0.5)*l,(j+0.5)*l,l/4);
                                board[j][i][1]=true;
                            }
                        }
                    }
                }
            }
        } 
    }
    release(px,py){
        let dx = abs((this.x+0.5)*l-xpos);
        let dy = abs((this.y+0.5)*l-ypos);
        let desty = constrain(Math.round((py-l/2)/l),0,7);
        let destx = constrain(Math.round((px-l/2)/l),0,7);
        let destvalue=0;
        let prodvalue=0;
        let rightx = this.x+1;
        let leftx = this.x-1;
        px = constrain(mouseX, l/4, x-l/4);
        py = constrain(mouseY, l/2, x-l/2);
        destvalue = board[desty][destx][0]; // On change la valeur de la destination
        if((dx<(l/2))&&(dy<(l/2))){ //La pièce qu'on va relâcher
        prodvalue = destvalue*this.value ; // prodvalue > 0 ==> les deux pièces sont de la même couleur
            if(board[desty][destx][1]==true){ //si la case cible est droppable
                if(prodvalue==0||isNaN(prodvalue)){ //Si la case de destination est vide (isNaN pour le roi)
                    if(this.color == 'b' && this.letter == 'p' ){ 
                        if(ep[ep.length-1][2] == true && ep[ep.length-1][1] == this.y && ep[ep.length-1][0] == destx){
                            for(let i=0;i<pieces.length;i++){
                                if(pieces[i].x == destx && pieces[i].y == this.y){
                                    score-=pieces[i].value;
                                    console.log(score);
                                    eatenpieces.push(pieces.splice(i,1));
                                    ep.pop();
                                    ep.push([NaN,NaN,false]);
                                }
                            }
                        }
                        else if (this.y == 1 && desty == 3){  // Si on avance de 2 ==> e.p
                            ep.pop()
                            ep.push([destx,desty,true]);
                            console.log(ep);
                        }
                        else {      
                            ep.pop();
                            ep.push([NaN,NaN,false]);
                            console.log(ep);
                        }
                    }
                    else if(this.color == 'w' && this.letter == 'p'){
                        if(ep[ep.length-1][2] == true && ep[ep.length-1][1] == this.y && ep[ep.length-1][0] == destx){
                            for(let i=0;i<pieces.length;i++){
                                if(pieces[i].x == destx && pieces[i].y == this.y){
                                    score-=pieces[i].value;
                                    console.log(score);
                                    eatenpieces.push(pieces.splice(i,1));
                                    ep.pop();
                                    ep.push([NaN,NaN,false]);
                                }
                            }
                        }
                        else if (this.y == 6 && desty == 4){ // Si on avance de 2 ==> e.p
                            ep.pop();
                            ep.push([destx,desty,true]);
                            console.log(ep);
                        }
                        else{
                            ep.pop();
                            ep.push([NaN,NaN,false]);
                            console.log(ep);
                        }
                    }
                    else{
                        ep.pop();
                        ep.push([NaN,NaN,false]);
                        console.log(ep);
                    }
                    if(this.letter == 'p'){
                        moves.push(xabs[destx]+(8-desty).toString());
                    }
                    else{
                        moves.push(this.letter+xabs[destx]+(8-desty).toString());
                    }
                    console.log(moves);
                    board[this.y][this.x][0]=0 // Valeur de l'ancienne case vaut 0
                    board[desty][destx][0]=this.value; //Valeur de la nouvelle case de la pièce
                    this.x=Math.round((px-l/2)/l);
                    this.y=Math.round((py-l/2)/l);
                    turn = !turn;
                    console.log(destx,desty);
                }
                else if(destvalue*this.value<0){ // La case de destination est une pièce de couleur opposée
                    for(let i=0;i<pieces.length;i++){
                        if(pieces[i].x == destx && pieces[i].y == desty){
                            score-=pieces[i].value;
                            console.log(score);
                            eatenpieces.push(pieces.splice(i,1));
                        }
                    }
                    if(this.letter == 'p'){
                        moves.push(xabs[this.x]+(8-this.y).toString()+'x'+xabs[destx]+(8-desty).toString());
                    }
                    else{
                        moves.push(this.letter+'x'+xabs[destx]+(8-desty).toString());
                    }
                    console.log(moves);
                    board[this.y][this.x][0]=0 // Valeur de l'ancienne case vaut 0
                    board[desty][destx][0]=this.value; //Valeur de la nouvelle case de la pièce
                    this.x=Math.round((px-l/2)/l);
                    this.y=Math.round((py-l/2)/l);
                    turn = !turn;
                }
            }
            for(let i=0;i<board.length;i++){
                for(let j=0;j<board.length;j++){
                    board[i][j][1]=false;
                }
            }
        }
    }
}

function unclicked(){
    grabbed = false;
}

function setboard(){
    let value=0;
    let board2=[];
    droppable = false;
    for(let i=0; i<fen.length;i++){
        if('12345678'.includes(fen.charAt(i))){
            for(let k=0; k<Number(fen.charAt(i)); k++){
                board2.push([0,droppable]);
                column++
            }
        }
        else if(fen.charAt(i)=="/"){
            board.push(board2);
            board2=[];
            column=0;
            line++;
        }
        else if(fen.charAt(i)==' '){
            board.push(board2);
            break;
        }
        else{
            for(let j=0; j<letters.length;j++){
                if(letters[j]==fen.charAt(i)){ //si la lettre du fen correspond (pièce noire)
                    for(let k=0; k<piecesvalues.length;k++){
                        if(letters[j]==piecesvalues[k][0]){ // piecesvalues : ... ['r' , -5] ...
                            value=piecesvalues[k][1];
                            board2.push([value,droppable]);
                        }    
                    }
                    pieces.push(new piece('b',fen.charAt(i).toLowerCase(),column,line,value));
                    column++;
                    break;
                }   
                else if(letters[j].toUpperCase()==fen.charAt(i)){ //Si c'est une pièce blanche
                    for(let k=0; k<piecesvalues.length;k++){
                        if(fen.charAt(i)==piecesvalues[k][0].toUpperCase()){
                            value=-piecesvalues[k][1];
                            board2.push([value,droppable]);
                        }    
                    }
                    pieces.push(new piece('w',fen.charAt(i).toLowerCase(),column,line,value));
                    column++;
                    break;
                }
            }
        }
    }
}

function initializeBoard(){
    let black=color(50,90,90);
    let white=color(220);
    function square(x,y,l){
        noStroke(); 
        rect(l*x,l*y,l,l);
    }
    for(var i = 0; i<8; i++){
        for(var j = 0; j<8; j++){
            if((i+j)%2==1){
                fill(black);
            }
            else{
                fill(white);
            }
            square(i,j,l);
        }
    }
}

function hovered(px ,py){
    beg:
    for (let j=0; j<board.length; j++){
        for(let i=0; i<board.length;i++){
            if(abs((i+0.5)*l-px)<(l/2) && abs((j+0.5)*l-py)<(l/2)){
                noFill();
                strokeWeight(2);
                stroke(51);
                rect(i*l,j*l,l-1,l-1);
                break beg;
            }
        }
    }
}