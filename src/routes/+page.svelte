<script>
    import Button from '$lib/Button.svelte';
    import { getRandColour } from '$lib/colourUtil';
    import Counter from '$lib/Counter.svelte';
    import DateSelector from '$lib/DateSelector.svelte';
    import Header from '$lib/Header.svelte';

    let page = $state('counters');
    let counters = $state([]);

    counters = [
        ['sleep time', '#9212a8'],
        ['distracted', '#620683'],
        ['bouldering', '#eeda12'],
        ['bouldering 2', '#eeeeee'],
    ];

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

        counters[index] = [name, colour];
        // console.log(counters);
        // data.saveCounters();
    }

    const getCounters = () => counters;
    const setCounters = c => counters = c;
</script>

<Header {getPage} {setPage} />

{#if page == 'counters'}
    <DateSelector />
    {#each counters as c, index}
        <Counter
            name={c[0]} bg={c[1]}
            setInfo={(name, colour) => updateCounter(index, name, colour)}
            {getCounters} {setCounters} />
    {/each}
    <Button bg='#25dc7b' onclick={addCounter}>Add Counter</Button>
{:else if page == 'stats'}
    <div>other page</div>
{/if}
