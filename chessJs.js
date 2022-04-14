window.addEventListener('load',()=> {
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
                    header.textContent = i;
                    row.appendChild(header);
                }
                else
                {
                    let cell = document.createElement("td");
                    if( (j+i)%2 === 1)
                    {
                        cell.className="tdWhite";
                    }
                    else cell.className="tdBlack";
                    row.appendChild(cell);
                }
            }   

        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    newDiv.appendChild(tbl);

});