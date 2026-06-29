<script lang="ts">
    import { useLocalStorage } from "../lib/util.svelte";
    import type { Fish, OverworldFish } from "../lib/fish_type";
    import { untrack } from "svelte";

    let { filter_overworld = $bindable(), dim_filters = $bindable() } = $props()

    let dark_theme = useLocalStorage('dark_theme', true)


    let season_filters = $state({
        spring: false,
        summer: false,
        autumn: false,
        winter: false,
        year_round: false,
    })

    let weather_filters = $state({
        clear: false,
        rain: false,
    })

    let time_filters = $state({
        day: false,
        night: false,
    })

    let water_filters = $state({
        fresh: false,
        ocean: false,
        river: false,
    })



    $effect(() => {
        $state.snapshot(season_filters)
        $state.snapshot(water_filters)
        $state.snapshot(time_filters)
        $state.snapshot(weather_filters)
        $state.snapshot(dim_filters)


        untrack(() => {

            filter_overworld = []

            let seasons = (Object.keys(season_filters) as Array<keyof typeof season_filters>)
                .filter((season) => season_filters[season])

            
            
            if(seasons.length > 0)
                filter_overworld.push( (fish : OverworldFish) => { return seasons.some((season) => fish.seasons.includes(season))  } )



            let new_seasons = seasons.filter(
                (season) => season != 'year_round'
            )
            if(new_seasons.length == 0) new_seasons = ['spring', 'summer', 'autumn', 'winter']

            if(time_filters.day)
                filter_overworld.push( (fish : OverworldFish) => { return new_seasons.some((season) => fish.season_data[season]?.time.day)  } )
            if(time_filters.night)
                filter_overworld.push( (fish : OverworldFish) => { return new_seasons.some(season => fish.season_data[season]?.time.night)  } )


            if(weather_filters.clear)
                filter_overworld.push( (fish : OverworldFish) => { return new_seasons.some((season) => fish.season_data[season]?.weather.clear)  } )
            if(weather_filters.rain)
                filter_overworld.push( (fish : OverworldFish) => { return new_seasons.some(season => fish.season_data[season]?.weather.rain)  } )


            let waters = (Object.keys(water_filters) as Array<keyof typeof water_filters>)
                .filter((water) => water_filters[water])

            if(waters.length > 0)
                filter_overworld.push( (fish : OverworldFish) => { return waters.some(water => fish.water.includes(water) )} )
            

        })
    })
    
</script>


<div class="top-bar">
    <div class="filters">

        <div class="btn-list" >
            <button disabled={dim_filters.force_overworld} 
                    class:on={ dim_filters.overworld || dim_filters.force_overworld } 
                    onclick={() => { dim_filters.overworld = !dim_filters.overworld }} 
                    >Overworld
            </button>

            <button disabled={dim_filters.force_overworld} 
                    class:on={ dim_filters.nether || dim_filters.force_overworld }  
                    onclick={() => { dim_filters.nether    = !dim_filters.nether }}    
                    >Nether
            </button>
        </div>

        <div class="btn-list" >
            <button class:on={ season_filters.spring }     onclick={() => { season_filters.spring     = !season_filters.spring }}     >🌼 Spring</button>
            <button class:on={ season_filters.summer }     onclick={() => { season_filters.summer     = !season_filters.summer }}     >🔥 Summer</button>
            <button class:on={ season_filters.autumn }     onclick={() => { season_filters.autumn     = !season_filters.autumn }}     >🍂 Autumn</button>
            <button class:on={ season_filters.winter }     onclick={() => { season_filters.winter     = !season_filters.winter }}     >⛄ Winter</button>
            <button class:on={ season_filters.year_round } onclick={() => { season_filters.year_round = !season_filters.year_round }} >🔄 Year-Round</button>
        </div>

        <div class="btn-list" >
            <button class:on={ time_filters.day }   onclick={() => { time_filters.day = !time_filters.day }}     >Day</button>
            <button class:on={ time_filters.night } onclick={() => { time_filters.night = !time_filters.night }} >Night</button>
        </div>

        <div class="btn-list" >
            <button class:on={ weather_filters.clear } onclick={() => { weather_filters.clear = !weather_filters.clear }} >Clear</button>
            <button class:on={ weather_filters.rain }  onclick={() => { weather_filters.rain = !weather_filters.rain }}   >Rain</button>
        </div>
        
        <div class="btn-list" >
            <button class:on={ water_filters.fresh } onclick={() => { water_filters.fresh = !water_filters.fresh }} >Fresh</button>
            <button class:on={ water_filters.ocean } onclick={() => { water_filters.ocean = !water_filters.ocean }} >Ocean</button>
            <button class:on={ water_filters.river } onclick={() => { water_filters.river = !water_filters.river }} >River</button>
        </div>
    </div>

    <button class="theme {dark_theme.value ? 'dark' : 'light'}" onclick={() => { dark_theme.value = !dark_theme.value }}>Theme</button>
</div>


<style>

    .top-bar {
        display: flex;
        justify-content: space-between;

        .filters {

            display: flex;
            gap: 16px;
            flex-direction: column;


            button {
                border: none; 
                font-size: 16px;
                font-family: "JetBrains Mono", monospace;
                background-color: rgb(222, 222, 222);
                
            }

            .btn-list {
                width: fit-content;

                display: flex;
                gap: 2px;

                border-radius: 9999px;
                background-color: rgb(166, 166, 166);
                overflow: hidden;

                button {
                    white-space: nowrap;
                }

                button:disabled {
                    /* background-color: rgb(149, 149, 149); */
                    color: inherit;
                    cursor: not-allowed;
                }

                :first-child {
                    padding-left: 10px;
                }

                :last-child {
                    padding-right: 12px;
                }


                .on {
                    background-color: rgb(190, 190, 190);
                }
            }
        }

        .theme {
            justify-self: end;
        }
    }



</style>