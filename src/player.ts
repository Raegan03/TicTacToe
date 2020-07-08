import { CellValue } from "./cellValue";

export class Player{
    
    playerName: string = "empty";
    playerValue: CellValue;

    constructor(
        playerName: string,
        playerValue: CellValue
    ){
        this.playerName = playerName;
        this.playerValue = playerValue;
    }
}