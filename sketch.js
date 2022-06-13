  var frameSize=3;
  //the f at the end means it relate to the frame not the inner cells
  var randomXf = [];
  var randomYf = [];
  var randSumXf = 0;
  var randSumYf = 0;
  
  let circleGrids = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Create objects
  for (let k = 0; k < frameSize*frameSize; k++) {
    let gridSize=int(random(1, 4));
    circleGrids.push(new Circlegrid(gridSize));
    circleGrids[k].prepare();
  }

//prepares frame x and y values
  for (let i = 0; i < frameSize; i++) {
    randomXf[i] = random(0.1, 1);
    randSumXf += randomXf[i];
  }
  
  for (let i = 0; i < frameSize; i++) {
    randomYf[i] = random(0.1, 1);
    randSumYf += randomYf[i];
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  }

function draw() {

  background(255);
  
  let startXf=0;
  let startYf=0;
  for (let j =0; j<randomYf.length; j++) {
    let cellHeightf = map(randomYf[j], 0, randSumYf, 0, windowHeight);
    for (let i =0; i<randomXf.length; i++) {
      let cellWidthf = map(randomXf[i], 0, randSumXf, 0, windowWidth);
      
  //circlegrid.display(10,10,width-20,height-20);
      circleGrids[frameSize*j+i].display(startXf, startYf, cellWidthf, cellHeightf);
      
          startXf+=cellWidthf;
    }
    startXf = 0;
    startYf+=cellHeightf;
  }
}


class Circlegrid {   //this will need to have a start position specced probably in the display part

 constructor(tempG) {
  this.randomX = [];
  this.randomY = [];
  this.randSumX = 0;
  this.randSumY = 0;
  this.gridSize = tempG;
  }

  prepare() {
    this.randomX = new Array(this.gridSize);
    for (let i = 0; i < this.randomX.length; i++) {
      this.randomX[i] = random(0.1, 1);
      this.randSumX += this.randomX[i];
    }
    this.randomY = new Array(this.gridSize);
    for (let i = 0; i < this.randomY.length; i++) {
      this.randomY[i] = random(0.1, 1);
      this.randSumY += this.randomY[i];
    }
  }

  display(gridBeginX, gridBeginY, gridWidth, gridHeight) {
    
    this.grdHt = gridHeight;
    this.grdWt = gridWidth;
    
    ellipseMode(CORNER);

    this.startX=gridBeginX;
    this.startY=gridBeginY;
    let index=0;
    for (let j =0; j<this.randomY.length; j++) {
      let cellHeight = map(this.randomY[j], 0, this.randSumY, 0, this.grdHt);
      for (let i =0; i<this.randomX.length; i++) {
        let cellWidth = map(this.randomX[i], 0, this.randSumX, 0, this.grdWt);
        noStroke();
        //fill(255, 200, 110);
        fill(0);
        ellipse(this.startX, this.startY, cellWidth, cellHeight);
        this.startX+=cellWidth;
        index++;
      }
      this.startX = gridBeginX;
      this.startY+=cellHeight;
    }
  }
}