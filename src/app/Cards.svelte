<script>

    let { filtered } = $props()


</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="main">
    {#each Object.keys(filtered) as name }

        {#if filtered[name].dim == 'overworld'}
                
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
        {:else if filtered[name].dim == 'nether'}
            <div class="card nether" 
                class:done={filtered[name].done} 
                class:highlighted={filtered[name].highlighted} 

                onclick={() => { filtered[name].done = !filtered[name].done }}
                oncontextmenu={(ev) => { ev.preventDefault(); filtered[name].highlighted = !filtered[name].highlighted }}
            >
                <div class="name">{name}</div>
                <div>Dimension: Nether</div>
                <div>Biome: { filtered[name].biome }</div>
                <!-- <div>Weather: {filtered[name].weather}</div>
                <div>Water: {filtered[name].water}</div>
                <div>Time: {filtered[name].time}</div> -->
            </div>
        {/if}

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
                border-color: #33a7dd;
            }

            &.nether {
                --card-bg:   #7e6469;
                --card-border: #54383e;
            }
        }
    }

</style>