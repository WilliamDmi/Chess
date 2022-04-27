class BoardData {

    constructor() {
        this.pieces = this.resetPieces();
        this.whiteTurn = true;
        this.whiteWins = 0;
        this.blackWins = 0;

    }

    //creates the defualt pieces array 
    resetPieces() {
        let result = [];
        let temp = [ROOK, KNIGHT, BISHOP, QUEEN, KING, BISHOP, KNIGHT, ROOK];

        for (let i = 0; i < 8; i++) {
            result.push(new Piece(0 + i.toString(), temp[i], DARK));
            result.push(new Piece(1 + i.toString(), PAWN, DARK));
            result.push(new Piece(7 + i.toString(), temp[i], WHITE));
            result.push(new Piece(6 + i.toString(), PAWN, WHITE));
        }

        return result;
    }

    //resets the game
    resetGame()
    {
        this.pieces = this.resetPieces();
        this.whiteTurn = true;

        let tdList = document.getElementsByTagName('td');
        for (let tdIndex of tdList) {
            if(tdIndex.firstChild != null)
                tdIndex.removeChild(tdIndex.firstChild)
        }
        for (let piece of this.pieces) {
            addImage(this.getCellByPosition(piece.position), piece.color, piece.type);
        }
        resetSelected();
    }

    //gets a position and returns the piece in that position if exists
    checkCellPiece(position) {
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].position == position)
                return this.pieces[i];
        }
        return undefined;
    }

    //gets a position and returns the index of the piece in the pieces array
    PieceLocationInArray(position) {
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].position == position) {
                return i;
            }
        }

    }

    //adds a win to the winner's color
    addWin(color) {

        if(color == WHITE)
        {
            this.whiteWins ++;
        }
        else this.blackWins ++;

        let tdList = document.getElementsByTagName('td');
        for (let tdIndex of tdList) {
            tdIndex.removeEventListener("click", movePieceEvent);
            tdIndex.removeEventListener("click", eatEnemyEvent);
            tdIndex.removeEventListener("click", onCellClick);
        }
        console.log(this.whiteWins + "-" + this.blackWins);

        this.resetGame();
    }

    //get a position and return the cell in that position
    getCellByPosition(position)
    {
        let tdList = document.getElementsByTagName('td');
        for (let tdIndex of tdList) {
            if(tdIndex.id == position)
                return tdIndex;
        }
    }
}

class Piece {

    constructor(position, type, color) {
        this.position = position;
        this.type = type;
        this.color = color;
    }

    //shows the possible moves of each piece when its the currect turn
    showPossibleMoves() {
        if ((this.color == WHITE && boardData.whiteTurn) || (this.color == DARK && !boardData.whiteTurn)) {

            let moves;
            switch (this.type) {
                case ROOK:
                    moves = this.returnRookMoves();
                    break;
                case QUEEN:
                    moves = this.returnQueenMoves();
                    break;
                case KING:
                    moves = this.returnKingMoves();
                    break;
                case PAWN:
                    let eatMoves = this.returnPawnEat();
                    moves = this.returnPawnMoves();

                    for (let eatMove of eatMoves) {
                        if (boardData.checkCellPiece(eatMove.id) != undefined) {
                            eatMove.classList.add("eat");
                            eatMove.removeEventListener("click", onCellClick);
                            eatMove.addEventListener("click", eatEnemyEvent);
                        }
                    }
                    break;
                case KNIGHT:
                    moves = this.returnKnightMoves();
                    break;
                case BISHOP:
                    moves = this.returnBishopMoves();
                    break;
            }

            //goes through each of the moves and puts the event listener and css class that fits
            for (let move of moves) {
                if (boardData.checkCellPiece(move.id) != undefined) {

                    if (boardData.checkCellPiece(move.id).color != this.color) {
                        move.classList.add("eat");
                        move.removeEventListener("click", onCellClick);
                        move.addEventListener("click", eatEnemyEvent);
                    }
                }
                else {
                    move.removeEventListener("click", onCellClick);
                    move.addEventListener("click", movePieceEvent);
                    move.classList.add("move");
                }
            }
        }
    }

    //returns the queen's possible moves and attacks
    returnQueenMoves() {
        //the queens movement is based of the rook + the bishop so we just combine them
        let moves = this.returnBishopMoves().concat(this.returnRookMoves());
        return moves;
    }

    //returns the king's possible moves and attacks
    returnKingMoves() {
        let tdList = document.getElementsByTagName('td');
        let moves = [];

        for (let i = 0; i < tdList.length; i++) {
            if (diffrence(parseInt(this.position), parseInt(tdList[i].id)) == 1 || diffrence(parseInt(this.position), parseInt(tdList[i].id)) == 9 || diffrence(parseInt(this.position), parseInt(tdList[i].id)) == 11 || diffrence(parseInt(this.position), parseInt(tdList[i].id)) == 10) {
                moves.push(tdList[i]);
            }
        }

        return moves;
    }

