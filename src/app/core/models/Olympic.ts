// TODO: create here a typescript interface for an olympic country

import { Participation } from "./Participation";

export interface Olympic {
    id: Number,
    country: string,
    participations: Participation[]
}

/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/
