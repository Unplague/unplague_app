import { Region } from "./region";

export class World {
    money: number;
    clock: number;
    regions: Array<Region>;

    constructor() {
        this.money = 100;
        this.clock = 1;
        this.regions = [];

        this.regions.push(new Region("Europe", 741_400_000, 0.05, 2, 100));
        this.regions.push(new Region("North America", 741_400_000, 0.05, 2, 100));
        this.regions.push(new Region("South America", 741_400_000, 0.05, 2, 100));
        this.regions.push(new Region("Asia", 741_400_000, 0.05, 2, 100));
        this.regions.push(new Region("Australia", 741_400_000, 0.05, 2, 100));
    }
}