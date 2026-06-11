<script>
// @ts-nocheck

    import data from './assets/data.json' with { type: 'json' };
    import { useLocalStorage } from "./lib/util.svelte";


    let fishes = useLocalStorage('fishing_data', 
        data
    )

    let dark_theme = useLocalStorage('dark_theme', true)
    

    let filter = $state()
    

    let filtered = $derived.by(() => {
        return filter ?  
            Object.fromEntries(
                Object.entries(fishes.value).filter(([name, data]) => data.dim == 'overworld' && filter(data) )
            )
            : fishes.value
        // return fishes.value
    })

</script>


<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div>
    <div class="buttons">
        <div>
            <button onclick={() => { filter = undefined } } >All</button>
            <button onclick={() => { filter = (fish) => { return fish.seasons.includes("spring") }} } >🌼 Spring</button>
            <button onclick={() => { filter = (fish) => { return fish.seasons.includes("summer") }} } >🔥 Summer</button>
            <button onclick={() => { filter = (fish) => { return fish.seasons.includes("autumn") }} } >🍂 Autumn</button>
            <button onclick={() => { filter = (fish) => { return fish.seasons.includes("winter") }} } >⛄ Winter</button>
            <button onclick={() => { filter = (fish) => { return fish.seasons.length == 4 }} } >Year-Round</button>
        </div>

        <button class="theme {dark_theme.value ? 'dark' : 'light'}" onclick={() => { dark_theme.value = !dark_theme.value }}>Theme</button>
    </div>

    <br>

    <div class="main">
        {#each Object.keys(filtered) as name }
            <div class="card" 
                class:done={filtered[name].done} 
                class:highlighted={filtered[name].highlighted} 

                onclick={() => { filtered[name].done = !filtered[name].done }}
                oncontextmenu={(ev) => { ev.preventDefault(); filtered[name].highlighted = !filtered[name].highlighted }}
            >
                <div class="name">{name}</div>
                <div>Season: { filtered[name].season_text }</div>
                <div>Water: { filtered[name].water_text }</div>
                <div>Time: { filtered[name].time_text }</div>
                <div>Weather: { filtered[name].weather_text }</div>
                <!-- <div>Weather: {filtered[name].weather}</div>
                <div>Water: {filtered[name].water}</div>
                <div>Time: {filtered[name].time}</div> -->
            </div>
        {/each}
    </div>
</div>



<style>

    :global(body:has(.theme.dark)) {
        --bg: rgb(105, 98, 86);
        --card-bg: #868074;
        --card-border: #afa078;
        --col: white;
    }

    :global(body:has(.theme.light)) {
        --bg: #f9f0dc;
        --card-bg: #fffaee;
        --card-border: #e9d9b1;
        --col: rgb(71, 71, 71);
    }


    .buttons {

        display: flex;
        justify-content: space-between;

        .theme {
            
            justify-self: end;
        }
    }

    .main {
        width: fit-content;
        
        /* display: grid;
        grid-template-columns: auto auto; */
        display: flex;
        flex-wrap: wrap;

        gap: 20px;

        
        .card {
            height: fit-content;
            width: fit-content;
            padding: 10px;

            text-align: left;
            background-color: var(--card-bg);
            color: var(--col);
            font-size: large;
            font-weight: 600;
            border-radius: 10px;
            border: 6px solid var(--card-border);
            text-wrap: nowrap;
            user-select: none;


            .name {
                margin-bottom: 12px;

                text-align: center;
                border-bottom: 4px solid var(--card-border);
            }

            &.done {
                opacity: 50%;
            }

            &.highlighted {
                border: 6px solid #33a7dd;
            }
        }
    }


</style>
