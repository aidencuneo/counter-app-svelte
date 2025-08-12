<script>
    import Button from '$lib/Button.svelte';
    import Chart from '$lib/Chart.svelte';
    import { getRandColour } from '$lib/colourUtil';
    import Counter from '$lib/Counter.svelte';
    import * as data from '$lib/data';
    import { addMonths, today } from '$lib/dates';
    import DateSelector from '$lib/DateSelector.svelte';
    import Header from '$lib/Header.svelte';
    import Icon from '$lib/Icon.svelte';
    import XSpacer from '$lib/XSpacer.svelte';
    import { onMount } from 'svelte';

    let page = $state('counters');
    let counters = $state([]);

    // Selected date
    let selectedDate = $state(today());
    let customStartDate = $state(addMonths(today(), -1));
    let customEndDate = $state(today());
    $inspect(customStartDate);

    // Stats page
    let statName = $state();
    let timeMode = $state();
    let importFileInput = $state();

    // Info elements
    let infoElems = $state({});

    // Reordering counters
    let draggingIndex = $state(-1);
    let counterPositions = [];

    const getPage = () => page;
    const setPage = p => page = p;

    const addCounter = () => {
        counters.push(['Counter ' + (counters.length + 1), getRandColour()]);

        // const name = (prompt('Enter a name:') ?? '').trim();

        // if (!name)
        //     return;

        // counters.push([name, getRandColour()]);
    }

    const updateCounter = (index, name, colour) => {
        // Deleting counters
        if (!name) {
            counters.splice(index, 1);
            return;
        }

        // Trim after
        name = name.trim();

        // Renaming counters
        let nameNow = counters[index][0];

        if (nameNow != name) {
            let values = data.getValues();
            values[name] = values[nameNow];
            delete values[nameNow];
            data.saveValues(values);
        }

        // Set new counter info
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
        importFileInput.click();
    }

    const importData = () => {
        const file = importFileInput.files[0];

        if (!file)
            return;

        const reader = new FileReader();
        reader.readAsText(file, 'utf-8');

        reader.onload = e => {
            data.importFromJSON(e.target.result);
            counters = data.getCounters();
            page = 'counters';
        }

        reader.onerror = e => alert('Error reading file');
    }

    const exportData = () => {
        const fileContent = data.exportToJSON();
        const blob = new Blob([fileContent], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // Download as a file
        const a = document.createElement('a');
        a.href = url;
        a.download = `counter_data_${today()}.json`;
        a.click();

        URL.revokeObjectURL(url); // Release object URL
    }

    const clearData = () => {
        if (!confirm('Are you sure you want to clear all counter data?'))
            return;

        data.clear();
        counters = [];
        page = 'counters';
    }

    onMount(() => {
        counters = data.getCounters();
        page = data.getLastPage();

        let [newStatName, newTimeMode] = data.getStatsOptions();
        let [newStartDate, newEndDate] = data.getCustomDates();
        console.log(newStartDate, newEndDate);

        if (newStartDate == 'today')
            newStartDate = today();
        if (newEndDate == 'today')
            newEndDate = today();

        statName = newStatName ? newStatName : statName;
        timeMode = newTimeMode ? newTimeMode : timeMode;
        customStartDate = newStartDate ? newStartDate : customStartDate;
        customEndDate = newEndDate ? newEndDate : customEndDate;

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

    $effect(() => data.setLastPage(page));
    $effect(() => data.setStatsOptions([statName, timeMode]));

    $effect(() => {
        let [start, end] = [customStartDate, customEndDate];

        if (start == today())
            start = 'today';
        if (end == today())
            end = 'today';

        data.setCustomDates([start, end]);
    });

    $effect(() => {
        // document.body.style.overflow = draggingIndex > -1 ? 'hidden' : 'none';
        // counterPageContainer.style.overflow = draggingIndex > -1 ? 'hidden' : 'none';
        document.body.style.touchAction = draggingIndex > -1 ? 'none' : 'auto';
        document.body.style.overscrollBehavior = draggingIndex > -1 ? 'none' : '';
    });
</script>

{#if page == 'counters'}
    <div id="counter-page-container">
        <Header bind:page />
        <span style:font-size="22px">
            <DateSelector bind:selectedDate />
        </span>
        <div class="counter-content" style:overflow={draggingIndex > -1 ? 'hidden' : 'auto'}>
            {#each counters as c, index (c)}
                <Counter
                    notouch={draggingIndex > -1}
                    name={c[0]} bg={c[1]}
                    date={selectedDate}
                    isDragging={index == draggingIndex}
                    setInfo={(name, colour) => updateCounter(index, name, colour)}
                    {getCounters} {setCounters} />
            {/each}
            <Button bg='#25dc7b' onclick={addCounter}>
                <Icon style="font-weight: bold;">add</Icon>
            </Button>
        </div>
    </div>
{:else if page == 'stats'}
    <Header bind:page />

    {#snippet counterOptions()}
        <!-- <option value="">-- none --</option> -->
        {#each counters as [name, colour]}
            <option value={name}>{name}</option>
        {/each}
    {/snippet}

    <div class="row-container">
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

    {#if timeMode == 'custom'}
        <div class="row">
            <div class="label">Start Date</div>
            <DateSelector bind:selectedDate={customStartDate} />
        </div>

        <div class="row">
            <div class="label">End Date</div>
            <DateSelector bind:selectedDate={customEndDate} />
        </div>

        <Chart
            name={statName}
            startDate={customStartDate}
            endDate={customEndDate}
            {timeMode}
            {infoElems}
        />
    {:else}
        <Chart
            name={statName}
            {timeMode}
            {infoElems}
        />
    {/if}

    <div class="info-container">
        <div bind:this={infoElems.days}>Count: 0</div>
        <div bind:this={infoElems.currentStreak}>Current Streak: 0</div>
    </div>

    <div class="info-container">
        <div bind:this={infoElems.sum}>Sum: 0</div>
        <div bind:this={infoElems.longestStreak}>Longest Streak: 0</div>
    </div>

    <div class="info-container">
        <div bind:this={infoElems.max}>Max: 0</div>
        <div bind:this={infoElems.currentZeroStreak}>Current Zero Streak: 0</div>
    </div>

    <div class="info-container">
        <div bind:this={infoElems.average}>Average: 0</div>
        <div bind:this={infoElems.longestZeroStreak}>Longest Zero Streak: 0</div>
    </div>

    <div class="info-container">
        <div bind:this={infoElems.nonZeroAverage}>Non-Zero Average: 0</div>
        <div bind:this={infoElems.gradient}>Gradient: +0</div>
    </div>

    <div class="row-container" style:margin-top="15px">
        <input bind:this={importFileInput} type="file" accept="application/json" style="display: none" onchange={importData}>
        <Button bg="#a9d4ff" onclick={importPrompt}>Import Data</Button>
        <Button bg="#25dc7b" onclick={exportData}>Export Data</Button>
        <Button bg="#ef3535" onclick={clearData}>Clear Data</Button>
    </div>
{/if}

<style>
    .info-container {
        display: flex;
        justify-content: space-between;
        padding: 5px 24px;
    }

    .row-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    #counter-page-container {
        display: flex;
        flex-direction: column;
        height: 100dvh;
    }

    .counter-content {
        flex-grow: 1;
        overflow-y: auto;
    }

    div.row {
        display: flex;
        flex-direction: row;
        /* justify-content: space-between; */
    }

    :global(div.row > *) {
        flex-grow: 1;
    }

    div.label {
        width: 100px;
        /* text-align: right; */
        /* text-align: center; */
        padding: 12px;
        flex-grow: 0;
        background: #a9d4ff;
    }
</style>
