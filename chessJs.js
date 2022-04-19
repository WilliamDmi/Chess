const WHITE = 'white';
const DARK = 'dark';

let selectedCell;
//let pieces = [];
let boardData;

class BoardData
{
    constructor()
    {
        this.pieces  = this.resetPieces();
    }

    resetPieces() 
    {
        let result = [];
        let temp =["rook","knight","bishop","queen","king","bishop","knight","rook"];
        
        for(let i=0; i<8; i++)
        {
        result.push(new Piece(0 + i.toString() , temp[i], DARK ));
        result.push(new Piece(1 + i.toString() , "pawn", DARK));
        result.push(new Piece(7 + i.toString() , temp[i], WHITE ));
        result.push(new Piece(6 + i.toString() , "pawn", WHITE));
        }
        result.push(new Piece( "44" , "knight", DARK ));
        result.push(new Piece( "43" , "king", DARK ));
        return result;
    }

    checkCellPiece(pieces,position)
    {
        for (let i = 0; i < pieces.length; i++) 
        {
            if (pieces[i].position == position) return pieces[i];
        }
        return undefined;
    }

}

class Piece 
{
    constructor(position, type, color) 
    {
      this.position = position;
      this.type = type;
      this.color = color;
    }
    
    showPossibleMoves()
    {
        let tdList = document.getElementsByTagName('td'); 

        switch(this.type)
        {
            case "rook" :
            for(let i = 0; i<tdList.length ; i++)
            {
                if(tdList[i].id != this.position)
                {
                    if(this.position[0] == tdList[i].id[0])
                        tdList[i].classList.add("move");
                    else if(this.position[1] == tdList[i].id[1])
                            tdList[i].classList.add("move");
                }
            }
            break;          
            case "queen" :
            for(let i = 0; i<tdList.length ; i++)
            {
                if(tdList[i].id != this.position)
                {
                    if(getLeftWalledPosition(tdList[i].id) == getLeftWalledPosition(this.position))
                    tdList[i].classList.add("move");
                    else if(getRightWalledPosition(tdList[i].id) == getRightWalledPosition(this.position))
                        tdList[i].classList.add("move");
                }
            }
            for(let i = 0; i<tdList.length ; i++)
            {
                if(tdList[i].id != this.position)
                {
                    if(this.position[0] == tdList[i].id[0])
                        tdList[i].classList.add("move");
                    else if(this.position[1] == tdList[i].id[1])
                            tdList[i].classList.add("move");
                }
            } 
            break;
            case "king" : 
            for(let i = 0; i<tdList.length ; i++)
            {
                if(diffrence(parseInt(this.position),parseInt(tdList[i].id)) == 1 || diffrence(parseInt(this.position),parseInt(tdList[i].id)) == 9 || diffrence(parseInt(this.position),parseInt(tdList[i].id)) == 11 || diffrence(parseInt(this.position),parseInt(tdList[i].id))== 10)
                {
                    if(boardData.checkCellPiece(boardData.pieces,tdList[i].id) == undefined)
                        tdList[i].classList.add("move");
                }
            }

            break;
            case "pawn" :
                if(this.color == "white")
                {
                    for(let i = 0; i<tdList.length ; i++)
                    {
                        if((this.position[1] == tdList[i].id[1]) &&  parseInt(this.position[0])-1 == parseInt(tdList[i].id[0]))
                        {   
                            if(boardData.checkCellPiece(boardData.pieces,tdList[i].id) == undefined)
                                tdList[i].classList.add("move");

                            if(this.position[0]=="6")
                            {
                                if(boardData.checkCellPiece(boardData.pieces,tdList[i-8].id) == undefined)
                                    tdList[i-8].classList.add("move");
                            }
                        }
                    } 
                } 
                if(this.color == "dark")
                {
                    for(let i = 0; i<tdList.length ; i++)
                    {
                        if((this.position[1] == tdList[i].id[1]) &&  parseInt(this.position[0])+1 == parseInt(tdList[i].id[0]))
                        {
                            if(boardData.checkCellPiece(boardData.pieces,tdList[i].id) == undefined)
                            tdList[i].classList.add("move");

                            if(this.position[0]=="1")
                            {
                                if(boardData.checkCellPiece(boardData.pieces,tdList[i+8].id) == undefined)
                                tdList[i+8].classList.add("move");
                            }
                        }
                    } 
                } 
            break;
            case "knight" : 
            for(let i = 0; i<tdList.length ; i++)
            {
                if(diffrence(parseInt(this.position),parseInt(tdList[i].id)) == 21 || diffrence(parseInt(this.position),parseInt(tdList[i].id)) == 19 || diffrence(parseInt(this.position),parseInt(tdList[i].id)) == 12 || diffrence(parseInt(this.position),parseInt(tdList[i].id))== 8)
                {
                    if(boardData.checkCellPiece(boardData.pieces,tdList[i].id) == undefined)
                        tdList[i].classList.add("move");
                }
                
            }
            break;
            case "bishop" : 
            for(let i = 0; i<tdList.length ; i++)
            {
                if(tdList[i].id != this.position)
                {
                    if(getLeftWalledPosition(tdList[i].id) == getLeftWalledPosition(this.position))
                    tdList[i].classList.add("move");
                    else if(getRightWalledPosition(tdList[i].id) == getRightWalledPosition(this.position))
                        tdList[i].classList.add("move");
                }
            }
            break;          
        }  
    }
}

