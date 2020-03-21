export class Region {

    public reproductionRate: number = 0;
    public happiness: number = 1.0;
    public infectionRate: number = 0.0; // percent

    constructor(
        public name: string,
        public population: number, // constant
    ){}
}