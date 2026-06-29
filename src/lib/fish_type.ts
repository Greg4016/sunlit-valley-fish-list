
type SeasonData = {
    time: {
        day : boolean,
        night : boolean,
    },
    weather: {
        clear : boolean,
        rain : boolean,
    }
}


interface BaseFish {
    done : boolean,
    highlighted : boolean,
};

export interface OverworldFish extends BaseFish {
    dim : 'overworld',
    seasons: string[],
    season_data : {
        spring? : SeasonData,
        summer? : SeasonData,
        autumn? : SeasonData,
        winter? : SeasonData,
    },
    season_text : string,
    water : string[],
    water_text : string,
    time_text : string,
    weather_text : string,
}


export interface NetherFish extends BaseFish {
    dim : 'nether',
    biome : string,
}


export type Fish = OverworldFish | NetherFish