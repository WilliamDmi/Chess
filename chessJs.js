const WHITE = 'white';
const DARK = 'dark';

let selectedCell;
let boardData;

//
function diffrence(a, b) {
    return Math.abs(a - b);
}

//
function createBoard() {
    const newDiv = document.createElement("div");
    newDiv.className = "mainBody";
    document.body.appendChild(newDiv);
    let tbl = document.createElement("table");
    let tblBody = document.createElement("tbody");
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
    

    for (let piece of boardData.pieces) {
        addImage(tbl.rows[parseInt(piece.position[0]) + 1].cells[parseInt(piece.position[1]) + 1], piece.color, piece.type);
    }

}


function eatEnemyEvent(event)
{
    console.log("hi");
    selectedCell = event.currentTarget;
    let selectedPiece = boardData.checkCellPiece(document.getElementsByClassName("selected")[0].id);

    boardData.PieceLocationInArray(selectedCell.id);
    boardData.pieces.splice(boardData.PieceLocationInArray(selectedCell.id) , 1);


    selectedPiece.position = selectedCell.id;
    selectedCell.removeChild(selectedCell.firstChild);

    document.getElementsByClassName("selected")[0].removeChild(document.getElementsByClassName("selected")[0].firstChild);

    addImage(selectedCell, selectedPiece.color , selectedPiece.type);


    resetSelected();
}


//
function onCellClick(event) {
    resetSelected();
    selectedCell = event.currentTarget;
    selectedCell.classList.add('selected');

    let currentPiece = boardData.checkCellPiece(selectedCell.id);
    if (currentPiece != undefined)
        currentPiece.showPossibleMoves();
}

//
function resetSelected() {
    let tdList = document.getElementsByTagName('td');
    for (let tdIndex of tdList) {
        tdIndex.classList.remove('move');
        tdIndex.classList.remove('selected');
        tdIndex.classList.remove('eat');
        tdIndex.removeEventListener("click", eatEnemyEvent);
        tdIndex.addEventListener("click", onCellClick);
    }
}

//
function addImage(cell, color, name) {
    const img = document.createElement('img');
    img.src = 'images/' + color + '/' + name + '.png';
    img.classList.add("pieceImg");
    img.classList.add(name);
    cell.appendChild(img);
}



window.addEventListener('load', createBoard);

