import { CellValue } from './cellValue';

export class TableCell{

    constructor(
        public cellIndex: number,
        private cellValue: CellValue,
        private cellElement: HTMLTableDataCellElement,
        private onCellClick: (cellIndex: number) => void
        ){
        cellElement.addEventListener('click', () => this.onCellClick(this.cellIndex));
    }

    GetCellValue(): CellValue{
        return this.cellValue;
    }

    SetCellValue(cellValue: CellValue){
        this.cellValue = cellValue;
        this.cellElement.innerHTML = this.cellValue;
    }
}