    //returns the rook's possible moves and attacks
    returnRookMoves() {
        let tdList = document.getElementsByTagName('td');
        let moves = [];

        for (let j = parseInt(this.position, 8) + 1; j % 8 != 0; j++) {
            if (j >= 0 && j < 64) {
                if (boardData.checkCellPiece(tdList[j].id) != undefined) {
                    moves.push(tdList[j]);
                    break;
                }
                moves.push(tdList[j]);
            }
        }

        for (let j = parseInt(this.position, 8) - 1; j % 8 != 7; j--) {
            if (j >= 0 && j < 64) {
                if (boardData.checkCellPiece(tdList[j].id) != undefined) {
                    moves.push(tdList[j]);
                    break;
                }
                moves.push(tdList[j]);
            }
            else break;
        }

        for (let j = parseInt(this.position, 8) - 8; (j / 8 != 0); j -= 8) {
            if (j >= 0 && j < 64) {
                if (boardData.checkCellPiece(tdList[j].id) != undefined) {
                    moves.push(tdList[j]);
                    break;
                }
                moves.push(tdList[j]);

            }
            else break;
        }

        for (let j = parseInt(this.position, 8) + 8; (j / 8 != 7); j += 8) {
            if (j >= 0 && j < 64) {
                if (boardData.checkCellPiece(tdList[j].id) != undefined) {
                    moves.push(tdList[j]);
                    break;
                }
                moves.push(tdList[j]);

            }
            else break;
        }

        return moves;

    }

    //returns the bishop's possible moves and attacks
    returnBishopMoves() {
        let tdList = document.getElementsByTagName('td');
        let moves = [];

        for (let j = parseInt(this.position, 8) + 9; j < 64 && j % 8 != 0; j += 9) {

            if (j >= 0 && j < 64) {
                if (boardData.checkCellPiece(tdList[j].id) != undefined) {
                    moves.push(tdList[j]);
                    break;
                }
                moves.push(tdList[j]);
            }
        }


        for (let j = parseInt(this.position, 8) - 9; j > 0 && j % 8 != 7; j -= 9) {

            if (j >= 0 && j < 64) {
                if (boardData.checkCellPiece(tdList[j].id) != undefined) {
                    moves.push(tdList[j]);
                    break;
                }
                moves.push(tdList[j]);
            }
        }


        for (let j = parseInt(this.position, 8) + 7; j < 64 && j % 8 != 7; j += 7) {

            if (j >= 0 && j < 64) {
                if (boardData.checkCellPiece(tdList[j].id) != undefined) {
                    moves.push(tdList[j]);
                    break;
                }
                moves.push(tdList[j]);
            }
        }


        for (let j = parseInt(this.position, 8) - 7; j > 0 && j % 8 != 0; j -= 7) {

            if (j >= 0 && j < 64) {
                if (boardData.checkCellPiece(tdList[j].id) != undefined) {
                    moves.push(tdList[j]);
                    break;
                }
                moves.push(tdList[j]);
            }
        }
        return moves;

    }

    //returns the knight's possible moves and attacks
    returnKnightMoves() {
        let tdList = document.getElementsByTagName('td');
        let moves = [];

        for (let i = 0; i < tdList.length; i++) {
            if (diffrence(parseInt(this.position), parseInt(tdList[i].id)) == 21 || diffrence(parseInt(this.position), parseInt(tdList[i].id)) == 19 || diffrence(parseInt(this.position), parseInt(tdList[i].id)) == 12 || diffrence(parseInt(this.position), parseInt(tdList[i].id)) == 8) {
                moves.push(tdList[i]);
            }

        }
        return moves;
    }

    //returns the Pawn's possible attacks
    returnPawnEat() {
        let tdList = document.getElementsByTagName('td');
        let moves = [];

        if (this.color == WHITE) {
            for (let i = 0; i < tdList.length; i++) {
                if (parseInt(this.position) - parseInt(tdList[i].id) == 9 || parseInt(this.position) - parseInt(tdList[i].id) == 11) {
                    if (boardData.checkCellPiece(tdList[i].id) && this.color != boardData.checkCellPiece(tdList[i].id).color)
                        moves.push(tdList[i]);
                }
            }
        }

        if (this.color == DARK) {
            for (let i = 0; i < tdList.length; i++) {
                if (parseInt(this.position) - parseInt(tdList[i].id) == -9 || parseInt(this.position) - parseInt(tdList[i].id) == -11) {
                    if (boardData.checkCellPiece(tdList[i].id) && this.color != boardData.checkCellPiece(tdList[i].id).color)
                        moves.push(tdList[i]);
                }
            }
        }
        return moves;

    }

    //returns the Pawn's possible moves
    returnPawnMoves() {
        let tdList = document.getElementsByTagName('td');
        let moves = [];

        if (this.color == "white") {
            for (let i = 0; i < tdList.length; i++) {
                if ((this.position[1] == tdList[i].id[1]) && parseInt(this.position[0]) - 1 == parseInt(tdList[i].id[0])) {
                    if (boardData.checkCellPiece(tdList[i].id) == undefined)
                        moves.push(tdList[i]);

                    if (this.position[0] == "6") {
                        if (boardData.checkCellPiece(tdList[i - 8].id) == undefined)
                            moves.push(tdList[i - 8]);
                    }
                }
            }
        }
        if (this.color == "dark") {
            for (let i = 0; i < tdList.length; i++) {
                if ((this.position[1] == tdList[i].id[1]) && parseInt(this.position[0]) + 1 == parseInt(tdList[i].id[0])) {
                    if (boardData.checkCellPiece(tdList[i].id) == undefined)
                        moves.push(tdList[i]);

                    if (this.position[0] == "1") {
                        if (boardData.checkCellPiece(tdList[i + 8].id) == undefined)
                            moves.push(tdList[i + 8]);
                    }
                }
            }
        }
        return moves;
    }
}