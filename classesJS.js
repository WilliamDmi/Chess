class BoardData {
    //
    constructor() {
        this.pieces = this.resetPieces();

    }

    //
    resetPieces() {
        let result = [];
        let temp = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];

        for (let i = 0; i < 8; i++) {
            result.push(new Piece(0 + i.toString(), temp[i], DARK));
            result.push(new Piece(1 + i.toString(), "pawn", DARK));
            result.push(new Piece(7 + i.toString(), temp[i], WHITE));
            result.push(new Piece(6 + i.toString(), "pawn", WHITE));
        }
        result.push(new Piece("44", "knight", DARK));
        result.push(new Piece("43", "king", WHITE));
        result.push(new Piece("47", "queen", WHITE));
        return result;
    }

    //
    checkCellPiece(position) {
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].position == position)
                return this.pieces[i];
        }
        return undefined;
    }

    PieceLocationInArray(position)
    {
        for(let i = 0 ; i<this.pieces.length ; i++)
        {
            if(this.pieces[i].position == position)
            {
                return i;
            }
        }

    }

}

class Piece {
    //
    constructor(position, type, color) {
        this.position = position;
        this.type = type;
        this.color = color;
    }

    //
    showPossibleMoves() {
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
                        move.classList.add("move");
                    }
                }
                break;
            case "pawn":

                moves = this.returnPawnMoves();
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
                    }
                }
                break;


        }
    }

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

    //
    getLeftWalledPosition(position) {
        while (!(position[0] == "0" || position[1] == "0")) {
            position = (parseInt(position) - 11).toString().padStart(2, '0');
        }
        return position;
    }

    //
    getRightWalledPosition(position) {
        while (!(position[0] == "0" || position[1] == "7")) {
            position = (parseInt(position) - 9).toString().padStart(2, '0');
        }
        return position;
    }
}