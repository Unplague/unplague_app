import { Region } from "./region";

export interface Measure {
    readonly name: string;
    readonly cost: number;

    apply(region: Region): void;
}

export class Curfew implements Measure {
    name = "Curfew";
    cost = 10;

    apply(region: Region): void {
        region.happiness -= 10;
    }
}