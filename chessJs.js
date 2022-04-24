const WHITE = 'white';
const DARK = 'dark';

let selectedCell;
let boardData;

//returns the difference between 2 numbers
function diffrence(a, b) {
    return Math.abs(a - b);
}

//creates the chess board in the html file, creates a new BoardData , adds images to the board
function createBoard() {

    const newDiv = document.createElement("div");
    newDiv.className = "mainBody";
    document.body.appendChild(newDiv);
    let tbl = document.createElement("table");
    let tblBody = document.createElement("tbody");

    //this for loop creates the board in the html and adds an select event listener
    for (let i = 0; i < 10; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 10; j++) {
            if (i === 0 || i === 9) {
                let header = document.createElement("th");
                if (j !== 0 && j !== 9)
                    header.textContent = String.fromCharCode(j + 64);
                row.appendChild(header);
            }
            else {
                if (j === 0 || j === 9) {
                    let header = document.createElement("th");
                    header.textContent = 9 - i;
                    row.appendChild(header);
                }
                else {
                    let cell = document.createElement("td");
                    if ((j + i) % 2 === 1) {
                        cell.className = "tdBlack";
                    }
                    else cell.className = "tdWhite";
                    cell.id = (i - 1).toString() + (j - 1).toString();

                    row.appendChild(cell);
                    cell.addEventListener('click', onCellClick);
                }
            }
        }
        tblBody.appendChild(row);
    }

    tbl.appendChild(tblBody);
    newDiv.appendChild(tbl);

    boardData = new BoardData();

    //this loop adds the images of the pieces
    for (let piece of boardData.pieces) {
        addImage(tbl.rows[parseInt(piece.position[0]) + 1].cells[parseInt(piece.position[1]) + 1], piece.color, piece.type);
    }

}

//an event that accurs when you select an enemy target to eat, this event moves the selected piece to the enemies location,
//deletes the enemy and updates the images.
function eatEnemyEvent(event) {
    selectedCell = event.currentTarget;
    let selectedPiece = boardData.checkCellPiece(document.getElementsByClassName("selected")[0].id);

    //remove the piece that has been eaten
    boardData.PieceLocationInArray(selectedCell.id);
    boardData.pieces.splice(boardData.PieceLocationInArray(selectedCell.id), 1);

    selectedPiece.position = selectedCell.id;

    //remove both images and adds a new updated one
    selectedCell.removeChild(selectedCell.firstChild);
    document.getElementsByClassName("selected")[0].removeChild(document.getElementsByClassName("selected")[0].firstChild);
    addImage(selectedCell, selectedPiece.color, selectedPiece.type);

    boardData.whiteTurn = !boardData.whiteTurn;
    resetSelected();
}

//an event that accurs when you select a location to move, this event moves the selected piece to the location, and updates the images.
function movePieceEvent(event) {
    selectedCell = event.currentTarget;
    let selectedPiece = boardData.checkCellPiece(document.getElementsByClassName("selected")[0].id);

    selectedPiece.position = selectedCell.id;

    //removes the image and adds a new one updated one
    document.getElementsByClassName("selected")[0].removeChild(document.getElementsByClassName("selected")[0].firstChild);
    addImage(selectedCell, selectedPiece.color, selectedPiece.type);

    boardData.whiteTurn = !boardData.whiteTurn;
    resetSelected();
}


//an event that accurs when you select an element on the board, this event selects the target and shows it in the css and reset the previous selected  element
function onCellClick(event) {
    resetSelected();
    selectedCell = event.currentTarget;
    selectedCell.classList.add('selected');

    let currentPiece = boardData.checkCellPiece(selectedCell.id);
    if (currentPiece != undefined)
        currentPiece.showPossibleMoves();
}

//resets all the css and event listeners on the board to its defualt
function resetSelected() {
    let tdList = document.getElementsByTagName('td');
    for (let tdIndex of tdList) {
        tdIndex.classList.remove('move');
        tdIndex.classList.remove('selected');
        tdIndex.classList.remove('eat');
        tdIndex.removeEventListener("click", movePieceEvent);
        tdIndex.removeEventListener("click", eatEnemyEvent);
        tdIndex.addEventListener("click", onCellClick);
    }
}

//gets an cell a color and a piece type and puts the image of the piece with its currect color into the cell
function addImage(cell, color, name) {
    const img = document.createElement('img');
    img.src = 'images/' + color + '/' + name + '.png';
    img.classList.add("pieceImg");
    img.classList.add(name);
    cell.appendChild(img);
}



window.addEventListener('load', createBoard);

