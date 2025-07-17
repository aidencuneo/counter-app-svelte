<script>
    import Button from '$lib/Button.svelte';
    import { getRandColour } from '$lib/colourUtil';
    import Counter from '$lib/Counter.svelte';
    import DateSelector from '$lib/DateSelector.svelte';
    import Header from '$lib/Header.svelte';
    import { onMount } from 'svelte';

    let page = $state('counters');
    let counters = $state([]);

    counters = [
        ['sleep time', '#9212a8'],
        ['distracted', '#620683'],
        ['bouldering', '#eeda12'],
        ['bouldering 2', '#eeeeee'],
    ];

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
        // data.saveCounters();
    }

    const updateCounter = (index, name, colour) => {
        // Deleting counters
        if (!name) {
            counters.splice(index, 1);
            return;
        }

        colour ??= counters[index][1];
        counters[index] = [name, colour];

        // console.log(counters);
        // data.saveCounters();
    }

    // Reordering counters

    const dragStart = e => {
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
        log = '' + clientY; // Remove this later

        e.preventDefault();

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

    onMount(() => {
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

    let log = $state('log'); // Remove this later
</script>

<Header {getPage} {setPage} />

{#if page == 'counters'}
    <DateSelector />
    {#each counters as c, index (c[0])}
        <Counter
            name={c[0]} bg={c[1]}
            isDragging={index == draggingIndex}
            setInfo={(name, colour) => updateCounter(index, name, colour)}
            {getCounters} {setCounters} />
    {/each}
    <Button bg='#25dc7b' onclick={addCounter}>Add Counter</Button>
    Log: "{log}"
{:else if page == 'stats'}
    <div>other page</div>
{/if}

<!-- Remove this whole section later -->
<style>
    :global(body) {
	    background: black; /* Remove later */
    }
</style>
