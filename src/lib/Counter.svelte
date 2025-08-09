<script>
    import { getLightOrDark, getRandColour } from './colourUtil';
    import CounterValue from './CounterValue.svelte';
    import Icon from './Icon.svelte';
    import Spacer from './XSpacer.svelte';
    import * as data from './data';
    import { onMount } from 'svelte';
    import { today } from './dates';
    import CounterSettingsWindow from './windows/CounterSettingsWindow.svelte';

    let { name, bg, date, isDragging, setInfo, getCounters, setCounters } = $props();

    let value = $state(0);
    let expanded = $state(false);
    let settingsOpen = $state(false);

    // const renameCounter = () => {
    //     const newName = (prompt('Enter a new name for this counter:', name) ?? '').trim();

    //     if (!newName || getCounters().findIndex(c => c[0] == newName) > 0)
    //         return;

    //     setInfo(newName);
    //     setCounters(getCounters());
    // }

    onMount(() => {
        value = data.getCount(name, date);
    });

    $effect(() => {
        // Update value when date changes
        value = data.getCount(name, date);
    });

    $effect(() => {
        // Save value when it changes
        data.setCount(name, value, date);
    });
</script>

<counter
    style="
        background: {bg};
        color: #{getLightOrDark(bg.substring(1))};
        {isDragging ? "box-shadow: 0 0 10px #121212;" : ""}
        z-index: {isDragging ? 1 : 0};
    ">
    <div>
        <Icon id='drag-btn' padding='12px 12px 12px 9px'>
            drag_indicator
        </Icon>

        <!-- <Icon padding='12px 2px 12px 2px'
            onclick={() => confirm(`Are you sure you want to delete "${name}"?`) && setInfo()}
        >
            delete
        </Icon> -->

        <!-- <Icon padding='12px 2px 12px 2px'
            onclick={() => setInfo(name, getRandColour())}
        >
            refresh
        </Icon> -->

        <!-- <Icon padding='12px 9px 12px 2px'
            onclick={() => expanded = !expanded}
        >
            expand_{expanded ? 'less' : 'more'}
        </Icon> -->

        <span onclick={() => settingsOpen = true}>{name}</span>
    </div>

    <CounterValue bind:value {date} style="padding: 0 6px 0 3px" />
</counter>

{#if expanded}
    <space>
        
    </space>
{/if}

{#if settingsOpen}
    <CounterSettingsWindow
        {name} {bg} {setInfo}
        onHide={() => settingsOpen = false}
    />
{/if}

<style>
    counter {
        display: flex;
        position: relative;
        justify-content: space-between;
        user-select: none;
        transition: box-shadow 0.1s ease-out;
        font-size: 18px;
    }

    div {
        display: flex;
        align-items: center;
    }

    span {
        padding-top: 6px;
        padding-bottom: 9px; /* 3 more than top */
    }

    space {
        display: block;
        height: 40px;
    }
</style>
