
var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;

var currTile;
var otherTile;

window.onload = function() {
    startGame();

    //1/10th of a second it will call crush candy
    window.setInterval(function(){
        crushCandy();
        slideCandy();
    }, 100);
}

function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)]; // 0 - 5.99 
}

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // <img id="0-0" src="./images/Red.png">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";

            // Drag function
            tile.addEventListener("dragstart", dragStart); // Start of the drag process when clicking on a candy
            tile.addEventListener("dragover", dragOver); // Allowing the candy to be dragged by moving the mouse
            tile.addEventListener("dragenter", dragEnter); // Entering a valid drop target while dragging
            tile.addEventListener("dragleave", dragLeave); // Leaving a valid drop target while dragging
            tile.addEventListener("drop", dragDrop); // Dropping a candy onto a valid drop target
            tile.addEventListener("dragend", dragEnd); // End of the drag process, swapping candies if valid
            

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}

function dragStart() {
    //this refers to tile that was clicked on for dragging
    currTile = this;
}

function dragOver(event) {
    event.preventDefault();
}

function dragEnter(event) {
    event.preventDefault();
}

function dragLeave() {
    
}

function dragDrop() {
    //refers to the target tile that was dropped on
    otherTile = this;
}

function dragEnd() {

    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }
    
    let currCoords = currTile.id.split("-"); // id-"0-0" > ["0," "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);
    
    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;

    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    let validMove = checkValid();
    if (!validMove) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;
      }
    }
}

function crushCandy() {
    //crushFive()
    //crushFour()
    crushThree();
    document.getElementById("score").innerText = score;
}

function crushThree() {
    // Check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }

    // Check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }
}

function checkValid() {
    //check rows
    for (let r = 0; r < rows; r++) {
    for ( let c = 0; c < columns-2; c++) {
        let candy1 = board[r][c];
        let candy2 = board[r][c+1];
        let candy3 = board[r][c+2];
        if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
            return true;
        }
    }
}

//check columns
for (let c = 0; c < columns; c++); {
    for (let r = 0; r < rows-2; r++) {
         let candy1 = board[r][c];
         let candy2 = board[r+1][c];
         let candy3 = board[r+3][c];
         if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }
    return false;
}

function slideCandy() {
    for (let c = 0; c < columns; c++) {
      let emptySpaces = 0;
      for (let r = rows - 1; r >= 0; r--) {
        if (board[r][c].src.includes("blank")) {
          emptySpaces++;
        } else if (emptySpaces > 0) {
          board[r + emptySpaces][c].src = board[r][c].src;
          board[r][c].src = "./images/blank.png";
        }
      }
  
      for (let r = 0; r < emptySpaces; r++) {
        board[r][c].src = "./images/" + randomCandy() + ".png";
      }
    }
  }