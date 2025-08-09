<script>
    import { getRandColour } from './colourUtil';
    import Icon from './Icon.svelte';

    let { colour = $bindable() } = $props();
</script>

<div>
    <input type="color" bind:value={colour}>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <span onclick={() => colour = getRandColour()}>
        <Icon>refresh</Icon>
    </span>
</div>

<style>
    div {
        display: flex;
        height: 100%;
    }

    div * {
        width: 100%;
    }

    input {
        height: 100%;
    }

    span {
        min-width: 40px;
        max-width: 40px;
        height: 100%;
        align-self: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>
