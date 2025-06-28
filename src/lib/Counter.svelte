<script>
    import { getLightOrDark, getRandColour } from './colourUtil';
    import CounterValue from './CounterValue.svelte';
    import Icon from './Icon.svelte';
    import Spacer from './XSpacer.svelte';

    export let name, bg, setInfo, getCounters, setCounters;
</script>

<counter style="background: {bg}; color: #{getLightOrDark(bg.substring(1))}">
    <div>
        <Icon padding='0 5px 0 0'>
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

        <span>{name}</span>
    </div>

    <CounterValue value={0} />
</counter>

<style>
    counter {
        display: flex;
        justify-content: space-between;
        padding: 15px 12px;
        user-select: none;
    }
</style>
