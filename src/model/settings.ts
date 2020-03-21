import { Region } from "./region";

export class Settings {
    loosingInfectionRate: number; // percentage
    deathRateAboveICU: number; // percentage
    deathRateBelowICU: number; // percentage
    //startRegions: Array<Region>;
    startReproductionRate: number;
    dailyIncome: number;
    initialIncome: number;
    initialHappiness: number;

    constructor() {
        this.loosingInfectionRate = 0.7;
        this.deathRateAboveICU = 0.1;
        this.deathRateBelowICU = 0.02;

        this.startReproductionRate = 2;
        //this.startRegions = []
        //this.startRegions.push(new Region("Asia", 741_400_000, 0.05, 2, 100));

        this.dailyIncome = 50;
        this.initialIncome = 250;
        this.initialHappiness = 1;
    }
} 
