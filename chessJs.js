const WHITE = 'white';
const DARK = 'dark';

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
                    row.appendChild(cell);

                    if (i === 1) {
                        addImageByIndex(cell, DARK, j);
                    } else if (i === 2) {
                        addImage(cell, DARK, 'pawn');
                    } else if (i === 7) {
                        addImage(cell, WHITE, 'pawn');
                    } else if (i === 8) {
                        addImageByIndex(cell, WHITE, j);
                    } 
                }
                
            }

        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    newDiv.appendChild(tbl);
}
function addImage(cell, color, name) 
{
    const img = document.createElement('img');
    img.src = 'images/' + color + '/' + name + '.png';
    img.className="pieceImg";
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
//<td> array functions