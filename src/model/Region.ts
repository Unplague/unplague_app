import defaultActions from '../data/actions.json';

export class Region {

    public reproductionRate: number = 0;
    public happiness: number = 1.0;
    public infectionRate: number = 0.0; // percent
    public actionList: Array<any> = [];

    constructor(
        public name: string,
        public population: number, // constant
    ){
        this.actionList = defaultActions.actions.slice();
        this.actionList.forEach(action => {
            action.used = false;
        });
    }
}