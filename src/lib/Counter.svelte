<script>
    import { getLightOrDark, getRandColour } from './colourUtil';
    import CounterValue from './CounterValue.svelte';
    import Icon from './Icon.svelte';
    import Spacer from './XSpacer.svelte';

    let { name, bg, isDragging, setInfo, getCounters, setCounters, dragStart } = $props();

    let value = $state(0);

    const renameCounter = () => {
        const newName = (prompt('Enter a new name for this counter:') ?? '').trim();

        if (!newName || getCounters().findIndex(c => c[0] == newName) > 0)
            return;

        setInfo(newName);
        setCounters(getCounters());
    }
</script>

<counter
    style="
        background: {bg};
        color: #{getLightOrDark(bg.substring(1))};
        {isDragging ? "box-shadow: 0 0 10px #121212;" : ""}
        z-index: {isDragging ? 1 : 0};
    ">
    <div>
        <Icon padding='0 5px 0 0'
            ontouchstart={dragStart}
        >
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

    <CounterValue bind:value={value} />
</counter>

<style>
    counter {
        display: flex;
        position: relative;
        justify-content: space-between;
        padding: 15px 12px;
        user-select: none;
        transition: box-shadow 0.1s ease-out;
    }
</style>