function diffrence(a , b)
{
    return Math.abs(a-b);
}

function getLeftWalledPosition(position)
{
    while(!(position[0] == "0" || position[1] == "0"))
    {
        position = (parseInt(position) - 11).toString().padStart(2, '0');
    }
       
    return position;
}
function getRightWalledPosition(position)
{
    while(!(position[0] == "0" || position[1] == "7"))
    {
        position = (parseInt(position) - 9).toString().padStart(2, '0');
    }  
    return position;
}


function createBoard()
{
    const newDiv = document.createElement("div"); 
    newDiv.className="mainBody";
    document.body.appendChild(newDiv);
    let tbl = document.createElement("table");
    let tblBody = document.createElement("tbody");
    for(let i = 0 ; i < 10 ; i++ )
    {
        let row = document.createElement("tr");
        for(let j = 0 ; j < 10 ; j++ )
        {
            if(i===0 || i===9)
            {
                let header = document.createElement("th"); 
                if(j!==0 && j!==9)
                    header.textContent = String.fromCharCode(j + 64);
                row.appendChild(header);
            }
            else
            {
                if(j===0 || j===9)
                {
                    let header = document.createElement("th"); 
                    header.textContent = 9-i;
                    row.appendChild(header);
                }
                else
                {
                    let cell = document.createElement("td");
                    if( (j+i)%2 === 1)
                    {
                        cell.className="tdBlack";
                    }
                    else cell.className="tdWhite";
                    cell.id = (i-1).toString() + (j-1).toString();

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
      addImage(tbl.rows[parseInt(piece.position[0])+1].cells[parseInt(piece.position[1])+1], piece.color, piece.type);
    }

}

function onCellClick(event) 
{
    resetSelected();
    selectedCell = event.currentTarget;
    selectedCell.classList.add('selected');

    let currentPiece = boardData.checkCellPiece(boardData.pieces , selectedCell.id);
    if(currentPiece != undefined)
        currentPiece.showPossibleMoves();
}

function resetSelected()
{
    let tdList = document.getElementsByTagName('td'); 
    for(let tdIndex of tdList)
    {
        tdIndex.classList.remove('move');
        tdIndex.classList.remove('selected');
    }
}

function addImage(cell, color, name) 
{
    const img = document.createElement('img');
    img.src = 'images/' + color + '/' + name + '.png';
    img.classList.add("pieceImg");
    img.classList.add(name);
    cell.appendChild(img);
}
  
function addImageByIndex(cell, color, index)
{
    if (index === 1 || index === 8) {
      addImage(cell, color, 'rook');
    } else if (index === 2 || index === 7) {
      addImage(cell, color, 'knight');
    } else if (index === 3 || index === 6) {
      addImage(cell, color, 'bishop');
    } else if (index === 4) {
      addImage(cell, color, 'queen');
    } else if (index === 5) {
      addImage(cell, color, 'king');
    }
}


window.addEventListener('load',createBoard);


//catch (error)
//{
//     if(!(error instanceof TypeError))
//         alert ("NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
// }