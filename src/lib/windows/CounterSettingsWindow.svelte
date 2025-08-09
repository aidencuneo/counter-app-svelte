<script>
    import Button from '$lib/Button.svelte';
    import ColourSelector from '$lib/ColourSelector.svelte';
    import { getLightOrDark } from '$lib/colourUtil';
    import Icon from '$lib/Icon.svelte';
    import Window from './Window.svelte';

    let { name, bg, setInfo, ...props } = $props();

    let curName = $state(props.name);
    let curBg = $state(props.bg);
</script>

<Window {...props}>
    <row style:background-color={bg} style:color={'#' + getLightOrDark(bg.substring(1))}>
        <middle>Settings: "{name}"</middle>
    </row>
    <row>
        <left>Name</left>
        <right>
            <input type="text" id="name" bind:value={curName}>
        </right>
    </row>
    <row>
        <left>Colour</left>
        <right>
            <ColourSelector bind:colour={curBg} />
        </right>
    </row>
</Window>

<style>
    row {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        /* text-align: right; */
    }

    middle {
        display: block;
        text-align: center;
        padding: 10px 0;
        user-select: none;
    }

    left, right {
        display: block;
    }

    left {
        padding: 10px 0;
        width: 150px;
        text-align: right;
        padding-right: 18px;
        user-select: none;
    }

    right {
        width: 100%;
    }

    input {
        background: #a9d4ff;
        color: #121212;
        height: 100%;
        width: 100%;
        padding: 0 9px;
    }
</style>
