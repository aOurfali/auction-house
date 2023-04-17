import { Duration } from "ts-duration";

export interface Auction {
    id: number;
    name: string;
    userId: number;
    picture: string;
    title: string;
    description: string;
    duration: Duration;
    startPrice: number;
}