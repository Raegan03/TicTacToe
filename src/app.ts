import { TableCell } from './tableCell';

export class App {

    gameTable = document.getElementById('GameTable') as HTMLTableElement;

    tableCells: TableCell[] = [];

    constructor() {
        this.StartGame();
    }

    StartGame(){
        this.DrawTable();
    }

    private DrawTable(){
        let index = 0;
        for (let row = 0; row < 3; row++){
            let tableRow = this.gameTable.insertRow(0);

            for (let cell = 0; cell < 3; cell++){
                let tableCell = tableRow.insertCell(0);

                this.tableCells.push(new TableCell(index++, null, tableCell, this.onCellClicked));
            }
        }
    }

    onCellClicked = (clickedCellIndex: number): void => {
        const cell = this.tableCells[clickedCellIndex];
        if(cell.GetCellValue() != null)
            return;

        cell.SetCellValue("O")
    }
}