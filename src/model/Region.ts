export class Region {
    constructor(
        public name: string,
        public population: number, // constant
        public infectionRate: number, // percent
        public reproductionRate: number,
        public happiness: number, // percent
    ){}
}