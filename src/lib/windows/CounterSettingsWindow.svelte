<script>
    import Button from '$lib/Button.svelte';
    import ColourSelector from '$lib/ColourSelector.svelte';
    import { getLightOrDark } from '$lib/colourUtil';
    import Icon from '$lib/Icon.svelte';
    import Window from './Window.svelte';

    let { name, bg, setInfo, onHide, ...props } = $props();

    let curName = $state(props.name);
    let curBg = $state(props.bg);

    const hideAndSave = () => {
        onHide();

        // Don't save a blank name
        if (!curName)
            return;

        setInfo(curName, curBg);
    }
</script>

<Window {...props} onHide={hideAndSave}>
    <row style:background={curBg} style:color={'#' + getLightOrDark(curBg.substring(1))}>
        <middle>Counter Settings</middle>
    </row>
    <row>
        <!-- <left>Name</left> -->
        <right>
            <input type="text" id="name" bind:value={curName} onfocus={e => e.target.select()}>
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <icon-wrapper
                onclick={() => confirm(`Are you sure you want to delete "${name}"?`) && setInfo()}
            >
                <Icon>delete</Icon>
            </icon-wrapper>
        </right>
    </row>
    <row>
        <!-- <left>Colour</left> -->
        <right class="colour-selector-wrapper">
            <ColourSelector bind:colour={curBg} />
        </right>
    </row>
    <row>
        <Button bg="#ef3535" padding="9px 0" onclick={onHide}>
            Cancel
        </Button>

        <Button bg="#25dc7b" padding="0px 0" onclick={hideAndSave}>
            Save
        </Button>
    </row>
</Window>

<style>
    row {
        width: 100%;
        /* height: 50px; */
        display: flex;
        /* justify-content: space-evenly; */
    }

    middle {
        display: block;
        padding: 10px 15px;
        user-select: none;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        text-wrap: nowrap;
        text-align: center;
    }

    right {
        display: flex;
        width: 100%;
    }

    icon-wrapper {
        min-width: 50px;
        max-width: 50px;
        height: 100%;
        align-self: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    input {
        background: #a9d4ff;
        color: #121212;
        width: 100%;
        padding: 10px 12px;
    }
</style>
