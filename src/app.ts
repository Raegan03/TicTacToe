import { TableCell } from './tableCell';
import { Player } from './player';
import { GameResult } from './gameResult';

export class App {

    playerX: Player;
    playerO: Player;

    currentPlayer: Player;

    gameTable = document.getElementById('GameTable') as HTMLTableElement;
    currentPlayerLabel = document.getElementById('CurrentPlayer') as HTMLTitleElement;
    gameResultLabel = document.getElementById('GameResult') as HTMLTitleElement;
    restartButton = document.getElementById('RestartButton') as HTMLTitleElement;
    xPlayerScore = document.getElementById('XPlayerScore') as HTMLTitleElement;
    oPlayerScore = document.getElementById('OPlayerScore') as HTMLTitleElement;

    tableCells: TableCell[] = [];
    moves: number = 0;
    gameInProgress: boolean = false;

    constructor() {
        this.playerX = new Player("Player X", 'X');
        this.playerO = new Player("Player O", 'O');

        this.currentPlayer = this.playerX;

        this.restartButton.addEventListener('click', () => this.RestartGame());
        document.addEventListener('keydown', (e) => this.HandleKey(e));

        this.StartGame();
    }

    StartGame(){
        this.DrawTable();
        this.UpdatePlayerName();

        this.gameInProgress = true;
    }

    RestartGame(){
        this.restartButton.innerText = "Restart Game";

        for (let i = 0; i < 9; i++){
            this.tableCells[i].SetCellValue(null);
        }
        this.moves = 0;

        this.ChangePlayer();
        this.gameInProgress = true;
    }

    private DrawTable(){
        let index = 0;
        for (let row = 0; row < 3; row++){
            let tableRow = this.gameTable.insertRow(row);

            for (let cell = 0; cell < 3; cell++){
                let tableCell = tableRow.insertCell(cell);

                this.tableCells.push(new TableCell(index, null, tableCell, this.onCellClicked));
                index++;
            }
        }
    }

    private ChangePlayer(){
        if(this.currentPlayer == this.playerX){
            this.currentPlayer = this.playerO;
        }
        else{
            this.currentPlayer = this.playerX;
        }
        this.UpdatePlayerName();
    }

    private UpdatePlayerName(){
        this.currentPlayerLabel.innerText = this.currentPlayer.playerName;
        this.gameResultLabel.innerText = null;
    }

    private UpdatePlayerScores(){
        this.xPlayerScore.innerText = this.playerX.playerScore.toString();
        this.oPlayerScore.innerText = this.playerO.playerScore.toString();
    }

    private ShowEndMessage(gameResult: GameResult){
        switch(gameResult){
            case 'Win':
                this.gameResultLabel.innerText = this.currentPlayer.playerName + " won!";
                break;
            case 'Tie':
                this.gameResultLabel.innerText = "Game ended up with tie!";
                break;
        }
        this.currentPlayerLabel.innerText = null;
        this.restartButton.innerText = "Play Again";
    }

    private CheckPlayerWin(): GameResult{
        if (this.moves < 5)
            return null;

        //Check rows
        for (let row = 0; row < 3; row++){
            const startIndex = (3 * row);
            const rowValue = this.tableCells[startIndex].GetCellValue();

            if(rowValue == null)
                continue;

            let result = true;
            for (let cell = startIndex + 1; cell < startIndex + 3; cell++)
            {
                if(rowValue != this.tableCells[cell].GetCellValue())
                {
                    result = false;
                    break;
                }
            }
            if(result)
                return 'Win';
        }

        //Check columns
        for (let column = 0; column < 3; column++){
            const startIndex = column;
            const columnValue = this.tableCells[startIndex].GetCellValue();

            if(columnValue == null)
                continue;

            let result = true;
            for (let cell = startIndex + 3; cell < startIndex + 7; cell += 3)
            {
                if(columnValue != this.tableCells[cell].GetCellValue())
                {
                    result = false;
                    break;
                }
            }
            if(result)
                return 'Win';
        }

        //Check diag
        if(this.tableCells[0].GetCellValue() == this.tableCells[4].GetCellValue() &&
        this.tableCells[4].GetCellValue() == this.tableCells[8].GetCellValue())
            return 'Win';

        //Check anti-diag
        if(this.tableCells[2].GetCellValue() == this.tableCells[4].GetCellValue() &&
        this.tableCells[4].GetCellValue() == this.tableCells[6].GetCellValue())
            return 'Win';

        if(this.moves == 9)
            return 'Tie';

        return null;
    }

    private HandleKey(e: KeyboardEvent){
        if (!this.gameInProgress) return;

        switch (e.keyCode){
            case 81: //Q
                this.onCellClicked(0);
                break;
            case 87: //W
                this.onCellClicked(1);
                break;
            case 69: //E
                this.onCellClicked(2);
                break;
            case 65: //A
                this.onCellClicked(3);
                break;
            case 83: //S
                this.onCellClicked(4);
                break;
            case 68: //D
                this.onCellClicked(5);
                break;
            case 90: //Z
                this.onCellClicked(6);
                break;
            case 88: //X
                this.onCellClicked(7);
                break;
            case 67: //C
                this.onCellClicked(8);
                break;
        }
    }

    onCellClicked = (clickedCellIndex: number): void => {
        const cell = this.tableCells[clickedCellIndex];
        if(!this.gameInProgress || 
            cell.GetCellValue() != null || 
            this.currentPlayer == null)
            return;

        cell.SetCellValue(this.currentPlayer.playerValue);
        this.moves++;

        const gameResult = this.CheckPlayerWin();
        if(gameResult != null)
        {
            this.gameInProgress = false;
            this.ShowEndMessage(gameResult);

            if(gameResult == 'Win')
                this.currentPlayer.playerScore++;

            this.UpdatePlayerScores();
            return;
        }

        this.ChangePlayer();
    }
}