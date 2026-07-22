<script>
    import SeasonCircle from "./SeasonCircle.svelte";


    let { filtered, user_fish_data = $bindable() } = $props()


    function toggleProp(name, prop) {
        if(!user_fish_data.value[name])
            user_fish_data.value[name] = { done: false, highlighted: false }


        if(prop == 'done')
            user_fish_data.value[name].done = !user_fish_data.value[name].done
        if(prop == 'highlighted')
            user_fish_data.value[name].highlighted = !user_fish_data.value[name].highlighted

        if( !user_fish_data.value[name].done && !user_fish_data.value[name].highlighted )
            delete user_fish_data.value[name]
        
    }


</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="main">
    {#each Object.keys(filtered) as name }

        <div class="card" 
            class:nether={filtered[name].dim == 'nether'} 
            class:done={filtered[name].done} 
            class:highlighted={filtered[name].highlighted} 

            onclick={() => { toggleProp(name, 'done') }}
            oncontextmenu={(ev) => { ev.preventDefault(); toggleProp(name, 'highlighted') }}
        >
            <!-- svelte-ignore a11y_missing_attribute -->
            <img src="fish_pics/{filtered[name].file_name}.png" />
            <div class="data">

                
                <div class="name">{name}</div>
                <!-- <SeasonCircle spring /> -->
                
                {#if filtered[name].dim == 'overworld'}
                    <div>Season: { filtered[name].season_text }</div>
                    <div>Water: { filtered[name].water_text }</div>
                    <div>Time: { filtered[name].time_text }</div>
                    <div>Weather: { filtered[name].weather_text }</div>
                {:else if filtered[name].dim == 'nether'}
                    <div>Dimension: Nether</div>
                    <div>Biome: { filtered[name].biome }</div>
                {/if}
            </div>
        </div>


    {/each}
</div>


<style>

    .main {
        width: fit-content;
        
        /* display: grid;
        grid-template-columns: auto auto; */
        display: flex;
        flex-wrap: wrap;
        
        gap: 20px;

        
        .card {
            height: fit-content;
            min-width: 13em;
            width: fit-content;
            padding: 10px 15px;

            display: flex;
            gap: 20px;
            align-items: center;

            text-align: left;
            background-color: var(--card-bg);
            color: var(--col);
            font-size: large;
            font-weight: 600;
            border-radius: 8px;
            border: 4px solid var(--card-border);
            text-wrap: nowrap;
            user-select: none;


            img {
                height: 80px;
                aspect-ratio: 1;
                image-rendering: pixelated;
            }


            .data {

                .name {
                    margin-bottom: 12px;
                    font-size: 1.5em;
                    
                }
            }


            &.nether {
                color: var(--col-nether);
                background-color: var(--card-bg-nether);
                border-color: var(--card-border-nether);
            }


            &.done {
                opacity: 50%;
            }

            &.highlighted {
                border-color: #33a7dd;
            }
        }
    }

</style>