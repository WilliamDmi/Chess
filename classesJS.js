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
        result.push(new Piece("43", "rook", DARK));
        return result;
    }

    //
    checkCellPiece(pieces, position) {
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].position == position) return pieces[i];
        }
        return undefined;
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
        let tdList = document.getElementsByTagName('td');

        switch (this.type) {
            case "rook":

                for (let j = parseInt(this.position, 8) + 1; j % 8 != 0; j++) {
                    if (j >= 0 && j < 64) {
                        if (boardData.checkCellPiece(boardData.pieces, tdList[j].id) != undefined)
                            break;
                        tdList[j].classList.add("move");
                    }
                }


                for (let j = parseInt(this.position, 8) - 1; j % 8 != 7; j--) {
                    if (j >= 0 && j < 64) {
                        if (boardData.checkCellPiece(boardData.pieces, tdList[j].id) != undefined)
                            break;
                        tdList[j].classList.add("move");

                    }
                    else break;
                }


                for (let j = parseInt(this.position, 8) - 8; (j / 8 != 0); j -= 8) {
                    if (j >= 0 && j < 64) {
                        if (boardData.checkCellPiece(boardData.pieces, tdList[j].id) != undefined)
                            break;
                        tdList[j].classList.add("move");

                    }
                    else break;
                }
                for (let j = parseInt(this.position, 8) + 8; (j / 8 != 7); j += 8) {
                    if (j >= 0 && j < 64) {
                        if (boardData.checkCellPiece(boardData.pieces, tdList[j].id) != undefined)
                            break;
                        tdList[j].classList.add("move");

                    }
                    else break;
                }


                break;
            case "queen":
                for (let i = 0; i < tdList.length; i++) {
                    if (tdList[i].id != this.position) {
                        if (this.getLeftWalledPosition(tdList[i].id) == this.getLeftWalledPosition(this.position))
                            tdList[i].classList.add("move");
                        else if (this.getRightWalledPosition(tdList[i].id) == this.getRightWalledPosition(this.position))
                            tdList[i].classList.add("move");
                    }
                }
                for (let i = 0; i < tdList.length; i++) {
                    if (tdList[i].id != this.position) {
                        if (this.position[0] == tdList[i].id[0])
                            tdList[i].classList.add("move");
                        else if (this.position[1] == tdList[i].id[1])
                            tdList[i].classList.add("move");
                    }
                }
                break;
            case "king":
                for (let i = 0; i < tdList.length; i++) {
                    if (diffrence(parseInt(this.position), parseInt(tdList[i].id)) == 1 || diffrence(parseInt(this.position), parseInt(tdList[i].id)) == 9 || diffrence(parseInt(this.position), parseInt(tdList[i].id)) == 11 || diffrence(parseInt(this.position), parseInt(tdList[i].id)) == 10) {
                        if (boardData.checkCellPiece(boardData.pieces, tdList[i].id) == undefined)
                            tdList[i].classList.add("move");
                    }
                }

                break;
            case "pawn":
                if (this.color == "white") {
                    for (let i = 0; i < tdList.length; i++) {
                        if ((this.position[1] == tdList[i].id[1]) && parseInt(this.position[0]) - 1 == parseInt(tdList[i].id[0])) {
                            if (boardData.checkCellPiece(boardData.pieces, tdList[i].id) == undefined)
                                tdList[i].classList.add("move");

                            if (this.position[0] == "6") {
                                if (boardData.checkCellPiece(boardData.pieces, tdList[i - 8].id) == undefined)
                                    tdList[i - 8].classList.add("move");
                            }
                        }
                    }
                }
                if (this.color == "dark") {
                    for (let i = 0; i < tdList.length; i++) {
                        if ((this.position[1] == tdList[i].id[1]) && parseInt(this.position[0]) + 1 == parseInt(tdList[i].id[0])) {
                            if (boardData.checkCellPiece(boardData.pieces, tdList[i].id) == undefined)
                                tdList[i].classList.add("move");

                            if (this.position[0] == "1") {
                                if (boardData.checkCellPiece(boardData.pieces, tdList[i + 8].id) == undefined)
                                    tdList[i + 8].classList.add("move");
                            }
                        }
                    }
                }
                break;
            case "knight":
                for (let i = 0; i < tdList.length; i++) {
                    if (diffrence(parseInt(this.position), parseInt(tdList[i].id)) == 21 || diffrence(parseInt(this.position), parseInt(tdList[i].id)) == 19 || diffrence(parseInt(this.position), parseInt(tdList[i].id)) == 12 || diffrence(parseInt(this.position), parseInt(tdList[i].id)) == 8) {
                        if (boardData.checkCellPiece(boardData.pieces, tdList[i].id) == undefined)
                            tdList[i].classList.add("move");
                    }

                }
                break;
            case "bishop":
                for (let i = 0; i < tdList.length; i++) {
                    if (tdList[i].id != this.position) {
                        if (this.getLeftWalledPosition(tdList[i].id) == this.getLeftWalledPosition(this.position))
                            tdList[i].classList.add("move");
                        else if (this.getRightWalledPosition(tdList[i].id) == this.getRightWalledPosition(this.position))
                            tdList[i].classList.add("move");
                    }
                }
                break;
        }
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