import { Region } from "./region";

export interface Event {
    readonly name: string;
    duration: number;

    apply(region: Region): void;
}

export interface ScheduledEvent extends Event {
    whichTick: number;
}
