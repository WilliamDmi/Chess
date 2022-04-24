class BoardData {
    
    constructor() {
        this.pieces = this.resetPieces();
        this.whiteTurn = true;

    }

    //creates the defualt pieces array 
    resetPieces() {
        let result = [];
        let temp = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];

        for (let i = 0; i < 8; i++) {
            result.push(new Piece(0 + i.toString(), temp[i], DARK));
            result.push(new Piece(1 + i.toString(), "pawn", DARK));
            result.push(new Piece(7 + i.toString(), temp[i], WHITE));
            result.push(new Piece(6 + i.toString(), "pawn", WHITE));
        }

        return result;
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

}

class Piece {

    constructor(position, type, color) {
        this.position = position;
        this.type = type;
        this.color = color;
    }

    //shows the possible moves of each piece when its the currect turn
    showPossibleMoves() {
        if((this.color == WHITE && boardData.whiteTurn) || (this.color == DARK && !boardData.whiteTurn))
        {
            let moves;

            switch (this.type) {
                case "rook":
                    moves = this.returnRookMoves();
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
                    break;
                case "queen":

                    moves = this.returnQueenMoves();
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
                    break;
                case "king":

                    moves = this.returnKingMoves();
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
                    break;
                case "pawn":

                    let eatMoves = this.returnPawnEat();
                    moves = this.returnPawnMoves();
                    for (let move of moves) {
                        move.removeEventListener("click", onCellClick);
                        move.addEventListener("click", movePieceEvent);
                        move.classList.add("move");
                    }
                    for (let eatMove of eatMoves) {
                        if(boardData.checkCellPiece(eatMove.id) != undefined)
                        {
                        eatMove.classList.add("eat");
                        eatMove.removeEventListener("click", onCellClick);
                        eatMove.addEventListener("click", eatEnemyEvent);
                        }
                    }
                    break;
                case "knight":

                    moves = this.returnKnightMoves();
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
                    break;
                case "bishop":

                    moves = this.returnBishopMoves();
                    for (let move of moves) {
                        if (boardData.checkCellPiece(move.id) != undefined) {

                            if (boardData.checkCellPiece(move.id).color != this.color) {
                                move.classList.add("eat");
                                move.removeEventListener("click", onCellClick);
                                move.addEventListener("click", eatEnemyEvent);
                            }
                        }
                        else {
                            move.classList.add("move");
                            move.removeEventListener("click", onCellClick);
                            move.addEventListener("click", movePieceEvent);
                        }
                    }
                    break;


            }
        }
    }

    //returns the queen's possible moves and attacks
    returnQueenMoves() {
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
    returnPawnEat(){
        let tdList = document.getElementsByTagName('td');
        let moves = [];

        if(this.color == WHITE)
        {
            for (let i = 0; i < tdList.length; i++) {
                if (parseInt(this.position) - parseInt(tdList[i].id) == 9 || parseInt(this.position) - parseInt(tdList[i].id) == 11) {
                    if(boardData.checkCellPiece(tdList[i].id)&& this.color != boardData.checkCellPiece(tdList[i].id).color)
                        moves.push(tdList[i]);
                }
            }
        }

        if(this.color == DARK)
        {
            for (let i = 0; i < tdList.length; i++) {
                if (parseInt(this.position) - parseInt(tdList[i].id) == -9 || parseInt(this.position) - parseInt(tdList[i].id) == -11) {
                    if(boardData.checkCellPiece(tdList[i].id)&& this.color != boardData.checkCellPiece(tdList[i].id).color)
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