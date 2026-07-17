<script lang="ts">
    import Cards from './app/Cards.svelte';
    import Filter from './app/Filter.svelte';
    import { useLocalStorage } from "./lib/util.svelte";
    import data from './assets/data.json' with { type: 'json' };
    import type { Fish } from "./lib/fish_type";


    let user_fish_data = useLocalStorage('user_fish_data', 
        {}
    )

    let fishes = $derived.by(() => {
        let init = structuredClone(data)

        if(user_fish_data.value) {

            (Object.keys(user_fish_data.value) as Array<keyof typeof data>).forEach((name) => {
                init[name].done = user_fish_data.value[name].done
                init[name].highlighted = user_fish_data.value[name].highlighted
            })
        }
        
        return init
    })

    let filter_overworld : CallableFunction[] = $state([])

    let dim_filters = $state({
        overworld: false,
        nether: false,
    })
    

    let filtered = $derived.by(() => {

        let filtered_overworld = Object.fromEntries(
            Object.entries(fishes).filter(([name, val]) => val.dim == 'overworld' &&  filter_overworld.every(cond => cond(val)) )
        )

        let filtered_nether = Object.fromEntries(
            Object.entries(fishes).filter(([name, val]) => val.dim == 'nether' )
        )

        
        let dim_filtered = {}

        if(dim_filters.overworld) dim_filtered = {...filtered_overworld}
        if(dim_filters.nether) dim_filtered = {...filtered_nether}
        if(!dim_filters.overworld == !dim_filters.nether) dim_filtered = {...filtered_overworld, ...filtered_nether}
        
        // Unsorted
        // return dim_filtered

        // Sorted
        return  Object.keys(dim_filtered).sort().reduce(
            (obj, key) => { 
                obj[key] = dim_filtered[key]; 
                return obj;
            }, 
            {}
        );
    })

</script>



<div>
    <Filter bind:filter_overworld={ filter_overworld } bind:dim_filters={dim_filters} />

    <br>

    <Cards filtered={ filtered } bind:user_fish_data={user_fish_data}/>
</div>



<style>

    :global(body:has(.theme.dark)) {
        --bg: rgb(105, 98, 86);
        --card-bg: #868074;
        --card-bg-nether: #7e6469;
        --card-border: #afa078;
        --card-border-nether: #54383e;
        --col: white;
        --col-nether: #e6c7cd;
    }

    :global(body:has(.theme.light)) {
        --bg: #f9f0dc;
        --card-bg: #fffaee;
        --card-bg-nether: #cd687c;
        --card-border: #d7c8a2;
        --card-border-nether: #98334a;
        --col: rgb(71, 71, 71);
        --col-nether: #2d2d2d;
    }

</style>
