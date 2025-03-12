
export type Team = {
    id: string;
    teamName: string;
}

export type Roster = {
    firstName: string;
    lastName: string;
    birthday?: Date;
    number: number;
    activeStatus: boolean;
    dateAdded?: Date;
    dateModified: Date;
    team?: Team;
}

export type stats = {
    dateTime: Date
    statID: number;
    stateType: string;
    value: string | number
    temp?: number;
    wind?: number;
    windDirection?: "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW"
}