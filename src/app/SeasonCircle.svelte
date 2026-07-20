<script>

    let { size = "1.5em", spring = false, summer = false, autumn = false, winter = false } = $props()

</script>

<svg height={size} width={size} class:spring={spring} class:summer={summer} class:autumn={autumn} class:winter={winter}>
    <use height={size} width={size} href="/seasons.svg"></use>
</svg>


<style>

    .spring {
        --spring: rgb(207, 207, 207);
    }

    .summer {
        --summer: rgb(207, 207, 207);
    }

    .autumn {
        --autumn: rgb(207, 207, 207);
    }

    .winter {
        --winter: rgb(207, 207, 207);
    }

</style>