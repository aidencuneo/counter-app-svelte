<script>
    import Button from '$lib/Button.svelte';
    import Chart from '$lib/Chart.svelte';
    import { getRandColour } from '$lib/colourUtil';
    import Counter from '$lib/Counter.svelte';
    import * as data from '$lib/data';
    import { today } from '$lib/dates';
    import DateSelector from '$lib/DateSelector.svelte';
    import Header from '$lib/Header.svelte';
    import { onMount } from 'svelte';

    let page = $state('counters');
    let counters = $state([]);

    // Selected date
    let selectedDate = $state(today());
    $inspect(selectedDate);

    // Stats page
    let statName = $state();
    let timeMode = $state();

    // Reordering counters
    let draggingIndex = $state(-1);
    let counterPositions = [];

    const getPage = () => page;
    const setPage = p => page = p;

    const addCounter = () => {
        const name = (prompt('Enter a name:') ?? '').trim();

        if (!name)
            return;

        counters.push([name, getRandColour()]);
    }

    const updateCounter = (index, name, colour) => {
        // Deleting counters
        if (!name) {
            counters.splice(index, 1);
            return;
        }

        colour ??= counters[index][1];
        counters[index] = [name, colour];
    }

    // Reordering counters

    const dragStart = e => {
        if (e.target.id != 'drag-btn')
            return;

        let clientY = e.clientY || e.touches[0].clientY;

        counterPositions = [];
        const counterElems = document.getElementsByTagName('counter');
        let i;

        for (i = 0; i < counterElems.length; ++i) {
            const y = counterElems[i].getBoundingClientRect().y;
            counterPositions.push(y);

            if (clientY > y)
                draggingIndex = i;
        }

        log = draggingIndex + ', ' + counterPositions;
    }

    const dragging = e => {
        if (draggingIndex < 0)
            return;

        let clientY = e.clientY || e.touches[0].clientY;

        const before = draggingIndex > 0 ? counterPositions[draggingIndex] : -1;
        const after = draggingIndex + 1 < counterPositions.length ? counterPositions[draggingIndex + 1] : -1;

        if (clientY < before && before > 0) {
            const draggingElem = counters.splice(draggingIndex, 1)[0];
            counters.splice(--draggingIndex, 0, draggingElem);
        }

        else if (clientY > after && after > 0) {
            const draggingElem = counters.splice(draggingIndex, 1)[0];
            counters.splice(++draggingIndex, 0, draggingElem);
        }
    }

    const dragEnd = e => draggingIndex = -1;

    const getCounters = () => counters;
    const setCounters = c => counters = c;

    const importPrompt = () => {

    }

    const imporData = () => {

    }

    const exportData = () => {

    }

    const clearData = () => {
        if (confirm('Are you sure you want to clear all counter data?'))
            data.clear();

        counters = counters;
    }

    onMount(() => {
        counters = data.getCounters();

        window.addEventListener('mousedown', dragStart);
        window.addEventListener('touchstart', dragStart);
        window.addEventListener('mousemove', dragging);
        window.addEventListener('touchmove', dragging);
        window.addEventListener('mouseup', dragEnd);
        window.addEventListener('touchend', dragEnd);

        return () => {
            window.removeEventListener('mousedown', dragStart);
            window.removeEventListener('touchstart', dragStart);
            window.removeEventListener('mousemove', dragging);
            window.removeEventListener('touchmove', dragging);
            window.removeEventListener('mouseup', dragEnd);
            window.removeEventListener('touchend', dragEnd);
        };
    });

    $effect(() => {
        let newCounters = $state.snapshot(counters);
        if (newCounters != data.getCounters())
            data.saveCounters($state.snapshot(counters));
    });
</script>

<Header bind:page />

{#if page == 'counters'}
    <DateSelector bind:selectedDate />
    {#each counters as c, index (c)}
        <Counter
            name={c[0]} bg={c[1]}
            date={selectedDate}
            isDragging={index == draggingIndex}
            setInfo={(name, colour) => updateCounter(index, name, colour)}
            {getCounters} {setCounters} />
    {/each}
    <Button bg='#25dc7b' onclick={addCounter}>Add Counter</Button>
{:else if page == 'stats'}
    {#snippet counterOptions()}
        <option value="">-- none --</option>
        {#each counters as [name, colour]}
            <option value={name}>{name}</option>
        {/each}
    {/snippet}

    <div class="container">
        <select bind:value={statName}>{@render counterOptions()}</select>
        <!-- <select bind:value={statNames[1]}>{@render counterOptions()}</select> -->
    </div>

    <select bind:value={timeMode} style:background="#25dc7b">
        <option value="custom">Custom</option>
        <option value="3days">Previous 3 days</option>
        <option value="7days" selected>Previous 7 days</option>
        <option value="14days">Previous 14 days</option>
        <option value="thismonth">This month</option>
        <option value="lastmonth">Last month</option>
        <option value="30days">Previous 30 days</option>
        <option value="90days">Previous 90 days</option>
        <option value="thisyear">This year</option>
        <option value="lastyear">Last year</option>
        <option value="1year">Previous year</option>
        <option value="2years">Previous two years</option>
        <option value="alltime">All time</option>
    </select>

    <Chart name={statName} {timeMode} />

    <div class="container">
        <input type="file" accept="application/json" id="fileInput" style="display: none" onchange={importData}>
        <Button bg="#a9d4ff" onclick={importPrompt}>Import Data</Button>
        <Button bg="#25dc7b" onclick={exportData}>Export Data</Button>
        <Button bg="#ef3535" onclick={clearData}>Clear Data</Button>
    </div>
{/if}

<style>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>
