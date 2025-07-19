<script>
    import { getLightOrDark, getRandColour } from './colourUtil';
    import CounterValue from './CounterValue.svelte';
    import Icon from './Icon.svelte';
    import Spacer from './XSpacer.svelte';
    import * as data from './data';
    import { onMount } from 'svelte';
    import { today } from './dates';

    let { name, bg, date, isDragging, setInfo, getCounters, setCounters } = $props();

    let value = $state(0);

    const renameCounter = () => {
        const newName = (prompt('Enter a new name for this counter:', name) ?? '').trim();

        if (!newName || getCounters().findIndex(c => c[0] == newName) > 0)
            return;

        setInfo(newName);
        setCounters(getCounters());
    }

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
        <Icon id='drag-btn' padding='0 5px 0 12px'>
            drag_indicator
        </Icon>

        <Icon padding='0 5px 0 0'
            onclick={() => confirm(`Are you sure you want to delete "${name}"?`) && setInfo()}
        >
            delete
        </Icon>

        <Icon padding='0 10px 0 0'
            onclick={() => setInfo(name, getRandColour())}
        >
            refresh
        </Icon>

        <span onclick={renameCounter}>{name}</span>
    </div>

    <CounterValue bind:value {date} />
</counter>

<style>
    counter {
        display: flex;
        position: relative;
        justify-content: space-between;
        padding: 10px 9px 10px 0px;
        user-select: none;
        transition: box-shadow 0.1s ease-out;
    }

    div {
        display: flex;
        align-items: center;
    }

    span {
        padding-bottom: 3px;
    }
</style>
