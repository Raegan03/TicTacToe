import { CellValue } from "./cellValue";

export class Player{
    
    constructor(
        public playerName: string,
        public playerValue: CellValue,
        public playerScore = 0
    ){}
}